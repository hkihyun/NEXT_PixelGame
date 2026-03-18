import { TagDetailPage } from "@/components/platform-pages";

interface TagDetailRouteProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    sort?: "popular" | "latest" | "rating" | "plays";
  }>;
}

export default async function TagDetailRoute({
  params,
  searchParams,
}: TagDetailRouteProps) {
  const { slug } = await params;
  const { sort } = await searchParams;

  return <TagDetailPage slug={slug} sort={sort} />;
}
