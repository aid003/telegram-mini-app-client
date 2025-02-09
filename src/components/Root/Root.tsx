"use client";

import { type PropsWithChildren, useEffect } from "react";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ErrorPage } from "@/components/ErrorPage";
import { useDidMount } from "@/hooks/useDidMount";
import { useClientOnce } from "@/hooks/useClientOnce";
import { init } from "@/core/init";

import "./styles.css";

function RootInner({ children }: PropsWithChildren) {
  const isDev = process.env.NODE_ENV === "development";

  const lp = useLaunchParams();
  const debug = isDev || lp.startParam === "debug";

  useClientOnce(() => {
    init(debug);
  });

  return (
    <AppRoot appearance="dark" platform="base">
      {children}
    </AppRoot>
  );
}

export function Root(props: PropsWithChildren) {
  const didMount = useDidMount();

  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props} />
    </ErrorBoundary>
  ) : (
    <div className="root__loading">Loading</div>
  );
}
