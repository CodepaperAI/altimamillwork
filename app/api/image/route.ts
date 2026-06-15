import { NextRequest, NextResponse } from "next/server";

const allowedHosts = new Set(["res.cloudinary.com", "altimamillwork.com"]);

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const source = request.nextUrl.searchParams.get("src");

  if (!source) {
    return new NextResponse("Missing image source", { status: 400 });
  }

  let url: URL;

  try {
    url = new URL(source);
  } catch {
    return new NextResponse("Invalid image source", { status: 400 });
  }

  if (url.protocol !== "https:" || !allowedHosts.has(url.hostname)) {
    return new NextResponse("Image host not allowed", { status: 400 });
  }

  const response = await fetch(url, {
    next: {
      revalidate: 86400
    }
  });

  if (!response.ok) {
    return NextResponse.redirect(new URL("/assets/fallback-1.jpg", request.url));
  }

  const contentType = response.headers.get("content-type") || "image/jpeg";

  return new NextResponse(response.body, {
    headers: {
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "Content-Type": contentType
    }
  });
}
