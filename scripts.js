const containerEl = document.querySelector('.container');
const choiceContainerEl = document.querySelector('.choice-container');
const roundResultEl = document.querySelector('.round-result');
const userEl = document.getElementById('user');
const computerEl = document.getElementById('computer');
const playBtnEl = document.getElementById('play');
const roundsBtn = document.querySelectorAll(`button[data-value="round"]`);
let currentRound = 0;
let gameRounds = 3;
let userChoice = '';
let userScore = 0;
let computerScore = 0;

document.body.addEventListener('click', (e) => {
    if(e.target.tagName === "BUTTON"){
        if(e.target.dataset.value !== 'round'){
            if(!playBtnEl.classList.contains('visible')) playBtnEl.classList.add('visible');
        } else {
            gameRounds = e.target.textContent;
            for(let btn of roundsBtn){
                if(e.target === btn){
                    if(!btn.classList.contains('rounds')) btn.classList.add('rounds');
                    console.log(gameRounds)
                } else {
                    btn.classList.remove('rounds');
                }
            }
        }
        if(e.target !== playBtnEl){
            userChoice = e.target.textContent;
            e.target.focus();
        } else {
            handleClick(userChoice);
            for(let btn of roundsBtn){
                btn.disabled = true;
                btn.style.opacity = .5;
            }
        }
    } else {
        playBtnEl.classList.remove('visible');
    }
});

function handleClick(userChoice){
    console.log(userChoice)
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