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
      <body className={`${openSans.className} flex min-h-screen flex-col items-center p-24 space-y-40`}>
        <header className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none space-y-40">
            <Link
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="/"
            >
              <Image
                src="/logo.svg"
                alt="giftsAI logo"
                width={100}
                height={24}
                priority
              />
            </Link>
          </div>
          <Link
            className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-sky-300 dark:text-black lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-sky-300 hover:bg-sky-200"
            href="/create-account"
          >
            Create Account
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
