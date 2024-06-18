import PostPreview from "@/components/PostPreview";
import { type Post } from "@/interfaces/Post";
import { getAllPosts } from "@/lib/post";

export default async function Post() {
  const allPost = getAllPosts()

  return (
    <div className="fixed mt-24">
      <h1 className="text-6xl font-bold text-center mb-4">Posts From us!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {allPost?.map(data => <PostPreview post={data} key={data.slug}/>)}
      </div>
    </div>
  )

}