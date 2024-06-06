import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";


export default function Index() {
  const allPosts = getAllPosts();

  const heroPost = allPosts[0];

  const morePosts = allPosts.slice(1);

  return (
    <main>
      <Container>
        <div className="background flex">
          <Intro />
        </div>      
        <section className="mx-auto p-32 mt-5 h-dvh">
          <div className="max-w-screen-2xl">
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          </div>
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </section>
      </Container>
    </main>
  );
}
