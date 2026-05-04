const allQuestions = [
    { "emojis": "🌈🚢🦒🦒", "answer": "Noah's Ark", "hint": "Story" },
    { "emojis": "🍎🐍🌳👫", "answer": "Adam and Eve", "hint": "Story" },
    { "emojis": "🧒🏾🪨🎯⚔️", "answer": "David and Goliath", "hint": "Story" },
    { "emojis": "👶🏾🧺🌊👸🏾", "answer": "Baby Moses in the Nile", "hint": "Story" },
    { "emojis": "🧥🌈👨‍👦🌟", "answer": "Joseph's Coat of Colors", "hint": "Story" },
    { "emojis": "🦁🙏🏰👑", "answer": "Daniel in the Lions' Den", "hint": "Story" },
    { "emojis": "🐋🌊🤢🙏", "answer": "Jonah and the Whale", "hint": "Story" },
    { "emojis": "👶🏾🌟🐂🐪🤴", "answer": "The Birth of Jesus", "hint": "Event" },
    { "emojis": "🚶‍♂️🌊🙌🛶", "answer": "Jesus Walks on Water", "hint": "Event" },
    { "emojis": "🍞🍞🐟🐟🧺", "answer": "Feeding of the 5,000", "hint": "Event" },
    { "emojis": "🏺🏺💧🍷🙌", "answer": "The Miracle at Cana", "hint": "Event" },
    { "emojis": "🎺🎺🧱💥🏰", "answer": "The Walls of Jericho", "hint": "Event" },
    { "emojis": "👸🏾👑🙏👑", "answer": "Queen Esther", "hint": "Character" },
    { "emojis": "🔨🧱🏗️🛡️⚔️", "answer": "Nehemiah's Wall", "hint": "Event" },
    { "emojis": "🏃🏾‍♂️💰🐷🏠👨‍👦", "answer": "The Prodigal Son", "hint": "Story" },
    { "emojis": "🪜😇☁️😴🪨", "answer": "Jacob's Ladder", "hint": "Event" },
    { "emojis": "🐑🧔🏾‍♂️🐑🌿💧", "answer": "The Good Shepherd", "hint": "Character" },
    { "emojis": "✝️🌅🙌🪨🕳️", "answer": "The Resurrection", "hint": "Event" },
    { "emojis": "🛶🌊💨🤫😴", "answer": "Jesus Calms the Storm", "hint": "Event" },
    { "emojis": "🌊✋🛤️🏃🏾‍♂️🔥", "answer": "Parting of the Red Sea", "hint": "Event" }
];

let slides = [];
let currentSlide = 0;
let isAnswerVisible = false;

const gameScreen = document.getElementById('game-screen');
const completionScreen = document.getElementById('completion-screen');
const emojiDisplay = document.getElementById('emoji-display');
const answerText = document.getElementById('answer-text');
const hintTag = document.getElementById('hint-tag');
const toggleBtn = document.getElementById('toggle-btn');
const progress = document.getElementById('progress');
const nextBtn = document.getElementById('next-btn');

function initGame() {
    slides = allQuestions
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);
    currentSlide = 0;
    updateSlide();
    gameScreen.style.display = 'flex';
    completionScreen.style.display = 'none';
}

function updateSlide() {
    const slide = slides[currentSlide];
    
    answerText.style.transition = 'none';
    answerText.classList.remove('visible');
    
    emojiDisplay.textContent = slide.emojis;
    answerText.textContent = slide.answer;
    hintTag.textContent = slide.hint;
    
    toggleBtn.textContent = "REVEAL ANSWER";
    isAnswerVisible = false;
    progress.textContent = `Question ${currentSlide + 1} of 10`;
    
    if (currentSlide === slides.length - 1) {
        nextBtn.textContent = "FINISH";
    } else {
        nextBtn.textContent = "NEXT";
    }

    answerText.offsetHeight;
    answerText.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    
    emojiDisplay.style.animation = 'none';
    emojiDisplay.offsetHeight; 
    emojiDisplay.style.animation = 'slideUp 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
}

function toggleAnswer() {
    isAnswerVisible = !isAnswerVisible;
    if (isAnswerVisible) {
        answerText.classList.add('visible');
        toggleBtn.textContent = "HIDE ANSWER";
    } else {
        answerText.classList.remove('visible');
        toggleBtn.textContent = "REVEAL ANSWER";
    }
}

function nextSlide() {
    if (currentSlide === slides.length - 1) {
        showCompletion();
    } else {
        currentSlide++;
        updateSlide();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlide();
    }
}

function showCompletion() {
    gameScreen.style.display = 'none';
    completionScreen.style.display = 'flex';
}

function restartGame() {
    initGame();
}

document.addEventListener('keydown', (e) => {
    if (completionScreen.style.display === 'flex') {
        if (e.code === 'Enter' || e.code === 'Space') restartGame();
        return;
    }

    if (e.code === 'Space') {
        e.preventDefault();
        toggleAnswer();
    }
    if (e.code === 'ArrowRight') nextSlide();
    if (e.code === 'ArrowLeft') prevSlide();
});

initGame();
