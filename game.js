'use strict';
const $=id=>document.getElementById(id),canvas=$('track'),ctx=canvas.getContext('2d');
const MAX_SPEED=24/3.6;
const DIFFICULTIES={easy:{label:'LEICHT',pace:.73},normal:{label:'NORMAL',pace:1},hard:{label:'SCHWER',pace:1.12}};
let raceDifficulty='normal';
const COLORS=['#29d8de','#f24690','#e5ff52','#b4adff'];
let points=[],length=0,segments=[],road=.875,selected=0,mode='training',state='ready',previousState='running',elapsed=0,countdown=0,car,bots=[],keys={},view={},staticCanvas=document.createElement('canvas'),trackData,ready=false,best=Infinity,flash=0,frameLast=0;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));const wrap=(n,m)=>(n%m+m)%m;const fmt=t=>!Number.isFinite(t)?'—':(t<60?t.toFixed(3).padStart(6,'0'):Math.floor(t/60)+':'+(t%60).toFixed(3).padStart(6,'0'));
try{const v=Number(localStorage.getItem('msv-retro-best-track2-start3-handling4'));if(v>0)best=v}catch{}
function smooth(raw){let p=raw.filter((v,i)=>!i||Math.hypot(v.x-raw[i-1].x,v.y-raw[i-1].y)>.02);if(Math.hypot(p[0].x-p.at(-1).x,p[0].y-p.at(-1).y)<.02)p.pop();for(let n=0;n<3;n++){let q=[];for(let i=0;i<p.length;i++){let a=p[i],b=p[(i+1)%p.length];q.push({x:.75*a.x+.25*b.x,y:.75*a.y+.25*b.y},{x:.25*a.x+.75*b.x,y:.25*a.y+.75*b.y})}p=q}return p}
function build(){points=smooth(trackData.control_points);let start=0;for(let i=1;i<points.length;i++)if(Math.hypot(points[i].x-2,points[i].y-6.8)<Math.hypot(points[start].x-2,points[start].y-6.8))start=i;points=points.slice(start).concat(points.slice(0,start));length=0;segments=points.map((p,i)=>{let b=points[(i+1)%points.length],dx=b.x-p.x,dy=b.y-p.y,l=Math.hypot(dx,dy),s={x:p.x,y:p.y,dx,dy,l,start:length,a:Math.atan2(dy,dx)};length+=l;return s});road=trackData.settings.road_width_m/2}
function at(s){s=wrap(s,length);let seg=segments.find(q=>q.start+q.l>=s)||segments.at(-1),t=(s-seg.start)/seg.l;return{x:seg.x+seg.dx*t,y:seg.y+seg.dy*t,a:seg.a,s}}
function nearest(x,y){let out={d:Infinity};for(const s of segments){const t=clamp(((x-s.x)*s.dx+(y-s.y)*s.dy)/(s.l*s.l),0,1),px=s.x+s.dx*t,py=s.y+s.dy*t,d=Math.hypot(x-px,y-py);if(d<out.d)out={x:px,y:py,d,s:s.start+s.l*t,a:s.a}}return out}
function roadPath(g){g.beginPath();points.forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y));g.closePath()}
function world(g){g.setTransform(view.scale,0,0,view.scale,view.x,view.y)}
function drawTrack(){let g=staticCanvas.getContext('2d');staticCanvas.width=canvas.width;staticCanvas.height=canvas.height;g.fillStyle='#3a4140';g.fillRect(0,0,canvas.width,canvas.height);world(g);g.fillStyle='#343d3d';g.fillRect(-.5,-.5,21,9);g.strokeStyle='#4a5352';g.lineWidth=.012;for(let x=0;x<=20;x++){g.beginPath();g.moveTo(x,0);g.lineTo(x,8);g.stroke()}for(let y=0;y<=8;y++){g.beginPath();g.moveTo(0,y);g.lineTo(20,y);g.stroke()}
// Floor, raised pale barriers, dark carpet and fine carpet grain.
roadPath(g);g.strokeStyle='#111c1d';g.lineWidth=road*2+.15;g.lineJoin='round';g.stroke();roadPath(g);g.strokeStyle='#c3c6b2';g.lineWidth=road*2+.08;g.stroke();roadPath(g);g.strokeStyle='#242e31';g.lineWidth=road*2;g.stroke();
let seed=810;function random(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296}g.save();roadPath(g);g.lineWidth=road*2; // texture is drawn across the floor with restrained contrast
for(let i=0;i<11000;i++){let x=random()*20,y=random()*8;g.fillStyle=i%2?'#a9b3a009':'#07111720';g.fillRect(x,y,.013,.013)}g.restore();
// Subtle racing line and directional arrows.
roadPath(g);g.strokeStyle='#111a1c3c';g.lineWidth=.15;g.stroke();for(let s=5;s<length;s+=9){let p=at(s);g.save();g.translate(p.x,p.y);g.rotate(p.a);g.strokeStyle='#9aa9a52e';g.lineWidth=.025;g.beginPath();g.moveTo(-.15,-.13);g.lineTo(0,0);g.lineTo(-.15,.13);g.stroke();g.restore()}
let start=at(0);g.save();g.translate(start.x,start.y);g.rotate(start.a);for(let r=0;r<2;r++)for(let c=0;c<12;c++){g.fillStyle=(r+c)%2?'#e8ebd7':'#101718';g.fillRect((r-1)*.09,-road+c*road*2/12,.09,road*2/12)}g.fillStyle='#e5ff52';g.font='bold .12px Arial';g.textAlign='center';g.fillText('START / ZIEL',0,-road-.12);g.restore();
for(let i=1;i<7;i++){let p=at(-i*.7);g.save();g.translate(p.x,p.y);g.rotate(p.a);g.strokeStyle='#cbd8ca45';g.lineWidth=.018;let side=i%2?.38:-.38;g.strokeRect(-.25,side-.13,.45,.26);g.restore()}
// Infield club branding.
g.save();g.translate(9.5,4);g.fillStyle='#a8b6b345';g.font='italic bold .32px Arial';g.textAlign='center';g.fillText('MSV NEUBRANDENBURG',0,0);g.font='.1px Arial';g.fillText('D T M   R E T R O   •   H O M E   C I R C U I T',0,.23);g.restore();
// Club pit lane outside the track boundaries.
for(let i=0;i<6;i++){let x=7.5+i*.8;g.fillStyle='#152226';g.fillRect(x,8.14,.62,.23);g.fillStyle=COLORS[i%4];g.fillRect(x+.08,8.17,.22,.08)}
g.strokeStyle='#8e9b8755';g.lineWidth=.035;g.strokeRect(-.12,-.12,20.24,8.24);
}
function drawCar(g,x,y,a,color,type=0,scale=1,number='03',halo=false){renderRetroCar(g,x,y,a,CATALOG[type]||CATALOG[0],scale,halo)}
function isRace(){return mode==='race'||mode==='race6'}
function fieldSize(){return mode==='race6'?6:mode==='race'?4:1}
function standings(){
 const player={player:true,model:car.model,progress:car.lap*length+car.progress,finished:car.finished,finishTime:car.finishTime};
 return [player,...bots.map(b=>({player:false,model:b.model,progress:b.travel,finished:b.finished,finishTime:b.finishTime}))].sort((a,b)=>a.finished&&b.finished?a.finishTime-b.finishTime:a.finished?-1:b.finished?1:b.progress-a.progress);
}
let standingsStamp=0;
function updateStandings(force=false){
 $('raceboard').hidden=!isRace()||state==='ready';if($('raceboard').hidden)return;
 if(!force&&elapsed-standingsStamp<.15)return;standingsStamp=elapsed;
 const list=$('standings');list.replaceChildren();standings().forEach((entry,i)=>{const m=CATALOG[entry.model],li=document.createElement('li'),name=document.createElement('strong'),detail=document.createElement('small');li.className=entry.player?'player':'';li.style.setProperty('--race-color',m.color);name.textContent=(i+1)+'. '+(entry.player?'DU · ':'')+m.name;detail.textContent=entry.finished?'ZIEL · '+fmt(entry.finishTime):'Runde '+Math.min(5,Math.max(1,Math.floor(entry.progress/length)+1))+' / 5';li.append(name,detail);list.appendChild(li)})
}
function resize(){let rect=canvas.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(rect.width*d);canvas.height=Math.round(rect.height*d);let scale=Math.min(canvas.width/21.2,canvas.height/9.1);view={scale,x:(canvas.width-20*scale)/2,y:(canvas.height-8*scale)/2};if(ready)drawTrack()}
function resetCar(){const p=at(0);car={...p,model:selected,v:0,lap:0,lapTime:0,lastLap:Infinity,lapTimes:[],prevS:0,progress:0,finished:false,finishTime:null};elapsed=0;standingsStamp=-1;
 const pool=CATALOG.map((_,i)=>i).filter(i=>i!==selected);for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]]}
 bots=Array.from({length:fieldSize()-1},(_,i)=>{const id=i+1;return {...at(-id*.65),id,model:pool[i],travel:-id*.65,speed:0,pace:(.91+i*.018)*DIFFICULTIES[raceDifficulty].pace,lane:(i%2?1:-1)*.19,lap:0,finished:false,finishTime:null}});
}
function start(){if(!ready)return;mode=$('mode').value;raceDifficulty=Object.hasOwn(DIFFICULTIES,$('difficulty').value)?$('difficulty').value:'normal';resetCar();$('welcome').hidden=true;state='countdown';countdown=3;flash=0;keys={};document.querySelector('.legend i').style.background=CATALOG[car.model].color;canvas.focus();updateUI();updateStandings(true)}
function pause(){if(state==='running'||state==='countdown'){previousState=state;state='paused'}else if(state==='paused'){state=previousState;$('banner').hidden=true;frameLast=performance.now()}updateUI()}
function recover(){if(state!=='running')return;const p=nearest(car.x,car.y);car.x=p.x;car.y=p.y;car.a=p.a;car.v=0;car.prevS=p.s;car.lapTime+=3;elapsed+=3;flash=1.5;banner('ZURÜCK AUF DER LINIE','Bergung · 3 Sekunden Zeitstrafe')}
function banner(big,small=''){$('banner').hidden=false;$('banner').replaceChildren();let text=document.createTextNode(big);$('banner').appendChild(text);if(small){let el=document.createElement('small');el.textContent=small;$('banner').appendChild(el)}}
function input(){let steer=(keys.ArrowRight||keys.KeyD?1:0)-(keys.ArrowLeft||keys.KeyA?1:0),gas=keys.ArrowUp||keys.KeyW?1:0,brake=keys.ArrowDown||keys.KeyS?1:0;let pads=navigator.getGamepads?navigator.getGamepads():[],pad=Array.from(pads).find(p=>p&&p.mapping==='standard');$('padstatus').textContent=pad?'● Gamepad verbunden':'◌ Gamepad nicht verbunden';if(pad){if(Math.abs(pad.axes[0])>.12)steer=pad.axes[0];gas=Math.max(gas,pad.buttons[7]?.value||0,pad.buttons[0]?.value||0);brake=Math.max(brake,pad.buttons[6]?.value||0,pad.buttons[1]?.value||0)}return {steer,gas,brake}}
// RC-sized wheelbase and more lock for hairpins. Blend to the previous
// high-speed curvature, avoiding abrupt changes across the speed range.
function steeringRate(speed, input){
 const blend=clamp((Math.abs(speed)-1.5)/4.75,0,1);
 const smoothBlend=blend*blend*(3-2*blend);
 const highSpeedLock=Math.atan(.257/.63*Math.tan(.48));
 const lock=.56+(highSpeedLock-.56)*smoothBlend;
 return Math.tan(clamp(input,-1,1)*lock)*speed/.257;
}
function driveSpeed(speed,gas,brake,dt){let acc=gas*8.4-brake*(speed>.15?10:2.8)-speed;if(!gas&&!brake)acc-=Math.sign(speed)*.5;return clamp(speed+acc*dt,-1.5,MAX_SPEED)}
function averageLapTime(){return car?.lapTimes.length?car.lapTimes.reduce((sum,t)=>sum+t,0)/car.lapTimes.length:Infinity}
function updateResult(){const visible=state==='finished'&&car?.finished;$('raceresult').hidden=!visible;if(visible){$('result-position').textContent='PLATZ '+car.place+' / '+fieldSize();$('result-average').textContent=averageLapTime().toFixed(3)+' s';$('result-total').textContent=fmt(car.finishTime);}}
function step(dt,controls){elapsed+=dt;car.lapTime+=dt;const {steer,gas,brake}=controls;car.v=driveSpeed(car.v,gas,brake,dt);car.a+=steeringRate(car.v,steer)*dt;car.x+=Math.cos(car.a)*car.v*dt;car.y+=Math.sin(car.a)*car.v*dt;let p=nearest(car.x,car.y);let edge=road-.135;if(p.d>edge){let nx=(car.x-p.x)/p.d,ny=(car.y-p.y)/p.d;car.x=p.x+nx*edge;car.y=p.y+ny*edge;car.v*=Math.pow(.12,dt);}
let ds=p.s-car.prevS;if(ds>length/2)ds-=length;if(ds< -length/2)ds+=length;if(Math.abs(ds)<1.5)car.progress+=ds;car.prevS=p.s;
if(car.progress>=length-.02){car.progress-=length;car.lap++;if(car.lapTime<best){best=car.lapTime;try{localStorage.setItem('msv-retro-best-track2-start3-handling4',String(best))}catch{}}car.lastLap=car.lapTime;car.lapTimes.push(car.lastLap);car.lapTime=0;if(isRace()&&car.lap>=5){state='finished';car.finished=true;car.finishTime=elapsed;car.place=1+bots.filter(b=>b.finished).length;banner('ZIEL · PLATZ '+car.place, '5 Runden in '+fmt(elapsed)+' · Noch eine Runde? Motor starten.')}}
if(isRace())for(const b of bots){if(b.finished)continue;let ahead=at(b.travel+.7),now=at(b.travel),turn=Math.abs(Math.atan2(Math.sin(ahead.a-now.a),Math.cos(ahead.a-now.a)));let target=Math.min(MAX_SPEED,clamp(6.6-turn*4.2,2.28,6.6)*b.pace);b.speed+=(target-b.speed)*Math.min(1,dt*4);b.travel+=b.speed*dt;Object.assign(b,at(b.travel));const offset=b.lane*clamp(1-turn,.2,1);b.x-=Math.sin(b.a)*offset;b.y+=Math.cos(b.a)*offset;b.lap=Math.max(0,Math.floor(b.travel/length));if(b.lap>=5){b.finished=true;b.finishTime=elapsed;}let dx=car.x-b.x,dy=car.y-b.y,d=Math.hypot(dx,dy);if(d<.32&&d>.001){car.x+=dx/d*(.32-d)*.5;car.y+=dy/d*(.32-d)*.5;car.v*=.96}}
}
function updateUI(){$('time').textContent=fmt(car?.lapTime||0);$('best').textContent=fmt(best);$('lastlap').textContent=fmt(car?.lastLap??Infinity);$('speed').textContent=Math.round(Math.abs(car?.v||0)*3.6);$('lap').textContent=car?(isRace()?Math.min(5,car.lap+1)+' / 5':car.lap+' / ∞'):'— / —';let status={ready:'BEREIT FÜR DIE STRECKE',countdown:'STARTAUFSTELLUNG',running:isRace()?'RENNEN · P'+(1+bots.filter(b=>b.travel>car.lap*length+car.progress).length)+' / '+fieldSize()+' · '+DIFFICULTIES[raceDifficulty].label:'FREIES TRAINING',paused:'PAUSE',finished:'RENNEN BEENDET'};$('status').textContent=status[state];$('pause').textContent=state==='paused'?'▶ Weiter':'Ⅱ Pause';updateStandings(state==='finished');updateResult();}
function render(){ctx.setTransform(1,0,0,1,0,0);ctx.drawImage(staticCanvas,0,0);world(ctx);if(isRace()&&state!=='ready')bots.forEach(b=>drawCar(ctx,b.x,b.y,b.a,'',b.model,1));if(car)drawCar(ctx,car.x,car.y,car.a,'',car.model,1,'',true)}
function frame(t){let dt=Math.min(.05,(t-frameLast)/1000||0);frameLast=t;if(ready){if(state==='countdown'){countdown-=dt;banner(countdown>0?String(Math.ceil(countdown)):'LOS!');if(countdown<=0){state='running';flash=.7;}}else if(state==='running'){const controls=input();for(let i=0;i<4&&state==='running';i++)step(dt/4,controls);if(flash>0){flash-=dt;if(flash<=0&&state==='running')$('banner').hidden=true}}else if(state==='paused')banner('PAUSE','P drücken oder „Weiter“ wählen');render();updateUI()}requestAnimationFrame(frame)}
$('start').onclick=start;$('quickstart').onclick=()=>{$('mode').value='training';start()};$('pause').onclick=pause;$('reset').onclick=()=>{if(ready){resetCar();state='ready';$('banner').hidden=true;$('welcome').hidden=false;updateUI()}};
window.addEventListener('keydown',e=>{if(['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName)||$('helpdialog').open)return;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code))e.preventDefault();keys[e.code]=true;if(!e.repeat){if(e.code==='KeyP'||e.code==='Space')pause();if(e.code==='KeyR')recover()}});window.addEventListener('keyup',e=>keys[e.code]=false);window.addEventListener('blur',()=>{keys={};if(state==='running'||state==='countdown')pause()});document.addEventListener('visibilitychange',()=>{if(document.hidden){keys={};if(state==='running'||state==='countdown')pause()}});
document.querySelectorAll('[data-key]').forEach(b=>{b.onpointerdown=e=>{e.preventDefault();b.setPointerCapture(e.pointerId);keys[b.dataset.key]=true};b.onpointerup=b.onpointercancel=b.onlostpointercapture=()=>keys[b.dataset.key]=false});
$('help').onclick=()=>{if(state==='running'||state==='countdown')pause();$('helpdialog').showModal()};$('closehelp').onclick=$('helpdone').onclick=()=>$('helpdialog').close();$('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.querySelector('.game').requestFullscreen()}catch{banner('VOLLBILD NICHT VERFÜGBAR');flash=2}};
new ResizeObserver(resize).observe(canvas);initializeGarage();fetch('track.json?v=2').then(r=>{if(!r.ok)throw Error('Streckendatei fehlt');return r.json()}).then(data=>{trackData=data;build();ready=true;resetCar();resize();updateSelected();updateUI()}).catch(e=>{$('welcome').querySelector('h2').textContent='Strecke konnte nicht laden';$('welcome').querySelector('p').textContent=e.message;$('quickstart').disabled=true});requestAnimationFrame(frame);
// Deterministic diagnostics used by the local QA runner.
window.MSV={at,nearest,get trackLength(){return length},get ready(){return ready},get state(){return state},get car(){return car},get bots(){return bots},start,step,resetCar};
