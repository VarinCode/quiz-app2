import { ReactElement, useContext, useState, useEffect } from "react";
import { DataContext } from "./Quiz";
import { DefaultValue as Context, Problem } from "../model/model";

const Question = (): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const context: Context = useContext<Context>(DataContext);
  const idx: number = context.index;
  const data: Problem = context.data.dataset[idx];

  useEffect(():void => {
    setOpen(false);
  } , [idx]);

  return (
    <div className="font-mali">
      <div className="text-lg font-bold pointer-events-none">
        <span>{data?.number}.) </span>
        <span className="ms-3 font-mali">{data?.question}</span>
      </div>
      <div className="mt-2 w-full">
        <p
          className="text-xs text-gray-500 font-mali cursor-pointer"
          onClick={(): void => {
            setOpen(!open);
          }}
        >
          {!open ? "ดูคำใบ้" : "ปิดคำใบ้"}
        </p>
        {open && <p className="font-mali text-sm text-yellow-500 bg-gradient-to-l from-stone-800 to-stone-950 mt-1 p-2">{data?.hint || `ข้อ ${data?.number} นี้ไม่มีคำใบ้` }</p>}
      </div>
    </div>
  );
};

export default Question;
