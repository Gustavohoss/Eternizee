
import { NextResponse } from 'next/server';
import { initializeFirebase } from '@/firebase';
import { doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const PERFECTPAY_SECURITY_TOKEN = "a57340234e6d72b4ceebbda5bf09f4be";

/**
 * Webhook da PerfectPay
 * Processa pagamentos e libera sites automaticamente.
 */
export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let data: any = {};

    if (contentType.includes('application/json')) {
      data = await request.json();
    } else {
      const formData = await request.formData();
      data = Object.fromEntries(formData.entries());
    }

    console.log('PerfectPay Webhook Body:', JSON.stringify(data, null, 2));

    const { token, sale_status_enum, customer } = data;
    
    // Validação de segurança
    if (token !== PERFECTPAY_SECURITY_TOKEN) {
      console.error('Webhook: Token de segurança inválido.');
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    // Tenta encontrar o identificador do site (src) em vários locais possíveis
    const subdomainName = 
      data.src || 
      data.tracking_parameters?.src || 
      data.metadata?.src || 
      data.subscription?.src ||
      data.request_params?.src;

    if (!subdomainName) {
      console.warn('Webhook: Parâmetro "src" não encontrado nos dados.');
      return NextResponse.json({ message: 'Identificador do site não encontrado.' }, { status: 200 });
    }

    const { firestore, auth } = initializeFirebase();
    const siteRef = doc(firestore, 'published_sites', subdomainName);
    
    // Verifica se o documento existe antes de tentar atualizar
    const siteSnap = await getDoc(siteRef);
    if (!siteSnap.exists()) {
      console.error(`Webhook: Site ${subdomainName} não encontrado no Firestore.`);
      return NextResponse.json({ message: 'Site não encontrado.' }, { status: 200 });
    }

    const status = Number(sale_status_enum);

    // STATUS DE LIBERAÇÃO (2 = Aprovada, 7 = Faturada, 10 = Completada)
    if ([2, 7, 10].includes(status)) {
      let finalUserId: string | null = null;

      // Criação/Vinculação de conta
      if (customer?.email) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, customer.email, 'Eternize123');
          finalUserId = userCredential.user.uid;
          console.log(`Webhook: Nova conta criada para ${customer.email}`);
        } catch (authError: any) {
          // Erro esperado se o usuário já existir
          console.log(`Webhook: Usuário ${customer.email} já possui conta ou erro de auth ignorado.`);
        }
      }

      const updateData: any = {
        status: 'published',
        customerEmail: customer?.email || siteSnap.data().customerEmail || '',
        publishedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      if (finalUserId) {
        updateData.userId = finalUserId;
      }

      await updateDoc(siteRef, updateData);
      console.log(`Webhook: Site ${subdomainName} LIBERADO com sucesso!`);
      return NextResponse.json({ message: 'Site liberado com sucesso.' });
    }

    // STATUS DE BLOQUEIO (6 = Cancelado, 4 = Devolvido, 11 = Estornado)
    if ([3, 4, 6, 11].includes(status)) {
      await updateDoc(siteRef, {
        status: 'pending',
        updatedAt: serverTimestamp()
      });
      console.log(`Webhook: Site ${subdomainName} BLOQUEADO devido ao status ${status}.`);
      return NextResponse.json({ message: 'Acesso revogado.' });
    }

    return NextResponse.json({ message: `Evento ${status} ignorado.` });

  } catch (error: any) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Erro interno', details: error.message }, { status: 500 });
  }
}
