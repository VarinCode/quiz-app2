import { ReactElement, useState, useContext, useEffect } from "react";
import axios, { HttpStatusCode, AxiosResponse } from "axios";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { DataContext } from "../components/Quiz";
import {
  DefaultValue as Context,
  APIResponse,
  Result,
  PostData,
  Answers,
  Time,
  randomID,
} from "../model/model";
import Container from "../components/Container";
import Button from "../components/Button";
import Loading from "../components/Loading";
import onlineTest from "../../public/assets/svgs/undraw_online_test_re_kyfx.svg";

const ShowScore = (): ReactElement => {
  const [score, setScore] = useState<number>(0);
  const [average, setAverage] = useState<number>(0);
  const [level, setLevel] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [id, setID] = useState<string>(randomID(10));

  const context: Context = useContext<Context>(DataContext);
  const { answers, time }: Context = context;
  const navigate: NavigateFunction = useNavigate();

  const {
    VITE_BACKEND_PORT,
    VITE_HOST,
    VITE_API_ENTPOINT_SCORE,
  }: ImportMetaEnv = import.meta.env;
  const apiUrl: string = `${VITE_HOST}${VITE_BACKEND_PORT}${VITE_API_ENTPOINT_SCORE}`;
  const controller: AbortController = new AbortController();

  interface getScore extends PostData {
    answers: Answers;
    time: Time;
  }

  const fetchScore = async (): Promise<APIResponse<Result>> => {
    try {
      const response: AxiosResponse<
        APIResponse<Result>,
        getScore
      > = await axios.post(apiUrl, { answers, time, id });
      const { data, status }: AxiosResponse<APIResponse<Result>> = response;
      if (HttpStatusCode.Ok === status) {
        return { ...data, status: true };
      } else {
        throw new Error("เกิดข้อผิดพลาดขึ้นไม่สามาถคำนวณคะแนนให้คุณได้");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      }
      return { result: { score: 0, average: 0, level: "" }, status: false };
    }
  };

  useEffect((): (() => void) => {
    (async (): Promise<void> => {
      const apiRes: APIResponse<Result> = await fetchScore();
      const { result, status }: APIResponse<Result> = apiRes;
      if (status) {
        const { score, average, level }: Result = result;
        setScore(score);
        setAverage(average);
        setLevel(level);
      } else {
        navigate("/error");
      }
    })();

    return (): void => {
      controller.abort();
    };
  }, []);

  return (
    <Container>
      {loading ? (
        <Loading
          text={"กำลังเริ่มทำแบบทดสอบใหม่อีกครั้งกรุณารอสักครู่ ..."}
          loading={loading}
        />
      ) : (
        <div className="absolute top-12 right-2/4 translate-x-2/4 flex flex-col items-center justify-center h-max w-max text-start font-bold tracking-wide p-4">
          <img
            className="w-60 h-60"
            src={onlineTest}
            alt="Online test"
            loading="lazy"
          />
          <div className="mt-6 cursor-default">
            <h1 className="font-mali text-xl">
              รหัสการสอบ :{" "}
              <span className="text-2xl mx-1 text-blue-800 font-mali">
                {id}
              </span>
            </h1>
            <h1 className="font-mali text-xl">
              คุณใช้เวลาไปทั้งหมด :{" "}
              <span className="text-2xl mx-1 text-cyan-400 font-mali">
                {time.text}
              </span>
            </h1>
            <h1 className="font-mali text-xl">
              คะแนนของคุณ :{" "}
              <span className="text-4xl mx-1 text-sky-500">{score}</span> คะแนน
            </h1>
            <h1 className="font-mali text-xl">
              ค่าเฉลี่ยของคุณ :{" "}
              <span className="text-4xl mx-1 text-yellow-400">{average}</span>
            </h1>
            <h1 className="font-mali text-xl">
              คุณอยู่ในระดับ :{" "}
              <span className="text-2xl mx-1 text-blue-900 font-mali">
                {level}
              </span>
            </h1>
          </div>
          <div className="flex items-center justify-center">
            <Button
              text={"ทำแบบทดสอบใหม่"}
              style={
                "me-2 h-[60px] w-[190px] text-sm bg-gradient-to-r from-black to-slate-800 hover:from-sky-600 hover:to-sky-400 hover:text-black text-slate-50 p-3 rounded-lg flex items-center justify-center duration-300 ease-in mt-6 shadow-xl"
              }
              callback={(): void => {
                setLoading(true);
                setID(randomID(10));
                setTimeout((): void => {
                  setLoading(false);
                  navigate("/");
                }, 1800);
              }}
            />
            <Button
              text={"ตรวจสอบแบบทดสอบ"}
              style={
                "ms-2 h-[60px] w-[190px] text-sm bg-gradient-to-r from-black to-slate-800 hover:from-purple-800 hover:to-purple-400 hover:text-black text-slate-50 p-3 rounded-lg flex items-center justify-center duration-300 ease-in mt-6 shadow-xl"
              }
              callback={(): void => {
                setLoading(true);
                setTimeout((): void => {
                  setLoading(false);
                  navigate("/view");
                }, 1800);
              }}
            />
          </div>
        </div>
      )}
    </Container>
  );
};

export default ShowScore;
