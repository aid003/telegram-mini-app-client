"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { authStart, authSuccess, authFailure } from "@/lib/features/user/slice";
import { useEffect, useCallback, Suspense, useState } from "react";
import { List, Placeholder, Button } from "@telegram-apps/telegram-ui";
import { useSignal, initData } from "@telegram-apps/sdk-react";
import { useRouter } from "next/navigation";
import { Page } from "@/components/Page";
import stickerAnimation from "./_assets/sticker.json";
import dynamic from "next/dynamic";

const GibsonShortTest = dynamic(() => import("./tests/gibson-short/page"), {
  suspense: true,
  ssr: false,
});

const LottieAnimation = dynamic(() => import("lottie-react"), {
  ssr: false,
});

export default function Home() {
  const dispatch = useAppDispatch();
  const {
    id,
    loading: authLoading,
    error: authError,
  } = useAppSelector((state) => state.user);
  const [navigationLoading, setNavigationLoading] = useState(false);
  const [navigationError, setNavigationError] = useState<string | null>(null);

  const router = useRouter();
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL!;
  const initDataState = useSignal(initData.state);
  const user = initDataState?.user;

  const authorizeUser = useCallback(
    async (signal?: AbortSignal) => {
      try {
        if (!user) return;

        dispatch(authStart());
        const response = await fetch(`${serverUrl}/api/user-controller/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: user.id,
            username: user.username,
            first_name: user.firstName,
          }),
          signal,
        });

        if (!response.ok) throw new Error("Failed to authorize user");
        const data = await response.json();
        dispatch(authSuccess(data.id));
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          dispatch(authFailure(err.message));
        }
      }
    },
    [user, serverUrl, dispatch]
  );

  useEffect(() => {
    if (!user || id) return;

    const controller = new AbortController();
    authorizeUser(controller.signal);

    return () => controller.abort();
  }, [user, id, authorizeUser]);

  const updateStatistics = useCallback(async () => {
    try {
      await fetch(`${serverUrl}/api/update-user-statictics/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: id,
          stage: "miniAppLinkClicked",
          value: 1,
        }),
      });
    } catch (err) {
      console.error("Statistics update error:", err);
    }
  }, [id, serverUrl]);

  const handleNavigation = useCallback(async () => {
    try {
      setNavigationLoading(true);
      router.push("/tests/gibson-short");
    } catch (err) {
      setNavigationError("Ошибка перехода. Попробуйте еще раз.");
    } finally {
      setNavigationLoading(false);
    }
  }, [router]);

  const clickHandler = useCallback(async () => {
    if (!user || !id) {
      setNavigationError("Недостаточно данных для запуска теста");
      return;
    }

    try {
      await Promise.all([updateStatistics(), handleNavigation()]);
    } catch (err) {
      if (err instanceof Error) {
        setNavigationError(err.message);
      }
    }
  }, [user, id, updateStatistics, handleNavigation]);

  const isLoading = authLoading || navigationLoading;
  const errorMessage = authError || navigationError;

  return (
    <Page back={false}>
      <List>
        <Placeholder
          action={
            <Button
              size="l"
              stretched
              onClick={clickHandler}
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? "Загрузка..." : "Пройти тест"}
            </Button>
          }
          description={errorMessage || "Тот самый тест по отношениям"}
        >
          <LottieAnimation
            animationData={stickerAnimation}
            style={{
              height: "45vh",
              width: "70vw",
              pointerEvents: "none",
            }}
            role="presentation"
          />
        </Placeholder>
      </List>

      {isLoading && (
        <Suspense fallback={<p aria-live="polite">Загружаю...</p>}>
          <GibsonShortTest />
        </Suspense>
      )}
    </Page>
  );
}
