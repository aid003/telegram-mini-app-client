import { PropsWithChildren, useEffect, useRef } from "react";
import { Page } from "../Page";
import { List } from "@telegram-apps/telegram-ui";
import { SectionCard } from "../SectionCard/SectionCard";
import styles from "./AboutBlock.module.css";
import Image from "next/image";
import gif from "../../../public/gif.gif";

export function AboutBlock({ children }: PropsWithChildren) {
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
          <Image
            width={900}
            height={600}
            alt="gif file"
            src={gif}
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
                  <ul
                    style={{
                      textAlign: "start",
                    }}
                  >
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
                  <ul
                    style={{
                      textAlign: "start",
                    }}
                  >
                    <li className={styles.attachmentText}>
                      Для тех, кто вами манипулирует
                    </li>
                  </ul>
                </div>
              </div>

              <h3 className={styles.subTitle}>А что по цене:</h3>
              <p className={styles.paragraph}>
                Оплату мы сделали символичной. Нам важно, чтобы у вас была
                примитивная мотивация получить эти знания и извлечь из них
                пользу. Поэтому используйте этот курс как маленький шаг, который
                сделает вашу жизнь лучше.
              </p>
            </div>
          }
        />
        {children}
      </List>
    </Page>
  );
}
