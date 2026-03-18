"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  defaultDemoSession,
  defaultFollowingSlugs,
  demoAuthCookieName,
  demoFollowingStorageKey,
  demoSessionMaxAge,
  demoSessionStorageKey,
  type DemoSession,
} from "@/lib/demo-auth";

interface DemoAuthContextValue {
  isAuthenticated: boolean;
  isReady: boolean;
  session: DemoSession | null;
  followingSlugs: string[];
  login: (overrides?: Partial<DemoSession>) => DemoSession;
  logout: () => void;
  toggleFollow: (creatorSlug: string) => void;
  isFollowing: (creatorSlug: string) => boolean;
}

const DemoAuthContext = createContext<DemoAuthContextValue | null>(null);

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState({
    session: null as DemoSession | null,
    followingSlugs: defaultFollowingSlugs,
    isReady: false,
  });

  useEffect(() => {
    const hasCookie = document.cookie.includes(`${demoAuthCookieName}=active`);
    const storedSession = readStorage<DemoSession>(demoSessionStorageKey);
    const storedFollowing = readStorage<string[]>(demoFollowingStorageKey);

    queueMicrotask(() => {
      setAuthState({
        session: hasCookie ? storedSession ?? defaultDemoSession : null,
        followingSlugs: Array.isArray(storedFollowing) ? storedFollowing : defaultFollowingSlugs,
        isReady: true,
      });
    });
  }, []);

  function login(overrides?: Partial<DemoSession>) {
    const nextSession = {
      ...defaultDemoSession,
      ...overrides,
    };

    document.cookie = `${demoAuthCookieName}=active; Max-Age=${demoSessionMaxAge}; Path=/; SameSite=Lax`;
    localStorage.setItem(demoSessionStorageKey, JSON.stringify(nextSession));
    setAuthState((current) => ({
      ...current,
      session: nextSession,
      isReady: true,
    }));

    return nextSession;
  }

  function logout() {
    document.cookie = `${demoAuthCookieName}=; Max-Age=0; Path=/; SameSite=Lax`;
    localStorage.removeItem(demoSessionStorageKey);
    setAuthState((current) => ({
      ...current,
      session: null,
      isReady: true,
    }));
  }

  function toggleFollow(creatorSlug: string) {
    setAuthState((current) => {
      const nextFollowing = current.followingSlugs.includes(creatorSlug)
        ? current.followingSlugs.filter((slug) => slug !== creatorSlug)
        : [...current.followingSlugs, creatorSlug];

      localStorage.setItem(demoFollowingStorageKey, JSON.stringify(nextFollowing));
      return {
        ...current,
        followingSlugs: nextFollowing,
      };
    });
  }

  function isFollowing(creatorSlug: string) {
    return authState.followingSlugs.includes(creatorSlug);
  }

  const value: DemoAuthContextValue = {
    isAuthenticated: Boolean(authState.session),
    isReady: authState.isReady,
    session: authState.session,
    followingSlugs: authState.followingSlugs,
    login,
    logout,
    toggleFollow,
    isFollowing,
  };

  return <DemoAuthContext.Provider value={value}>{children}</DemoAuthContext.Provider>;
}

export function useDemoAuth() {
  const context = useContext(DemoAuthContext);

  if (!context) {
    throw new Error("useDemoAuth must be used within DemoAuthProvider");
  }

  return context;
}

function readStorage<T>(key: string) {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch {
    return null;
  }
}
