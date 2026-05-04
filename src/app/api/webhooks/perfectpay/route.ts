
import { NextResponse } from 'next/server';
import { initializeFirebase } from '@/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

// O seu token de segurança fornecido pela PerfectPay
const PERFECTPAY_SECURITY_TOKEN = "a57340234e6d72b4ceebbda5bf09f4be";

/**
 * Endpoint de Webhook para a PerfectPay.
 * Lida com múltiplos status de venda e cria conta para o usuário se aprovado.
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('PerfectPay Webhook Received:', JSON.stringify(data, null, 2));

    const { token, sale_status_enum, customer } = data;
    
    // VALIDAÇÃO DE SEGURANÇA
    if (token !== PERFECTPAY_SECURITY_TOKEN) {
      console.error('Tentativa de acesso não autorizado ao Webhook. Token inválido.');
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // A PerfectPay envia o parâmetro 'src' da URL diretamente na raiz ou em tracking_parameters
    const subdomainName = data.src || data.metadata?.src || data.tracking_parameters?.src;

    if (!subdomainName) {
      console.warn('Webhook ignorado: Identificador do site (src) não encontrado nos dados enviados.');
      return NextResponse.json({ message: 'Identificador do site não encontrado.' }, { status: 200 });
    }

    const { firestore, auth } = initializeFirebase();
    const siteRef = doc(firestore, 'published_sites', subdomainName);
    
    const status = Number(sale_status_enum);

    // STATUS DE LIBERAÇÃO (2 = Aprovada, 10 = Completada)
    if (status === 2 || status === 10) {
      let finalUserId: string | null = null;

      // CRIAÇÃO DE CONTA AUTOMÁTICA
      if (customer?.email) {
        try {
          // Tenta criar o usuário com a senha padrão
          const userCredential = await createUserWithEmailAndPassword(auth, customer.email, 'Eternize123');
          finalUserId = userCredential.user.uid;
          console.log(`Conta criada com sucesso para: ${customer.email}`);
        } catch (authError: any) {
          // Se o erro for 'auth/email-already-in-use', prosseguimos normalmente
          if (authError.code === 'auth/email-already-in-use' || authError.code === 'auth/operation-not-allowed') {
            console.log('Usuário já possui conta ou operação restrita. Prosseguindo com a liberação.');
          } else {
            console.error('Erro ao tentar processar conta no Firebase Auth:', authError.message);
          }
        }
      }

      // Prepara os dados de atualização para liberar o site
      const updateData: any = {
        status: 'published',
        customerEmail: customer?.email || '',
        publishedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      // Se conseguimos criar um usuário novo ou temos o UID, vinculamos
      if (finalUserId) {
        updateData.userId = finalUserId;
      }

      await updateDoc(siteRef, updateData);
      console.log(`Site ${subdomainName} liberado com sucesso!`);
      return NextResponse.json({ message: 'Site liberado e conta processada com sucesso!' });
    }

    // STATUS DE BLOQUEIO (6 = Cancelado, 7 = Devolvido, 9 = Chargeback)
    if ([6, 7, 9].includes(status)) {
      await updateDoc(siteRef, {
        status: 'pending',
        updatedAt: serverTimestamp()
      });
      console.log(`Site ${subdomainName} bloqueado devido ao status ${status}`);
      return NextResponse.json({ message: 'Acesso ao site revogado devido ao status do pagamento.' });
    }

    return NextResponse.json({ message: `Evento ${status} recebido. Nenhuma ação necessária.` });

  } catch (error: any) {
    console.error('Erro no processamento do Webhook:', error);
    return NextResponse.json({ error: 'Erro interno ao processar webhook', details: error.message }, { status: 500 });
  }
}
