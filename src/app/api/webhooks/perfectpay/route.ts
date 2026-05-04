
import { NextResponse } from 'next/server';
import { initializeFirebase } from '@/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Endpoint de Webhook para a PerfectPay.
 * Recebe as notificações de venda e libera o site se o pagamento for aprovado.
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('PerfectPay Webhook Received:', data);

    // sale_status_enum: 2 = Aprovada
    const { sale_status_enum, metadata } = data;
    
    // Utilizamos o parâmetro 'src' enviado no checkout como o ID do subdomínio
    const subdomainName = metadata?.src;

    if (!subdomainName) {
      return NextResponse.json({ error: 'Identificador do site (src) não encontrado no metadata' }, { status: 400 });
    }

    if (Number(sale_status_enum) === 2) {
      const { firestore } = initializeFirebase();
      const siteRef = doc(firestore, 'published_sites', subdomainName);
      
      await updateDoc(siteRef, {
        status: 'published',
        publishedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      return NextResponse.json({ message: 'Site liberado com sucesso!' });
    }

    return NextResponse.json({ message: 'Status recebido, mas não requer ação (não aprovado).' });
  } catch (error) {
    console.error('Erro no processamento do Webhook:', error);
    return NextResponse.json({ error: 'Erro interno ao processar webhook' }, { status: 500 });
  }
}
