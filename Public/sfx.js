//need to use id instead of class, because class responds with a list of elements
const container = document.getElementById('container');
let currentOpenBtn = 1;
let currentSounds = []
let currentPg = 1; 
const abortController = new AbortController();
// Keyboard Fuctionality
window.onload = function(){
  
  var s = 83;
  var p = 80;

    window.onkeydown= function(key){
      if(key.keyCode === s){
        for(i = 1;i - 1 < 12 ;i ++ ){
          //implement stop feture later; Maybe? 
        }

      };
      if(key.keyCode === p){
        for(i = 1;i - 1 < item_count ;i ++ ){
          //also implement pause feature for any current sound playing, and make sure that 
          // when you unpause it does casue any issues or when you press another sound while
          //paused that it deletes the currentTime on whatever sound was prevouisly paused. 
        }
    };
  };    
;}

class Sound {
  constructor(soundName, link){
    this.name = soundName;
    this.button = currentOpenBtn
    this.audio = new Audio(link)
    
  }
  init() { 
    //create 
    let btn = document.getElementById(this.button)

    btn.innerHTML = this.name;
    btn.onmousedown = ()=>{
      this.play();
    }
    
  
    if(currentOpenBtn >= 12){
      currentOpenBtn = 1
      console.log("Out of buttons")
      return 
    
    }  else {currentOpenBtn ++;} 
    
  }
  play() { 
    this.audio.play();
    this.audio.currentTime = 0 ; 
    console.log(this.name)
  }
  reset() {
   let btn = document.getElementById(this.button)
   btn.onmousedown = null;
   
   console.log("Attempted to remove the onmouse function")
  }
}

async function getSounds(pgNum){
  let response = await fetch(`/sounds/pg/${pgNum}`)
  const sounds = await response.json();
  return sounds;
}
getSounds(1).then((result) => {
  currentSounds = result;
  for(i = 0; i < 12; i++ ){
    const sound = new Sound(currentSounds[i].soundName, currentSounds[i].sound)
    sound.init();
  }
});

function prevPage(){ 
  if(currentPg === 1 ) {
    return alert("You can't go to pg 0 dumbass");
  } else {
  getSounds(currentPg -1 ).then((result) => {
    currentSounds = result;
    for(i = 0; i < currentSounds.length; i++ ){
      const sound = new Sound(currentSounds[i].soundName, currentSounds[i].sound)
      console.log(sound.name)
      sound.reset();
      sound.init();
    }
    if(currentSounds.length < 12 ) {
      for(i = 0; i < 12-currentSounds.length; i++){
        const sound = new Sound("Add Sound", "Sounds/6.mp3");
        sound.reset();
       sound.init();
      }
    }
  });
  currentPg--;
  document.getElementById("pg").innerHTML = "pg."+currentPg;
  }
}
function nextPage(){
  getSounds(currentPg + 1 ).then((result) => {
    if(result === [[]]) return alert("No more sounds dumbass")
    currentSounds = result;
    for(i = 0; i < currentSounds.length; i++ ){
      const sound = new Sound(currentSounds[i].soundName, currentSounds[i].sound)
      console.log(sound.name)
      sound.reset();
      sound.init();
    }
    if(currentSounds.length < 12 ) {
      for(i = 0; i < 12-currentSounds.length; i++){
        const sound = new Sound("Add Sound", "Sounds/6.mp3");
        sound.reset();
       sound.init();
      }
    }
    currentPg++;
    document.getElementById("pg").innerHTML = "pg."+currentPg;
  });
  console.log("Still no other page dumbass");
}
