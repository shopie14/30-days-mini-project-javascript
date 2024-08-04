const questions = [
  {
    question:
      "Jika X adalah 2/3 dari Y dan Z adalah 3/4 dari X, maka berapakah Z jika Y adalah 24?",
    answers: [
      { text: "12", correct: false },
      { text: "16", correct: true },
      { text: "18", correct: false },
      { text: "20", correct: false },
    ],
  },
  {
    question:
      "Sebuah buku dibaca selama 3 jam per hari. Berapa lama waktu yang diperlukan untuk membaca buku tersebut jika total waktu membacanya adalah 36 jam?",
    answers: [
      { text: "9 hari", correct: true },
      { text: "10 hari", correct: false },
      { text: "11 hari", correct: false },
      { text: "12 hari", correct: false },
    ],
  },
  {
    question:
      "Jika 5 orang dapat menyelesaikan pekerjaan dalam 10 hari, berapa lama waktu yang dibutuhkan oleh 10 orang untuk menyelesaikan pekerjaan yang sama?",
    answers: [
      { text: "2 hari", correct: false },
      { text: "3 hari", correct: false },
      { text: "5 hari", correct: true },
      { text: "10 hari", correct: false },
    ],
  },
  {
    question:
      "Jika sebuah bilangan dikali dengan 4 dan kemudian dikurangi dengan 3 hasilnya adalah 17, berapakah bilangan tersebut?",
    answers: [
      { text: "4", correct: false },
      { text: "5", correct: true },
      { text: "6", correct: false },
      { text: "7", correct: false },
    ],
  },
  {
    question:
      "Dalam suatu barisan aritmatika, suku pertama adalah 3 dan beda setiap suku adalah 5. Berapakah suku ke-10 dari barisan tersebut?",
    answers: [
      { text: "43", correct: true },
      { text: "48", correct: false },
      { text: "53", correct: false },
      { text: "58", correct: false },
    ],
  },
  {
    question:
      "Sebuah kotak berisi 5 bola merah dan 7 bola biru. Jika diambil satu bola secara acak, berapa probabilitas mendapatkan bola merah?",
    answers: [
      { text: "5/12", correct: true },
      { text: "7/12", correct: false },
      { text: "1/2", correct: false },
      { text: "5/7", correct: false },
    ],
  },
  {
    question:
      "Jika sebuah sudut pada segitiga adalah 40 derajat dan sudut lainnya adalah 60 derajat, berapa besar sudut ketiga?",
    answers: [
      { text: "80 derajat", correct: false },
      { text: "60 derajat", correct: false },
      { text: "70 derajat", correct: true },
      { text: "90 derajat", correct: false },
    ],
  },
  {
    question: "Berapa hasil dari 25% dari 200?",
    answers: [
      { text: "50", correct: true },
      { text: "75", correct: false },
      { text: "100", correct: false },
      { text: "150", correct: false },
    ],
  },
  {
    question:
      "Sebuah perusahaan memiliki rasio pekerja pria dan wanita 3:2. Jika jumlah pekerja wanita adalah 40, berapa jumlah pekerja pria?",
    answers: [
      { text: "60", correct: true },
      { text: "80", correct: false },
      { text: "100", correct: false },
      { text: "120", correct: false },
    ],
  },
  {
    question:
      "Jika sebuah mobil melaju dengan kecepatan rata-rata 60 km/jam, berapa waktu yang diperlukan untuk menempuh jarak 240 km?",
    answers: [
      { text: "2 jam", correct: false },
      { text: "3 jam", correct: false },
      { text: "4 jam", correct: true },
      { text: "5 jam", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
  nextButton.addEventListener("click", startQuiz);
}

startQuiz();
