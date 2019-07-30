var textAreaBorder = document.querySelector("#text-area");
var textArea = document.querySelector("#text-area");
var o=document.querySelector(".text-section p");
var originalText = document.querySelector(".text-section-div p").innerHTML;
var resetButton = document.querySelector("#reset");
var theTimer = document.querySelector(".timer");
var cong=document.querySelector(".cong-section");
var  Word_count=document.querySelector(".word-count");
var  Error=document.querySelector(".error");
var  Speed=document.querySelector(".speed");
var timer =0;
var minutes=0;
var seconds=0;
var milliseconds=0;
var Word_Count="";
var speed_Count=0.0;
var currentTime="";
var ErrorCount=0;
var WordCount=1;
var interval=0;
var flag_index=0;
var textenterd="";
var partialtext="";
var errors=0;
var flag1=0;
var timerRunning=false;
var arr=["Between what said is said and not meant, and what is meant and not said, most of love is lost.",
         "I and and you.",
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
     textenterd=textArea.value;
     partialtext=originalText.substring(0,textenterd.length);
    if(textenterd===originalText)
    {   flag1=0;
    	
        flag_index=0;
        Word_count.innerHTML=("Word Count "+WordCount++).bold();
        textAreaBorder.style.borderColor='forestgreen';
        clearInterval(interval);
        timer=0;
        cong.style.display='block';

    }
    else if(textenterd===partialtext)
    {
        textAreaBorder.style.borderColor='darkblue';
        flag1=0;
    }
    else
    {   if(flag1===0) {
        errors++;
        }
        ErrorCount="Error: "+errors;
        Error.innerHTML=ErrorCount.bold();
        flag1=1;
        textAreaBorder.style.borderColor='darkred';
    }

}




// Start the timer:
function start() {
    var textEnteredlength=textArea.value.length;
    var text=textArea.value;

    if(textEnteredlength===0)
    {
           interval=setInterval(startTimer,10);
           timerRunning=true;
    }

    spellcheck();

    if(originalText.charAt(textEnteredlength)===" "&&(textEnteredlength!=originalText.length)&&(text.charAt(textEnteredlength-1)!=" ")&&(flag_index<textEnteredlength))
    {   flag_index=textEnteredlength;
        Word_count.innerHTML=("Word Count "+WordCount++).bold();
        if(seconds==0&&minutes==0)
        {
            speed_Count=milliseconds/6000;
        }
        else if(minutes==0)
        {
            speed_Count=(seconds/60)+(milliseconds/6000);
        }
        else
        {
            speed_Count=minutes+(seconds/60)+(milliseconds/6000);
        }
        Speed.innerHTML=("Speed "+Math.ceil(((WordCount-1)/(speed_Count))).toString()+" Words Per Minute").bold();

    }

}
// Reset everything:
function reset() {
    clearInterval(interval);
    var random=Math.floor(Math.random()*arr.length);
    o.innerHTML=arr[random];
    flag_index=0;
    timer =0;
    minutes=0;
    seconds=0;
    errors=0;
    WordCount=1;
    milliseconds=0;
    currentTime="";
    interval=0;
    timerRunning=false;
    theTimer.innerHTML="00:00:00";
    textArea.value='';
    textAreaBorder.style.borderColor='gray'
    cong.style.display='none'
    ErrorCount="Error: "+errors;
    Error.innerHTML=ErrorCount.bold();
    Word_Count="Word Count "+"0";
    Word_count.innerHTML=Word_Count.bold();
    Speed.innerHTML="Speed: 0".bold();
}
// Event listeners for keyboard input and the reset button:
textArea.addEventListener('keypress',start);
textArea.addEventListener('keyup',spellcheck);
resetButton.addEventListener('click',reset);
