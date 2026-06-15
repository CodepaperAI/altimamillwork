"use client";

import { CalendarDays, Clock3, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { BlogSummary } from "@/lib/upliftai";
import {
  excerptFromContent,
  formatBlogDate,
  getBlogImage,
  getReadingTime,
  proxiedImageUrl
} from "@/lib/upliftai";

type BlogBrowserProps = {
  blogs: BlogSummary[];
  apiError?: string;
};

function uniqueCategories(blogs: BlogSummary[]) {
  const categories = new Set<string>();

  blogs.forEach((blog) => {
    blog.categories?.forEach((category) => {
      if (category.trim()) {
        categories.add(category.trim());
      }
    });
  });

  return ["All", ...Array.from(categories).sort()];
}

export function BlogBrowser({ blogs, apiError }: BlogBrowserProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = useMemo(() => uniqueCategories(blogs), [blogs]);

  const filteredBlogs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return blogs.filter((blog) => {
      const matchesCategory =
        category === "All" || blog.categories?.includes(category);
      const searchable = [
        blog.title,
        blog.excerpt,
        blog.authorName,
        ...(blog.categories ?? []),
        ...(blog.tags ?? [])
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [blogs, category, query]);

  return (
    <div className="insights-panel" id="latest">
      <div className="filter-bar">
        <label aria-label="Search blog articles">
          <span style={{ position: "absolute", left: "-9999px" }}>Search</span>
          <div style={{ position: "relative" }}>
            <Search
              aria-hidden="true"
              size={18}
              style={{
                color: "#7a736a",
                left: 16,
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)"
              }}
            />
            <input
              className="search-field"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search millwork insights"
              style={{ paddingLeft: 46 }}
              type="search"
              value={query}
            />
          </div>
        </label>
        <div className="category-tabs" aria-label="Filter by category">
          {categories.map((item) => (
            <button
              className="category-tab"
              data-active={item === category}
              key={item}
              onClick={() => setCategory(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {filteredBlogs.length > 0 ? (
        <div className="blog-grid">
          {filteredBlogs.map((blog, index) => (
            <article className="blog-card" key={blog.id || blog.slug}>
              <div className="blog-card-media">
                <img
                  src={proxiedImageUrl(getBlogImage(blog, index))}
                  alt=""
                  loading="lazy"
                  onError={(event) => {
                    const image = event.currentTarget;
                    if (image.src.endsWith("/assets/fallback-1.jpg")) {
                      return;
                    }
                    image.src = "/assets/fallback-1.jpg";
                  }}
                />
                <span className="category-pill">
                  {blog.categories?.[0] || "Millwork"}
                </span>
              </div>
              <div className="blog-card-body">
                <div className="blog-meta">
                  <span>
                    <CalendarDays size={15} aria-hidden="true" />{" "}
                    {formatBlogDate(blog)}
                  </span>
                  <span>
                    <Clock3 size={15} aria-hidden="true" /> {getReadingTime(blog)}
                  </span>
                </div>
                <h3>{blog.title}</h3>
                <p>{excerptFromContent(blog)}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>{blogs.length ? "No matching articles" : "Insights are loading"}</h3>
          <p>
            {apiError
              ? `The blog feed could not be reached: ${apiError}. The page is ready and will populate when the API responds.`
              : "Altima Millwork articles will appear here as soon as they are published through UpliftAI."}
          </p>
        </div>
      )}
    </div>
  );
}
