import { ReportPage } from "@/components/platform-pages";

interface ReportRouteProps {
  searchParams: Promise<{
    game?: string;
  }>;
}

export default async function ReportRoute({ searchParams }: ReportRouteProps) {
  const { game } = await searchParams;

  return <ReportPage game={game} />;
}
