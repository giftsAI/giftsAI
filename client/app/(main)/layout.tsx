'use client'

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [userData, setUserData] = useState<string>('');

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, []);

  return (
    <main>
      <header className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex pb-24">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none space-y-40">
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
        {userData ? (
          <Link
            className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-sky-300 dark:text-black lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-sky-300 hover:bg-sky-200"
            href="/"
          >
            Log Out
          </Link>
        ) : (
          <div className="flex gap-2">
            <Link
              className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-sky-300 dark:text-white lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-transparent hover:bg-white hover:bg-opacity-10"
              href="/create-account"
            >
              Create Account
            </Link>
            <Link
              className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-sky-300 dark:text-black lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-sky-300 hover:bg-sky-200"
              href="/log-in"
            >
              Log In
            </Link>
          </div>
        )}
      </header>
      {children}
    </main>
  );
}