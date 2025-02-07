"use client";

// import { Page } from "@/components/Page";
import { QuestionCard } from "@/components/QuestionCard/QuestionCard";
import { ResultSlide } from "@/components/ResultCard/ResultCard";
import { Headline, List, Progress } from "@telegram-apps/telegram-ui";
import { useMemo, useState } from "react";
import { questions } from "./questions";
import { Page } from "@/components/Page";

type AttachmentType = "secure" | "anxious" | "avoidant" | "disorganized";

const ATTACHMENT_SCALES: Record<AttachmentType, number[]> = {
  secure: [0, 4, 7, 9, 16, 24],
  anxious: [1, 2, 5, 8, 10, 13],
  avoidant: [3, 6, 11, 12, 15, 18],
  disorganized: [17, 19, 20, 21, 22],
};

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const results = useMemo(() => {
    const scores = {
      secure: 0,
      anxious: 0,
      avoidant: 0,
      disorganized: 0,
    };

    answers.forEach((answer, index) => {
      for (const [type, questions] of Object.entries(ATTACHMENT_SCALES)) {
        if (questions.includes(index)) {
          scores[type as AttachmentType] += answer;
          break;
        }
      }
    });

    return scores;
  }, [answers]);

  if (showResults) {
    return <ResultSlide results={results} />;
  }

  return (
    <Page back={false}>
      <List>
        <div
          style={{
            paddingTop: "20px",
            paddingLeft: "15px",
            paddingRight: "15px",
          }}
        >
          <Progress value={Math.round((100 * (currentQuestion + 1)) / 25)} />
        </div>
        <Headline
          style={{
            fontSize: "14px",
            marginLeft: "15px",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          Выберите одно из утверждений:
        </Headline>
        <QuestionCard
          question={questions[currentQuestion].question}
          onAnswer={handleAnswer}
        />
      </List>
    </Page>
  );
}
