import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/store/hooks";
import styles from "./PaymentSlide.module.css";

export function PaymentSlide() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentLink, setPaymentLink] = useState<string | null>(null);
  const userId = useAppSelector((state) => state.user.id);

  const amount = process.env.NEXT_PUBLIC_AMOUNT!;
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL!;

  const generatePaymentLink = async () => {
    if (!userId) {
      setError("Пользователь не авторизован");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${serverUrl}/api/generate-payment-process/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: Number(userId),
            amount: Number(amount),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ошибка генерации оплаты");
      }

      const { paymentLink } = await response.json();
      setPaymentLink(paymentLink);

      if (paymentLink) {
        window.location.href = paymentLink;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  const buttonHandler = () => {
    if (!paymentLink) {
      generatePaymentLink();
    } else {
      window.location.href = paymentLink;
    }
  };

  return (
    <div
      style={{
        background: "var(--tg-theme-secondary-bg-color)",
        borderRadius: "1.5rem",
        padding: "1.2rem",
        margin: "1.5rem 0",
        boxShadow: "0 6px 16px rgba(0,0,0,0.42)",
        cursor: "pointer",
      }}
    >
      <button
        onClick={buttonHandler}
        disabled={isLoading}
        style={{
          width: "100%",
          padding: "18px 28px",
          background: isLoading
            ? "grey"
            : "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
          borderRadius: "16px",
          border: "none",
          fontSize: "20px",
          fontWeight: 600,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "14px",
          boxShadow: "0 6px 20px rgba(76, 175, 80, 0.3)",
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
      >
        {isLoading ? (
          "Генерация ссылки..."
        ) : (
          <>
            <span>🚀 Купить курс</span>
            {paymentLink && " (Перейти к оплате)"}
          </>
        )}
      </button>

      {error && (
        <div style={{ color: "red", marginTop: "10px" }}>Ошибка: {error}</div>
      )}
    </div>
  );
}
