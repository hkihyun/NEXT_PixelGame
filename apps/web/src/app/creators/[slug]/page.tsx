import { CreatorProfilePage } from "@/components/platform-pages";

interface CreatorProfileRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CreatorProfileRoute({
  params,
}: CreatorProfileRouteProps) {
  const { slug } = await params;

  return <CreatorProfilePage slug={slug} />;
}
