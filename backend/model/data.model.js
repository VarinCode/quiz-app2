const model = {
  title: "Quiz-App",
  ref: "คิดโจทย์เอง",
  date: new Date().toUTCString(),
  numberOfExams: 5,
  dataset: [
    {
      number: 1,
      question: 'console.log("Hello World!") // คำสั่งนี้จะแสดงผลอะไร',
      choices: {
        a: 'Hello World!',
        b: '"Hello World!"',
        c: "Hello",
        d: "ไม่รู้"
      },
      hint: "แสดงข้อความที่อยู่ใน method log ทั้งหมด",
      correct: {
        choice: "a",
        answer: "Hello World!"
      }
    },
    {
      number: 2,
      question: 'let a = 3; let b = 2; console.log("a + b = " + a + b);',
      choices: {
        a: "5",
        b: "a + b = 5",
        c: "32",
        d: "a + b = 32"
      },
      hint: "ข้อความที่เป็น string จะเชื่อมกับผลลัพธ์ของตัวเลข",
      correct: {
        choice: "b",
        answer: "a + b = 5"
      }
    },
    {
      number: 3,
      question: 'const myString = "ข้อความ"; // เราสามารถเปลี่ยนค่าใน myString ได้หรือไม่เพราะเหตุได',
      choices: {
        a: "ได้เพราะเป็นตัวแปรธรรมดา",
        b: "ได้เพราะสามารถเปลี่ยนค่าได้",
        c: "ไม่ได้เพราะเป็นข้อความ",
        d: "ไม่ได้เพราะเป็นค่าคงที่"
      },
      hint: "ใช้ keyword const คือ การกำหนดค่าคงที่ไม่ใช้ตัวแปร",
      correct: {
        choice: "d",
        answer: "ไม่ได้เพราะเป็นค่าคงที่"
      }
    },
    {
      number: 4,
      question: '(12 - "abcd") / 3 // จะมีค่าออกมาเป็นค่าอะไร',
      choices: {
        a: "4",
        b: "null",
        c: "NaN",
        d: "undefined",
      },
      hint: "ไม่สามารถคำนวณหรือหาค่าได้", 
      correct: {
        choice: "c",
        answer: "NaN"
      }
    },
    {
      number: 5,
      question: "((true + true - false) * (true + true)) / 2 // มีค่าเป็นอะไร",
      choices: {
        a: "null",
        b: "NaN",
        c: "4",
        d: "2",
      },
      hint: "true มีค่าเท่ากับ 1 false มีค่าเท่ากับ 0",
      correct: {
        choice: "d",
        answer: "2"
      }
    },
  ]
}

export default model;
