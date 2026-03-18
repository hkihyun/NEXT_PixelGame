import { LegalDocumentPage } from "@/components/platform-pages";

interface LegalDocumentRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function LegalDocumentRoute({
  params,
}: LegalDocumentRouteProps) {
  const { slug } = await params;

  return <LegalDocumentPage slug={slug} />;
}
