import fs from 'fs';

const code = fs.readFileSync('./wp-content/plugins/marmaray-core-v2/assets/js/data_v5.js', 'utf8').replace(/export /g, '');

let fakeTime = new Date('2026-08-09T21:49:30+03:00').getTime();
const FakeDate = class extends Date {
  constructor(...args) {
    if (args.length === 0) super(fakeTime);
    else super(...args);
  }
};

const wrappedCode = `(function(Date) { ${code}; return getNextTrains; })`;
const getNextTrains = eval(wrappedCode)(FakeDate);

for (let i = 0; i < 120; i++) {
  fakeTime += 1000;
  const now = new FakeDate();
  const currentMins = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
  const trains = getNextTrains(21, 'H2G');
  const m1 = trains[0].remainingMin;
  if (m1 <= 0) console.log(now.toLocaleTimeString(), 'PERONDA', m1);
  else console.log(now.toLocaleTimeString(), Math.ceil(m1), 'dk', m1);
}
