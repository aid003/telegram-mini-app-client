"use client";

import { useState, useCallback } from "react";
import { List, Placeholder, Button } from "@telegram-apps/telegram-ui";
import { useSignal, initData } from "@telegram-apps/sdk-react";
import { useRouter } from "next/navigation";
import { Page } from "@/components/Page";
import stickerAnimation from "./_assets/sticker.json";
import dynamic from "next/dynamic";
import { InfinitySpin } from "react-loader-spinner";
import { useUserAuthorization, User } from "@/hooks/useUserAuthorization";

const LottieAnimation = dynamic(() => import("lottie-react"), {
  ssr: true,
  loading: () => (
    <div
      style={{
        height: "45vh",
        width: "70vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <InfinitySpin width="100" color="#4fa94d" />
    </div>
  ),
});

export default function Home() {
  const router = useRouter();
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL!;

  const initDataState = useSignal(initData.state);
  const user: User | null = initDataState?.user || null;

  const {
    id,
    loading: authLoading,
    error: authError,
    isContentLoaded,
  } = useUserAuthorization(user, serverUrl);

  const [navigationLoading, setNavigationLoading] = useState(false);
  const [navigationError, setNavigationError] = useState<string | null>(null);

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
    } catch (error) {
      console.error("Statistics update error:", error);
    }
  }, [id, serverUrl]);

  const handleNavigation = useCallback(async () => {
    try {
      setNavigationLoading(true);
      router.push("/tests/gibson-short");
    } catch (error) {
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
    } catch (error: any) {
      setNavigationError(error.message);
    }
  }, [user, id, updateStatistics, handleNavigation]);

  const isLoading = authLoading || navigationLoading;
  const errorMessage = authError || navigationError;

  if (!isContentLoaded) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <InfinitySpin width="200" color="#4fa94d" />
      </div>
    );
  }

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
    </Page>
  );
}
