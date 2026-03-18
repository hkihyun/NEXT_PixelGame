import { GameDevlogPage } from "@/components/platform-pages";

interface GameDevlogRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function GameDevlogRoute({ params }: GameDevlogRouteProps) {
  const { slug } = await params;

  return <GameDevlogPage slug={slug} />;
}
