"use client";
import { Page } from "@/components/Page";
import { SectionCard } from "@/components/SectionCard/SectionCard";
import { List } from "@telegram-apps/telegram-ui";
import { useEffect, useRef } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play();
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <Page back={false}>
      <List>
        {/* 1. Новый заголовок курса */}
        <SectionCard
          title="🧑🏫 Курс отношений"
          icon="❤️"
          content={
            <div style={styles.heroContainer}>
              <div style={styles.heroContent}>
                <h1 style={styles.courseTitle}>
                  Искусство гармоничных отношений
                </h1>
                <p style={styles.courseDescription}>
                  Практический курс о построении глубоких и осознанных связей.
                  Учитесь выстраивать доверие, преодолевать кризисы и сохранять
                  любовь в долгосрочной перспективе.
                </p>
              </div>
            </div>
          }
        />

        {/* 2. Мудрость дня */}
        <SectionCard
          title="💬 Мудрость дня"
          icon="🌟"
          content={
            <div style={styles.quoteCard}>
              <div style={styles.quoteMark}>“</div>
              <p style={styles.quoteText}>
                Самые сильные отношения возникают между двумя независимыми
                людьми, которые решили идти вместе, потому что хотят, а не
                потому что нуждаются.
              </p>
              <div style={styles.quoteAuthor}>— Эрих Фромм</div>
            </div>
          }
        />

        {/* 3. Видео блок */}
        <div style={styles.videoContainer}>
          <video
            ref={videoRef}
            src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
            controls
            muted
            playsInline
            style={styles.videoPlayer}
          />
        </div>

        {/* 4. Основы здоровых отношений */}
        <SectionCard
          title="📚 Основы здоровых отношений"
          icon="❤️"
          content={
            <div style={styles.textSlide}>
              <h3 style={styles.subTitle}>Ключевые принципы:</h3>
              <ul style={styles.list}>
                <li style={styles.listItem}>
                  Эмоциональная доступность и отзывчивость
                </li>
                <li style={styles.listItem}>Уважение личных границ</li>
                <li style={styles.listItem}>
                  Конструктивное разрешение конфликтов
                </li>
                <li style={styles.listItem}>Совместное развитие и рост</li>
              </ul>

              <h3 style={styles.subTitle}>Практические советы:</h3>
              <p style={styles.paragraph}>
                Регулярно выделяйте время для «чек-апов» отношений - открытых
                разговоров о потребностях и ожиданиях. Практикуйте активное
                слушание: повторяйте услышанное своими словами, чтобы убедиться
                в правильном понимании.
              </p>
            </div>
          }
        />

        {/* 5. Психология привязанности */}
        <SectionCard
          title="🧠 Психология привязанности"
          icon="📖"
          content={
            <div style={styles.textSlide}>
              <h3 style={styles.subTitle}>Типы привязанности:</h3>
              <div style={styles.attachmentTypes}>
                <div style={styles.attachmentCard}>
                  <h4 style={styles.attachmentTitle}>Надежный</h4>
                  <p style={styles.attachmentText}>
                    Комфорт в близости, доверие, устойчивая самооценка
                  </p>
                </div>
                <div style={styles.attachmentCard}>
                  <h4 style={styles.attachmentTitle}>Тревожный</h4>
                  <p style={styles.attachmentText}>
                    Страх отвержения, потребность в постоянном подтверждении
                  </p>
                </div>
              </div>

              <h3 style={styles.subTitle}>
                Как развивать надежную привязанность:
              </h3>
              <p style={styles.paragraph}>
                Практикуйте эмоциональную открытость, учитесь выражать
                потребности прямо, работайте над самооценкой. Регулярно
                анализируйте паттерны поведения в отношениях.
              </p>
            </div>
          }
        />
      </List>

      {/* Глобальные стили */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;700&display=swap");

        * {
          font-family: "Figtree", -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
            sans-serif;
          line-height: 1.6;
          letter-spacing: -0.01em;
        }

        h1,
        h2,
        h3,
        h4 {
          font-weight: 700;
          margin: 0;
        }

        p {
          color: var(--tg-theme-text-color);
          hyphens: auto;
        }

        @media (max-width: 480px) {
          h3 {
            font-size: 1.1rem !important;
          }

          p,
          li {
            font-size: 0.92rem !important;
            line-height: 1.7 !important;
          }
        }
      `}</style>
    </Page>
  );
}

// Стили компонентов
const styles = {
  // Новые стили для заголовка курса
  heroContainer: {
    padding: "24px 0",
    position: "relative",
  },
  heroContent: {
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
  },
  courseTitle: {
    fontSize: "28px",
    fontWeight: 700,
    lineHeight: 1.2,
    margin: "0 0 16px 0",
    color: "var(--tg-theme-text-color)",
    letterSpacing: "-0.03em",
  },
  courseDescription: {
    fontSize: "16px",
    lineHeight: 1.6,
    color: "var(--tg-theme-hint-color)",
    margin: 0,
    padding: "0 20px",
    fontWeight: 400,
  },

  // Существующие стили
  quoteCard: {
    padding: "1.5rem",
    background: "var(--tg-theme-bg-color)",
    borderRadius: "0.8rem",
    position: "relative",
    textAlign: "center",
  },
  quoteMark: {
    fontSize: "3rem",
    color: "var(--tg-theme-button-color)",
    opacity: 0.1,
    position: "absolute",
    top: "-0.5rem",
    left: "0.5rem",
  },
  quoteText: {
    fontSize: "1rem",
    lineHeight: 1.7,
    fontStyle: "italic",
    margin: "1rem 0",
    color: "var(--tg-theme-text-color)",
  },
  quoteAuthor: {
    fontWeight: 500,
    color: "var(--tg-theme-hint-color)",
    fontSize: "0.95rem",
  },
  videoContainer: {
    borderRadius: "0.8rem",
    overflow: "hidden",
    margin: "1rem 0",
    aspectRatio: "16/9",
    background: "#000",
  },
  videoPlayer: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  textSlide: {
    padding: "0.5rem 0",
  },
  subTitle: {
    fontSize: "1rem",
    fontWeight: 600,
    margin: "1.2rem 0 0.8rem",
    color: "var(--tg-theme-text-color)",
  },
  list: {
    paddingLeft: "1.2rem",
    margin: "0.8rem 0",
  },
  listItem: {
    margin: "0.6rem 0",
    paddingLeft: "0.5rem",
    position: "relative",
    "&::before": {
      content: '"•"',
      color: "var(--tg-theme-button-color)",
      position: "absolute",
      left: "-0.8rem",
      fontSize: "1.2rem",
    },
  },
  paragraph: {
    fontSize: "0.95rem",
    lineHeight: 1.7,
    margin: "1rem 0",
    color: "var(--tg-theme-text-color)",
  },
  attachmentTypes: {
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    margin: "1rem 0",
  },
  attachmentCard: {
    background: "var(--tg-theme-bg-color)",
    borderRadius: "0.8rem",
    padding: "1rem",
    textAlign: "center",
  },
  attachmentTitle: {
    fontSize: "1rem",
    fontWeight: 600,
    marginBottom: "0.3rem",
    color: "var(--tg-theme-text-color)",
  },
  attachmentText: {
    fontSize: "0.9rem",
    lineHeight: 1.6,
    color: "var(--tg-theme-hint-color)",
  },
} as const;
