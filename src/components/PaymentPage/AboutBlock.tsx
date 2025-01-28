import { PropsWithChildren, useEffect, useRef } from "react";
import { Page } from "../Page";
import { List } from "@telegram-apps/telegram-ui";
import { SectionCard } from "../SectionCard/SectionCard";
import styles from "./AboutBlock.module.css";

export function AboutBlock({ children }: PropsWithChildren) {
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
        <SectionCard
          title="🏫 Курс отношений"
          icon="❤️"
          content={
            <div className={styles.heroContainer}>
              <div className={styles.heroContent}>
                <h1 className={styles.courseTitle}>
                  Искусство гармоничных отношений
                </h1>
                <p className={styles.courseDescription}>
                  Практический курс о построении глубоких и осознанных связей.
                  Учитесь выстраивать доверие, преодолевать кризисы и сохранять
                  любовь в долгосрочной перспективе.
                </p>
              </div>
            </div>
          }
        />

        <SectionCard
          title="💬 Мудрость дня"
          icon="🌟"
          content={
            <div className={styles.quoteCard}>
              <div className={styles.quoteMark}>“</div>
              <p className={styles.quoteText}>
                Самые сильные отношения возникают между двумя независимыми
                людьми, которые решили идти вместе, потому что хотят, а не
                потому что нуждаются.
              </p>
              <div className={styles.quoteAuthor}>— Эрих Фромм</div>
            </div>
          }
        />

        <div className={styles.videoContainer}>
          <video
            ref={videoRef}
            src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
            muted
            playsInline
            className={styles.videoPlayer}
          />
        </div>

        <SectionCard
          title="📚 Основы здоровых отношений"
          icon="❤️"
          content={
            <div className={styles.textSlide}>
              <h3 className={styles.subTitle}>Ключевые принципы:</h3>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  Эмоциональная доступность и отзывчивость
                </li>
                <li className={styles.listItem}>Уважение личных границ</li>
                <li className={styles.listItem}>
                  Конструктивное разрешение конфликтов
                </li>
                <li className={styles.listItem}>Совместное развитие и рост</li>
              </ul>

              <h3 className={styles.subTitle}>Практические советы:</h3>
              <p className={styles.paragraph}>
                Регулярно выделяйте время для «чек-апов» отношений - открытых
                разговоров о потребностях и ожиданиях. Практикуйте активное
                слушание: повторяйте услышанное своими словами, чтобы убедиться
                в правильном понимании.
              </p>
            </div>
          }
        />

        <SectionCard
          title="🧠 Психология привязанности"
          icon="📖"
          content={
            <div className={styles.textSlide}>
              <h3 className={styles.subTitle}>Типы привязанности:</h3>
              <div className={styles.attachmentTypes}>
                <div className={styles.attachmentCard}>
                  <h4 className={styles.attachmentTitle}>Надежный</h4>
                  <p className={styles.attachmentText}>
                    Комфорт в близости, доверие, устойчивая самооценка
                  </p>
                </div>
                <div className={styles.attachmentCard}>
                  <h4 className={styles.attachmentTitle}>Тревожный</h4>
                  <p className={styles.attachmentText}>
                    Страх отвержения, потребность в постоянном подтверждении
                  </p>
                </div>
              </div>

              <h3 className={styles.subTitle}>
                Как развивать надежную привязанность:
              </h3>
              <p className={styles.paragraph}>
                Практикуйте эмоциональную открытость, учитесь выражать
                потребности прямо, работайте над самооценкой. Регулярно
                анализируйте паттерны поведения в отношениях.
              </p>
            </div>
          }
        />
        {children}
      </List>

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
