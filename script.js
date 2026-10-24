const SECRET_CODE = "582914";

const display = document.getElementById('display');
const powerButton = document.getElementById('powerButton');
const digits = ['abcdef', 'bc', 'abdeg', 'abcdg', 'bcfg',
  'acdfg', 'acdefg', 'abc', 'abcdefg', 'abcdfg'];
const shapes = {
  a: '8,4 39,4 34,10 13,10',
  b: '41,6 46,11 46,38 40,43 37,39 37,13',
  c: '40,49 46,54 46,80 41,85 37,78 37,53',
  d: '13,81 34,81 39,87 8,87',
  e: '5,49 10,53 10,78 5,85 0,80 0,54',
  f: '5,6 10,13 10,39 5,43 0,38 0,11',
  g: '8,44 13,40 34,40 39,44 34,48 13,48'
};
const displays = [];
let powered = false;
let timer;
let step = 0;

for (let i = 0; i < 6; i++) {
  const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  group.setAttribute('transform', `translate(${3 + i * 55} 5) scale(.78)`);
  for (const segment in shapes) {
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', shapes[segment]);
    polygon.setAttribute('data-segment', segment);
    group.appendChild(polygon);
  }
  display.appendChild(group);
  displays.push(group);
}

function show(value) {
  displays.forEach((group, i) => {
    const segments = digits[value[i]] || '';
    for (const polygon of group.children) {
      const on = segments.includes(polygon.getAttribute('data-segment'));
      polygon.setAttribute('fill', on ? (i === 3 ? '#e8b844' : '#e84040') : '#282329');
    }
  });
}

function tick() {
  if (!powered) return;
  const sequence = ['000000', '000001', '000010', '000011', SECRET_CODE];
  show(sequence[step]);
  step++;
  if (step < sequence.length) timer = setTimeout(tick, 250);
}

powerButton.addEventListener('click', () => {
  clearTimeout(timer);
  powered = !powered;
  powerButton.textContent = powered ? 'Desligar FPGA' : 'Ligar FPGA';
  powerButton.setAttribute('aria-pressed', String(powered));
  show(powered ? '888888' : '');
  if (powered) {
    step = 0;
    timer = setTimeout(tick, 350);
  }
});

show('');
