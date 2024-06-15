import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/post";
import markdownToHtml from "@/lib/markdownToHtml";
import Image from "next/image";
import Markdown from '@/styles/markdown.module.css'
import { format } from "date-fns/format";
import { parseISO } from "date-fns";

export default async function Post({ params }: Params) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main>
      <div className="mb-32 p-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center">
        {post.title}
        </h1>
        <div className="hidden md:block md:mb-12">
          <div className="hidden md:block mb-6">
            <div className="flex flex-row items-center m-2"> 
              <Image
                src={post.author.picture}
                alt={post.author.name}
                width={256}
                height={256}
                className="rounded-full w-12 h-12 mr-2"
              />
              <h1 className="text-2xl font-bold ml-2">{post.author.name}</h1>
            </div>
            </div>
            <div className="mb-8 md:mb-16 sm:mx-0">
              <Image
                src={post.coverImage}
                alt={`Cover Image for ${post.title}`}
                className={"shadow-sm w-full hover:shadow-lg transition-shadow duration-200"}
                width={1300}
                height={630}
              />
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="block md:hidden mb-6">
                <div className="flex flex-row items-center m-2"> 
                  <Image
                    src={post.author.picture}
                    alt={post.author.name}
                    width={256}
                    height={256}
                    className="rounded-full w-12 h-12 mr-2"
                  />
                  <h1 className="text-2xl font-bold ml-2">{post.author.name}</h1>
                </div>
              </div>
              <div className="mb-6 text-lg">
                <time
                  dateTime={post.date}
                  className="ml-6 items-center"
                >
                  {format(parseISO(post.date), "LLLL d, yyyy")}
                </time>
              </div>
            </div>
            <div className="max-w-2xl mx-auto">
              <div
              dangerouslySetInnerHTML={{ __html: content }} 
              className={Markdown["markdown"]}
              >
              </div>
            </div>
          </div>
        </div>
    </main>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | CaL-Blogs`;

  return {
    title,
    description: post.excerpt,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}