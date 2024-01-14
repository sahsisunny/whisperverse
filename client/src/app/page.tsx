export default function HomePage() {
   return (
      <section className="flex flex-col justify-center items-center text-center lg:p-20 py-28 px-6  gap-6 w-full sm:h-screen">
         <h1>Home</h1>
      </section>
   )
}
export function generateMetadata() {
   return {
      title: `WhisperVerse - All your important links in one place`,
      description: `WhisperVerse is a free tool for optimising your internet presence, whether you’re a blogger, an artist or run a content platform. You get one link to house all the content you’re driving followers to. Share that link anywhere, like your Instagram bio, Facebook posts or Twitch profile. Let your content live longer than the feed.`,
   }
}
