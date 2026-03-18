import { GameDetailPage } from "@/components/platform-pages";

interface PlayPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PlayPage({ params }: PlayPageProps) {
  const { slug } = await params;

  return <GameDetailPage slug={slug} />;
}
