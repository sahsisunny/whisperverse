import Link from 'next/link'
import { LuGithub } from 'react-icons/lu'

function GithubLabel() {
   return (
      <Link
         href="https://github.com/sahsisunny/linktree"
         target="_blank"
         rel="noopener noreferrer"
         className="border-[1px] rounded-full px-4 flex justify-center items-center text-center"
      >
         <span className="text-sm">
            🚀 Code available on <LuGithub className="inline-block" /> GitHub
         </span>
      </Link>
   )
}

export default GithubLabel
