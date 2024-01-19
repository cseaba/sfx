//need to use id instead of class, because class responds with a list of elements
const container = document.getElementById('container');
let currentOpenBtn = 1;
let currentSounds = []
const abortController = new AbortController();

class Sound {
  constructor(soundName, link){
    this.name = soundName;
    this.button = currentOpenBtn
    this.audio = new Audio(link)
    
  }
  init() { 
    //create 
    let btn = document.createElement('div')
	 
    btn.id = 'item'
    btn.className = 'item'
	
    btn.innerHTML = this.name;
    btn.onmousedown = ()=>{
      this.play();
    }
    
    container.appendChild(btn)
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



refreshCSS = () => { 
	let links = document.getElementsByTagName('link'); 
	for (let i = 0; i < links.length; i++) { 
		if (links[i].getAttribute('rel') == 'stylesheet') {
			let href = links[i].getAttribute('href').split('?')[0]; 
			let newHref = href + '?version=' + new Date().getMilliseconds(); 
						                          
			links[i].setAttribute('href', newHref); 
		} 
	}	
} 

async function getSounds(pgNum){
  let response = await fetch(`/sounds/pg/${pgNum}`)
  const sounds = await response.json();
  return sounds;
}
getSounds(1).then((result) => {
  currentSounds = result;
  for(i = 0; i < currentSounds.length; i++ ){
    const sound = new Sound(currentSounds[i].soundName, currentSounds[i].sound)
    sound.init();
  }
});


