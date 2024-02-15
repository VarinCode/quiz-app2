import { ReactElement, useState, useEffect, ChangeEvent, FC, useRef, MutableRefObject } from "react";
import axios, { AxiosResponse, HttpStatusCode, AxiosError } from "axios";
import {
  APIResponse,
  PostData,
  GetQuizData,
  Answers,
  Answer,
  Result,
  initialQuizData,
} from "../model/model";
import { controller, MySwal } from "../components/Quiz";
import Loading from "../components/Loading";
import Container from "../components/Container";
import Button from "../components/Button";
import uuid from "react-uuid";
import doneChecking from "../../public/assets/svgs/undraw_done_checking_re_6vyx.svg"

interface CardProps {
  formData: GetQuizData<Answers, Result>;
}

const Card: FC<CardProps> = ({ formData }): ReactElement => {
  const {
    quiz: {
      id,
      date,
      time: { hours, minutes, seconds, text },
      result: { score, average, level },
      answers,
    },
  }: GetQuizData<Answers, Result> = formData;

  return (
    <div className="flex flex-col w-[460px] w-max-[490px] w-min-[320px] mx-auto font-mali mt-12 leading-7">
      <h4>รหัส : {id}</h4>
      <h4>วันที่ทำแบบทดสอบ : {date}</h4>
      <h4>ใช้เวลาไปทั้งหมด : {text}</h4>
      <div>
        <p>ชั่วโมง : {hours}</p>
        <p>นาที : {minutes}</p>
        <p>วินาที : {seconds}</p>
      </div>
      <div>
        <h4>คะแนน : {score} คะแนน</h4>
        <h4>ค่าเฉลี่ย : {average}</h4>
        <h4>ระดับ : {level}</h4>
      </div>
      <details open={false} className="mt-5 cursor-default">
        <summary className="cursor-pointer hover:text-teal-400 hover:underline">ดูคำตอบที่ตอบทั้งหมด</summary>
        {answers.map(
          (item: Answer): ReactElement => (
            <div className="my-8 p-8 bg-slate-300 bg-opacity-40 rounded-xl shadow-lg" key={uuid()}>
              <h5 className="font-bold text-xl text-slate-900 text-wrap">
                {item.number}.) {item.question}
              </h5>
              <div className=" leading-6 mt-3">
                <h5>คำตอบที่คุณตอบ : {item.answerIs}</h5>
                <h5>คุณตอบ {item.isCorrect ? <span className="text-emerald-600 font-bold">ถูก</span> : <span className="text-rose-600 font-bold">ผิด</span>}</h5>
                {!item.isCorrect && (
                  <h5>คำตอบที่ถูกต้องคือ <span className="text-green-600">{item.correctAnswer}</span></h5>
                )}
              </div>
            </div>
          )
        )}
      </details>
    </div>
  );
};

const ViewQuiz = (): ReactElement => {
  const [data, setData] =
    useState<GetQuizData<Answers, Result>>(initialQuizData);
  const [id, setId] = useState<string>("");
  const [click, setClick] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const inputRef:MutableRefObject<HTMLInputElement> = useRef() as MutableRefObject<HTMLInputElement>;

  const {
    VITE_HOST,
    VITE_BACKEND_PORT,
    VITE_API_ENTPOINT_QUIZ,
  }: ImportMetaEnv = import.meta.env;
  const apiUrl: string = `${VITE_HOST}${VITE_BACKEND_PORT}${VITE_API_ENTPOINT_QUIZ}`;

  const fetchQuiz = async (): Promise<APIResponse<string>> => {
    try {
      const response: AxiosResponse<
        APIResponse<string>,
        PostData
      > = await axios.post(apiUrl, { id });
      const { data, status } = response;
      if (HttpStatusCode.Ok === status) {
        return { ...data, status: true };
      } else {
        throw new Error(
          "เกิดข้อผิดพลาดขึ้นไม่สามารถอ่านไฟล์ข้อมูลใน server ได้"
        );
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        if (e instanceof AxiosError) {
          console.error(e);
        } else {
          MySwal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาดขึ้น",
            text: e.message,
          });
        }
      } else {
        console.error(e);
      }
      return { result: "", status: false };
    }
  };

  useEffect(():void => {
    inputRef.current.focus();
  } , []);

  useEffect((): (() => void) => {
    let idLength: number = 10;
    let timeout: number = 1300;

    if (click && id.length === idLength) {
      setLoading(true);
      (async (): Promise<string> => {
        const apiRes: APIResponse<string> = await fetchQuiz();
        const { result, status }: APIResponse<string> = apiRes;
        if (status && result !== "") {
          const { parse }: JSON = JSON;
          const jsonData: GetQuizData<Answers, Result> = parse(parse(result));
          setData(jsonData);
          setSuccess(true);
          return "ค้นหาข้อมูลสำเร็จ";
        } else {
          setSuccess(false);
          throw "เกิดข้อผิดพลาดขึ้น";
        }
      })()
        .then((result: string): void => {
          setTimeout((): void => {
            MySwal.fire({
              icon: "success",
              title: <h1 className="font-mali">{result}</h1>,
              timer: 1500,
              showConfirmButton: false,
            });
          }, timeout);
        })
        .catch((reason: string): void => {
          setTimeout((): void => {
            MySwal.fire({
              icon: "error",
              title: <h1 className="font-mali">{reason}</h1>,
              html: (
                <p className="font-mali">
                  รหัสแบบทดสอบ {id} ไม่มีอยู่ใน server
                </p>
              ),
              timer: 1500,
              showConfirmButton: false,
            });
          }, timeout);
        })
        .finally((): void => {
          setTimeout((): void => setLoading(false), 2200);
        });
    } else if (click && id.length !== idLength) {
      setTimeout((): void => {
        MySwal.fire({
          icon: "error",
          title: <h1 className="font-mali">เกิดข้อผิดพลาดขึ้น</h1>,
          html: (
            <p className="font-mali">รหัสแบบทดสอบ {id} ไม่มีอยู่ใน server</p>
          ),
          timer: 1500,
          showConfirmButton: false,
        });
      }, 600);
    }

    return (): void => {
      setClick(false);
      controller.abort();
    };
  }, [click]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setId(e.target.value);
  };

  if (loading) {
    return (
      <Container>
        <Loading
          text={"กำลังค้นหาข้อมูลแบบทดสอบกรุณารอสักครู่ ..."}
          loading={loading}
        />
      </Container>
    );
  } else {
    return (
      <Container>
        <div className="absolute right-2/4 top-24 translate-x-2/4 h-max">
          <img className="w-[250px] h-[250px] mx-auto mb-8" src={doneChecking} alt="done-checking" />
          <h1 className="text-center text-xl font-mali">
            กรอกรหัสแบบทดสอบเพื่อค้นหาข้อมูล
          </h1>
          <div className="mt-6 flex flex-col items-center justify-stretch">
            <input
              placeholder="ใส่รหัสแบบทดสอบ"
              type="text"
              className=" bg-gray-300 text-black border border-slate-950 w-[340px] h-[45px] font-mali text-lg p-2 focus:border-2 text-center"
              onChange={handleChange}
              maxLength={30}
              ref={inputRef}
            />
            <Button
              text={"ตรวจสอบ"}
              style={
                "mt-8 w-[170px] h-[50px] shadow-xl active:scale-95 active:translate-y-2 bg-gradient-to-r transition-all duration-300 ease-in-out text-slate-50 from-slate-900 to-slate-700 hover:from-blue-700 hover:to-purple-600 rounded-xl"
              }
              callback={(): void => setClick(true)}
            />
          </div>
          {success && <Card formData={data} />}
        </div>
      </Container>
    );
  }
};

export default ViewQuiz;
