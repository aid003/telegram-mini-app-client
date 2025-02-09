"use client";

import { useEffect } from "react";

export default function PaymentSuccess() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const telegram = (
        window as unknown as { Telegram?: { WebApp: { close: () => void } } }
      ).Telegram;
      if (telegram && telegram.WebApp) {
        telegram.WebApp.close();
      }
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#17212b",
        minHeight: "100vh",
        padding: "20px",
        color: "#f5f5f5", // Основной цвет текста
        fontFamily: "Helvetica, Arial, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#232e3c",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          padding: "30px",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            margin: "0 0 20px 0",
            fontSize: "24px",
            color: "#6ab2f2",
          }}
        >
          Платеж прошёл успешно!
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: "16px",
            lineHeight: 1.5,
          }}
        >
          Все хорошо, оплата завершена. Сейчас вы вернётесь к боту...
        </p>
      </div>
    </div>
  );
}
