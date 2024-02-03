const controller = {
  getData: (req, res, data) => {
    res.status(200);
    res.type("json");
    res.json({ "result": JSON.stringify(data) })
  },
  getScore: (req, res, next, data) => {
    const { answers } = req.body;

    const computeScore = () => {
      let score = 0;
      if(answers.length > 0){
        for(let i = 0; i <= answers.length - 1; i++){
          if(answers[i].number === data.dataset[i].number){
            if(answers[i].selectChoiceIs === data.dataset[i].correct.choice || answers[i].answerIs === data.dataset[i].correct.answer){
              score += 1;
            } else {
              continue;
            }
          } else {
            return null;
          }
        }

        let average = score / data.numberOfExams;
        let level = "";

        if(score === 5){
          level = "เก่งมาก"
        } else if(score >= 3 && score <= 4){
          level = "ปานกลาง"
        } else if(score >= 1 && score <= 2){
          level = "อ่อน"
        } else {
          level = "อ่อนมาก"
        }
      
        return {
          score,
          average,
          level
        }
      } else {
        return null
      }
    }
    const result = computeScore();
    
    if(result === null){
      res.status(400);
      console.error("error")
      next();
    } else {
      res.status(200);
      res.type("json");
      res.json({ "result": result })
    }
  }
};

export default controller;