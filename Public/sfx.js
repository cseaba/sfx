//need to use id instead of class, because class responds with a list of elements
const container = document.getElementById('container');


const item_count = container.children.length;
var sound = [];
for(i = 1;i - 1 < item_count ;i ++ ){

   sound[i] = new Audio("/Sounds/" +i+ ".mp3" )

 }



function SoundEffect(name, pos) {

    this.name = name;
    this.pos = pos;

    this.item = document.getElementById(this.pos);
    
    this.item.outerHTML = `<button class=\"item\" id=\"`
     + this.pos + `\" onclick = \"playSound(`+ this.pos +`)
      \" width = \" 20% \">` + this.name;
    
}

// plays sound when button is pressed
function playSound(pos){
this.pos = pos;

this.sfx;
this.sfx = sound[this.pos];
this.sfx.play();
this.sfx.currentTime = 0;

}


SoundEffect("Really", 1);
SoundEffect("Android", 2);
SoundEffect("iPhone", 3);
SoundEffect("Clash", 4);
SoundEffect("Deez", 5);
SoundEffect("Bruh", 6);
SoundEffect("Fnaf 2", 7);
SoundEffect("STFU", 8);
SoundEffect("Hog Rider", 9);
SoundEffect("Helicopter", 10);
SoundEffect("Vine Boom", 11);
SoundEffect("Fnaf Scream", 12);
