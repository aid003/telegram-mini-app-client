import { useState } from "react";
import { useAppSelector } from "@/lib/store/hooks";
import styles from "./PaymentSlide.module.css";

export function PaymentSlide() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPrice, setShowPrice] = useState(false);

  const userId = useAppSelector((state) => state.user.id);
  const amount = process.env.NEXT_PUBLIC_AMOUNT!;
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL!;

  // Функция для отправки статистики
  const sendStatistics = async (stage: string, value: number) => {
    if (!userId) return;
    try {
      const response = await fetch(`${serverUrl}/api/update-user-statictics/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          stage,
          value,
        }),
      });
      if (!response.ok) {
        console.error("Ошибка обновления статистики: ", await response.text());
      }
    } catch (err) {
      console.error("Ошибка обновления статистики:", err);
    }
  };

  const generatePaymentLink = async (): Promise<string | null> => {
    if (!userId) {
      setError("Пользователь не авторизован");
      return null;
    }
    try {
      const response = await fetch(
        `${serverUrl}/api/generate-payment-process/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
      return paymentLink;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      return null;
    }
  };

  const buttonHandler = async () => {
    sendStatistics("courseButtonClicked", 1);
    setShowPrice(true);
    setIsLoading(true);

    const paymentLinkPromise = generatePaymentLink();
    const animationDelay = new Promise<void>((resolve) =>
      setTimeout(resolve, 4000)
    );
    const [paymentLink] = await Promise.all([
      paymentLinkPromise,
      animationDelay,
    ]);

    setShowPrice(false);
    setIsLoading(false);

    if (paymentLink) {
      window.location.href = paymentLink;
    }
  };

  return (
    <div className={styles.container}>
      {showPrice && <div className={styles.priceAnimation}>{amount} ₽</div>}

      <button
        onClick={buttonHandler}
        disabled={isLoading}
        className={styles.buyButton}
      >
        {isLoading ? "Генерация ссылки..." : <span>🚀 Купить курс</span>}
      </button>

      {error && <div className={styles.error}>Ошибка: {error}</div>}
    </div>
  );
}
