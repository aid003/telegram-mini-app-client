"use client";

import { useState } from "react";
import { CourseCard } from "../CourseCard/CourseCard";
import { SectionCard } from "../SectionCard/SectionCard";

type Results = {
  secure: number;
  anxious: number;
  avoidant: number;
  disorganized: number;
};

export type AttachmentType = keyof Results;
type Challenges = Record<AttachmentType, string>;

const DOMINANCE_THRESHOLD = 3;

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

const psychologicalInsights: Record<AttachmentType, PsychologicalInsight> = {
  secure: {
    icon: "🛡",
    title: "Надёжная привязанность",
    metaphor: {
      title: "Прочный фундамент",
      content: `Ваши отношения подобны древнему дубу с мощными корнями — они выдерживают штормы, потому что росли в плодородной почве безусловной любви. 
      В детстве ваши слёзы встречали объятиями, а ошибки — поддержкой: "Давай попробуем ещё раз, я рядом".
      \n
      Такие родители не просто удовлетворяли потребности — они учили вас распознавать эмоции: "Ты злишься, потому что устал? Давай найдём решение". 
      Этот опыт стал внутренним компасом: вы доверяете партнёру, но не теряете себя, как море, которое сливается с небом у горизонта, не переставая быть собой.`,
    },
    formation: {
      title: "Как формировалось",
      content: `Этот тип рождается в "тепличных условиях" здоровой привязанности, где родительская любовь была предсказуемой, как восход солнца. 
      Когда вы падали, вас поднимали, не высмеивая: "Больно? Сейчас всё пройдёт". 
      Ваш плач не игнорировали и не использовали против вас — вместо этого помогали назвать чувство: "Ты испугался этой собаки? Она не подойдёт, я защищу". 
      Так формировалась "нейронная дорожка" безопасности: мир не враг, а партнёр — не угроза, даже в конфликтах.`,
    },
    traits: [
      {
        title: "Эмоциональная стабильность",
        content: `Вы — как маяк в шторм: даже в разлуке сохраняете уверенность, что волны не разобьют вашу лодку о скалы. 
        Это не слепая вера, а знание, проверенное годами: "Мы спорим, но это не конец света". 
        Ваша стабильность — не каменная стена, а гибкий бамбук, который гнётся под ветром, но не ломается.`,
      },
      {
        title: "Гибкость в общении",
        content: `Вы умеете танцевать в диалоге, как хорошие партнёры в танго: то ведёте, то следуете, не наступая на ноги. 
        Ваше "я" не растворяется в "мы" — вы можете сказать: "Мне больно, когда ты так говоришь", не переходя на крик. 
        Это искусство сохранять связь, не теряя границ — дар, взращённый тысячами "маленьких да" и "нет", сказанных с уважением.`,
      },
    ],
    challenges: {
      secure: "",
      anxious: `Ваша стабильность может стать зеркалом для тревожного партнёра, отражая все его страхи. 
      Его попытки "проверить на прочность" ("Ты точно меня любишь?") — не нападение, а крик из глубин детских ран. 
      Ваша задача — оставаться берегом, но не становиться спасателем: "Я с тобой, но ты сможешь справиться".`,
      avoidant: `Партнёр-одиночка напоминает ёжика, который фыркает, когда вы предлагаете помощь. 
      Его "я сам" — не упрёк вам, а привычка выживать в пустыне одиночества. 
      Стоит мягко спрашивать: "Ты хочешь, чтобы я просто был рядом или помог решить это?" — давая выбор без давления.`,
      disorganized: `Их эмоции — как торнадо, разрушающие всё на пути. 
      Ваша стабильность может пугать, как тишина после взрыва. 
      Здесь важно быть "контейнером", но не забывать о собственных границах: "Я выйду на 10 минут, чтобы успокоиться, потом продолжим".`,
    },
    recommendations: [
      "Создавайте ритуалы доверия: совместное планирование отпуска, где учитываются интересы обоих",
      "Практикуйте «эмоциональные проверки»: «Как ты себя чувствуешь в наших отношениях на этой неделе?»",
    ],
    dynamicDescription: (secondaries) =>
      `Сочетается с элементами ${secondaries.join(
        " и "
      )}, как корни с ветвями — усиливая устойчивость, но требуя внимания к новым росткам.`,
  },
  anxious: {
    icon: "🌀",
    title: "Тревожная привязанность",
    metaphor: {
      title: "Эмоциональные качели",
      content: `Ваше сердце — как маяк с неисправной лампой: оно то слепит ярким светом требований, то гаснет в страхе быть ненужным. 
      В детстве ваши объятия могли назвать "прилипчивостью", а слёзы — "манипуляцией".
      Теперь вы держите руку на пульсе отношений, как параноидальный кардиолог: каждое пропущенное сообщение — "инфаркт", задержка ответа — "клиническая смерть". 
      Любовь кажется игрой в прятки, где вы вечно ищете, а партнёр прячется.`,
    },
    formation: {
      title: "История формирования",
      content: `Ваше детство напоминало лотерею: чтобы получить порцию любви, нужно было угадать настроение родителей. 
      Мать могла в слезах прижать к груди: "Ты моя единственная радость!", а через час кричать: "Отстань, ты меня задолбал!". 
      Вы научились расшифровывать микровыражения, как агент ФБР, но цена этого — вечное ожидание катастрофы. 
      Ваша нервная система запомнила: любовь — это не дом, а палатка в урагане.`,
    },
    traits: [
      {
        title: "Гиперчувствительность",
        content: `Вы слышите тишину между слов, как музыкант — паузы в симфонии. 
        Сдвинутая бровь партнёра — повод для триллера в голове: "Он меня разлюбил → Я недостаточно хороша → Он уйдёт". 
        Это не паранойя — навык, отточенный годами выживания в эмоциональном минном поле.`,
      },
      {
        title: "Страх покинутости",
        content: `Ваша любовь — как цепкое растение-лиана: чем сильнее тянетесь к свету, тем больше рискуете задушить опору. 
        Ночные звонки "просто услышать голос", требования "доказательств" — попытки зацементировать отношения, превратив их в саркофаг. 
        Но камень давит на вас обоих, вызывая обратный эффект.`,
      },
    ],
    challenges: {
      secure: `Их спокойствие кажется подозрительным, как неестественная тишина перед штормом. 
      Вы подсознательно провоцируете конфликты, чтобы получить привычную дозу адреналина: "Если он не злится — значит, равнодушен". 
      Нужно учиться принимать любовь без тестов на прочность.`,
      anxious: "",
      avoidant: `Ваши дуэты напоминают танго слепых: вы бросаетесь вперёд, он отступает, вы падаете. 
      Каждый его шаг назад вы читаете как главу из романа "Как меня бросят". 
      Нужно остановить этот танец: "Давай договоримся — я не буду читать твои мысли, а ты скажешь, если захочешь уйти".`,
      disorganized: `Это как играть в шахматы с ураганом — правила меняются каждую минуту. 
      Ваша тревога взлетает до небес, заставляя цепляться за обломки. 
      Здесь нужен якорь самосострадания: "Даже если он уйдёт — я переживу это".`,
    },
    recommendations: [
      "Создайте «шкатулку успокоения»: список реальных фактов о надёжности партнёра для моментов паники",
      "Практикуйте технику «5-4-3-2-1»: назовите 5 предметов вокруг, 4 звука и т.д. — чтобы вернуться в «сейчас»",
    ],
    dynamicDescription: (secondaries) =>
      `Сочетание с ${secondaries.join(
        " и "
      )} — как смешение красок на мокром холсте: эмоции растекаются, создавая непредсказуемые узоры.`,
  },
  avoidant: {
    icon: "🏃♂️",
    title: "Избегающая привязанность",
    metaphor: {
      title: "Неприступная крепость",
      content: `Ваше сердце — как средневековый замок с подъёмным мостом. 
      В детстве ваши ворота штурмовали те, кто должен был охранять: родители высмеивали слёзы ("Нюня!"), игнорировали просьбы ("Сам разберёшься"). 
      Теперь любой, кто подходит к стенам, кажется захватчиком. Даже любовь вы впускаете через узкую бойницу, держа руку на рычаге с кипящей смолой. 
      Близость пахнет тюрьмой — и вы предпочитаете быть одиноким стражем своих пустых залов.`,
    },
    formation: {
      title: "Причины возникновения",
      content: `Ваше детство напоминало школу выживания: "Если хочешь есть — сам готовь", "Плачешь? У меня для тебя есть повод поплакать!". 
      Эмоции были роскошью, которую вы не могли себе позволить — как бедняк не может мечтать о дворце. 
      Вы научились переводить любовь в логические уравнения: "Её объятия = потеря контроля". 
      Тело запомнило: доверие = боль, поэтому прикосновения вызывают желание бежать.`,
    },
    traits: [
      {
        title: "Эмоциональная автономия",
        content: `Вы — как мастер побега из собственной жизни. 
        Проблемы партнёра? "Разберётся сам". Конфликт? "Не хочу это обсуждать". 
        Ваша независимость — не сила, а броня, под которой скрываются старые шрамы. 
        Даже в сексе вы контролируете дистанцию: страсть возможна только когда вы «наверху», в позиции власти.`,
      },
      {
        title: "Страх поглощения",
        content: `Любое "мы" кажется вам ловушкой, как трясина, затягивающая в болото зависимости. 
        Вы разрываете отношения при первом намёке на серьёзность — как ребёнок, бросающий игрушку, которая "слишком привязалась". 
        Даже выбираете партнёров, которые не могут приблизиться: женатых, живущих в другой стране. 
        Это не свобода — бегство по кругу с одними и теми же страхами.`,
      },
    ],
    challenges: {
      secure: `Их стабильность раздражает, как яркий свет в тёмной комнате. 
      Вы подсознательно пытаетесь "взломать" их уверенность: провоцируете ревность, критикуете — лишь бы вернуть привычный хаос. 
      Нужно учиться видеть в их надёжности не угрозу, а приглашение к отдыху.`,
      anxious: `Их любовь душит, как лиана в джунглях. 
      Каждое "Где ты был?" звучит как допрос, каждое "Я скучаю" — как капкан. 
      Ваша задача — не убегать молча, а обозначать границы: "Я отвечу тебе вечером, сейчас мне нужно побыть одному".`,
      avoidant: "",
      disorganized: `Их хаос — зеркало ваших внутренних бурь. 
      Вы оба мастера побегов — они в эмоции, вы в молчание. 
      Нужно находить "островки безопасности": совместное хобби, где контакт происходит через действие, а не разговоры.`,
    },
    recommendations: [
      "Начните с малого: делитесь одним чувством в день как экспериментом («Сегодня я раздражён из-за работы»)",
      "Практикуйте «физическую близость без обязательств»: совместные походы, спорт — где тело учится доверять",
    ],
    dynamicDescription: (secondaries) =>
      `Сочетание с ${secondaries.join(
        " и "
      )} напоминает лабиринт с зеркалами — защиты множатся, запутывая даже вас самих.`,
  },
  disorganized: {
    icon: "🌪",
    title: "Дезорганизованная привязанность",
    metaphor: {
      title: "Хаотичный вихрь",
      content: `Ваши отношения — как танец с огнём в центре торнадо. 
      В детстве те, кто должен был защищать, сами становились монстрами: мать целовала на ночь, а утром била ремнём за разлитый чай. 
      Теперь любовь и страх сплелись в тугой узел: вы тянетесь к партнёру, но бьёте его тем же ремнём — метафорически. 
      Ваше сердце разрывается между "обними меня" и "убей меня", как маятник безумия.`,
    },
    formation: {
      title: "Корни проблемы",
      content: `Вы росли в доме, где дверь в детскую то распахивалась для ночных кошмаров ("Папа опять пьяный!"), то захлопывалась перед носом ("Не мешай!"). 
      Мать могла рыдать у вас на плече, как ребёнок, а через час кричать: "Ты вообще никому не нужен!". 
      Ваша нервная система сломала "тормоза": теперь вы либо в панике, либо в оцепенении. 
      Любовь стала формой самоповреждения — как царапать рану, чтобы почувствовать себя живым.`,
    },
    traits: [
      {
        title: "Полярность реакций",
        content: `Сегодня партнёр — принц на белом коне, завтра — исчадие ада. 
        Ваши чувства меняются как погода в горах: от страстных признаний до "Уйди и умри!" за час. 
        Это не капризы — ваш мозг, переживший ужас, путает прошлое и настоящее: партнёр поднимает руку, чтобы поправить волосы, а вы уже кричите, закрывая голову.`,
      },
      {
        title: "Импульсивность",
        content: `Вы поджигаете мосты, как пироманьяк — не из злости, а от бессилия. 
        После ссоры можете разбить телефон, уехать в другой город или заняться сексом с незнакомцем — лишь бы заглушить внутренний вой. 
        Это попытки вырваться из клетки прошлого, но ключ всегда оказывается фальшивым.`,
      },
    ],
    challenges: {
      secure: `Их стабильность пугает, как тишина после взрыва. 
      Вы подсознательно хотите разбить этот "идеал", доказав, что все предают. 
      Нужно учиться принимать доброту без саботажа — как ребёнок учится трогать тёплую воду после ожогов.`,
      anxious: `Два урагана в одной комнате — ваши эмоции сталкиваются, создавая разрушительную силу. 
      Вы провоцируете друг друга на экстремальные реакции, как будто пытаетесь воссоздать знакомый хаос. 
      Нужны "глаза в шторм" — терапевт или группа поддержки.`,
      avoidant: `Ваш танец напоминает бой без правил: вы бьёте, он убегает, вы преследуете. 
      Каждая встреча заканчивается кровью — эмоциональной или физической. 
      Нужно создать "красную кнопку" — фразу для остановки: "Стоп. Мы оба задыхаемся".`,
      disorganized: "",
    },
    recommendations: [
      "Создайте «аварийный чемоданчик»: список действий для самоуспокоения (холодный душ, бег на месте, раскраски)",
      "Практикуйте «перемотку»: после конфликта записывайте, что произошло, как будто объясняете ребёнку",
    ],
    dynamicDescription: (secondaries) =>
      `Сочетание с ${secondaries.join(
        " и "
      )} — как смешение химических реактивов: предсказать взрыв или мерцание невозможно.`,
  },
};

const typeTranslations: Record<AttachmentType, string> = {
  secure: "Безопасный",
  anxious: "Тревожный",
  avoidant: "Избегающий",
  disorganized: "Дезорганизованный",
};

export function ResultSlide({ results }: { results: Results }) {
  const { main, secondaries } = getDominantType(results);
  const currentType = psychologicalInsights[main];
  const translatedSecondaries = secondaries.map(
    (type) => typeTranslations[type]
  );

  return (
    <div>
      <div
        style={{
          padding: "1rem",
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          background: "var(--tg-theme-bg-color)",
          minHeight: "100vh",
          boxSizing: "border-box",
        }}
      >
        {/* Заголовочная секция */}
        <div style={{ marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "1.3rem",
              fontWeight: 700,
              marginBottom: "0.5rem",
              color: "var(--tg-theme-text-color)",
            }}
          >
            Мы получили следующие результаты
          </h1>
          <div
            style={{
              marginTop: "20px",
              fontSize: "0.9rem",
              color: "var(--tg-theme-hint-color)",
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <span>{typeTranslations[main]}</span>
            <span>•</span>
            <span>Интенсивность: {results[main]}/30</span>
          </div>
        </div>

        {/* Секции с использованием SectionCard */}
        <SectionCard
          title="Особенности вашего типа"
          icon="📌"
          content={
            <div
              style={{ padding: "0.5rem", fontSize: "0.9rem", lineHeight: 1.6 }}
            >
              {currentType.dynamicDescription(translatedSecondaries)}
            </div>
          }
        />

        <SectionCard
          title={currentType.metaphor.title}
          icon="🌉"
          content={
            <div style={{ padding: "0.5rem", fontStyle: "italic" }}>
              {currentType.metaphor.content}
            </div>
          }
        />

        <SectionCard
          title={currentType.formation.title}
          icon="🕰️"
          content={
            <div style={{ padding: "0.5rem" }}>
              {currentType.formation.content}
            </div>
          }
        />

        {/* Секция характеристик */}
        <SectionCard
          title="Ключевые особенности"
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
                      width: "2rem",
                      height: "2rem",
                      background: "var(--tg-theme-button-color)",
                      borderRadius: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: 600,
                    }}
                  >
                    {index + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        marginBottom: "0.3rem",
                      }}
                    >
                      {trait.title}
                    </div>
                    <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>
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
          title="Рекомендации по развитию"
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
                      fontSize: "0.9rem",
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
      </div>

      <CourseCard
        problems={["anxious", "avoidant"]}
        icon="🧘"
        status="available"
        onStart={() => console.log("Start course")}
      />
    </div>
  );
}
