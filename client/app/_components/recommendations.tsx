import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useContext } from 'react';
import basketballSockImage from '../basketball-socks.png';
import ConfirmationModal from './ConfirmationModal';
import { UserContext } from '../(main)/layout';
import type { User } from '../_static/types';

interface InputData {
  receiver: string;
  occasion: string;
  interest: string;
  budget: string;
}

export default function Recommendations(props: {
  inputData: InputData;
  recommendedGifts: string[];
  giftImages: string[];
}): JSX.Element {
  const giftIdeas: string[] = props.recommendedGifts;
  const router = useRouter();
  const [selectedGift, setSelectedGift] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const user: User = useContext(UserContext);

  function handleClick(giftTitle: string): void {
    window.open(`https://www.amazon.com/s?k=${giftTitle.split(' ').join('+')}`);
  }

  function handleSave(): void {
    console.log(selectedGift);
    if (user.user_id && selectedGift) {
      setShowModal(true);
    } else {
      router.push('/log-in');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {giftIdeas[0] ? (
        <h2 className="mb-3 text-2xl font-semibold">
          Here are some suggestions:
        </h2>
      ) : (
        <></>
      )}
      <dl className="w-full flex flex-col items-center justify-center m-4">
        {giftIdeas.map(
          (gift: string, index: number): JSX.Element => (
            <div
              className="p-4 m-2 w-3/5 border rounded-lg flex justify-between items-center justify-center"
              key={gift + index.toString()}
            >
              <input
                type="radio"
                id={`radio${index}`}
                name="giftListItem"
                value={gift}
                onChange={() => setSelectedGift(gift)}
              ></input>
              <dt>
                <Image
                  alt="gift image"
                  src={props.giftImages[index]}
                  width={256}
                  height={256}
                />
                {/* <Image
                  alt="gift image"
                  src={basketballSockImage}
                  width={256}
                  height={256}
                /> */}
              </dt>
              <dd>{gift}</dd>
              <dd>
                <button
                  onClick={() => handleClick(gift)}
                  className="border-b border-gray-300 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-sky-300 dark:text-black lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-sky-300 hover:bg-sky-200"
                >
                  Buy on Amazon
                </button>
              </dd>
            </div>
          )
        )}
      </dl>
      {giftIdeas[0] ? (
        <button
          onClick={handleSave}
          className="border-b border-gray-300 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-sky-300 dark:text-black lg:static lg:w-64 lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-sky-300 hover:bg-sky-200"
        >
          Save Items
        </button>
      ) : (
        <></>
      )}
      {showModal && (
        <ConfirmationModal
          inputData={props.inputData}
          selectedGift={selectedGift}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
