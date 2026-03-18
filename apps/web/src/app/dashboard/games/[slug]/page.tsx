import { DashboardGameEditorPage } from "@/components/platform-pages";

interface DashboardGameEditorRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function DashboardGameEditorRoute({
  params,
}: DashboardGameEditorRouteProps) {
  const { slug } = await params;

  return <DashboardGameEditorPage slug={slug} />;
}
