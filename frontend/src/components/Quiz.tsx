import {
  useState,
  useEffect,
  createContext,
  Context,
  ReactElement,
} from "react";
import axios, { AxiosResponse, HttpStatusCode } from "axios";
import Model, {
  APIResponse,
  initialModel,
  DefaultValue,
  defaultVal,
  Problems,
  Answers,
  Time,
  defaultTime,
} from "../model/model";
import Choice from "./Choice";
import Question from "./Question";
import List from "./List";
import Loading from "./Loading";
import Button from "./Button";
import ShowScore from "../pages/ShowScore";
import Timer from "./Timer";

import { NavigateFunction, useNavigate } from "react-router-dom";
import { GrNext } from "react-icons/gr";
import Swal from "sweetalert2";
import withReactContent, { ReactSweetAlert } from "sweetalert2-react-content";

export const MySwal: ReactSweetAlert = withReactContent(Swal);
export const DataContext: Context<DefaultValue> = createContext(defaultVal);
export const controller: AbortController = new AbortController();

const Quiz = (): ReactElement => {
  const [data, setData] = useState<Model>(initialModel);
  const [problems, setProblems] = useState<Problems>([]);
  const [answers, setAnswers] = useState<Answers>([]);
  const [index, setIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [time, setTime] = useState<Time>(defaultTime);

  const { VITE_BACKEND_PORT, VITE_HOST, VITE_API_ENDPOINT }: ImportMetaEnv = import.meta.env;
  const apiUrl: string = `${VITE_HOST}${VITE_BACKEND_PORT}${VITE_API_ENDPOINT}`;
  const navigate: NavigateFunction = useNavigate();

  const fetchData = async (): Promise<APIResponse<string>> => {
    setLoading(true);
    try {
      const response: AxiosResponse<APIResponse<string>> = await axios.get(
        apiUrl
      );
      const { data, status }: AxiosResponse<APIResponse<string>> = response;
      if (HttpStatusCode.Ok === status) {
        return { ...data, status: true };
      } else {
        throw new Error("เกิดข้อผิดพลาดขึ้นไม่สามารถเรียกข้อมูลได้!");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        MySwal.fire({
          title: <h1 className="font-mali">เกิดข้อผิดพลาดขึ้น</h1>,
          html: <p>{e.message}</p>,
          icon: "error",
        });
      } else {
        console.error(e)
      }
      return { result: "", status: false };
    }
  };

  useEffect((): (() => void) => {
    (async (): Promise<void> => {
      const apiRes: APIResponse<string> = await fetchData();
      const { result, status }: APIResponse<string> = apiRes;
      if (status) {
        const model: Model = JSON.parse(result);
        setData(model);
        setProblems(model.dataset);
        setTimeout((): void => setLoading(false), 1500);
      } else {
        navigate("/error");
      }
    })();

    return (): void => {
      controller.abort();
    };
  }, []);

  const handleNext = (): void => {
    if (!answers[index]) {
      MySwal.fire({
        title: <h1 className="font-mali font-bold">เกิดข้อผิดพลาดขึ้น</h1>,
        html: (
          <h5 className="font-mali">
            ไม่สามารถกดปุ่มถัดไปได้เนื่่องจากคุณยังไม่ได้ตอบคำตอบในข้อนี้
          </h5>
        ),
        icon: "warning",
        showConfirmButton: false,
        timer: 1800,
      });
    } else if (index < problems.length - 1) {
      setIndex(index + 1);
    }
  };

  const values: DefaultValue = {
    data,
    answers,
    setAnswers,
    index,
    completed,
    setCompleted,
    loading,
    setLoading,
    time,
    setTime
  };

  if (loading) {
    return (
      <DataContext.Provider value={values}>
        <Loading
          text={
            completed
              ? "กำลังคำนวณคะแนนของท่านอยู่กรุณารอสักครู่ ..."
              : "กำลังโหลดข้อมูลแบบทดสอบอยู่กรูณารอสักครู่ ..."
          }
          loading={loading}
        />
      </DataContext.Provider>
    );
  } else if (completed) {
    return (
      <DataContext.Provider value={values}>
        <ShowScore />
      </DataContext.Provider>
    );
  } else {
    return (
      <DataContext.Provider value={values}>
        <main className="absolute top-12 right-2/4 translate-x-2/4 flex flex-col items-center justify-stretch w-[380px] h-max p-8 bg-slate-200 shadow-2xl rounded-2xl">
          <Timer
            style={
              "absolute top-5 right-6 flex items-center justify-center w-max h-max text-sm text-gray-800"
            }
          />
          <header className="text-4xl text-center my-4 font-bold cursor-default">
            Quiz App
          </header>
          <div className=" self-start mt-5 w-full">
            <Question />
            <List>
              <Choice id={"a"} value={problems[index]?.choices?.a} />
              <Choice id={"b"} value={problems[index]?.choices?.b} />
              <Choice id={"c"} value={problems[index]?.choices?.c} />
              <Choice id={"d"} value={problems[index]?.choices?.d} />
            </List>
          </div>
          {index === problems.length - 1 ? (
            <Button
              text={"ส่งแบบทดสอบ"}
              style={
                "h-12 w-52 text-center bg-gradient-to-r from-slate-950 to-slate-800 hover:from-teal-500 hover:to-teal-300 hover:text-black text-slate-50 p-3 rounded-lg duration-300 ease-in active:translate-x-4"
              }
              callback={(): void => {
                if (!answers[index]) {
                  MySwal.fire({
                    title: (
                      <h1 className="font-mali font-bold">
                        เกิดข้อผิดพลาดขึ้น
                      </h1>
                    ),
                    html: (
                      <h5 className="font-mali">
                        ไม่สามารถกดปุ่มถัดไปได้เนื่่องจากคุณยังไม่ได้ตอบคำตอบในข้อนี้
                      </h5>
                    ),
                    icon: "warning",
                    showConfirmButton: false,
                    timer: 1800,
                  });
                } else {
                  setCompleted(true);
                  setLoading(true);
                  setTimeout((): void => setLoading(false), 1500);
                }
              }}
            />
          ) : (
            <div
              className="self-end w-full flex items-center justify-end"
              onClick={handleNext}
            >
              <Button
                text={"ถัดไป"}
                icon={<GrNext className="text-2xl" />}
                style={
                  "h-12 w-36 bg-gradient-to-r from-slate-950 to-slate-800 hover:from-teal-500 hover:to-teal-300 hover:text-black text-slate-50 p-3 rounded-lg flex items-center justify-center duration-300 ease-in"
                }
                callback={handleNext}
              />
            </div>
          )}
        </main>
      </DataContext.Provider>
    );
  }
};

export default Quiz;
