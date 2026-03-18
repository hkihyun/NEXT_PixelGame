import { GameReviewsPage } from "@/components/platform-pages";

interface GameReviewsRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function GameReviewsRoute({ params }: GameReviewsRouteProps) {
  const { slug } = await params;

  return <GameReviewsPage slug={slug} />;
}
