export type BlogFreshness = {
  lastUpdatedAt?: string;
  ageDays?: number;
  needsRefresh?: boolean;
  freshnessThresholdDays?: number;
};

export type BlogMeta = {
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogUrl?: string;
  ogSiteName?: string;
  ogLocale?: string;
  articleAuthor?: string;
  articleSection?: string;
  articleTags?: string[];
};

export type BlogSummary = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  status?: string;
  publishDate?: string;
  publishTime?: string;
  featuredImage?: string;
  categories?: string[];
  tags?: string[];
  seoScore?: number;
  createdAt?: string;
  updatedAt?: string;
  authorName?: string;
  authorUrl?: string;
  freshness?: BlogFreshness;
  meta?: BlogMeta;
  customFields?: Record<string, unknown>;
};

export type BlogListResult = {
  blogs: BlogSummary[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error?: string;
};

const API_BASE = "https://api.upliftai.co/api/public/v1";
const TOKEN = process.env.UPLIFTAI_BLOG_TOKEN;

const fallbackImages = [
  "/assets/fallback-1.jpg",
  "/assets/slider1.jpg",
  "/assets/glry_img3.webp"
];

function toBlogCardSummary(blog: BlogSummary): BlogSummary {
  return {
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    excerpt: excerptFromContent(blog),
    publishDate: blog.publishDate,
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
    featuredImage: blog.featuredImage,
    categories: blog.categories,
    tags: blog.tags,
    authorName: blog.authorName,
    customFields:
      typeof blog.customFields?.readingTime === "string"
        ? { readingTime: blog.customFields.readingTime }
        : undefined
  };
}

export function getBlogImage(blog: BlogSummary, index = 0) {
  return blog.featuredImage || fallbackImages[index % fallbackImages.length];
}

export function proxiedImageUrl(src?: string) {
  if (!src) {
    return "/assets/fallback-1.jpg";
  }

  if (src.startsWith("/")) {
    return src;
  }

  return `/api/image?src=${encodeURIComponent(src)}`;
}

export function formatBlogDate(blog: BlogSummary) {
  const dateValue = blog.publishDate || blog.createdAt || blog.updatedAt;

  if (!dateValue) {
    return "Altima Insight";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

export function getReadingTime(blog: BlogSummary) {
  const customReadingTime = blog.customFields?.readingTime;

  if (typeof customReadingTime === "string" && customReadingTime.trim()) {
    return customReadingTime;
  }

  const source = `${blog.excerpt ?? ""} ${blog.content ?? ""}`.trim();
  const words = source ? source.replace(/<[^>]+>/g, " ").split(/\s+/).length : 500;
  const minutes = Math.max(2, Math.ceil(words / 220));

  return `${minutes} min read`;
}

export async function getBlogs({
  page = 1,
  limit = 100,
  status = "PUBLISH"
}: {
  page?: number;
  limit?: number;
  status?: "PUBLISH" | "DRAFT" | "ALL";
} = {}): Promise<BlogListResult> {
  if (!TOKEN) {
    return {
      blogs: [],
      error: "Missing UPLIFTAI_BLOG_TOKEN"
    };
  }

  const url = new URL(`${API_BASE}/blogs`);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("status", status);

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
      next: {
        revalidate: 900
      }
    });

    if (!response.ok) {
      return {
        blogs: [],
        error: `Blog API returned ${response.status}`
      };
    }

    const payload = (await response.json()) as {
      success?: boolean;
      data?: BlogListResult;
      error?: string;
    };

    if (!payload.success || !payload.data) {
      return {
        blogs: [],
        error: payload.error || "Blog API response was not successful"
      };
    }

    return {
      blogs: (payload.data.blogs ?? []).map(toBlogCardSummary),
      pagination: payload.data.pagination
    };
  } catch (error) {
    return {
      blogs: [],
      error: error instanceof Error ? error.message : "Unable to load blogs"
    };
  }
}

export function excerptFromContent(blog: BlogSummary) {
  if (blog.excerpt?.trim()) {
    return blog.excerpt.trim();
  }

  if (!blog.content) {
    return "Explore Altima Millwork guidance for better commercial interiors, bespoke cabinetry, and turnkey renovation decisions.";
  }

  const text = blog.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  return text.length > 155 ? `${text.slice(0, 152)}...` : text;
}
