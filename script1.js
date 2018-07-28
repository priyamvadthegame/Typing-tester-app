var textAreaBorder = document.querySelector("#text-area");
var textArea = document.querySelector("#text-area");
var o=document.querySelector(".text-section p");
var originalText = document.querySelector(".text-section-div p").innerHTML;
var resetButton = document.querySelector("#reset");
var theTimer = document.querySelector(".timer");
var cong=document.querySelector(".cong-section");
var timer =0;
var minutes=0;
var seconds=0;
var milliseconds=0;
var currentTime="";
var interval=0;
var timerRunning=false;
var arr=["Between what is said and not meant, and what is meant and not said, most of love is lost.",
         "Find what you love and let it kill you.",
         "Despite everything, I believe that people are really good at heart.",
         "If you live to be 100, I hope I live to be 100 minus 1 day, so I never have to live without you.",
         "Nobody realises that some people expend tremendous energy merely to be normal.",
         "Only those who will risk going too far can possibly find out how far one can go.",
         "Live as if you were to die tomorrow. Learn as if you were to live forever.",
         "You have two choices, to control your mind or to let your mind control you."];


// Add leading zero to numbers 9 or below:
function leadingZero(time) {
    if(time<=9)
    {
        return "0"+time;
    }
    else
    {
        return time;
    }
}


// Run a standard minute/second/hundredths timer:
//minutes = Math.floor((timer/100)/60);
//seconds = Math.floor((timer/100) - (minutes * 60));
//milliSeconds = Math.floor(timer- (seconds * 100) - (minutes * 6000));
function startTimer() {
    minutes = leadingZero(Math.floor((timer / 100) / 60));
    seconds =leadingZero( Math.floor((timer / 100) - (minutes * 60)));
    milliseconds = leadingZero(Math.floor(timer - (seconds * 100) - (minutes * 6000)));
    currentTime = minutes + ":" + seconds + ":" + milliseconds;
    theTimer.innerHTML = currentTime;
    timer++;
}

// Match the text entered with the provided text on the page:
function spellcheck() {
    originalText = document.querySelector(".text-section-div p").innerHTML;
    var textenterd=textArea.value;
    var partialtext=originalText.substring(0,textenterd.length);
    if(textenterd===originalText)
    {
        textAreaBorder.style.borderColor='forestgreen';
        clearInterval(interval);
        cong.style.display='block'
    }
    else if(textenterd===partialtext)
    {
        textAreaBorder.style.borderColor='darkblue';
    }
    else
    {
        textAreaBorder.style.borderColor='darkred';
    }
}



// Start the timer:
function start() {
    var textEnteredlength=textArea.value.length;
    if(textEnteredlength===0)
    {
           interval=setInterval(startTimer,10);
           timerRunning=true;
    }

spellcheck();
}



// Reset everything:
function reset() {
    clearInterval(interval);
    var random=Math.floor(Math.random()*7);
    o.innerHTML=arr[random];
    timer =0;
    minutes=0;
    seconds=0;
    milliseconds=0;
    currentTime="";
    interval=0;
    timerRunning=false;
    theTimer.innerHTML="00:00:00";
    textArea.value='';
    textAreaBorder.style.borderColor='gray'
    cong.style.display='none'
}
// Event listeners for keyboard input and the reset button:
textArea.addEventListener('keypress',start);
textArea.addEventListener('keyup',spellcheck);
resetButton.addEventListener('click',reset);
