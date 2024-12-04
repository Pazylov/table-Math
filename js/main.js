const contentBg = document.querySelector('.math__content')
const questionElement = document.querySelector('.math__question')
const options = document.querySelectorAll('.answers button')

let currentCorrectAnswer = generateAnswer()

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateAnswer() {
	const num1 = 2
	const num2 = getRandomNumber(1, 10)
	const correctAnswer = num1 * num2

	questionElement.textContent = `${num1} x ${num2} = ?`

	const answers = [correctAnswer]
	while (answers.length < 4) {
		const wrongAnswer = getRandomNumber(2, 20)
		if (!answers.includes(wrongAnswer)) {
			answers.push(wrongAnswer)
		}
	}

	answers.sort(() => Math.random() - 0.5)

	options.forEach((button, index) => {
		button.textContent = answers[index]
		button.setAttribute('data-answer', answers[index])
	})

	return correctAnswer
}

options.forEach(button => {
	button.addEventListener('click', handleOptionClick)
})

function handleOptionClick(event) {
	const selectedAnswer = Number(event.target.getAttribute('data-answer'))

	const questionText = questionElement.textContent
	questionElement.textContent = questionText.replace('?', selectedAnswer)

	if (selectedAnswer === currentCorrectAnswer) {
		contentBg.style.backgroundColor = '#14ee14'
	} else {
		contentBg.style.backgroundColor = '#cd1010'
	}

	setTimeout(() => {
		contentBg.style.backgroundColor = ''
		currentCorrectAnswer = generateAnswer()
	}, 1000)
}
