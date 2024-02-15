import { BlocksProps } from "react-loader-spinner";

export interface APIResponse<T> {
  result: T;
  status: boolean;
}

export type Problem<T = string> = {
  number: number;
  question: T;
  choices: {
    a: T;
    b: T;
    c: T;
    d: T;
  };
  hint?: string;
  correct: {
    answer: T;
    choice: T;
  };
};
export type Problems = Problem[];
export type Answer = {
  number: number;
  selectChoiceIs: string;
  answerIs: string;
  question: string;
  correctChoice: string;
  correctAnswer: string;
  isCorrect?: boolean;
  date: string;
};
export type Answers = Answer[];

export default interface Model {
  title: string;
  ref: string;
  date: string;
  numberOfExams: number;
  dataset: Problems;
}

export const initialModel: Model = {
  title: "",
  ref: "",
  date: "",
  numberOfExams: 0,
  dataset: [],
};

export interface Time {
  hours: number;
  minutes: number;
  seconds: number;
  text: string;
}

export const defaultTime: Time = { hours: 0, minutes: 0, seconds: 0, text: "" };

export interface DefaultValue {
  data: Model;
  answers: Answers;
  setAnswers: Function;
  index: number;
  completed: boolean;
  setCompleted: Function;
  loading: boolean;
  setLoading: Function;
  time: Time;
  setTime: Function;
}

export const defaultVal: DefaultValue = {
  data: initialModel,
  answers: [],
  setAnswers: function () {},
  index: 0,
  completed: false,
  setCompleted: function () {},
  loading: false,
  setLoading: function () {},
  time: defaultTime,
  setTime: function () {},
};

export const LoadingBlockProps: BlocksProps = {
  height: "200",
  width: "200",
  ariaLabel: "blocks-loading",
  wrapperClass: "blocks-wrapper",
};

export interface Result {
  score: number;
  average: number;
  level: string;
}

export interface PostData {
  id: string;
}

export interface GetQuizData<
  A extends Answers,
  K extends Result,
  T = string,
  D = number
> {
  quiz: {
    date: T;
    id: T;
    time: {
      hours: D;
      minutes: D;
      seconds: D;
      text: T;
    };
    answers: A;
    result: K;
  };
}

export const initialQuizData: GetQuizData<Answers, Result> = {
  quiz: {
    date: "",
    id: "",
    time: {
      hours: 0,
      minutes: 0,
      seconds: 0,
      text: "",
    },
    answers: [],
    result: {
      score: 0,
      average: 0,
      level: "",
    },
  },
};

// Code by: @karollion/randomid-generator
export const randomID = (idLength: number): string => {
  let id: string = "";
  const characters: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charsAmount: number = characters.length;
  for (let i: number = 0; i < idLength; i++) {
    id += characters.charAt(Math.floor(Math.random() * charsAmount));
  }
  return id;
};
