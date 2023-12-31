'use client';

import Image from 'next/image';
import { useEffect } from 'react';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  // whenever user lands on this page, automatically log off session
  useEffect(() => {
    localStorage.removeItem('userData');
    fetch(`http://localhost:3500/user/logout`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((err) => {
      if (err instanceof Error) console.log(err.message);
    });
  }, []);

  return (
    <main className=" max-w-5xl w-full min-h-screen">
      <header className="z-10 font-mono text-sm pb-24">
        <div className="fixed bottom-0 left-0 h-48 w-full bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
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
          </a>
        </div>
      </header>
      {children}
    </main>
  );
}
