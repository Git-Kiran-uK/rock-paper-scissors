const containerEl = document.querySelector('.container');
const choiceContainerEl = document.querySelector('.choice-container');
const roundResultEl = document.querySelector('.round-result');
const userEl = document.getElementById('user');
const computerEl = document.getElementById('computer');
const playBtnEl = document.getElementById('play');
let userChoice = '';
let userScore = 0;
let computerScore = 0;

document.body.addEventListener('click', (e) => {
    if(e.target.tagName === "BUTTON"){
        if(!playBtnEl.classList.contains('visible')) playBtnEl.classList.add('visible');
        if(e.target !== playBtnEl){
            userChoice = e.target.textContent;
            e.target.focus();
        } else {
            handleClick(userChoice);
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