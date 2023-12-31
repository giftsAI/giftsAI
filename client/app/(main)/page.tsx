'use client';

import { useState } from 'react';

import Recommendations from '../_components/recommendations';
import LoadingSpinner from '../_components/loadingSpinner';

export default function Home(): JSX.Element {
  const [recommendedGifts, setRecommendedGifts] = useState<string[]>([]);
  const [giftsImages, setGiftImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputData, setInputData] = useState({
    receiver: '',
    occasion: '',
    interest: '',
    budget: '',
  });

  // form submission, submitting user's inputs and fetching gift recommendations from the backend server
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setLoading(true);
    // const target = event.currentTarget;
    // const data = {
    //   receiver: target.receiver.value,
    //   occasion: target.occasion.value,
    //   interest: target.interest.value,
    //   budget: target.budget.value,
    // };
    const res: Response = await fetch('http://localhost:3500/gift/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
    });
    const giftsInfo = await res.json();
    const giftsArr: string[] = giftsInfo.recommendations;
    const imagesArr: string[] = giftsInfo.images;
    setRecommendedGifts(giftsArr);
    setGiftImages(imagesArr);
    setLoading(false);
  };
  return (
    <div className="flex min-h-screen flex-col items-center space-y-20">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors">
            <h2 className={`mb-3 text-2xl font-semibold`}>Who</h2>
            <input
              id="receiver"
              placeholder="friend, spouse, etc."
              className="border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 transition-colors focus:outline-none focus:border-gray-500"
              onChange={(e) =>
                setInputData({ ...inputData, receiver: e.target.value })
              }
            ></input>
          </div>

          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors">
            <h2 className={`mb-3 text-2xl font-semibold`}>Occasion</h2>
            <input
              id="occasion"
              placeholder="birthday, holidays, etc."
              className="border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 transition-colors focus:outline-none focus:border-gray-500"
              onChange={(e) =>
                setInputData({ ...inputData, occasion: e.target.value })
              }
            ></input>
          </div>

          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors">
            <h2 className={`mb-3 text-2xl font-semibold`}>Interests</h2>
            <input
              id="interest"
              placeholder="hobbies, activities, etc."
              className="border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30  transition-colors focus:outline-none focus:border-gray-500"
              onChange={(e) =>
                setInputData({ ...inputData, interest: e.target.value })
              }
            ></input>
          </div>

          <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors">
            <h2 className={`mb-3 text-2xl font-semibold`}>Budget</h2>
            <input
              id="budget"
              placeholder="$10, $50, $100, etc."
              className="border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30  transition-colors focus:outline-none focus:border-gray-500"
              onChange={(e) =>
                setInputData({ ...inputData, budget: e.target.value })
              }
            ></input>
          </div>
        </div>
        <button className="mx-auto border-b border-gray-300 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-sky-300 dark:text-black lg:static lg:w-64 lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-sky-300 hover:bg-sky-200">
          Give me ideas
        </button>
      </form>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Recommendations
          inputData={inputData}
          recommendedGifts={recommendedGifts}
          giftImages={giftsImages}
        />
      )}
    </div>
  );
}
