'use strict';
function renderRetroCar(g,x,y,a,model,scale=1,halo=false){
 const m=model,shape=m.shape,w=shape==='hatch'?.106:shape==='aero'?.126:.118;
 const len=shape==='wagon'||shape==='long'?.255:shape==='hatch'?.215:.245;
 const round=['round','gt','fastback'].includes(shape),wing=['aero','gt','muscle'].includes(shape)?1:0;
 const rearRoof=shape==='wagon'?-.205:shape==='hatch'?-.14:shape==='fastback'?-.145:-.105;
 const frontRoof=(shape==='gt'?.015:.066)*m.roof;
 g.save();g.translate(x,y);g.rotate(a);g.scale(scale,scale);
 if(halo){g.strokeStyle=m.color+'99';g.lineWidth=.018;g.beginPath();g.arc(0,0,.34,0,Math.PI*2);g.stroke();g.fillStyle=m.color;g.beginPath();g.moveTo(.36,0);g.lineTo(.30,-.03);g.lineTo(.30,.03);g.fill()}
 g.fillStyle='#0006';g.beginPath();g.roundRect(-len+.015,-w+.035,len*2,w*2,.025);g.fill();
 for(const xx of [-.145,.145])for(const yy of [-w-.017,w-.009]){g.fillStyle='#080f12';g.fillRect(xx-.046,yy,.092,.028)}
 g.beginPath();g.moveTo(-len+.018,-w*m.tail);g.lineTo(-len*.50,-w);g.lineTo(len*.55,-w);g.quadraticCurveTo(len,-w,len,-w*m.nose*.75);g.lineTo(len,w*m.nose*.75);g.quadraticCurveTo(len,w,len*.55,w);g.lineTo(-len*.50,w);g.lineTo(-len+.018,w*m.tail);g.quadraticCurveTo(-len,w*.85,-len,w*.65);g.lineTo(-len,-w*.65);g.closePath();g.fillStyle=m.color;g.fill();g.save();g.clip();
 g.fillStyle=m.accent;
 if(m.livery===0){g.fillRect(-len,-.025,len*2,.05);g.fillRect(-len,.065,len*2,.012)}
 if(m.livery===1){g.beginPath();g.moveTo(-len,-w);g.lineTo(.13,-w);g.lineTo(-.04,w);g.lineTo(-len,w);g.fill()}
 if(m.livery===2){g.fillRect(-len,-w,.07,w*2);g.fillRect(.14,-w,.035,w*2)}
 if(m.livery===3){g.fillRect(-len,-w,len*2,.035);g.fillRect(-len,w-.035,len*2,.035)}
 if(m.livery===4){g.save();g.rotate(-.35);g.fillRect(.08,-.2,.09,.4);g.restore()}
 g.restore();g.strokeStyle='#e7f6f32a';g.lineWidth=.007;g.beginPath();g.moveTo(-len+.04,-w+.008);g.lineTo(len-.03,-w+.008);g.stroke();
 // Glazing proportions distinguish estate, hatch, coupe and saloon bodies.
 g.fillStyle='#122631';g.beginPath();g.moveTo(rearRoof,-w*.77);g.lineTo(frontRoof,-w*.72);g.lineTo(frontRoof+.038,-w*.52);g.lineTo(frontRoof+.038,w*.52);g.lineTo(frontRoof,w*.72);g.lineTo(rearRoof,w*.77);g.closePath();g.fill();
 g.fillStyle='#91b6c0';g.beginPath();g.moveTo(frontRoof-.005,-w*.67);g.lineTo(frontRoof+.027,-w*.48);g.lineTo(frontRoof+.027,w*.48);g.lineTo(frontRoof-.005,w*.67);g.closePath();g.fill();
 g.fillStyle=m.color;g.fillRect(rearRoof+.035,-w*.61,frontRoof-rearRoof-.046,w*1.22);
 if(shape==='wagon'){g.fillStyle='#e2edf240';g.fillRect(rearRoof+.05,-.038,.12,.008);g.fillRect(rearRoof+.05,.030,.12,.008)}
 if(!['coupe','gt','muscle','hatch'].includes(shape)){g.strokeStyle=m.color;g.lineWidth=.011;g.beginPath();g.moveTo(-.035,-w*.9);g.lineTo(-.035,w*.9);g.stroke()}
 g.strokeStyle='#0a182c77';g.lineWidth=.006;g.strokeRect(frontRoof+.045,-w*.74,len-frontRoof-.073,w*1.48);
 g.fillStyle='#f6f1ca';const lamp=round?.044:.062;g.fillRect(len-.023,-w*.78,.016,lamp);g.fillRect(len-.023,w*.78-lamp,.016,lamp);
 if(shape==='gt'){g.fillStyle='#18333a';g.fillRect(len-.065,-.075,.035,.041);g.fillRect(len-.065,.034,.035,.041)}
 g.fillStyle='#ff5d59';g.fillRect(-len+.007,-w*.75,.013,.055);g.fillRect(-len+.007,w*.75-.055,.013,.055);
 g.fillStyle='#172026';g.fillRect(len-.01,-.03,.012,.06);
 g.fillRect(-len+.013,-w-.006,wing?.028:.013,w*2+.012);
 if(wing){g.fillStyle=m.accent;g.fillRect(-len+.008,-w-.014,.018,w*2+.028)}
 g.fillStyle=m.color;g.fillRect(frontRoof-.01,-w-.019,.032,.018);g.fillRect(frontRoof-.01,w+.001,.032,.018);
 g.fillStyle='#f5f4de';g.fillRect(-.052,-.041,.07,.082);g.fillStyle='#142026';g.save();g.rotate(Math.PI/2);g.font='bold .052px Arial';g.textAlign='center';g.textBaseline='middle';g.fillText(m.number,0,.016);g.restore();
 g.fillStyle='#0c181b';for(let xx of [.17,-.19]){g.beginPath();g.arc(xx,0,.007,0,Math.PI*2);g.fill()}g.restore();
}
function previewModel(canvas,model,big=false){const g=canvas.getContext('2d'),w=canvas.width,h=canvas.height;g.clearRect(0,0,w,h);g.strokeStyle='#ffffff08';g.lineWidth=1;for(let y=20;y<h;y+=23){g.beginPath();g.moveTo(0,y);g.lineTo(w,y-30);g.stroke()}renderRetroCar(g,w/2,h/2,-.13,model,big?Math.min(w*1.2,h*2.6):Math.min(w*.9,h*2.3))}
function renderGarage(){
 const items=CATALOG.map((model,index)=>({model,index}));const grid=$('cargrid');grid.replaceChildren();
 for(const {model,index} of items){
  const button=document.createElement('button');button.className='carcard'+(index===selected?' selected':'');button.dataset.car=index;button.style.setProperty('--car-color',model.color);button.setAttribute('aria-pressed',String(index===selected));
  const pic=document.createElement('canvas');pic.width=300;pic.height=120;pic.setAttribute('aria-hidden','true');button.appendChild(pic);
  const row=document.createElement('div'),text=document.createElement('span'),tag=document.createElement('small'),name=document.createElement('b'),swatch=document.createElement('i');tag.textContent=model.series.join(' / ')+' · REF. '+model.era;name.textContent=model.name;text.append(tag,name);swatch.className='swatch';swatch.style.background=model.color;row.append(text,swatch);button.appendChild(row);
  const marker=document.createElement('span');marker.className='selectmark';marker.textContent=index===selected?'AUSGEWÄHLT ↗':'AUSWÄHLEN ↗';button.appendChild(marker);button.onclick=()=>selectCar(index);grid.appendChild(button);previewModel(pic,model);
 }

}
function selectCar(index){selected=index;try{localStorage.setItem('msv-retro-selected',CATALOG[index].id)}catch{}renderGarage();updateSelected()}
function updateSelected(){const m=CATALOG[selected];$('selectedname').textContent=m.name;$('selecteddescription').textContent=m.description;$('selectedmeta').textContent=m.series.join(' / ')+' · REFERENZ '+m.era;previewModel($('selectedpreview'),m,true);if(state==='ready'){if(car)car.model=selected;document.querySelector('.legend i').style.background=m.color}}
function initializeGarage(){try{const saved=localStorage.getItem('msv-retro-selected'),idx=CATALOG.findIndex(m=>m.id===saved);if(idx>=0)selected=idx}catch{}
 $('mode').onchange=updateRaceOptions;$('difficulty').onchange=updateRaceOptions;updateRaceOptions();renderGarage();updateSelected();
}

function updateRaceOptions(){
 const training=$('mode').value==='training';
 $('modehint').textContent=training?'Freie Runden · lokale Bestzeit':$('mode').value==='race6'?'Du + 5 Gegner · 5 Runden':'Du + 3 Gegner · 5 Runden';
 $('difficulty').disabled=training;
 const hints={easy:'Entspannteres Tempo – zum Einsteigen und Üben.',normal:'Ausgewogenes Renntempo.',hard:'Höheres Tempo – saubere Linien sind gefragt.'};
 $('difficultyhint').textContent=training?'Im Training gibt es keine Gegner.':hints[$('difficulty').value]||hints.normal;
}
