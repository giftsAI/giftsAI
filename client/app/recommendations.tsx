export default function Recommendations(props: {
  recommendedGifts: any[]
}) : JSX.Element {
  const giftIdeas = props.recommendedGifts;
  return (
    <div>   
      {
        giftIdeas? <h2>Here are some suggestions:</h2> &&
        <ul>
        { giftIdeas.map((gift: string, index: number) : JSX.Element =>
          <li key={gift + index.toString()}>{gift}</li>
        )}
        </ul> && 
        <button>Save</button> : <></>
      }
    </div>
  )
};