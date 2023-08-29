export default function Recommendations(props: {
  recommendedGifts: string[]
}) : JSX.Element {
  const giftIdeas: string[] = props.recommendedGifts;
  return (
    <div className="flex flex-col items-center justify-center w-full">   
      { giftIdeas.length? <h2 className="mb-3 text-2xl font-semibold">Here are some suggestions:</h2> : <></>
      }
      <dl className="w-full flex flex-col items-center justify-center m-4">
        { giftIdeas.map((gift: string, index: number) : JSX.Element =>
          <div className="p-4 m-2 w-3/5 border rounded-lg flex justify-between" key={gift + index.toString()}>
            <dt>
              {gift}
            </dt>
            <dd>
              url
            </dd>
          </div>
        )}
      </dl>
      {
        giftIdeas.length? <button className="border-b border-gray-300 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-sky-300 dark:text-black lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-sky-300 hover:bg-sky-200">Save</button> : <></>
      } 
    </div>
  )
};