import { ReactElement, useContext, useState, useEffect } from "react";
import { DataContext } from "./Quiz";
import { DefaultValue as Context, Problem } from "../model/model";
import { MdOutlineArrowRight, MdOutlineArrowDropDown } from "react-icons/md";

const Question = (): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const context: Context = useContext<Context>(DataContext);
  const idx: number = context.index;
  const data: Problem = context.data.dataset[idx];

  useEffect((): void => {
    setOpen(false);
  }, [idx]);

  return (
    <div className="font-mali">
      <div className="text-lg font-bold pointer-events-none">
        <span>{data?.number}.) </span>
        <span className="ms-3 font-mali">{data?.question}</span>
      </div>
      <div className="mt-2 w-full">
        {!open ? (
          <p
            className="text-xs text-gray-500 font-mali cursor-pointer inline-flex"
            onClick={(): void => {
              setOpen(!open);
            }}
          >
            <span className="text-lg text-center text-gray-500">
              <MdOutlineArrowRight />
            </span>
            ดูคำใบ้
          </p>
        ) : (
          <p
            className="text-xs text-gray-500 font-mali cursor-pointer inline-flex"
            onClick={(): void => {
              setOpen(!open);
            }}
          >
            <span className="text-lg text-center text-gray-500">
              <MdOutlineArrowDropDown />
            </span>
            ปิดคำใบ้
          </p>
        )}
        {open && (
          <p className="font-mali text-sm text-emerald-600 bg-gradient-to-l from-stone-800 to-stone-950 mt-1 p-2 select-none pointer-events-none">
            {data?.hint || `ข้อ ${data?.number} นี้ไม่มีคำใบ้`}
          </p>
        )}
      </div>
    </div>
  );
};

export default Question;
