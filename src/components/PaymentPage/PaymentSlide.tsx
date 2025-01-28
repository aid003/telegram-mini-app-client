import styles from "./PaymentSlide.module.css";

export function PaymentSlide() {
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
        style={{
          width: "100%",
          padding: "18px 28px",
          background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
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
          transition: "all 0.2s ease",
          cursor: "pointer",
        }}
      >
        <span style={{ fontSize: "24px" }}>🚀</span>
        <span>Начать курс</span>
      </button>
    </div>
  );
}
