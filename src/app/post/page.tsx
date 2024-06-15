import { type Post } from "@/interfaces/Post";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/post";
import { parseISO, format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default async function Post() {
  const allPost = getAllPosts()

  return (
    <div>
      <h1 className="text-4xl font-bold text-center">Posts From us!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {allPost?.map(data => <PostPreview post={data} key={data.slug}/>)}
      </div>
    </div>
  )

}

export const PostPreview = (
  { post } : { post: Post }
) => {
  return (
    <Link className="shadow-lg border-4 rounded" href={`/post/${post.slug}`}>
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