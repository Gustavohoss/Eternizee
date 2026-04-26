import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Eternize | Presentes Digitais Personalizados',
  description: 'Crie um presente digital com fotos, música e textos personalizados para quem você ama.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full w-full dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-black min-h-full">
        {children}
      </body>
    </html>
  );
}