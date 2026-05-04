const bibleBooks = [
    "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", 
    "Samuel", "Kings", "Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", 
    "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", 
    "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", 
    "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew", 
    "Mark", "Luke", "John", "Acts", "Romans", "Corinthians", "Galatians", "Ephesians", 
    "Philippians", "Colossians", "Thessalonians", "Timothy", "Titus", "Philemon", 
    "Hebrews", "James", "Peter", "Jude", "Revelation"
];

let slides = [];
let currentSlide = 0;
let isAnswerVisible = false;

const gameScreen = document.getElementById('game-screen');
const completionScreen = document.getElementById('completion-screen');
const scrambleDisplay = document.getElementById('scramble-display');
const answerText = document.getElementById('answer-text');
const toggleBtn = document.getElementById('toggle-btn');
const progress = document.getElementById('progress');
const nextBtn = document.getElementById('next-btn');

function shuffleString(str) {
    let arr = str.replace(/\s/g, '').split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // If by chance it shuffles to the original word, shuffle again
    let shuffled = arr.join('').toUpperCase();
    if (shuffled === str.replace(/\s/g, '').toUpperCase() && str.length > 1) {
        return shuffleString(str);
    }
    return shuffled;
}

function initGame() {
    // Select 10 random books
    const selectedBooks = bibleBooks
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);
    
    slides = selectedBooks.map(book => ({
        answer: book,
        scrambled: shuffleString(book)
    }));

    currentSlide = 0;
    updateSlide();
    gameScreen.style.display = 'flex';
    completionScreen.style.display = 'none';
}

function updateSlide() {
    const slide = slides[currentSlide];
    
    answerText.style.transition = 'none';
    answerText.classList.remove('visible');
    
    scrambleDisplay.textContent = slide.scrambled;
    answerText.textContent = slide.answer;
    
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
    
    scrambleDisplay.style.animation = 'none';
    scrambleDisplay.offsetHeight; 
    scrambleDisplay.style.animation = 'slideUp 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
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
