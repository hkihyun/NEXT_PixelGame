import { AuthScreen } from "@/components/auth-screen";

interface LoginRouteProps {
  searchParams: Promise<{
    next?: string;
  }>;
}

export default async function LoginRoute({ searchParams }: LoginRouteProps) {
  const { next } = await searchParams;

  return <AuthScreen mode="login" nextPath={next} />;
}
