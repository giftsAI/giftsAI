'use client';

import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../layout';
import type { User, Gift } from '../../_static/types';

function Dashboard(): JSX.Element {
  const [giftList, setGiftList] = useState<Gift[]>([]);
  const [filteredList, setFilteredList] = useState<Gift[]>([]);

  const user: User = useContext(UserContext);
  useEffect((): void => {
    // fetch user's gift list from backend server
    function getGifts(): void {
      console.log('fetching');
      fetch(`http://localhost:3500/user/gifts/${user.user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(async (res) => res.json())
        .then((data) => setGiftList(data))
        .catch((err) => {
          if (err instanceof Error) console.log(err.message);
        });
    }
    if (user.user_id) getGifts();
  }, [user, filteredList]);

  // delete selected gift
  const deleteGift = (
    giftId: number,
    index: number,
    gifterId: number
  ): void => {
    const removedGift = filteredList
      .slice(0, index)
      .concat(filteredList.slice(index + 1));
    setFilteredList(removedGift);
    fetch(`http://localhost:3500/user/deletegift/${giftId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gifterId }),
    }).catch((err) => {
      if (err instanceof Error) console.log(err.message);
    });
  };

  // find gifts in the user's gift list that matches the user's input for receiver's name in the search bar
  const filterGifts = (e: React.FormEvent<HTMLInputElement>): void => {
    const receiver: string = e.currentTarget.value.toUpperCase();
    if (receiver === '') {
      setFilteredList([]);
      return;
    }
    if (receiver === 'ALL') setFilteredList(giftList);
    else
      setFilteredList(
        giftList.filter((gift) =>
          gift.receiver_name.toUpperCase().includes(receiver)
        )
      );
  };

  return (
    <>
      {user.user_id > 0 ? (
        <div className="flex flex-col place-items-center justify-center w-full mb-0">
          <h2 className="mb-3 text-2xl font-semibold">Your Past Gifts:</h2>
          <form className="w-full">
            <input
              placeholder="Search by receiver's name"
              onChange={filterGifts}
              className="border-2 rounded-lg border-gray-300 bg-gradient-to-b from-zinc-200 px-8 py-6 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit w-full transition-colors focus:outline-none focus:border-gray-500"
            />
          </form>
          {filteredList[0] ? (
            <table className="my-12 w-full table-auto">
              <thead className="h-24 text-xl opacity-50">
                <tr>
                  <th className="hidden sm:table-cell">Name</th>
                  <th className="hidden xl:table-cell">Relationship</th>
                  <th className="hidden lg:table-cell">Occasion</th>
                  <th className="hidden md:table-cell">Interest</th>
                  <th className="hidden md:table-cell">Budget</th>
                  <th>Gift</th>
                  <th className="hidden md:table-cell">Date</th>
                </tr>
              </thead>
              <tbody className="h-24">
                {filteredList.map((gift: Gift, index: number) => (
                  <tr
                    key={gift.gift_id}
                    className="h-24 hover:text-sky-300 text-center"
                  >
                    <td className="hidden sm:table-cell">
                      {gift.receiver_name}
                    </td>
                    <td className="hidden xl:table-cell">{gift.receiver}</td>
                    <td className="hidden lg:table-cell">{gift.occasion}</td>
                    <td className="hidden md:table-cell">{gift.interest}</td>
                    <td className="hidden md:table-cell">{gift.budget}</td>
                    <td>{gift.gift}</td>
                    <td className="hidden md:table-cell">
                      {gift.date.replace(/[T](.*)/, '')}
                    </td>
                    <td>
                      <button
                        onClick={async (): Promise<void> =>
                          deleteGift(gift.gift_id, index, gift.gifter_id)
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 hover:text-rose-700"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="flex flex-col place-items-center justify-center lg:max-w-5xl lg:w-full lg:mb-0">
          Please Log In
        </div>
      )}
    </>
  );
}

export default Dashboard;
