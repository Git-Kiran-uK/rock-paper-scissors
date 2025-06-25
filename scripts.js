const containerEl = document.querySelector('.container');
const choiceContainerEl = document.querySelector('.choice-container');
const roundResultEl = document.querySelector('.round-result');
const userEl = document.getElementById('user');
const computerEl = document.getElementById('computer');
const playBtnEl = document.getElementById('play');
const roundsBtn = document.querySelectorAll(`button[data-value="round"]`);
const roundsEl = document.getElementById('rounds');
let userScore = 0;
let gameRounds = 3;
let userChoice = '';
let currentRound = 0;
let computerScore = 0;

document.body.addEventListener('click', (e) => {
    if(e.target.tagName === "BUTTON"){
        handleButtonClick(e.target);
    } else {
        playBtnEl.classList.remove('visible');
    }
});

function handleButtonClick(button){
    if(button.dataset.value !== 'round'){
        if(!playBtnEl.classList.contains('visible')) playBtnEl.classList.add('visible');
    } else {
        gameRounds = button.textContent;
        for(let btn of roundsBtn){
            if(button === btn){
                if(!btn.classList.contains('rounds')) btn.classList.add('rounds');
                console.log(gameRounds)
            } else {
                btn.classList.remove('rounds');
            }
        }
    }
    if(button !== playBtnEl){
        userChoice = button.textContent;
        button.focus();
    } else {
        handlePlayButtonClick(userChoice);
        for(let btn of roundsBtn){
            btn.style.display = 'none';
        }
        roundsEl.insertAdjacentText('beforeend', ` ${gameRounds}`);
    }
}

function handlePlayButtonClick(userChoice){
    const computerChoice = getComputerChoice();
    displayChoices(userChoice, computerChoice);
    const userWonRound = isUserWonRound(userChoice, computerChoice);
    handleScore(userWonRound);
}

function getComputerChoice(){
    const choices = ['🪨', '📄', '✂️'];
    const randomChoiceIndex = Math.floor(Math.random() * choices.length);
    return choices[randomChoiceIndex];
}

function isUserWonRound(userChoice, computerChoice){
    switch(userChoice){
        case '🪨':
            if(computerChoice === '📄'){
                return false;
            } else if(computerChoice === '✂️'){
                return true;
            }
        case '📄':
            if(computerChoice === '✂️'){
                return false;
            } else if(computerChoice === '🪨'){
                return true;
            }
        case '✂️':
            if(computerChoice === '🪨'){
                return false;
            } else if(computerChoice === '📄'){
                return true;
            }
    }
}

function handleScore(isUserWonRound){
    if(isUserWonRound){
        userScore++;
    } else {
        computerScore++;
    }
}

function displayChoices(userChoice, computerChoice){
    choiceContainerEl.style.display = "none";
    userEl.textContent = userChoice;
    computerEl.textContent = computerChoice;
    roundResultEl.style.display = "flex";
}
