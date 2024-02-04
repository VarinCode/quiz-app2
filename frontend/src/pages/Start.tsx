import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { MySwal } from "../components/Quiz";
import reactLogo from "../../public/assets/react.svg";
import Button from "../components/Button";
import Container from "../components/Container";
// import ToggleTheme from "../components/ToggleTheme";

const Start = (): ReactElement => {
  return (
    <Container>
      {/* <ToggleTheme /> */}
      <div className="absolute right-2/4 top-20 translate-x-2/4 w-[450px] h-[400px] p-12 flex flex-col items-center justify-center bg-slate-300 rounded-xl shadow-2xl border-[16px] border-slate-100">
        <div>
          <img
            src={reactLogo}
            alt="react-logo"
            className="h-32 w-32 rounded-full bg-black p-3 cursor-pointer animate-spin-slow ring-4 ring-offset-8 ring-offset-slate-300 ring-slate-950"
            onClick={(): void => {
              MySwal.fire({
                icon: "info",
                title: "React-Project",
                html: (
                  <p className="font-mali">
                    โปรเจคนี้ทำเกี่ยวกับเว็บไซต์ Quiz App เว็บทำแบบทดสอบ
                  </p>
                ),
                footer: (
                  <footer className="font-mali text-sky-400 cursor-default">
                    ติดตามผลงานต่างๆได้ที่{" "}
                    <a
                      href="https://github.com/VarinCode"
                      target="_blank"
                      className="hover:underline visited:text-purple-700"
                    >
                      github.com
                    </a>
                  </footer>
                ),
              });
            }}
          />
        </div>
        <Link to={"/quiz"}>
          <div className="mt-8">
            <Button
              text={"คลิกเพื่อเริ่มทำแบบทดสอบ JavScript"}
              style={
                "text-salte-50 bg-gradient-to-r from-slate-950 to-slate-900 text-slate-50 text-center w-26 h-12 p-3 rounded-lg ease-linear duration-300 hover:from-teal-500 hover:to-teal-200 hover:text-black shadow-xl hover:ring-offset-[5px] hover:ring-2 ring-offset-slate-300 hover:ring-teal-100 font-bold text-md font-mali"
              }
            />
          </div>
        </Link>
      </div>
    </Container>
  );
};

export default Start;
