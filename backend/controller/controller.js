import { writeFile, readFile } from "./file.js";

const controller = {
  getData: (req, res, data) => {
    res.status(200);
    res.type("json");
    res.json({ result: JSON.stringify(data) });
  },
  getScore: (req, res, next, data) => {
    const { answers, time, id } = req.body;

    const computeScore = () => {
      let score = 0;
      if (answers.length > 0) {
        for (let i = 0; i <= answers.length - 1; i++) {
          if (answers[i].number === data.dataset[i].number) {
            if (
              answers[i].selectChoiceIs === data.dataset[i].correct.choice ||
              answers[i].answerIs === data.dataset[i].correct.answer
            ) {
              score += 1;
            }
            answers[i].isCorrect =
              answers[i].correctChoice === answers[i].selectChoiceIs &&
              answers[i].correctAnswer === answers[i].answerIs;
          } else {
            return null;
          }
        }

        let average = score / data.numberOfExams;
        let level = "";

        if (score === 5) {
          level = "เก่งมาก";
        } else if (score >= 3 && score <= 4) {
          level = "ปานกลาง";
        } else if (score >= 1 && score <= 2) {
          level = "อ่อน";
        } else {
          level = "อ่อนหัด";
        }

        return {
          score,
          average,
          level,
        };
      } else {
        return null;
      }
    };
    const result = computeScore();

    const dataFile = {
      quiz: {
        date: new Date().toUTCString(),
        id,
        time,
        answers,
        result,
      },
    };
    writeFile(id, dataFile);

    if (result === null) {
      res.status(400);
    } else {
      res.status(200);
      res.type("json");
      res.json({ result: result });
    }
  },
  getQuizData: (req, res) => {
    readFile(req.body.id, (err, data) => {
      if (!err) {
        console.log("อ่านไฟล์ข้อมูลสำเร็จ");
        if (data) {
          // console.log(data);
          res.type("json");
          res.status(200);
          res.json({ result: JSON.stringify(data) });
        } else {
        }
      } else {
        console.error("ไม่สามรถอ่านไฟล์ข้อมูลได้!");
        res.status(400);
        res.json({ result: null });
        return;
      }
    });
  },
};

export default controller;
