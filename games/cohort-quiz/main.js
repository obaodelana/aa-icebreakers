const allQuestions = [
    {
        "question": "What does LLM stand for in the context of AI?",
        "options": ["Large Language Model", "Long Learning Machine", "Logical Layer Method", "Linear Language Model"],
        "answer": 0
    },
    {
        "question": "In the AI Studio, what does the 'System Instruction' box control?",
        "options": ["The AI's memory", "The AI's personality and behavior", "The AI's internet connection", "The AI's download speed"],
        "answer": 1
    },
    {
        "question": "What is the art of talking to AI to get the best possible results called?",
        "options": ["AI Engineering", "Data Science", "Prompt Engineering", "Machine Learning"],
        "answer": 2
    },
    {
        "question": "In the Rapper.ai project, what does the 'ollama' package do?",
        "options": ["Draws images on screen", "Connects your code to a local AI model", "Manages your virtual environment", "Creates the project folder"],
        "answer": 1
    },
    {
        "question": "In our Space Shooter game, which library do we import as 'pyray'?",
        "options": ["Python Ray", "Raylib", "PyRaylib", "RayGame"],
        "answer": 1
    },
    {
        "question": "What does pyray.init_window(800, 450, 'Space Shooter') do?",
        "options": ["Creates a text file", "Opens a game window that is 800px wide and 450px tall", "Draws a rectangle on screen", "Saves the game progress"],
        "answer": 1
    },
    {
        "question": "In our Space Shooter, what is 'Delta Time' (dt) used for?",
        "options": ["To create a delay in the game", "To ensure movement speed stays consistent regardless of frame rate", "To change the background color", "To count the number of bullets"],
        "answer": 1
    },
    {
        "question": "Why do we use int() when drawing our spaceship?",
        "options": ["To make the ship faster", "Because draw_rectangle only accepts whole numbers (integers)", "To convert the ship to a string", "To add color to the ship"],
        "answer": 1
    },
    {
        "question": "In the Space Shooter, what function do we use to detect when the spacebar is pressed just once?",
        "options": ["pyray.is_key_down()", "pyray.is_key_pressed()", "pyray.key_pressed()", "pyray.space_detected()"],
        "answer": 1
    },
    {
        "question": "How do you store a bullet's position in the Space Shooter?",
        "options": ["As a string", "Using pyray.Vector2 to store both X and Y coordinates", "In a dictionary", "As two separate lists"],
        "answer": 1
    },
    {
        "question": "In Raylib, to make a bullet move 'up' on the screen, what do you do to its Y value?",
        "options": ["Increase it", "Decrease it", "Multiply it by 2", "Set it to 0"],
        "answer": 1
    },
    {
        "question": "In Joseph's Grain Storehouse, what kind of loop do you use to run code a specific number of times?",
        "options": ["while loop", "for loop", "if statement", "function call"],
        "answer": 1
    },
    {
        "question": "What does ADK stand for?",
        "options": ["Application Development Kit", "Agent Development Kit", "Automated Data Key", "AI Design Kit"],
        "answer": 1
    },
    {
        "question": "In Google ADK, what must your code file be named?",
        "options": ["main.py", "app.py", "agent.py", "bot.py"],
        "answer": 2
    },
    {
        "question": "In Google ADK, what must the variable holding your agent be named?",
        "options": ["my_agent", "agent", "chatbot", "root_agent"],
        "answer": 3
    },
    {
        "question": "What is an API key in the context of Google AI?",
        "options": ["A key on your keyboard", "A secret password that lets your code access Google's AI", "A type of computer virus", "A programming language"],
        "answer": 1
    },
    {
        "question": "Why should you never share your API key?",
        "options": ["It's too long to remember", "Someone could use it to make requests on your account", "It changes every hour", "It's only valid for one day"],
        "answer": 1
    },
    {
        "question": "Which model is recommended for testing and learning in Google ADK?",
        "options": ["gemini-2.5-pro", "gemini-2.5-flash", "gpt-4", "claude-3"],
        "answer": 1
    },
    {
        "question": "When using triple quotes (''') in Python for system instructions, what are they used for?",
        "options": ["Creating single-line comments", "Writing multi-line strings", "Creating a new variable type", "Running a loop"],
        "answer": 1
    },
    {
        "question": "In the Values vs Variables lesson, what type of error occurs when you try to add a string to a number (e.g., '5' + 3)?",
        "options": ["No error occurs", "A TypeError", "A SyntaxError", "A ValueError"],
        "answer": 1
    },
    {
        "question": "What function do you use in Python to convert a number stored as text into an actual number you can calculate with?",
        "options": ["str()", "print()", "int()", "len()"],
        "answer": 2
    },
    {
        "question": "In our game loop, what does pyray.window_should_close() check for?",
        "options": ["If the player has won", "If the user clicked the close button", "If the internet is connected", "If the game is paused"],
        "answer": 1
    },
    {
        "question": "What does pyray.begin_drawing() tell the computer?",
        "options": ["The game is over", "We're about to start painting the next frame on the screen", "The window is closing", "The player scored a point"],
        "answer": 1
    },
    {
        "question": "In Python, what symbol do you use to check if two values are equal in an if statement?",
        "options": ["=", "==", "!=", "==="],
        "answer": 1
    },
    {
        "question": "In our Rapper.ai project, what does the raylib package do?",
        "options": ["Connects to the AI model", "Draws the window, images, and text on screen", "Manages project files", "Creates the virtual environment"],
        "answer": 1
    }
];

let slides = [];
let currentSlide = 0;
let selectedOption = null;
let score = 0;

const gameScreen = document.getElementById('game-screen');
const completionScreen = document.getElementById('completion-screen');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const progress = document.getElementById('progress');
const scoreDisplay = document.getElementById('score-display');
const finalScoreText = document.getElementById('final-score');

function initGame() {
    slides = allQuestions
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);
    currentSlide = 0;
    score = 0;
    selectedOption = null;
    updateSlide();
    gameScreen.style.display = 'flex';
    completionScreen.style.display = 'none';
    scoreDisplay.textContent = `Score: ${score}`;
}

function updateSlide() {
    const slide = slides[currentSlide];
    selectedOption = null;
    
    questionText.textContent = slide.question;
    
    optionsContainer.innerHTML = '';
    slide.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => selectOption(index);
        optionsContainer.appendChild(btn);
    });

    nextBtn.textContent = currentSlide === slides.length - 1 ? "FINISH" : "NEXT";
    nextBtn.disabled = true;
    nextBtn.style.opacity = '0.5';
    progress.textContent = `Question ${currentSlide + 1} of 10`;
    
    questionText.style.animation = 'none';
    questionText.offsetHeight;
    questionText.style.animation = 'slideUp 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
}

function selectOption(index) {
    if (selectedOption !== null) return;
    selectedOption = index;

    const buttons = optionsContainer.querySelectorAll('.option-btn');
    const correctIndex = slides[currentSlide].answer;
    
    buttons.forEach((btn, i) => {
        btn.style.pointerEvents = 'none';
        if (i === correctIndex) {
            btn.classList.add('correct');
        } else if (i === index && i !== correctIndex) {
            btn.classList.add('incorrect');
        }
    });

    if (index === correctIndex) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    }

    nextBtn.disabled = false;
    nextBtn.style.opacity = '1';
}

function nextSlide() {
    if (currentSlide === slides.length - 1) {
        showCompletion();
    } else {
        currentSlide++;
        updateSlide();
    }
}

function showCompletion() {
    gameScreen.style.display = 'none';
    completionScreen.style.display = 'flex';
    finalScoreText.textContent = `${score} / ${slides.length}`;
}

function restartGame() {
    initGame();
}

document.addEventListener('keydown', (e) => {
    if (completionScreen.style.display === 'flex') {
        if (e.code === 'Enter' || e.code === 'Space') restartGame();
        return;
    }
    if (e.code === 'ArrowDown' || e.code === 'Enter') {
        const buttons = optionsContainer.querySelectorAll('.option-btn');
        if (buttons.length > 0 && selectedOption === null) {
            selectOption(0);
        }
    }
    if (e.code === 'ArrowRight' || e.code === 'Enter') nextSlide();
});