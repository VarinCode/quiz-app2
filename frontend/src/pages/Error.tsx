import { ReactElement, useEffect, FC } from 'react'
import Container from "../components/Container";
import cancel from "../../public/assets/svgs/undraw_cancel_re_pkdm.svg"
import { MySwal } from '../components/Quiz';

interface ErrorProps {
  text?: string
}

const Error:FC<ErrorProps> = ({ text }):ReactElement => {
  useEffect(():void => {
    MySwal.fire({
      icon: "error",
      title: <h1 className="font-mali">เกิดข้อผิดพลาดขึ้น</h1>,
      html: <p className="font-mali">ไม่สามารถใช้งานเว็บได้ในตอนนี้โปรดลองเข้าใช้งานเว็บใหม่อีกครั้ง</p>
    })
  } , []);

  return (
    <Container>
        <div className="absolute top-20 right-2/4 translate-x-2/4 w-max h-max flex flex-grow flex-col items-center justify-center">
          <img src={cancel} alt="cancel" className="w-60 h-60"/>
          <h3 className="font-mali text-2xl mt-10">โปรดลองเข้าเว็บใหม่อีกครั้ง</h3>
          {!!text && <h3 className="font-mali text-2xl mt-2">{text}</h3>}          
        </div>
    </Container>
  )
}

export default Error