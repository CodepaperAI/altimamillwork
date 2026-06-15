import { BlogLanding } from "@/components/blog-landing";
import { getBlogs } from "@/lib/upliftai";

export const dynamic = "force-dynamic";

export default async function Home() {
  const result = await getBlogs();

  return <BlogLanding result={result} />;
}
