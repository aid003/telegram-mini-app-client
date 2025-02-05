"use client";

import {
  Cell,
  List,
  Section,
  Selectable,
  Text,
} from "@telegram-apps/telegram-ui";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// Интерфейс для пропсов секции вопроса
interface QuestionSectionProps {
  animationStage: "idle" | "exiting" | "entering";
}

// Интерфейс для пропсов ячейки с ответом
interface AnswerCellProps {
  animationStage: "idle" | "exiting" | "entering";
  index: number;
  isLast: boolean;
}

// Контейнер, занимающий всю высоту экрана
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  width: 100%;
`;

// Обёртка для списка, растягивающаяся на всё доступное пространство
const StyledList = styled(List)`
  flex: 1;
`;

// Секция с вопросом с эффектом масштабирования и изменением прозрачности
const QuestionSection = styled(Section)<QuestionSectionProps>`
  padding: 10px 0;
  background-color: var(--tg-theme-secondary-bg-color);
  margin-bottom: 6px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 56px;
  overflow: hidden;
  transition: transform 0.25s ease-in-out, opacity 0.25s ease-in-out;
  transform: ${({ animationStage }: QuestionSectionProps) =>
    animationStage === "exiting"
      ? "scale(1.05)"
      : animationStage === "entering"
      ? "scale(0.95)"
      : "scale(1)"};
  opacity: ${({ animationStage }: QuestionSectionProps) =>
    animationStage === "idle" ? 1 : 0};

  @media (max-height: 600px) {
    min-height: 50px;
  }
`;

// Текст вопроса с адаптивными размерами
const QuestionText = styled(Text)`
  font-size: 16px;
  text-align: center;
  color: var(--tg-theme-text-color);
  width: 100%;
  padding: 20px 16px;
  box-sizing: border-box;
  max-height: 120px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  white-space: pre-line;
  margin: 0;

  @media (max-height: 600px) {
    font-size: 14px;
    padding: 10px 8px;
  }
`;

// Форма для вариантов ответов
const AnswersForm = styled.form`
  overflow: hidden;
  position: relative;
  width: 100%;
`;

// Ячейка с ответом с эффектом горизонтального сдвига и изменения прозрачности
const AnswerCell = styled(Cell)<AnswerCellProps>`
  border-top: 1px solid rgba(85, 166, 255, 0.3);
  width: 100%;
  box-sizing: border-box;
  ${({ isLast }: AnswerCellProps) =>
    isLast &&
    `
    border-bottom: 1px solid rgba(85, 166, 255, 0.3);
  `}
  transition: transform 0.25s ease-out, opacity 0.25s ease-out;
  transition-delay: ${({ index }: AnswerCellProps) => `${index * 30}ms`};
  opacity: ${({ animationStage }: AnswerCellProps) =>
    animationStage === "idle" ? 1 : 0};
  transform: ${({ animationStage }: AnswerCellProps) =>
    animationStage === "exiting"
      ? "translateX(10px)"
      : animationStage === "entering"
      ? "translateX(-10px)"
      : "translateX(0)"};
  position: relative;
`;

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
        setTimeout(() => setAnimationStage("idle"), 250);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [question]);

  return (
    <Container ref={containerRef}>
      <StyledList>
        <QuestionSection animationStage={animationStage}>
          <QuestionText weight="2">{currentQuestion}</QuestionText>
        </QuestionSection>
        <AnswersForm>
          {[1, 2, 3, 4, 5].map((value) => (
            <AnswerCell
              key={`${question}-${value}`}
              animationStage={animationStage}
              index={value}
              isLast={value === 5}
              Component="label"
              before={
                <Selectable
                  name={`group-${question}`}
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
            </AnswerCell>
          ))}
        </AnswersForm>
      </StyledList>
    </Container>
  );
};
