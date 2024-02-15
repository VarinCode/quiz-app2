import {
  ReactElement,
  FC,
  useRef,
  MutableRefObject,
  useContext,
  useEffect,
} from "react";
import { DataContext } from "./Quiz";
import { DefaultValue as Context, Answers, Answer } from "../model/model";

interface ChoiceProps {
  id: string;
  value: string;
}

const Choice: FC<ChoiceProps> = ({ id, value }): ReactElement => {
  const context: Context = useContext<Context>(DataContext);
  const { index }: Context = context;
  const inputRef: MutableRefObject<HTMLInputElement> =
    useRef() as MutableRefObject<HTMLInputElement>;

  useEffect((): void => {
    inputRef.current.checked = false;
  }, [index]);

  const handleChange = (): void => {
    context.setAnswers((prevAnss: Answers): Answers => {
      const newAnswer: Answer = {
        number: context.data.dataset[index].number,
        answerIs: value,
        selectChoiceIs: id.toLowerCase(),
        question: context.data.dataset[index].question,
        correctChoice: context.data.dataset[index].correct.choice,
        correctAnswer: context.data.dataset[index].correct.answer,
        isCorrect: undefined,
        date: new Date().toUTCString(),
      };
      prevAnss[index] = newAnswer;
      return prevAnss;
    });
  };

  return (
    <li
      className={`my-5 w-full h-14 bg-slate-100 rounded-lg cursor-pointer ease-linear duration-300 border-2 border-gray-950 hover:shadow-xl hover:border-teal-500`}
      onClick={(): void => {
        inputRef.current.checked = true;
        handleChange();
      }}
    >
      <span className="flex items-center justify-start text-center p-3">
        <input
          className="accent-sky-600 w-6 h-6 me-4 cursor-pointer"
          ref={inputRef}
          type="radio"
          name="choice"
          value={value}
          onChange={handleChange}
          id={id}
        />
        <label className="text-lg text-start font-medium font-mali" htmlFor={id}>
          {value}
        </label>
      </span>
    </li>
  );
};

export default Choice;
