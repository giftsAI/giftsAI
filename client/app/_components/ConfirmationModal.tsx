import { useState } from 'react';

interface InputData {
  receiver: string;
  occasion: string;
  interest: string;
  budget: string;
}

function ConfirmationModal({
  selectedGift,
  onClose,
  inputData,
}: {
  selectedGift: string | null;
  onClose: () => void;
  inputData: InputData;
}): JSX.Element {
  const [date, setDate] = useState<string>('');

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 pb-20 text-center sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="inline-block align-bottom bg-gray-900 rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
          <div className="w-full md:px-12 lg:px-24">
            <div className="grid grid-cols-1">
              <div className="mt-4 mr-auto mb-4 ml-auto bg-gray-900 max-w-lg">
                <div className="flex flex-col items-center pt-6 pr-6 pb-6 pl-6">
                  <p className="mt-8 text-2xl font-semibold leading-none text-white tracking-tighter lg:text-3xl">
                    Confirmation
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-center text-gray-200">
                    <span>Gift: {selectedGift}</span>
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-center text-gray-200">
                    <span>{inputData.receiver}</span>
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-center text-gray-200">
                    <span>{inputData.occasion}</span>
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-center text-gray-200">
                    <span>{inputData.interest}</span>
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-center text-gray-200">
                    <span>{inputData.budget}</span>
                  </p>
                  <p className="mb-3 text-l font-semibold">Occasion Date</p>
                  <input
                    type="date"
                    placeholder="Select date"
                    className="border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-80  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 transition-colors focus:outline-none focus:border-gray-500"
                    value={date}
                  />
                  <div className="w-full mt-6 flex flex-col gap-4">
                    <button className="mx-auto border-b border-gray-300 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-sky-300 dark:text-black lg:static lg:w-64 lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-sky-300 hover:bg-sky-200">
                      Save
                    </button>
                    <button
                      className="mx-auto border-b border-gray-300 pb-6 pt-8 backdrop-blur-2xl backdrop-blur-2xl dark:border-gray-500 dark:bg-sky-300 dark:text-white lg:static lg:w-64 lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-transparent hover:bg-white hover:bg-opacity-10"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
