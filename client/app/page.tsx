'use client'

import Image from 'next/image';
import { useState } from 'react';
import Recommendations from './recommendations';

export default function Home(): JSX.Element {
  const [recommendedGifts, setRecommendedGifts] = useState<any[]>([]);
  const handleClick = async () : Promise<void> => {
      const res: Response = await fetch('http://localhost:3500/gift/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        body: JSON.stringify({
          'receiver': 'wife',
          'occasion': 'birthday',
          'like': 'cooking',
          'budget': '<$200'
        })
      }
      });
      const giftsArr = await res.json();
      setRecommendedGifts(giftsArr);

  }
  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-40">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href=""
            target="_blank"
            rel="noopener noreferrer"
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
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Log In
        </p>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href=""
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>Who </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Tips for recipient
          </p>
        </a>

        <a
          href=""
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>Occasion </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Tips for occasion
          </p>
        </a>

        <a
          href=""
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>Interests </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Tips for interests
          </p>
        </a>

        <a
          href=""
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Budget{' '}
            {/* <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span> */}
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Tips for budget
          </p>
        </a>
      </div>
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
      <Recommendations recommendedGifts={recommendedGifts}/>
    </main>
  );
}
