import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'giftsAI',
  description: 'Recommend the perfect gift',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={`${openSans.className} flex flex-col items-center p-24`}>
        {children}
      </body>
    </html>
  );
}