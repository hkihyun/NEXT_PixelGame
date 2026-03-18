import { GameDetailPage } from "@/components/platform-pages";

interface GamePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function GamePage({ params }: GamePageProps) {
  const { slug } = await params;

  return <GameDetailPage slug={slug} />;
}
