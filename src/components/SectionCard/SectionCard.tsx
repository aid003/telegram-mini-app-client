"use client";

import { useState } from "react";

export const SectionCard = ({
  title,
  icon,
  content,
  sx = {},
}: {
  title: string;
  icon: string;
  content: React.ReactNode;
  sx?: React.CSSProperties;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        background: "var(--tg-theme-secondary-bg-color)",
        borderRadius: "1rem",
        padding: "1.1rem 1.2rem",
        margin: "1.5rem 0",
        boxShadow: isHovered
          ? "0 6px 16px rgba(0,0,0,0.12)"
          : "0 4px 12px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-3px)" : "none",
        cursor: "pointer",
        ...sx,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3
        style={{
          fontSize: "1.4rem",
          fontWeight: 600,
          margin: "0 0 1rem",
          color: "var(--tg-theme-text-color)",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span
          style={{ color: "var(--tg-theme-button-color)", fontSize: "1.4rem" }}
        >
          {icon}
        </span>
        <div style={{ fontSize: "1.5rem", lineHeight: "28px" }}>{title}</div>
      </h3>
      {content}
    </div>
  );
};
