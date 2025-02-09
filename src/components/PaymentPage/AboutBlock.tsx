import { PropsWithChildren, useEffect, useRef } from "react";
import { Page } from "../Page";
import { List } from "@telegram-apps/telegram-ui";
import { SectionCard } from "../SectionCard/SectionCard";
import styles from "./AboutBlock.module.css";

export function AboutBlock({ children }: PropsWithChildren) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoElement.play();
        } else {
          videoElement.pause();
        }
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(videoElement);

    return () => {
      observer.unobserve(videoElement);
    };
  }, []);

  return (
    <Page back={false}>
      <List>
        <SectionCard
          title="Практический курс"
          icon="❤️"
          content={
            <div className={styles.heroContainer}>
              <div className={styles.heroContent}>
                <h1 className={styles.courseTitle}>
                  Познание себя через эмоции
                </h1>
                <i className={styles.courseDescription}>
                  Курс о том, как пользоваться эмоциональным интеллектом и как с
                  его помощью улучшить отношения со своим окружением.
                </i>
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
            width={640}
            height={360}
            className={styles.videoPlayer}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
        </div>

        <SectionCard
          title="Чему вы научитесь:"
          icon="📚"
          content={
            <div className={styles.textSlide}>
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

              <h3 className={styles.subTitle}>Как это работает?</h3>
              <p className={styles.paragraph}>
                В этом курсе мы собрали весь необходимый минимум для улучшения
                эмоционального интеллекта.
                <br />
                Вся практика будет занимать не более 10 минут, а теория будет
                действовать постепенно, для лучшего усвоения материала.
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
                  <ul style={{ textAlign: "start" }}>
                    <li className={styles.attachmentText}>
                      Для тех, кто вами манипулирует
                    </li>
                  </ul>
                </div>
              </div>

              <h3 className={styles.subTitle}>А какая цена?</h3>
              <p className={styles.paragraphLast}>
                Оплату мы сделали символичной.
                <br />
                Нам важно, чтобы у вас была примитивная мотивация получить эти
                знания и извлечь из них пользу. <br />
                Поэтому используйте этот курс как маленький шаг, который сделает
                вашу жизнь лучше.
              </p>
            </div>
          }
        />

        {children}
      </List>
    </Page>
  );
}
