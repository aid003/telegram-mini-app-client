"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import { useAppSelector } from "@/lib/store/hooks";

type CourseCardProps = {
  isLoading: boolean;
  onStart?: () => void;
};

export function CourseCard({ isLoading, onStart }: CourseCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const userId = useAppSelector((state) => state.user.id);

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL!;

  const updateStatistics = useCallback(async () => {
    if (!userId) {
      console.error("Нет данных пользователя для обновления статистики.");
      return;
    }
    try {
      const response = await fetch(`${serverUrl}/api/update-user-statictics/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          stage: "learnMoreButtonClicked",
          value: 1,
        }),
      });

      if (!response.ok) {
        console.error("Ошибка обновления статистики: ", await response.text());
      }
    } catch (err) {
      console.error("Ошибка обновления статистики:", err);
    }
  }, [userId, serverUrl]);

  const handleButtonClick = async () => {
    if (isLoading) return;
    updateStatistics().catch((err) => console.error("Ошибка статистики:", err));
    if (onStart) {
      onStart();
    }
    router.push("gibson-short/payment");
  };

  useEffect(() => {
    router.prefetch("gibson-short/payment");
  }, [router]);

  const transformStyle = isPressed
    ? "scale(0.98)"
    : isHovered
    ? "scale(1.02)"
    : "scale(1)";

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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
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
          transition: "transform 0.1s ease",
          cursor: "pointer",
          transform: transformStyle,
        }}
      >
        <span style={{ fontSize: "24px" }}>🚀</span>
        <span>Начать курс</span>
      </button>
    </div>
  );
}
