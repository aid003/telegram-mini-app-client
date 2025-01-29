"use client";

import { useEffect, useState } from "react";
import { Image, List, Placeholder, Button } from "@telegram-apps/telegram-ui";
import { useSignal, initData, type User } from "@telegram-apps/sdk-react";
import { useRouter } from "next/navigation";
import { Page } from "@/components/Page";

export default function Home() {
  const [localUserId, setLocalUserId] = useState<{ id: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const initDataState = useSignal(initData.state);
  const user = initDataState?.user;

  useEffect(() => {
    if (!user || localUserId) return;

    const authorizeUser = async () => {
      try {
        const userResponse = await fetch(`${serverUrl}/api/user-controller/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: user.id,
            username: user.username,
            first_name: user.firstName,
          }),
        });

        if (!userResponse.ok) throw new Error("Failed to authorize user");
        const userData = await userResponse.json();
        setLocalUserId(userData.id);
        console.log("User authorized successfully");
      } catch (error) {
        console.error("Error authorizing user:", error);
      }
    };

    authorizeUser();
  }, [user, serverUrl, localUserId]);

  const clickHandler = async () => {
    if (!user || !localUserId) {
      console.error("User data is missing or localUserId is not set yet");
      return;
    }

    setLoading(true);

    try {
      const statisticsResponse = fetch(
        `${serverUrl}/api/update-user-statictics/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: localUserId,
            stage: "miniAppLinkClicked",
            value: 1,
          }),
        }
      );

      router.push("/tests/gibson-short");

      const response = await statisticsResponse;
      if (!response.ok) {
        throw new Error("Failed to update statistics");
      }
    } catch (error) {
      console.error("Error updating statistics:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page back={false}>
      <List>
        <Placeholder
          action={
            <Button
              size="l"
              stretched
              onClick={clickHandler}
              disabled={loading}
            >
              Пройти тест
            </Button>
          }
          description="Тот самый тест по отношениям"
        >
          <Image
            alt="Telegram sticker"
            style={{ height: "45vh", width: "70vw" }}
            src="https://xelene.me/telegram.gif"
          />
        </Placeholder>
      </List>
    </Page>
  );
}
