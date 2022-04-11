//랜덤 번호 지정 
//유저 번호를 입력한다 그리고 go라는 버튼을 누름
//만약 유저가 랜덤번호를 맞추면, 맞췄습니다!
//랜덤번호가 < 유저번호 Down!!
//랜덤번호가 > 유저번호 UP!!
//Reset 버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 다쓰면 게임이 끝난다 (더이상 추측 불가, 버튼 disable)
//유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회가 차감되지 않는다.
//유저가 이미 이미 입력한 숫자를 또 입력하면 알려준다. 기회가 차감되지 않는다.


let computerNum = 0
let playButton = document.getElementById("play-button")
let userInput = document.getElementById("user-input")
let resultArea = document.getElementById("result-area")
let resetButton = document.getElementById("reset-button")
let chances = 5
let gameOver = false
let chancearea = document.getElementById("chance-area")
let history =[]


playButton.addEventListener("click",play)
resetButton.addEventListener("click",reset)
userInput.addEventListener("focus",function(){userInput.value=""})

function pickRandomNum(){
    computerNum = Math.floor(Math.random()*100)+1;
    console.log("정답",computerNum)
}

function play(){
    let userValue = userInput.value;
    
    if(userValue<1 || userValue>100){
        resultArea.textContent="1과 100 사이 숫자를 입력해주세요!"
     return;
    }
    if(history.includes(userValue)){
        resultArea.textContent="이미 입력한 숫자입니다 다른 숫자를 입력하세요"
    return;
    }

    chances -- ;
    chancearea.textContent=`남은기회 ${chances}번`;
    console.log("chance",chances)


    if (userValue < computerNum){
        resultArea.textContent="UP!!";
    } else if(userValue > computerNum){
        resultArea.textContent="DOWN!!";
    } else{
        resultArea.textContent="정답입니다!!";
        chancearea.textContent=""
        gameOver = true;
    }

    history.push(userValue)


    if(chances < 1){
        gameOver=true;
    }
    if (gameOver){
        playButton.disabled = true;
    }
}

function reset(){
    //user input 창이 초기화
    userInput.value = "";
    //새로운 번호 생성
    pickRandomNum();
    resultArea.textContent="정답을 맞추세요"
    chances = 5;
    gameOver=false;
    playButton.disabled = false;
}


pickRandomNum();