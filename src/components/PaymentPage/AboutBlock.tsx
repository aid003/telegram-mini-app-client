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
          title="Курс отношений"
          icon="🏫"
          content={
            <div className={styles.heroContainer}>
              <div className={styles.heroContent}>
                <h1 className={styles.courseTitle}>
                  Познание себя через эмоции
                </h1>
                <p className={styles.courseDescription}>
                  Практический курс о том, как пользоваться эмоциональным
                  интеллектом и как с его помощью улучшить отношения со своим
                  окружением.
                </p>
              </div>
            </div>
          }
        />

        <SectionCard
          title=""
          icon=""
          content={
            <div className={styles.quoteCard}>
              <div className={styles.quoteMark}>“</div>
              <p className={styles.quoteText}>
                Когда вы начинаете осознавать эмоции, вы начинаете управлять
                собственной жизнью.
              </p>
              <div className={styles.quoteAuthor}>— Эрих Фромм</div>
            </div>
          }
        />

        <div className={styles.videoContainer}>
          <video
            ref={videoRef}
            // src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
            src="../../app/_assets/gif.mp4"
            muted
            playsInline
            className={styles.videoPlayer}
          />
        </div>

        <SectionCard
          title="Чему вы научитесь:"
          icon="📚"
          content={
            <div className={styles.textSlide}>
              <h3 className={styles.subTitle}>Ключевые принципы:</h3>
              <ul className={styles.list}>
                <li className={styles.listItem}>
                  Понимать какие потребности на самом деле стоят за эмоциями
                </li>
                <li className={styles.listItem}>
                  Сохранять эмоциональное равновесие в сложных, стрессовых
                  ситуациях
                </li>
                <li className={styles.listItem}>
                  Понимать людей, проявлять эмпатию и выражать сочуствие
                </li>
                <li className={styles.listItem}>
                  Уверенно говорить <i>нет</i> и сохранять личные границы
                </li>
              </ul>

              <h3 className={styles.subTitle}>Как это работает?:</h3>
              <p className={styles.paragraph}>
                В этом курсе мы собрали весь необходимый минимум для улучшения
                эмоциональная интеллекта.
                <br />
                Вся практика будет занимать не более 10 минут, а теория будет
                действовать постепенно, для лучшего условия материала.
              </p>
            </div>
          }
        />

        <SectionCard
          title="Плюсы, минусы:"
          icon="🧠"
          content={
            <div className={styles.textSlide}>
              <h3 className={styles.subTitle}></h3>
              <div className={styles.attachmentTypes}>
                <div className={styles.attachmentCard}>
                  <h4 className={styles.attachmentTitle}>Это плюс</h4>
                  <ul style={{ textAlign: "start" }}>
                    <li className={styles.attachmentText}>
                      Для вашего мировоззрения
                    </li>
                    <li className={styles.attachmentText}>Ваших близких</li>
                    <li className={styles.attachmentText}>
                      Вашей нервной системе
                    </li>
                  </ul>
                </div>
                <div className={styles.attachmentCard}>
                  <h4 className={styles.attachmentTitle}>Это минус</h4>
                  <p className={styles.attachmentText}>
                    Для тех вами манипулирует
                  </p>
                </div>
              </div>

              <h3 className={styles.subTitle}>А что по цене:</h3>
              <p className={styles.paragraph}>
                Оплату мы сделали символичной. Нам важно, чтобы у вас была
                примитивная мотивация получить эти знания и извечь из них
                пользу. Поэтому используйте этот курс как маленький шаг, который
                сделает вашу жизнь лучше.
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
