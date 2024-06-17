import { postsDirectory } from "@/constants";
import { Post } from "@/interfaces/Post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string): Post | undefined {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return { ...data, slug: realSlug, content } as Post;
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.error(`Post not found: ${fullPath}`);
      return undefined; // Indicate post not found
    } else {
      throw error; // Re-throw other errors
    }
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== undefined) // Filter out undefined values
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
 