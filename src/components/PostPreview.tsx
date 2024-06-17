import { Post } from "@/interfaces/Post";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default function PostPreview(
  { post } : { post: Post }
) {
  return (
    <Link className="shadow-lg rounded hover:shadow-xl hover:-translate-y-4 transition-all" href={`/post/${post.slug}`}>
      <Image
        src={post.coverImage}
        alt={post.title}
        width={1300}
        height={600}
      />
      <div className="p-4">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <div className="flex flex-row items-center m-2">
          <Image
            src={post.author.picture}
            alt={post.author.name}
            width={256}
            height={256}
            className="rounded-full w-12 h-12 mr-2"
          />
          <h1 className="text-2xl font-bold ml-2">{post.author.name}</h1>
          <time
            dateTime={post.date}
            className="ml-6 items-center"
          >
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </time>
        </div>
      </div>
    </Link>
  )
}