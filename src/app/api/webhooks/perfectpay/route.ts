
import { NextResponse } from 'next/server';
import { initializeFirebase } from '@/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Endpoint de Webhook para a PerfectPay.
 * Lida com múltiplos status de venda para garantir a integridade do acesso ao site.
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('PerfectPay Webhook Received:', data);

    const { sale_status_enum, metadata } = data;
    
    // O 'src' é enviado no checkout como o ID do subdomínio/site
    const subdomainName = metadata?.src;

    if (!subdomainName) {
      console.warn('Webhook ignorado: Identificador do site (src) não encontrado no metadata');
      return NextResponse.json({ message: 'Identificador do site não encontrado.' }, { status: 200 });
    }

    const { firestore } = initializeFirebase();
    const siteRef = doc(firestore, 'published_sites', subdomainName);
    
    const status = Number(sale_status_enum);

    // STATUS DE LIBERAÇÃO
    // 2 = Aprovada
    // 10 = Completada (30 dias após aprovada)
    if (status === 2 || status === 10) {
      await updateDoc(siteRef, {
        status: 'published',
        publishedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return NextResponse.json({ message: 'Site liberado/mantido com sucesso!' });
    }

    // STATUS DE BLOQUEIO
    // 6 = Cancelado
    // 7 = Devolvido (Reembolsado)
    // 9 = Chargeback
    if ([6, 7, 9].includes(status)) {
      await updateDoc(siteRef, {
        status: 'pending', // Volta para pendente para bloquear o acesso público
        updatedAt: serverTimestamp()
      });
      return NextResponse.json({ message: 'Acesso ao site revogado devido ao status do pagamento.' });
    }

    // Outros status (1 = Boleto Pendente, 12 = Abandono, etc)
    return NextResponse.json({ message: `Evento ${status} recebido. Nenhuma ação necessária.` });

  } catch (error) {
    console.error('Erro no processamento do Webhook:', error);
    return NextResponse.json({ error: 'Erro interno ao processar webhook' }, { status: 500 });
  }
}
