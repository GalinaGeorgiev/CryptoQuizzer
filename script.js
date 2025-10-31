let current = 0;
let score = 0;
let questions = [];

async function loadQuestions() {
  const res = await fetch('questions.json');
  questions = await res.json();
  showQuestion();
}

function showQuestion() {
  const q = questions[current];
  document.getElementById('question').textContent = q.question;
  const answersDiv = document.getElementById('answers');
  answersDiv.innerHTML = '';

  q.answers.forEach((a, i) => {
    const btn = document.createElement('div');
    btn.className = 'answer';
    btn.textContent = a;
    btn.onclick = () => selectAnswer(btn, i === q.correct);
    answersDiv.appendChild(btn);
  });
}

function selectAnswer(el, correct) {
  document.querySelectorAll('.answer').forEach(a => a.style.pointerEvents = 'none');
  el.classList.add(correct ? 'correct' : 'wrong');
  if (correct) score++;
  document.getElementById('next-btn').disabled = false;
}

document.getElementById('next-btn').addEventListener('click', () => {
  current++;
  document.getElementById('next-btn').disabled = true;

  if (current < questions.length) {
    showQuestion();
  } else {
    document.getElementById('quiz').innerHTML = `<h2>🏁 Quiz Finished!</h2><p>Your score: ${score}/${questions.length}</p>`;
  }
});

document.addEventListener('DOMContentLoaded', loadQuestions);
