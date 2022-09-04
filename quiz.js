function Question(txt) {
  this.questionText = txt;
}

function Answers(txt) {
  this.answerText = txt;
}

let q1 = new Question('JavaScript supports');
let q2 = new Question('Which language is used for styling web pages?');
let q3 = new Question('Which is not a JavaScript Framework?');
let q4 = new Question('Which is used for Connect To Database?');
let q5 = new Question('JavaScript is a');

let a1 = new Answers('Functions');
let a2 = new Answers('CSS');
let a3 = new Answers('Django');
let a4 = new Answers('PHP');
let a5 = new Answers('Programming Language');

function questionAnswerPair(question, correctAnswer, answerChoices) {
  this.question = question;
  this.correctAnswer = correctAnswer;
  this.answerChoices = answerChoices;

  this.checkCorrectAnswer = function (userAnswer) {
    return userAnswer === this.correctAnswer.answerText;
  };
}

let qaPair1 = new questionAnswerPair(q1, a1, [
  a1,
  new Answers('XHTML'),
  new Answers('CSS'),
  new Answers('HTML'),
]);

let qaPair2 = new questionAnswerPair(q2, a2, [
  new Answers('HTML'),
  new Answers('JQuery'),
  a2,
  new Answers('XML'),
]);

let qaPair3 = new questionAnswerPair(q3, a3, [
  new Answers('Python Script'),
  new Answers('JQuery'),
  a3,
  new Answers('NodeJS'),
]);

let qaPair4 = new questionAnswerPair(q4, a4, [
  a4,
  new Answers('HTML'),
  new Answers('JS'),
  new Answers('All'),
]);

let qaPair5 = new questionAnswerPair(q5, a5, [
  new Answers('Language'),
  a5,
  new Answers('Development'),
  new Answers('All'),
]);

function Quiz(qaPairArray) {
  this.score = 0;
  this.pageIndex = 0;
  this.qaPair = qaPairArray;

  this.start = function () {
    this.attachListeners();
    this.displayProgress();
    this.displayQnOptions();
  };

  this.displayQnOptions = function () {
    this.currentQaPair = this.qaPair[this.pageIndex];
    document.getElementById('question').innerHTML = this.currentQaPair.question.questionText;
    for (let i = 0; i < 4; i++) {
      let opt = document.getElementById('choice' + i);
      opt.innerHTML = this.qaPair[this.pageIndex].answerChoices[i].answerText;
    }
  };

  this.displayProgress = function () {
    document.getElementById('progress').innerHTML = `Question ${this.pageIndex + 1} of ${
      this.qaPair.length
    }`;
  };

  this.attachListeners = function () {
    let qObj = this;
    for (let i = 0; i < 4; i++) {
      let opt = document.getElementById('choice' + i);
      opt.onclick = function (e) {
        let userAnswer = e.currentTarget.innerHTML;
        console.log(userAnswer);
        // debugger;
        let index = qObj.pageIndex;
        let qaPairObject = qObj.qaPair[index];
        let outCome = qaPairObject.checkCorrectAnswer(userAnswer);

        if (outCome) {
          qObj.score++;
        }
        qObj.next();
      };
    }
  };

  this.next = function () {
    if (this.lastPair()) {
      this.displayFinalScorePage();
    } else {
      this.pageIndex++;
      this.nextQ();
    }
  };
  this.lastPair = function () {
    return this.pageIndex === this.qaPair.length - 1;
  };

  this.displayFinalScorePage = function () {
    document.getElementById('content').style.display = 'none';
    let quizElem = document.getElementById('result');

    let ih = `<h2>Your Score is ${this.score} and percentage is ${
      (this.score / this.qaPair.length) * 100
    }%</h2>`;
    quizElem.innerHTML = ih;
  };
  this.nextQ = function () {
    this.attachListeners();
    this.displayProgress();
    this.displayQnOptions();
  };
}

let quiz = new Quiz([qaPair1, qaPair2, qaPair3, qaPair4, qaPair5]);
quiz.start();
