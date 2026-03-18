import { AuthScreen } from "@/components/auth-screen";

interface SignupRouteProps {
  searchParams: Promise<{
    next?: string;
  }>;
}

export default async function SignupRoute({ searchParams }: SignupRouteProps) {
  const { next } = await searchParams;

  return <AuthScreen mode="signup" nextPath={next} />;
}
