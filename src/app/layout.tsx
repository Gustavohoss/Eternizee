import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Void Canvas',
  description: 'An absolute black canvas for pure focus.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full bg-black">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full w-full m-0 p-0 bg-black">
        {children}
      </body>
    </html>
  );
}
