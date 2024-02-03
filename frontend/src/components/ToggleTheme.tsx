import { ReactElement, useState, useEffect } from "react";
import Button from "./Button";
import { IoMdSunny, IoMdMoon } from "react-icons/io";

const ToggleTheme = ({ hidden }: { hidden?: boolean }): ReactElement => {
  const [changedTheme, setChangedTheme] = useState<boolean>(false);
  const [isLight, setIsLight] = useState<boolean>((localStorage.getItem("theme") as string) === "lightMode");
  const body: HTMLBodyElement = document.querySelector("body")!;

  useEffect((): void => {
    isLight
      ? localStorage.setItem("theme", "darkMode")
      : localStorage.setItem("theme", "lightMode");
    body.id = localStorage.getItem("theme") as string;
  }, [changedTheme]);

  return (
    <div className="fixed top-8 right-12">
      <div
        className={`flex items-center ${hidden && "hidden"} ${
          isLight
            ? "justify-end"
            : "justify-start"
        } w-28 h-12 py-3 px-1 bg-gradient-to-r from-white to-black duration-300 ease-in-out rounded-3xl`}
      >
        <Button
          icon={
            isLight
            ? (
              <IoMdMoon className="text-sky-950 mx-auto" />
            ) : (
              <IoMdSunny className="text-orange-400 mx-auto" />
            )
          }
          style={`w-[40px] h-[40px] ${isLight ? "bg-slate-50" : "bg-neutral-950"} rounded-full cursor-pointer text-center text-2xl`}
          callback={(): void => {
            setIsLight((localStorage.getItem("theme") as string) === "lightMode");
            setChangedTheme(!changedTheme);
          }}
        />
      </div>
    </div>
  );
};

export default ToggleTheme;
