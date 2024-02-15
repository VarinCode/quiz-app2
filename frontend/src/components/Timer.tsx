import { ReactElement, FC, useContext, useState, useEffect } from "react";
import { DataContext } from "./Quiz";
import { DefaultValue as Context } from "../model/model";
import { MdOutlineAccessTimeFilled } from "react-icons/md";

interface TimerProps {
  style: string;
}

const Timer: FC<TimerProps> = ({ style }): ReactElement => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const context: Context = useContext<Context>(DataContext);

  useEffect((): void => {
    if (seconds === 60) {
      setMinutes((m: number): number => m + 1);
      setSeconds(0);
    }
    if (minutes === 60) {
      setHours((h: number): number => h + 1);
      setMinutes(0);
    }
    context.setTime({
      hours,
      minutes,
      seconds,
      text: hours === 0
          ? minutes === 0
            ? `${seconds} วินาที`
            : `${minutes} นาที ${seconds} วินาที`
          : `${hours} ชั่วโมง ${minutes} นาที ${seconds} วินาที`,
    });
  }, [seconds]);

  useEffect((): void => {
    const interval: NodeJS.Timeout = setInterval((): void => {
      setSeconds((s: number): number => s + 1);
      if(context.completed){
        clearInterval(interval);
      }
    }, 1000);
  }, []);

  return (
    <div className={style}>
      <MdOutlineAccessTimeFilled className="me-1"/>
      <p className="font-mali">{hours === 0 ? "" : `${hours}:`}</p>
      <p className="font-mali">{minutes === 0 ? "" : `${minutes}:`}</p>
      <p className="font-mali">{seconds === 0 ? "" : `${seconds}`}</p>
    </div>
  );
};

export default Timer;
