import { JamDetailPage } from "@/components/platform-pages";

interface JamDetailRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function JamDetailRoute({ params }: JamDetailRouteProps) {
  const { slug } = await params;

  return <JamDetailPage slug={slug} />;
}
