import fs from "fs"
import { configDotenv } from "dotenv"

configDotenv();
const { PATH_FILE } = process.env;

export const writeFile = (content) => {
  fs.writeFile(PATH_FILE, JSON.stringify(content, null, 2), (err) => {
    if(!err) console.log("เขียนไฟล์ข้อมูลสำเร็จ")
    else console.error("เกิดข้อผิดพลาดขึ้นไม่สามารถเขียนไฟล์ได้!")
  });  
}