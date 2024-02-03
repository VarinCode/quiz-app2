const model = {
  title: "Quiz-App",
  ref: "",
  date: new Date().toDateString(),
  numberOfExams: 5,
  dataset: [
    {
      number: 1,
      question: "1 + 1 = ?",
      choices: {
        a: "2",
        b: "3",
        c: "4",
        d: "5",
      },
      hint: undefined,
      correct: {
        choice: "a",
        answer: "2"
      }
    },
    {
      number: 2,
      question: "1 + 4 = ?",
      choices: {
        a: "2",
        b: "3",
        c: "4",
        d: "5",
      },
      hint: undefined,
      correct: {
        choice: "d",
        answer: "5"
      }
    },
    {
      number: 3,
      question: "1 + 9 = ?",
      choices: {
        a: "6",
        b: "7",
        c: "10",
        d: "45",
      },
      hint: undefined,
      correct: {
        choice: "c",
        answer: "10"
      }
    },
    {
      number: 4,
      question: "1 - 5 = ?",
      choices: {
        a: "34",
        b: "-1",
        c: "0",
        d: "-4",
      },
      hint: undefined, 
      correct: {
        choice: "d",
        answer: "-4"
      }
    },
    {
      number: 5,
      question: "0 + 0 = ?",
      choices: {
        a: "4",
        b: "6",
        c: "101",
        d: "0",
      },
      hint: undefined,
      correct: {
        choice: "d",
        answer: "0"
      }
    },
  ]
}

export default model;
