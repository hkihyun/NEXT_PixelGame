import { SearchResultsPage } from "@/components/platform-pages";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    sort?: "popular" | "latest" | "rating" | "plays";
    tag?: string;
    creator?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, sort, tag, creator } = await searchParams;

  return <SearchResultsPage creator={creator} query={q} sort={sort} tag={tag} />;
}
