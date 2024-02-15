import fs from "fs"
import { configDotenv } from "dotenv"

configDotenv();
const { PATH_FILE } = process.env;

export const writeFile = (fileName, content) => {
  fs.appendFile(`${PATH_FILE}data-${fileName}.json`, JSON.stringify(content, null, 2), (err) => {
    if(!err) console.log("เขียนไฟล์ข้อมูลสำเร็จ")
    else console.error("เกิดข้อผิดพลาดขึ้นไม่สามารถเขียนไฟล์ได้!");
  });  
}

export const readFile = (id, callback) => {
  fs.readFile(`${PATH_FILE}data-${id}.json`, "utf8", callback);
}