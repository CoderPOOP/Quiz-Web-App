const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Which of  the following  connects the  pharynx to the  stomach? ',
    answers: [
      { text: 'Large intestine', correct: false },
      { text: 'Oesophagus', correct: true },
      { text: 'Caecum', correct: false },
      { text: 'Small intestine', correct: false }
    ]
  },
  {
    question: 'Who coined the term  ‘cell’?',
    answers: [
      { text: 'Matthias  Schleiden', correct: false },
      { text: 'Theodor  Schwann’', correct: false },
      { text: 'Charles Darwin', correct: false },
      { text: 'Robert Hooke', correct: true }
    ]
  },
  {
    question: 'Transpiration is a function of  the  __________.',
    answers: [
      { text: 'Stomata of the Leaves', correct: true },
      { text: 'Stem', correct: false },
      { text: 'Flower', correct: false },
      { text: 'All of these', correct: false }
    ]
  },
  {
    question: 'Which of  the following  is not  good  for  the eyes?',
    answers: [
      { text: 'Eating vegetables', correct: false},
      { text: 'Looking at the Sun directly', correct: true },
      { text: 'Washing your eyes with cold water', correct: false },
      { text: 'Taking breaks while working on a computer', correct: false }
    ]
  },
  {
    question: 'The outermost part of a rose flower is ________',
    answers: [
      { text: 'Sepals', correct: true },
      { text: 'Petals', correct: false },
      { text: 'Stamen', correct: false },
      { text: 'Style', correct: false }
    ]
  },
  {
    question: 'Which of  these  connects the  leaf  to the stem?',
    answers: [
      { text: 'Lamina', correct: false },
      { text: 'Veins', correct: false },
      { text: 'Midrib', correct: false },
      { text: 'Petiole', correct: true }
    ]
  },
]