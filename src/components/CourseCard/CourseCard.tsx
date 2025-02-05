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

type AttachmentType = "secure" | "anxious" | "avoidant" | "disorganized";

type CourseCardProps = {
  problems: AttachmentType[];
  icon: string;
  isLoading: boolean;
  status?: "locked" | "available" | "completed";
  onStart?: () => void;
};

const getCourseTitle = (problems: AttachmentType[]): string => {
  const problemTranslations: Record<AttachmentType, string> = {
    secure: "надёжности",
    anxious: "тревоги",
    avoidant: "дистанцирования",
    disorganized: "эмоциональных бурь",
  };

  const mainProblem = problems[0];
  const secondaryProblems = problems.slice(1);

  const baseTitles: Record<AttachmentType, string> = {
    secure: "Укрепление ",
    anxious: "Преодоление ",
    avoidant: "Работа с ",
    disorganized: "Управление ",
  };

  return problems.length === 1
    ? `${baseTitles[mainProblem]}${problemTranslations[mainProblem]}`
    : `${baseTitles[mainProblem]}${
        problemTranslations[mainProblem]
      } и ${secondaryProblems.map((p) => problemTranslations[p]).join(", ")}`;
};

const getCourseDescription = (problems: AttachmentType[]): string => {
  const descriptions: Record<string, string> = {
    anxious: "5 практик для снижения эмоционального напряжения",
    avoidant: "7 шагов к пониманию своего партнера",
    disorganized: "3 шага к получению эмоционального равновесия",
    "anxious-avoidant": "Преодоление цикла «погоня-отступление»",
    "disorganized-anxious": "Снижение интенсивности эмоциональных реакций",
    "avoidant-disorganized": "Работа с противоречивыми паттернами поведения",
    default: "Персонализированная программа развития отношений",
  };

  return descriptions[problems.join("-")] || descriptions.default;
};

export function CourseCard({
  problems,
  icon,
  isLoading,
  status = "available",
  onStart,
}: CourseCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  // Получаем данные пользователя из initData
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

  // Обработчик нажатия на кнопку
  const handleButtonClick = async () => {
    if (isLoading) return;
    updateStatistics().catch((err) => console.error("Ошибка статистики:", err)); // Отправка статистики в фоне
    if (onStart) {
      onStart();
    }
    router.push("gibson-short/payment");
  };

  return (
    <div
      style={{
        background: "var(--tg-theme-secondary-bg-color)",
        borderRadius: "28px",
        padding: "24px",
        margin: "16px 0",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
        cursor: "pointer",
        opacity: 1,
        fontFamily:
          "'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "18px",
            background: "var(--tg-theme-button-color)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 6px 16px rgba(0, 0, 0, 0.12)",
          }}
        >
          <span
            style={{
              fontSize: "32px",
              color: "#fff",
              transition: "transform 0.2s ease",
              transform: "none",
            }}
          >
            {icon}
          </span>
        </div>

        <div style={{ flex: 1 }}>
          <h3
            style={{
              margin: "0 0 8px",
              fontSize: "20px",
              fontWeight: 700,
              color: "var(--tg-theme-text-color)",
              lineHeight: 1.3,
              letterSpacing: "-0.4px",
            }}
          >
            {getCourseTitle(problems)}
          </h3>
          <p
            style={{
              margin: 0,
              fontSize: "15px",
              lineHeight: 1.5,
              color: "var(--tg-theme-hint-color)",
              opacity: 0.9,
            }}
          >
            {getCourseDescription(problems)}
          </p>
        </div>
      </div>
      <button
        onClick={handleButtonClick}
        disabled={isLoading}
        style={{
          width: "100%",
          padding: "18px 28px",
          background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
          borderRadius: "16px",
          border: "none",
          fontSize: "17px",
          fontWeight: 600,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "14px",
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
