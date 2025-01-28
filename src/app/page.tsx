"use client";

import { Image, List, Placeholder, Button } from "@telegram-apps/telegram-ui";
import { useTranslations } from "next-intl";

import { Page } from "@/components/Page";
import { useRouter } from "next/navigation";

export default function Home() {
  const t = useTranslations("i18n");
  const router = useRouter();

  const clickHandler = () => {
    router.push("/tests/gibson-short");
  };

  return (
    <Page back={false}>
      <List>
        <Placeholder
          action={
            <Button size="l" stretched onClick={clickHandler}>
              Пройти
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
