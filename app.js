let inputDisplay = document.querySelector("#time-input");
let edit = document.querySelector(".edit-btn");
let startBtn = document.querySelector(".start-btn");
let pauseBtn = document.querySelector(".pause-btn");
let indicator = document.querySelector(".indicator");
let controlls = document.querySelectorAll(".controll-btn");
let alertCon= document.querySelector(".alert-err");



let minute = 00;
let second =00;

let total;
let indicateTime;

let pauseStatus = false;
let pauseDeg = 0;

const getUserSetup = function(){
	let fullSetup = inputDisplay.value;
	let fullSetupArr = fullSetup.split(":");
	minute = Number(fullSetupArr[0].slice(-2));
	second = Number(fullSetupArr[1].slice(-2));

}


window.onload=()=>{
	
}



edit.onclick=()=>{
	inputDisplay.disabled=false;
	edit.classList.add("active");
	startBtn.disabled=false;
	startBtn.classList.remove("active");
	
	RemoveAlertErr();
}


startBtn.onclick=()=>{
	startBtn.classList.add("active");
	inputDisplay.disabled=true;
	edit.classList.remove("active");
	startBtn.disabled=true;
	pauseBtn.classList.remove("active");

	getUserSetup();

	let totalTime = minute*60 + second;
	indicateTime = totalTime;

	if(totalTime > 0){

		indicatorAni();
		countingProcess();

		//pause btn & edit btn changes
		edit.style.display="none";
		pauseBtn.style.display="block";

	}else{
		
		alertErr()
	}

}


let aniMutiply;
const indicatorAni =()=>{

	if(pauseStatus){
		aniMutiply = (360-pauseDeg)/indicateTime;
	}else{
		aniMutiply = 360/indicateTime;
	}
}

let count;

const countingProcess =()=>{

	total = indicateTime;
	if(pauseStatus){
		x = pauseDeg;

	}else{
		x = 0;
	}

	count = setInterval(()=>{	
		second--;
		x += aniMutiply

		if(second < 0){
			minute--;
			second = 59;
		}

		indicator.setAttribute("data-deg",x);
		indicator.style.background = `repeating-conic-gradient(
										from 0deg,
										var(--orange) 0deg ${x}deg,
										var(--light-color) ${x}deg 360deg
									)`

		finish();

		display();
	},1000);

}

const finish =()=>{
	total = minute*60 + second;
	if(total <= 0 ){
		clearInterval(count);

		startBtn.classList.remove("active");

		minute = 00;
		second = 00;

		startBtn.disabled=false;

		//pause btn & edit btn changes
		edit.style.display="block";
		pauseBtn.style.display="none";

		//pauseProcess 
		pauseStatus=false;
		pauseDeg=0;

	}

}

//PAUSE ------------------

pauseBtn.onclick=()=>{

	pauseStatus = true;
	pauseDeg = Number(indicator.getAttribute("data-deg"));


	clearInterval(count);
	startBtn.disabled=false;

	startBtn.classList.remove("active");
	pauseBtn.classList.add("active");

}

const display =()=>{ 	
	inputDisplay.value = `${("0"+minute).slice(-2)}:${("0"+second).slice(-2)}`;
}




//alert err display

const alertErr =()=>{
	alertCon.style.display="block";
	inputDisplay.style.color="red";
}

const RemoveAlertErr =()=>{
	alertCon.style.display="none";
	inputDisplay.style.color="var(--darkblue)";
}


