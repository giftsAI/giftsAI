'use client';

import Image from 'next/image';
import { useState } from 'react';

import Link from 'next/link';
import Recommendations from './components/recommendations';
import LoadingSpinner from './components/loadingSpinner';

export default function Home(): JSX.Element {
  const [recommendedGifts, setRecommendedGifts] = useState<string[]>([]);
  const [giftsImages, setGiftImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // form submission, submitting user's inputs and fetching gift recommendations from the server
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setLoading(true);
    const target = event.currentTarget;
    const data = {
      receiver: target.receiver.value,
      occasion: target.occasion.value,
      interest: target.interest.value,
      budget: target.budget.value,
    };
    const res: Response = await fetch('http://localhost:3500/gift/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const giftsInfo = await res.json();
    const giftsArr: string[] = giftsInfo.recommendations;
    const imagesArr: string[] = giftsInfo.images;
    setRecommendedGifts(giftsArr);
    setGiftImages(imagesArr);
    setLoading(false);
  };
  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-40">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none space-y-40">
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
        <Link
          className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-sky-300 dark:text-black lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-sky-300 hover:bg-sky-200"
          href="/create-account"
        >
          Create Account
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"
      >
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors">
          <h2 className={`mb-3 text-2xl font-semibold`}>Who</h2>
          <input
            id="receiver"
            placeholder="friend, spouse, etc."
            className="border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 transition-colors focus:outline-none focus:border-gray-500"
          ></input>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors">
          <h2 className={`mb-3 text-2xl font-semibold`}>Occasion</h2>
          <input
            id="occasion"
            placeholder="birthday, holidays, etc."
            className="border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 transition-colors focus:outline-none focus:border-gray-500"
          ></input>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors">
          <h2 className={`mb-3 text-2xl font-semibold`}>Interests</h2>
          <input
            id="interest"
            placeholder="hobbies, activities, etc."
            className="border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30  transition-colors focus:outline-none focus:border-gray-500"
          ></input>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors">
          <h2 className={`mb-3 text-2xl font-semibold`}>Budget</h2>
          <input
            id="budget"
            placeholder="$10, $50, $100, etc."
            className="border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30  transition-colors focus:outline-none focus:border-gray-500"
          ></input>
        </div>
        <button className="border-b border-gray-300 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-sky-300 dark:text-black lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-sky-300 hover:bg-sky-200">
          Give me ideas
        </button>
      </form>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Recommendations
          recommendedGifts={recommendedGifts}
          giftImages={giftsImages}
        />
      )}
    </main>
  );
}
