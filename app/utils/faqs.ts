import { AnswerOne, AnswerTwo, AnswerThree } from "~/components/Answers";
import type { Faq } from "~/types";

export const faqs: Faq[] = [
  {
    question: "What is source and binary compatibility? Why should I care?",
    answer: AnswerOne,
  },
  {
    question: "How does it work?",
    answer: AnswerTwo,
  },
  {
    question: "Who should use this tool?",
    answer: AnswerThree,
  },
];
