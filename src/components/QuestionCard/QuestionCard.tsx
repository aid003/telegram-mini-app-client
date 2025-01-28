"use client";

import {
  Cell,
  List,
  Section,
  Selectable,
  Text,
} from "@telegram-apps/telegram-ui";
import { useEffect, useRef, useState } from "react";

export const QuestionCard = ({
  question,
  selectedValue,
  onAnswer,
}: {
  question: string;
  selectedValue?: number;
  onAnswer: (value: number) => void;
}) => {
  const [animationStage, setAnimationStage] = useState<
    "idle" | "exiting" | "entering"
  >("idle");
  const [currentQuestion, setCurrentQuestion] = useState(question);
  const containerRef = useRef<HTMLDivElement>(null);

  const previousQuestionRef = useRef(question);

  useEffect(() => {
    if (question !== previousQuestionRef.current) {
      setAnimationStage("exiting");
      const timer = setTimeout(() => {
        previousQuestionRef.current = question;
        setCurrentQuestion(question);
        setAnimationStage("entering");
        setTimeout(() => setAnimationStage("idle"), 200);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [question]);

  const getQuestionStyles = () => {
    const base = {
      transform: "translateY(0)",
      opacity: 1,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    };

    switch (animationStage) {
      case "exiting":
        return { ...base, transform: "translateY(-20px)", opacity: 0 };
      case "entering":
        return { ...base, transform: "translateY(20px)", opacity: 0 };
      default:
        return base;
    }
  };

  const getAnswerStyles = (value: number) => {
    return {
      transitionDelay: `${value * 20}ms`,
      transition: "all 0.2s ease-out",
      opacity: animationStage === "idle" ? 1 : 0,
      transform: `translateX(${animationStage === "idle" ? 0 : "0"})`,
      position: "relative" as const,
    };
  };

  return (
    <div ref={containerRef} style={{ overflowX: "hidden", width: "100%" }}>
      <List>
        <Section
          style={{
            padding: "8px 0",
            backgroundColor: "var(--tg-theme-secondary-bg-color)",
            margin: "0 0 6px 0",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 56,
            overflow: "hidden",
            ...getQuestionStyles(),
          }}
        >
          <Text
            weight="2"
            style={{
              fontSize: 16,
              textAlign: "center",
              color: "var(--tg-theme-text-color)",
              width: "100%",
              padding: "4px 16px",
              boxSizing: "border-box",
              maxHeight: 88,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 4,
              whiteSpace: "pre-line",
              margin: 0,
            }}
          >
            {currentQuestion}
          </Text>
        </Section>

        <form
          style={{
            overflow: "hidden",
            position: "relative",
            width: "100%",
          }}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <Cell
              key={value}
              style={{
                borderTop: "1px solid rgba(85, 166, 255, 0.3)",
                ...(value === 5 && {
                  borderBottom: "1px solid rgba(85, 166, 255, 0.3)",
                }),
                ...getAnswerStyles(value),
                width: "100%",
                boxSizing: "border-box",
              }}
              Component="label"
              before={
                <Selectable
                  name="group"
                  value={value.toString()}
                  checked={selectedValue === value}
                  onChange={() => animationStage === "idle" && onAnswer(value)}
                  disabled={animationStage !== "idle"}
                />
              }
              multiline
            >
              {
                [
                  "Совсем не про меня",
                  "Редко про меня",
                  "Иногда про меня",
                  "Часто про меня",
                  "Всегда про меня",
                ][value - 1]
              }
            </Cell>
          ))}
        </form>
      </List>
    </div>
  );
};
