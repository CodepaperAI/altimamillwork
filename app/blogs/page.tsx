import type { Metadata } from "next";
import { BlogLanding } from "@/components/blog-landing";
import { getBlogs } from "@/lib/upliftai";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Altima Millwork articles on commercial renovations, architectural millwork, cabinetry, casework, and bespoke interiors."
};

export default async function BlogsPage() {
  const result = await getBlogs();

  return <BlogLanding result={result} />;
}
