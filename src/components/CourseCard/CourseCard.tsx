"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { useSignal, initData } from "@telegram-apps/sdk-react";

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        openInvoice: (
          invoice: { slug: string },
          callback: (status: string) => void
        ) => void;
      };
    };
  }
}

type CourseCardProps = {
  isLoading: boolean;
  onStart?: () => void;
};

export function CourseCard({
  isLoading,
  onStart,
}: CourseCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);


  const initDataState = useSignal(initData.state);
  const user = initDataState?.user;
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL!;

  // Функция для отправки статистики
  const updateStatistics = useCallback(async () => {
    if (!user || !user.id) {
      console.error("Нет данных пользователя для обновления статистики.");
      return;
    }
    try {
      const response = await fetch(`${serverUrl}/api/update-user-statictics/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          stage: "courseButtonClicked",
          value: 1,
        }),
      });

      if (!response.ok) {
        console.error("Ошибка обновления статистики: ", await response.text());
      }
    } catch (err) {
      console.error("Ошибка обновления статистики:", err);
    }
  }, [user, serverUrl]);


  const handleButtonClick = async () => {
    if (isLoading) return;
    updateStatistics().catch((err) => console.error("Ошибка статистики:", err)); 
    if (onStart) {
      onStart();
    }
    router.push("gibson-short/payment");
  };

  return (
      <div
      style={{
          width: "100%",
          background: "var(--tg-theme-secondary-bg-color)",
          borderRadius: "1.5rem",
          boxShadow: "0 6px 16px rgba(0,0,0,0.42)",
          cursor: "pointer",
        }}
      >
        <button
          onClick={handleButtonClick}
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "18px 28px",
            background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
            borderRadius: "16px",
            border: "none",
            fontSize: "22px",
            fontWeight: 600,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1px",
            boxShadow: "0 6px 20px rgba(76, 175, 80, 0.3)",
            transition: "all 0.2s ease",
            cursor: "pointer",
            transform: isHovered ? "scale(1.02)" : "none",
          }}
        >
          <span style={{ fontSize: "24px" }}>🚀</span>
          <span>Начать курс</span>
        </button>
      </div>
  );
}
