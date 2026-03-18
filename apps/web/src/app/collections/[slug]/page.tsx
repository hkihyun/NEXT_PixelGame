import { CollectionDetailPage } from "@/components/platform-pages";

interface CollectionDetailRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CollectionDetailRoute({
  params,
}: CollectionDetailRouteProps) {
  const { slug } = await params;

  return <CollectionDetailPage slug={slug} />;
}
