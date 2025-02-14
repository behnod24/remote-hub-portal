
import { Twitter } from 'lucide-react'

interface Tweet {
  id: number
  content: string
  author: string
  timeAgo: string
}

interface TweetListProps {
  tweets: Tweet[]
}

export default function TweetList({ tweets }: TweetListProps) {
  return (
    <div>
      <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold leading-tight text-white">
        Highlight posts
      </h2>
      
      {tweets.map((tweet) => (
        <div
          key={tweet.id}
          className="flex items-center justify-between gap-4 bg-black px-4 py-2 min-h-[72px]"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#292929] shrink-0">
              <Twitter className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-base font-medium text-white line-clamp-1">
                {tweet.content}
              </p>
              <p className="text-sm text-[#ABABAB] line-clamp-2">
                {tweet.author}
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <p className="text-sm text-[#ABABAB]">{tweet.timeAgo}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
