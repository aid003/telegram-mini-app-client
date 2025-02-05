"use client";

import { useState } from "react";
import { CourseCard } from "../CourseCard/CourseCard";
import { SectionCard } from "../SectionCard/SectionCard";

// Определяем тип результатов: для каждого типа привязанности — просто число
type Results = {
  secure: number;
  anxious: number;
  avoidant: number;
  disorganized: number;
};

// Тип привязанности
export type AttachmentType = keyof Results;
type Challenges = Record<AttachmentType, string>;

// Порог для определения второстепенных типов (например, если разница меньше или равна 3 баллам)
const DOMINANCE_THRESHOLD = 3;

// Функция, определяющая доминирующий (основной) тип и второстепенные типы
const getDominantType = (results: Results) => {
  const entries = Object.entries(results) as [AttachmentType, number][];
  const sorted = entries.sort((a, b) => b[1] - a[1]);
  const mainType = sorted[0][0];
  const secondaryTypes = sorted
    .slice(1)
    .filter(([_, score]) => sorted[0][1] - score <= DOMINANCE_THRESHOLD)
    .map(([type]) => type);

  return { main: mainType, secondaries: secondaryTypes };
};

// Интерфейс для описания психологических особенностей каждого типа
type PsychologicalInsight = {
  icon: string;
  title: string;
  metaphor: { title: string; content: string };
  formation: { title: string; content: string };
  traits: Array<{ title: string; content: string }>;
  challenges: Challenges;
  recommendations: string[];
  dynamicDescription: (secondaries: string[]) => string;
};

// Описание психологических характеристик для каждого типа привязанности
const psychologicalInsights: Record<AttachmentType, PsychologicalInsight> = {
  secure: {
    icon: "🛡",
    title: "Уверенная привязанность",
    metaphor: {
      title: "Надёжная опора",
      content: `Ваши отношения напоминают большое и крепкое дерево с глубоко уходящими корнями, способное выдержать даже сильные шторма благодаря атмосфере стабильной любви и поддержки, в которой оно росло.`,
    },
    formation: {
      title: "Что лежит в основе",
      content: `В детстве вы ощущали постоянную заботу и понимание, где ошибки воспринимались как шаги к развитию, а чувства — как естественная часть жизни. Так сформировалась ваша уверенность в надёжности отношений.`,
    },
    traits: [
      {
        title: "Стабильный эмоциональный фон",
        content: `Вам удаётся удерживать внутренний баланс даже в трудные периоды, обдумывать свои чувства и видеть ситуацию объективно.`,
      },
      {
        title: "Лёгкость во взаимодействии",
        content: `Вы с готовностью идёте навстречу как собственным, так и чужим потребностям, устанавливая доверительный и искренний диалог.`,
      },
    ],
    challenges: {
      secure: "",
      anxious: `Ваше спокойствие может казаться тревожному партнёру безразличием, повышая его внутреннюю неуверенность.`,
      avoidant: `Партнёр, склонный к дистанцированию, может счесть вашу открытость попыткой вторжения в его личное пространство.`,
      disorganized: `При контакте с дезорганизованным типом ваша устойчивость может показаться незнакомой и оттолкнуть, подпитывая его непредсказуемые реакции.`,
    },
    recommendations: [
      "Следите за гармоничным сочетанием личной автономии и совместной близости, делясь своими чувствами напрямую.",
      "Совершенствуйте навык эмпатии, учитесь слышать партнёра и учитывать его эмоциональные потребности.",
    ],
    dynamicDescription: (secondaries) =>
      `Ваш базовый тип — Уверенная привязанность. ${
        secondaries.length > 0
          ? `Также заметны элементы: ${secondaries.join(" и ")}.`
          : ""
      }`,
  },
  anxious: {
    icon: "🌀",
    title: "Тревожный тип привязанности",
    metaphor: {
      title: "Эмоциональные волны",
      content: `Ваши отношения по ощущениям словно волны, где любовь накатывает, но тут же может смениться страхом быть отвергнутым. Частые колебания создают чувство нестабильности.`,
    },
    formation: {
      title: "Как формировался",
      content: `С ранних лет вы могли замечать, что поддержка окружения не была последовательной, и вам приходилось подтверждать свою ценность, чтобы заслужить одобрение.`,
    },
    traits: [
      {
        title: "Повышенная чувствительность к отвержению",
        content: `Вы мгновенно улавливаете малейшие изменения в отношениях, что зачастую приводит к усилению чувства тревожности.`,
      },
      {
        title: "Страх остаться без поддержки",
        content: `Боязнь быть оставленным заставляет вас искать постоянных заверений в любви, что делает вас внимательным к деталям, но порой вызывает излишнее напряжение.`,
      },
    ],
    challenges: {
      secure: `Человек с уверенным типом может показаться вам слишком спокойным, и вы будете интерпретировать это как недостаток участия.`,
      anxious: "",
      avoidant: `Взаимодействие со склонным к дистанции партнёром способно усилить ваши опасения, ведь его отрешённость подпитывает чувство неуверенности.`,
      disorganized: `В паре с дезорганизованным типом вы столкнётесь с непостоянством, которое будет дополнительно раздувать вашу тревогу.`,
    },
    recommendations: [
      "Практикуйте медитации осознанности и самоподдержки, чтобы успокаивать внутреннюю тревогу.",
      "Попробуйте вести дневник позитивных моментов, чтобы укрепить уверенность в отношениях и сместить фокус на положительные аспекты.",
    ],
    dynamicDescription: (secondaries) =>
      `Ваш ключевой паттерн — Тревожный тип привязанности. ${
        secondaries.length > 0
          ? `Также присутствуют элементы: ${secondaries.join(" и ")}.`
          : ""
      }`,
  },
  avoidant: {
    icon: "🏃‍♂️",
    title: "Дистанцирующийся тип привязанности",
    metaphor: {
      title: "Незаходимая крепость",
      content: `Ваши отношения выглядят как высокие стены, за которыми вы можете укрыться от излишне тесного контакта, оставляя лишь узкие щели для взаимодействия.`,
    },
    formation: {
      title: "Что лежит в основе",
      content: `Вероятно, в детстве вы не могли предугадать реакцию взрослых, из-за чего привыкли опираться только на себя и избегать чрезмерной зависимости от других.`,
    },
    traits: [
      {
        title: "Стремление к самостоятельности",
        content: `Вы дорожите собственной независимостью и предпочитаете не втягиваться в бурные переживания, сохраняя эмоциональную дистанцию.`,
      },
      {
        title: "Опасение потерять себя",
        content: `При слишком тесном общении вы испытываете тревогу утратить личные границы, что толкает вас к сдерживанию своих чувств и отступлению.`,
      },
    ],
    challenges: {
      secure: `С человеком, обладающим уверенным стилем, ваша сдержанность может быть воспринята как равнодушие.`,
      anxious: `В паре с тревожным партнёром ваша необходимость в дистанции станет поводом для его постоянного поиска подтверждений, ведя к обоюдной фрустрации.`,
      avoidant: "",
      disorganized: `Дезорганизованному человеку будет непросто понять, почему вы так отчаянно оберегаете свою свободу, что может вести к большему хаосу.`,
    },
    recommendations: [
      "Старайтесь осваивать небольшие шаги к более тесному взаимодействию, учитесь распознавать свои страхи и открываться постепенно.",
      "Пробуйте чаще проговаривать, что вы чувствуете, чтобы партнёр лучше понимал вашу потребность в личном пространстве.",
    ],
    dynamicDescription: (secondaries) =>
      `Ваш базовый стиль — Дистанцирующийся тип привязанности. ${
        secondaries.length > 0
          ? `Также заметны элементы: ${secondaries.join(" и ")}.`
          : ""
      }`,
  },
  disorganized: {
    icon: "🌪",
    title: "Несформированный тип привязанности",
    metaphor: {
      title: "Эмоциональный шторм",
      content: `Ваши связи напоминают непредсказуемый ураган, где сильная тяга к близости переплетается со страхом перед ней, порождая разнополярные и противоречивые реакции.`,
    },
    formation: {
      title: "Откуда берутся противоречия",
      content: `Скорее всего, в детстве вы сталкивались с крайне непредсказуемым отношением значимых взрослых. Это привело к формированию сбивчивых стратегий привязанности, основанных на противоречивых ощущениях.`,
    },
    traits: [
      {
        title: "Контрастность поведения",
        content: `Ваше настроение способно колебаться от глубокого доверия к резкому отторжению, что делает отношения крайне нестабильными.`,
      },
      {
        title: "Необдуманные поступки",
        content: `Во время кризисов вы можете действовать импульсивно, поддаваясь мгновенным эмоциям и усложняя ситуацию.`,
      },
    ],
    challenges: {
      secure: `С уверенным партнёром ваши противоречивые реакции могут вызывать у него растерянность и желание отдалиться для самосохранения.`,
      anxious: `Ваши резкие перепады могут провоцировать ещё более глубокую тревогу у чувствительного партнёра.`,
      avoidant: `Партнёр, предпочитающий держаться на расстоянии, может воспринимать ваш эмоциональный шторм как давление, ещё сильнее уходя в себя.`,
      disorganized: "",
    },
    recommendations: [
      "Учитесь различать свои эмоции и работать с ними, используя приёмы саморегуляции (дыхательные упражнения, mindfulness-практики).",
      "Регулярная запись своих чувств и обсуждение их с психологом или близким человеком поможет разобраться в корне ваших противоречий и уменьшить импульсивные реакции.",
    ],
    dynamicDescription: (secondaries) =>
      `Ваш доминирующий стиль — Несформированный тип привязанности. ${
        secondaries.length > 0
          ? `Также присутствуют элементы: ${secondaries.join(" и ")}.`
          : ""
      }`,
  },
};

// Простые переводы для отображения заголовков
const typeTranslations: Record<AttachmentType, string> = {
  secure: "Уверенный",
  anxious: "Тревожный",
  avoidant: "Дистанцирующийся",
  disorganized: "Несформированный",
};

// Компонент, отображающий результаты теста
export function ResultSlide({ results }: { results: Results }) {
  // Состояние для отслеживания загрузки курса
  const [isLoading, setIsLoading] = useState(false);

  const { main, secondaries } = getDominantType(results);
  const currentType = psychologicalInsights[main];
  const translatedSecondaries = secondaries.map(
    (type) => typeTranslations[type]
  );

  // Единый стиль для текста
  const commonTextStyle = {
    fontFamily: "'Nunito', 'Segoe UI', sans-serif",
    fontSize: "1rem",
    lineHeight: 1.6,
    color: "var(--tg-theme-text-color)",
  };

  // Обработчик запуска курса с визуальным сопровождением
  const handleStartCourse = async () => {
    setIsLoading(true);
    // Здесь можно ускорить загрузку (например, предзагрузить данные или выполнить необходимые операции)
    // Для демонстрации эмулируем быструю загрузку с задержкой 500 мс:
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Start course");
    setIsLoading(false);
  };

  return (
    <div>
      <div
        style={{
          padding: "1rem",
          ...commonTextStyle,
          background: "var(--tg-theme-bg-color)",
          minHeight: "100vh",
          boxSizing: "border-box",
        }}
      >
        {/* Заголовочная секция */}
        <div style={{ marginBottom: "2rem" }}>
          <h1
            style={{
              ...commonTextStyle,
              fontSize: "1.3rem",
              fontWeight: 700,
              marginBottom: "0.5rem",
            }}
          >
            Результаты вашего теста
          </h1>
          <div
            style={{
              marginTop: "20px",
              ...commonTextStyle,
              fontSize: "1rem",
              color: "var(--tg-theme-hint-color)",
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <span>{typeTranslations[main]}</span>
            <span>•</span>
            <span>Уровень выраженности: {results[main]}</span>
          </div>
        </div>

        {/* Секция с описанием особенностей основного типа */}
        <SectionCard
          title="Главные черты вашего типа"
          icon="📌"
          content={
            <div style={{ padding: "0.5rem", ...commonTextStyle }}>
              {currentType.dynamicDescription(translatedSecondaries)}
            </div>
          }
        />

        <SectionCard
          title={currentType.metaphor.title}
          icon="🌉"
          content={
            <div
              style={{
                padding: "0.5rem",
                ...commonTextStyle,
                fontStyle: "italic",
              }}
            >
              {currentType.metaphor.content}
            </div>
          }
        />

        <SectionCard
          title={currentType.formation.title}
          icon="🕰️"
          content={
            <div style={{ padding: "0.5rem", ...commonTextStyle }}>
              {currentType.formation.content}
            </div>
          }
        />

        {/* Секция ключевых особенностей */}
        <SectionCard
          title="Основные характеристики"
          icon="🔑"
          content={
            <div style={{ width: "100%" }}>
              {currentType.traits.map((trait, index) => (
                <div
                  key={index}
                  style={{
                    padding: "1rem 0",
                    borderTop:
                      index > 0
                        ? "1px solid var(--tg-theme-section-border-color)"
                        : "none",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      ...commonTextStyle,
                      width: "2rem",
                      height: "2rem",
                      background: "var(--tg-theme-button-color)",
                      borderRadius: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "1rem",
                    }}
                  >
                    {index + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        ...commonTextStyle,
                        fontSize: "1rem",
                        fontWeight: 600,
                        marginBottom: "0.3rem",
                      }}
                    >
                      {trait.title}
                    </div>
                    <div
                      style={{
                        ...commonTextStyle,
                        fontSize: "1rem",
                        opacity: 0.9,
                      }}
                    >
                      {trait.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
        />

        {/* Секция рекомендаций */}
        <SectionCard
          title="Рекомендации для роста"
          icon="🛠️"
          content={
            <div
              style={{
                display: "grid",
                gap: "1rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              }}
            >
              {currentType.recommendations.map((rec, index) => (
                <div
                  key={index}
                  style={{
                    padding: "1rem",
                    background: "var(--tg-theme-bg-color)",
                    borderRadius: "0.7rem",
                    borderLeft: `3px solid hsl(${index * 90}, 70%, 50%)`,
                  }}
                >
                  <div
                    style={{
                      ...commonTextStyle,
                      fontSize: "1rem",
                      position: "relative",
                      paddingLeft: "1.5rem",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: "0",
                        color: "var(--tg-theme-button-color)",
                        fontSize: "1.2rem",
                      }}
                    >
                      •
                    </span>
                    {rec}
                  </div>
                </div>
              ))}
            </div>
          }
        />

        {/* Секция "Как применить на практике" */}
        <SectionCard
          title="Как применить полученные знания"
          icon="📖"
          content={
            <div style={{ padding: "0.5rem", ...commonTextStyle }}>
              Чтобы вам не приходилось самостоятельно перебирать множество
              методик и теоретических материалов, мы подготовили практическое
              руководство, которое поможет справиться именно с вашими
              трудностями.
            </div>
          }
        />
      </div>

      {/* Передаём isLoading и наш обработчик в CourseCard */}
      <CourseCard
        problems={["anxious", "avoidant"]}
        icon="🧘"
        status="available"
        onStart={handleStartCourse}
        isLoading={isLoading} // Используется для смены текста кнопки внутри CourseCard
      />
    </div>
  );
}
1