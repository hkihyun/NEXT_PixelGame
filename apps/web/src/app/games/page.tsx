import { DiscoveryHubPage } from "@/components/platform-pages";

interface GamesPageProps {
  searchParams: Promise<{
    sort?: "popular" | "latest" | "rating" | "plays";
    tag?: string;
  }>;
}

export default async function GamesPage({ searchParams }: GamesPageProps) {
  const { sort, tag } = await searchParams;

  return <DiscoveryHubPage sort={sort} tag={tag} />;
}
