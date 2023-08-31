'use client'

import { useEffect, useState } from 'react';

interface Gift {
  gift_id: number;
  gifter_id: number;
  receiver: string;
  receiver_name: string;
  occasion: string;
  date: string;
  interest: string;
  budget: string;
  gift: string;
}

function Dashboard(): JSX.Element {
  const [giftList, setGiftList] = useState<Gift[]>([]);
  const [filteredList, setFilteredList] = useState<Gift[]>([]);
  useEffect(() => {
    // implement fetching gift data from database
    setGiftList([{
      gift_id: 1,
      gifter_id: 2,
      receiver: 'friend',
      receiver_name: 'bailey',
      occasion: 'birthday',
      date: '10-23-2022',
      interest: 'hiking',
      budget: '$50',
      gift: 'hiking shoes',
    },
    {
      gift_id: 2,
      gifter_id: 2,
      receiver: 'friend',
      receiver_name: 'mike',
      occasion: 'birthday',
      date: '11-02-2022',
      interest: 'boardgames',
      budget: '$50',
      gift: 'monopoly',
    }, 
    {
      gift_id: 3,
      gifter_id: 2,
      receiver: 'friend',
      receiver_name: 'Sioban',
      occasion: 'graduation',
      date: '09-06-2020',
      interest: 'reading',
      budget: '$50',
      gift: 'barnes and noble gift card',

    }]);
  }, []);  

  const filterGifts = (e: React.FormEvent<HTMLInputElement>) : void => {
    const receiver: string = e.currentTarget.value;
    if(receiver === '') {
      setFilteredList([]);
      return;
    }
    setFilteredList(giftList.filter((gift) =>
      gift.receiver_name.includes(receiver)
    ));
  };

  const deleteGift = async (giftId: number) : Promise<void> => {
    // delete from database
  };

  return (
    <main className="flex flex-col place-items-center justify-center lg:max-w-5xl lg:w-full lg:mb-0">
      <h2 className="mb-3 text-2xl font-semibold">Past Gifts:</h2>
      <input
        placeholder="Search gifts by receiver's name"
        onChange={filterGifts}
        className="border-2 rounded-lg border-gray-300 bg-gradient-to-b from-zinc-200 px-8 py-6 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit w-full transition-colors focus:outline-none focus:border-gray-500"
      ></input>
      {
        filteredList[0]? 
        <div className="my-12 verflow-hidden w-full">
          <table className="m-0 w-full">
            <thead className="h-24 text-xl opacity-50">
              <tr>
                <th className="w-[12%]">Name</th>
                <th className="w-[12%]">Relationship</th>
                <th className="w-[12%]">Occasion</th>
                <th className="w-[12%]">Interest</th>
                <th className="w-[12%]">Budget</th>
                <th className="w-[12%]">Gift</th>
                <th className="w-[12%]">Date</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredList.map((gift: Gift) => (
                  <tr key={gift.gift_id} className='h-24'>
                    <th>{gift.receiver_name}</th>
                    <th>{gift.receiver}</th>
                    <th>{gift.occasion}</th>
                    <th>{gift.interest}</th>
                    <th>{gift.budget}</th>
                    <th>{gift.gift}</th>
                    <th>{gift.date}</th>
                    <th>
                      <button onClick={async () : Promise<void> => deleteGift(gift.gift_id)}>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" viewBox="0 0 24 24" 
                          strokeWidth={1.5} 
                          stroke="currentColor" 
                          className="w-6 h-6 hover:text-red-600"
                        >
                          <path strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </th>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div> : <></>
      }
    </main>
  );
}

export default Dashboard;
