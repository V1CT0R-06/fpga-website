// CHANGE THIS to the six-digit secret you want the visitor to discover.
// The code is in the page source: this is a visual puzzle, not secure storage.
const SECRET_CODE = "582914";

// Change to false if the code should appear immediately after powering on.
const SHOW_BOOT_SEQUENCE = true;

const svg = document.getElementById('display');
const powerButton = document.getElementById('powerButton');
const hardwarePower = document.getElementById('hardwarePower');
const powerText = document.getElementById('powerText');
const statusLight = document.getElementById('statusLight');
const stateText = document.getElementById('stateText');
const NS = 'http://www.w3.org/2000/svg';

// Seven-segment notation: a (top), b (right top), c (right bottom),
// d (bottom), e (left bottom), f (left top), g (middle).
const digits = {
  '0':'abcdef', '1':'bc', '2':'abdeg', '3':'abcdg', '4':'bcfg',
  '5':'acdfg', '6':'acdefg', '7':'abc', '8':'abcdefg', '9':'abcdfg',
  '-':'g', ' ':'', 'E':'adefg', 'r':'eg', 'o':'cdeg'
};
const shapes = {
 a:'8,4 39,4 34,10 13,10',
 b:'41,6 46,11 46,38 40,43 37,39 37,13',
 c:'40,49 46,54 46,80 41,85 37,78 37,53',
 d:'13,81 34,81 39,87 8,87',
 e:'5,49 10,53 10,78 5,85 0,80 0,54',
 f:'5,6 10,13 10,39 5,43 0,38 0,11',
 g:'8,44 13,40 34,40 39,44 34,48 13,48'
};
let powered = false;
let timers = [];

function addSvg(tag, attrs, parent=svg) {
  const el=document.createElementNS(NS,tag);
  Object.entries(attrs).forEach(([key,value])=>el.setAttribute(key,value));
  parent.appendChild(el);
  return el;
}
function show(value, active=true) {
  svg.replaceChildren();
  const code = String(value).padStart(6,' ').slice(-6);
  for (let i=0;i<6;i++) {
    const group=addSvg('g',{transform:`translate(${i*59+6} 0)`});
    for (const [segment,points] of Object.entries(shapes)) {
      addSvg('polygon',{points,fill:(active && (digits[code[i]] || '').includes(segment))?'#ff354d':'#3b1b2a',opacity:active?'1':'.22'},group);
    }
    addSvg('circle',{cx:51,cy:84,r:2.3,fill:active?'#ff354d':'#3b1b2a',opacity:active?'.75':'.15'},group);
  }
}
function later(fn,ms) { timers.push(setTimeout(fn,ms)); }
function togglePower() {
  powered=!powered;
  timers.forEach(clearTimeout); timers=[];
  powerText.textContent=powered?'Power off':'Power on';
  powerButton.classList.toggle('active',powered);
  statusLight.classList.toggle('on',powered);
  if (!powered) { stateText.textContent='BOARD OFFLINE'; show('      ',false); return; }
  if (!SHOW_BOOT_SEQUENCE) { stateText.textContent='RUNNING';show(SECRET_CODE);return; }
  stateText.textContent='INITIALIZING…';
  show('888888');
  later(()=>show('000000'),550);
  later(()=>show('------'),1100);
  later(()=>show('      '),1400);
  // Reveal the digits one at a time, like a hardware test ending in a code.
  for(let i=0;i<6;i++) {
    later(()=>show(SECRET_CODE.slice(0,i+1).padEnd(6,' ')),1750+i*370);
  }
  later(()=>{stateText.textContent='RUNNING';show(SECRET_CODE);},4050);
}
powerButton.addEventListener('click',togglePower);
hardwarePower.addEventListener('click',togglePower);
show('      ',false);
