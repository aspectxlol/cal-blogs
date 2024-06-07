import { getAllPosts } from "@/lib/api";
import { PostPreview } from "../_components/blog-things/post-preview";

export default async function posts() {
  const allPosts = getAllPosts()

  return (
    <div className="p-5">
      <h1 className="text-center text-5xl font-bold my-5">All Posts from us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {allPosts.map((post) =>
        <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
        />
      )}
      </div>
    </div>
  )
}