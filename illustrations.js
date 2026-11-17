const FALLBACK = '#08788e';
function safeColor(value,fallback=FALLBACK) { return /^#[\da-f]{3}([\da-f]{3})?$/i.test(value||'') ? value : fallback; }
function key(value) { return String(value).replace(/[^a-zA-Z0-9_-]/g,'').slice(0,80)||'babo'; }
function tone(hex,amount) {
  hex=safeColor(hex).slice(1);if(hex.length===3)hex=hex.split('').map(c=>c+c).join('');
  return '#'+[0,2,4].map(i=>{const v=parseInt(hex.slice(i,i+2),16);return Math.round(amount>0?v+(255-v)*amount:v*(1+amount)).toString(16).padStart(2,'0');}).join('');
}
function ink(hex) {hex=safeColor(hex).slice(1);if(hex.length===3)hex=hex.split('').map(c=>c+c).join('');const v=[0,2,4].map(i=>parseInt(hex.slice(i,i+2),16));return v[0]*.299+v[1]*.587+v[2]*.114>155?'#17383c':'#fff7e8';}
function gradient(id,color) {color=safeColor(color);return `<linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="${tone(color,-.23)}"/><stop offset=".075" stop-color="${tone(color,-.05)}"/><stop offset=".23" stop-color="${tone(color,.19)}"/><stop offset=".47" stop-color="${tone(color,.07)}"/><stop offset=".72" stop-color="${color}"/><stop offset=".93" stop-color="${tone(color,-.16)}"/><stop offset="1" stop-color="${tone(color,-.3)}"/></linearGradient>`;}
function tintedGlass(uid,color) {
  return `<linearGradient id="${uid}-body-clear" x1="0" x2="1"><stop stop-color="${tone(color,-.18)}" stop-opacity=".58"/><stop offset=".14" stop-color="#fffef4" stop-opacity=".78"/><stop offset=".3" stop-color="${tone(color,.15)}" stop-opacity=".34"/><stop offset=".75" stop-color="${color}" stop-opacity=".24"/><stop offset="1" stop-color="${tone(color,-.15)}" stop-opacity=".54"/></linearGradient>`;
}
function defs(uid,colors={}) {return `<defs>${Object.entries(colors).map(([part,c])=>gradient(`${uid}-${part}`,c)).join('')}${tintedGlass(uid,safeColor(colors.body))}<linearGradient id="${uid}-steel" x1="0" x2="1"><stop stop-color="#728582"/><stop offset=".08" stop-color="#c1ccc5"/><stop offset=".2" stop-color="#fffdf2"/><stop offset=".29" stop-color="#b4c1b9"/><stop offset=".48" stop-color="#e2e8dc"/><stop offset=".72" stop-color="#9daea5"/><stop offset=".85" stop-color="#edf0e3"/><stop offset="1" stop-color="#6b817c"/></linearGradient><linearGradient id="${uid}-clear" x1="0" x2="1"><stop stop-color="#8cafad" stop-opacity=".3"/><stop offset=".2" stop-color="#fffef2" stop-opacity=".8"/><stop offset=".6" stop-color="#bfd6ce" stop-opacity=".1"/><stop offset="1" stop-color="#6d9b99" stop-opacity=".35"/></linearGradient><filter id="${uid}-powder" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".78" numOctaves="2" stitchTiles="stitch" result="grain"/><feColorMatrix in="grain" type="saturate" values="0" result="mono"/><feComponentTransfer in="mono" result="faint"><feFuncA type="linear" slope=".075"/></feComponentTransfer><feComposite in="faint" in2="SourceGraphic" operator="in" result="texture"/><feBlend in="SourceGraphic" in2="texture" mode="soft-light"/></filter><filter id="${uid}-shadow" x="-60%" y="-100%" width="220%" height="300%"><feGaussianBlur stdDeviation="7"/></filter></defs>`;}
function steel(uid,x,y,w) {return `<path d="M${x} ${y}q${w/2} 6 ${w} 0v4q-${w/2} 6 -${w} 0Z" fill="url(#${uid}-steel)"/><path d="M${x+1} ${y+2}q${w/2-1} 5 ${w-2} 0" fill="none" stroke="#fffdf4" stroke-opacity=".65" stroke-width=".8"/>`;}
function lidMarkup(uid,type,x,y,w,color) {
  const middle=x+w/2;let extra='';
  if(type==='straw') extra=`<rect x="${middle+13}" y="${y-26}" width="9" height="32" rx="4" fill="url(#${uid}-lid)" transform="rotate(8 ${middle+17} ${y})"/><ellipse cx="${middle+20}" cy="${y-25}" rx="4.2" ry="2" fill="#153238"/><path d="M${x+18} ${y+3}v-8q0-9 10-9h7q9 0 9 9v8" fill="#243536"/>`;
  else if(type==='chug')extra=`<rect x="${middle-9}" y="${y-20}" width="36" height="27" rx="9" fill="url(#${uid}-lid)"/><rect x="${middle-12}" y="${y-24}" width="42" height="10" rx="5" fill="#213335"/><ellipse cx="${middle+9}" cy="${y-23}" rx="20" ry="3" fill="#3a4c4b"/>`;
  else if(type==='loop')extra=`<path d="M${middle-22} ${y+2}v-13c0-28 44-28 44 0v13" fill="none" stroke="${tone(color,-.15)}" stroke-width="10"/><path d="M${middle-22} ${y}v-11c0-25 44-25 44 0v11" fill="none" stroke="${tone(color,.1)}" stroke-width="6"/>`;
  else extra=`<path d="M${middle-15} ${y+4}v-15q0-10 12-10h23q11 0 11 12v13" fill="url(#${uid}-lid)"/><path d="M${middle-15} ${y-8}q17 5 46 0" fill="none" stroke="#1e3639" stroke-width="3"/>`;
  return `${extra}<ellipse cx="${middle}" cy="${y+4}" rx="${w/2}" ry="7" fill="#233c3e"/><path d="M${x} ${y+6}q${w/2} 9 ${w} 0v21q0 7-10 8h-${w-20}q-10-1-10-8Z" fill="url(#${uid}-lid)"/><ellipse cx="${middle}" cy="${y+5}" rx="${w/2-1}" ry="6" fill="${tone(color,.08)}"/><g opacity=".18" stroke="${tone(color,-.4)}" stroke-width="1.4">${Array.from({length:15},(_,i)=>`<path d="M${x+5+i*(w-10)/14} ${y+14}v13"/>`).join('')}</g>${steel(uid,x+2,y+33,w-4)}`;
}
function compactHandle(uid,bodyRight,bodyTop,bodyHeight,color) {
  const top=bodyTop+bodyHeight*.24+5;
  const bottom=bodyTop+bodyHeight*.80-5;
  const bend=Math.min(17,(bottom-top)/3);
  const reach=Math.min(26,Math.max(15,bodyHeight*.2));
  const path=`M${bodyRight-4} ${top}h11C${bodyRight+reach-5} ${top} ${bodyRight+reach} ${top+5} ${bodyRight+reach} ${top+bend}V${bottom-bend}C${bodyRight+reach} ${bottom-5} ${bodyRight+reach-5} ${bottom} ${bodyRight+7} ${bottom}h-11`;
  return `<path d="${path}" stroke="${tone(color,-.2)}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/><path d="${path}" stroke="url(#${uid}-handle)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>`;
}
function attachmentCollar(uid,x,y,width,color='#08788e') {
  return `<g data-artwork="ringloop"><path d="M${x} ${y}q${width/2} 5 ${width} 0v7q-${width/2} 6 -${width} 0Z" fill="url(#${uid}-ringloop)"/><path d="M${x+1} ${y+1}q${width/2-1} 5 ${width-2} 0" stroke="${tone(color,.35)}" stroke-opacity=".6" stroke-width="1"/><path d="M${x+1} ${y+4}h-5q-7 0-7 7v4q0 7 7 7h5Z" stroke="url(#${uid}-brass)" stroke-width="3" stroke-linejoin="round"/><path d="M${x+width-1} ${y+4}h5q7 0 7 7v4q0 7-7 7h-5Z" stroke="url(#${uid}-brass)" stroke-width="3" stroke-linejoin="round"/><rect x="${x-2}" y="${y+1}" width="5" height="11" rx="2" fill="url(#${uid}-ringloop)"/><rect x="${x+width-3}" y="${y+1}" width="5" height="11" rx="2" fill="url(#${uid}-ringloop)"/></g>`;
}
function snackCompartment(uid,x,y,width,height,color='#08788e') {
  const capHeight=Math.max(7,height*.17),round=Math.min(12,height*.24),rim=Math.min(6,height*.09);
  return `<g data-artwork="snack"><rect x="${x}" y="${y+capHeight*.55}" width="${width}" height="${height-capHeight*.55}" rx="${round}" fill="url(#${uid}-snack)"/><path d="M${x+2} ${y+height-round*.6}q${width/2-2} ${rim*1.5} ${width-4} 0" stroke="${tone(color,-.3)}" stroke-opacity=".42" stroke-width="1.2"/><path d="M${x} ${y+rim}q${width/2} ${rim*2} ${width} 0v${capHeight}q-${width/2} ${rim*2} -${width} 0Z" fill="url(#${uid}-snackLid)"/><ellipse cx="${x+width/2}" cy="${y+rim}" rx="${width/2}" ry="${rim}" fill="#e3d8c2"/><ellipse cx="${x+width/2}" cy="${y+rim}" rx="${width/2-4}" ry="${Math.max(1,rim-1.2)}" stroke="#c8b999" stroke-width=".8"/>${steel(uid,x+1,y+capHeight+rim,width-2)}<rect x="${x+width-7}" y="${y+capHeight+rim-1}" width="5" height="${Math.max(8,height*.19)}" rx="2" fill="url(#${uid}-steel)"/><text x="${x+width/2}" y="${y+height*.77}" text-anchor="middle" font-family="Arial,sans-serif" font-size="${width*.13}" font-weight="700" letter-spacing="-.5" fill="#f7efdc">babo.</text></g>`;
}
function phoneHolder(uid,color='#f67e68') {
  return `<path d="M83 44h70q24 0 24 25v104q0 28-26 29H92q-24-1-24-28V71q0-27 15-27Z" fill="${tone(color,-.2)}"/><rect x="69" y="39" width="99" height="156" rx="31" fill="url(#${uid}-phone)"/><rect x="74" y="44" width="88" height="145" rx="27" stroke="${tone(color,.35)}" stroke-opacity=".55" stroke-width="1.5"/><path d="M57 105h19m-19 16h19m87-16h18m-18 16h18" stroke="url(#${uid}-steel)" stroke-width="5"/><rect x="50" y="87" width="25" height="68" rx="12" fill="url(#${uid}-phone)"/><rect x="56" y="93" width="13" height="54" rx="6" fill="#b7a27f"/><path d="M60 97v46m5-46v46" stroke="#ddc8a7" stroke-opacity=".5" stroke-width="1"/><rect x="165" y="89" width="25" height="68" rx="12" fill="url(#${uid}-phone)"/><path d="M169 97v51" stroke="${tone(color,.5)}" stroke-opacity=".45" stroke-width="1.5"/><path d="M79 174h23v20H90q-11 0-11-12Zm56 0h23v8q0 12-11 12h-12Z" fill="url(#${uid}-phone)"/><path d="M85 174h11v9H85m56-9h11v9h-11" stroke="#ceb89a" stroke-width="6" stroke-linejoin="round"/><text x="120" y="128" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="700" letter-spacing="-.8" fill="#fff0d8">babo.</text><rect x="105" y="199" width="30" height="27" rx="10" fill="url(#${uid}-phone)"/><circle cx="108" cy="211" r="6" fill="url(#${uid}-steel)"/><path d="M105 208h6" stroke="#576c65" stroke-width="1.5"/><rect x="99" y="223" width="42" height="17" rx="6" fill="url(#${uid}-phone)"/><path d="M101 235h38" stroke="${tone(color,-.3)}" stroke-width="1.2"/><ellipse cx="120" cy="254" rx="18" ry="20" stroke="url(#${uid}-phone)" stroke-width="9"/><path d="M119 269v9" stroke="url(#${uid}-brass)" stroke-width="7" stroke-linecap="round"/><path d="M113 278q-6 0-8 9l-6 20q-3 13 11 16h9q14-2 10-16l-7-21q-3-8-9-8Z" stroke="url(#${uid}-brass)" stroke-width="7"/><path d="m121 288 7 20" stroke="#f1d089" stroke-width="3" stroke-linecap="round"/>`;
}
function bodySegment(uid,{x,y,width,height,type,color,handleColor=color,paintKey='body',logoKey='body',handlePrefix=uid}) {
  const right=x+width, bottom=y+height, shoulder=Math.min(11,height*.18), corner=Math.min(10,height*.17);
  const outline=`M${x+8} ${y}Q${x} ${y+2} ${x} ${y+shoulder}V${bottom-corner}Q${x} ${bottom} ${x+corner} ${bottom}H${right-corner}Q${right} ${bottom} ${right} ${bottom-corner}V${y+shoulder}Q${right} ${y+2} ${right-8} ${y}Z`;
  let graphic=type==='handle'?compactHandle(handlePrefix,right,y,height,handleColor):'';
  graphic+=`<path d="${outline}" fill="url(#${uid}-${paintKey}${type==='clear'?'-body-clear':''})" ${type==='clear'?'':`filter="url(#${uid}-powder)"`}/>`;
  if(type==='clear') {
    graphic+=`<path d="M${x+5} ${y+9}v${height-18}m${width-10}-${height-18}v${height-18}" stroke="${tone(color,-.2)}" stroke-opacity=".25" stroke-width="1.2"/><path d="M${x+10} ${y+8}v${height-16}" stroke="#fffef5" stroke-opacity=".7" stroke-width="3"/>`;
  } else {
    graphic+=`<path d="M${x+7} ${y+shoulder}v${height-shoulder-corner}" stroke="#fffdf1" stroke-opacity=".11" stroke-width="2"/>`;
  }
  if(type==='textured') graphic+=`<g>${Array.from({length:15},(_,i)=>{const rx=x+7+i*(width-14)/14;return `<path d="M${rx} ${y+8}v${height-16}" stroke="${tone(color,-.35)}" stroke-opacity=".21" stroke-width="2.3"/><path d="M${rx+.9} ${y+8}v${height-16}" stroke="${tone(color,.4)}" stroke-opacity=".26" stroke-width=".8"/>`;}).join('')}</g>`;
  graphic+=`<path d="M${x+8} ${y+3}q${width/2-8} 4 ${width-16} 0" stroke="#fffdf2" stroke-opacity=".17" stroke-width="1"/><text data-brand-logo="${logoKey}" x="${x+width/2}" y="${y+height*.59}" text-anchor="middle" font-family="Arial,sans-serif" font-size="${logoKey==='body'?17:12}" font-weight="700" letter-spacing="-.8" fill="${type==='clear'?'#294d4c':ink(color)}">babo.</text>`;
  return graphic;
}
function upwardThread(uid,x,y,width) {
  const left=x+3,right=x+width-3,w=width-6;
  return `<path d="M${left} ${y-8}q${w/2} 5 ${w} 0v10q-${w/2} 5 -${w} 0Z" fill="url(#${uid}-steel)"/><g fill="none" stroke="#798b87" stroke-opacity=".68" stroke-width=".75">${[-6,-3,0].map(d=>`<path d="M${left+1} ${y+d}q${w/2-1} 5 ${w-2} 0"/>`).join('')}</g><ellipse cx="${x+width/2}" cy="${y-8}" rx="${w/2}" ry="4" fill="#b5c1b8"/><ellipse cx="${x+width/2}" cy="${y-8}" rx="${w/2-3}" ry="2.7" fill="#3f605c"/><path d="M${left+4} ${y-8}q${w/2-4}-3 ${w-8} 0" stroke="#f8f5e9" stroke-opacity=".75" stroke-width=".7"/>`;
}
function baseSegment(uid,x,y,width,height,type,color) {
  const foot=type==='narrow'?62:width, inset=(width-foot)/2;
  let graphic=`<path d="M${x+2} ${y}q${width/2-2} 5 ${width-4} 0l-${Math.max(0,inset-2)} ${height-10}q-1 10-12 10H${x+inset+12}q-11 0-12-10Z" fill="url(#${uid}-base)" filter="url(#${uid}-powder)"/><path d="M${x+inset+6} ${y+height-3}q${foot/2-6} 4 ${foot-12} 0" stroke="${tone(color,-.28)}" stroke-width="1.5" stroke-opacity=".55"/>`;
  if(type==='storage')graphic+=`<path d="M${x+1} ${y+height*.48}q${width/2-1} 6 ${width-2} 0" stroke="${tone(color,-.3)}" stroke-opacity=".5" stroke-width="1.3"/>`;
  return graphic;
}
function everydayAccessory(uid,id,color) {
  const paint=`url(#${uid}-${id})`,edge=tone(color,-.28);
  if(id==='boot')return `<path d="M12 38q38 13 76 0v34q0 15-17 17H29q-17-2-17-17Z" fill="${paint}"/><ellipse cx="50" cy="38" rx="38" ry="12" fill="${tone(color,.18)}"/><ellipse cx="50" cy="38" rx="31" ry="8" fill="${edge}"/><path d="M19 69q31 9 62 0m-60 7q29 8 58 0" stroke="${edge}" stroke-width="1.5"/>`;
  if(id==='sling')return `<path d="M30 45C-3-4 103-3 74 47" stroke="${tone(color,-.15)}" stroke-width="7" fill="none"/><path d="M24 39q26 7 52 0v40q0 13-13 14H37q-13-1-13-14Z" fill="${paint}" filter="url(#${uid}-powder)"/><ellipse cx="50" cy="39" rx="26" ry="7" fill="${edge}"/><path d="M29 48v29q0 10 10 10h23" stroke="${tone(color,.35)}" stroke-width="1"/><rect x="74" y="34" width="7" height="12" rx="2" fill="url(#${uid}-brass)"/>`;
  if(id==='strawkit')return `<g transform="rotate(20 50 50)"><path d="M31 14v68m23-68v68" stroke="#c8ddd7" stroke-width="6"/><path d="M31 12v17m23-17v17" stroke="${color}" stroke-width="7" stroke-linecap="round"/><path d="M76 23v55" stroke="url(#${uid}-steel)" stroke-width="2"/><rect x="71" y="66" width="10" height="23" rx="5" fill="#e4ddcc"/><path d="M72 70h8m-8 5h8m-8 5h8" stroke="#b6ae9a"/></g>`;
  if(id==='infuser')return `<rect x="26" y="25" width="49" height="57" rx="7" fill="url(#${uid}-steel)"/><rect x="30" y="30" width="41" height="47" rx="3" fill="${tone(color,.3)}"/>${Array.from({length:7},(_,i)=>`<path d="M${32+i*6} 31v45M31 ${34+i*6}h39" stroke="${edge}" stroke-width=".65" opacity=".75"/>`).join('')}<ellipse cx="50" cy="25" rx="25" ry="6" fill="url(#${uid}-steel)"/><path d="M44 19v-7q0-7 7-7h6" stroke="${color}" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="50" cy="82" rx="24" ry="5" fill="url(#${uid}-steel)"/>`;
  if(id==='gasket')return `<ellipse cx="39" cy="39" rx="29" ry="18" fill="none" stroke="${color}" stroke-width="8"/><ellipse cx="65" cy="59" rx="24" ry="15" fill="none" stroke="${tone(color,.3)}" stroke-width="7"/><ellipse cx="31" cy="76" rx="19" ry="11" fill="none" stroke="${tone(color,-.2)}" stroke-width="6"/>`;
  if(id==='stickers')return `<g stroke="#fffaf1" stroke-width="3" stroke-linejoin="round"><circle cx="29" cy="32" r="18" fill="${paint}"/><path d="m68 12 7 14 16 2-12 11 3 16-14-8-14 8 3-16-12-11 16-2Z" fill="#f3cb63"/><path d="M39 61Q21 83 39 91Q58 83 39 61Z" fill="#80c8c0"/><rect x="62" y="64" width="29" height="23" rx="6" fill="${tone(color,.2)}" transform="rotate(-12 76 75)"/></g>`;
  return '';
}
export function bottleIllustration(input={},uid='bottle',options={}) {
  uid=key(uid);
  const build={lid:'straw',body:'smooth',extension:'none',base:'standard',foundation:'core',attachments:[],...input};
  const defaults={strap:'#ef7092',pouch:'#b6dcce',clip:'#51457f',charm:'#a92c35',brush:'#08788e',phone:'#501344',snack:'#85261e',ringloop:'#111214',boot:'#51457f',sling:'#ef7092',strawkit:'#a7cbd4',infuser:'#08788e',gasket:'#111214',stickers:'#f67e68'};
  const attachments=Array.isArray(build.attachments)?build.attachments.filter(id=>Object.hasOwn(defaults,id)):[];
  const colors={lid:'#f67e68',body:'#fbe6a1',extension:'#fbe6a1',base:'#08788e',handle:'#f67e68',...input.colors,...defaults,brass:'#bc8b3f',snackLid:'#fbe6a1'};
  for(const id of Object.keys(defaults))colors[id]=safeColor(build.attachmentColors?.[id],defaults[id]);
  for(const id of Object.keys(colors))colors[id]=safeColor(colors[id]);
  const extensions=Array.isArray(build.extensions)?build.extensions.filter(size=>['short','long'].includes(size)).slice(0,3):['short','long'].includes(build.extension)?[build.extension]:[];
  const middleSections=Array.isArray(build.middleSections)?build.middleSections.filter(section=>section&&['smooth','handle','textured','clear'].includes(section.type)&&['short','long'].includes(section.size)).slice(0,3):[];
  const visible=new Set(Array.isArray(options.visibleParts)?options.visibleParts:['base','body','lid','extensions','middleSections','attachments']);
  const showExtras=visible.has('attachments');
  const bodyH=build.foundation==='mini'?104:build.foundation==='max'?164:136;
  middleSections.forEach((section,i)=>{colors[`middle${i}`]=safeColor(section.color,colors.body);colors[`middle${i}-handle`]=colors[`middle${i}`];});
  extensions.forEach((_,i)=>{colors[`extension${i}`]=safeColor(build.extensionColors?.[i],colors.extension);});
  const parts=[];
  if(visible.has('lid'))parts.push({kind:'lid',module:'lid',height:38});
  if(visible.has('middleSections'))middleSections.map((section,index)=>({...section,index})).reverse().forEach(section=>parts.push({kind:'middle',module:`middle:${section.index}`,height:section.size==='long'?76:46,...section}));
  if(visible.has('body'))parts.push({kind:'body',module:'body',height:bodyH});
  if(visible.has('extensions'))extensions.forEach((size,index)=>parts.push({kind:'extension',module:`extension:${index}`,height:size==='long'?54:32,size,index}));
  if(visible.has('base'))parts.push({kind:'base',module:'base',height:build.base==='storage'?48:37});
  const snack=showExtras&&visible.has('base')&&attachments.includes('snack');
  if(snack)parts.push({kind:'snack',module:'attachment:snack',height:38});
  const fit=options.fit!==false;
  if(!parts.length)return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 ${fit?340:160}" fill="none" aria-hidden="true"></svg>`;
  const exploded=options.exploded===true,gap=exploded?14:0;
  const head=parts[0].kind==='lid'?44:20;
  const total=parts.reduce((sum,part)=>sum+part.height,0)+gap*(parts.length-1);
  const naturalHeight=head+total+40,viewHeight=fit?340:naturalHeight;
  const scale=fit?Math.min(1,316/naturalHeight):1;
  let cursor=head;
  parts.forEach(part=>{part.y=cursor;cursor+=part.height+gap;});
  const body=parts.find(part=>part.kind==='body'),base=parts.find(part=>part.kind==='base');
  const bx=77,bw=87;
  const glassDefs=[...middleSections.map((section,i)=>tintedGlass(`${uid}-middle${i}`,colors[`middle${i}`])),...extensions.map((_,i)=>tintedGlass(`${uid}-extension${i}`,colors[`extension${i}`])),tintedGlass(`${uid}-body`,colors.body)].join('');
  let out=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 ${viewHeight}" data-bottle-bottom="${head+total}" fill="none" aria-hidden="true">${defs(uid,colors)}<defs>${glassDefs}</defs><g transform="translate(120 ${viewHeight/2}) scale(${scale}) translate(-120 ${-naturalHeight/2})"><ellipse cx="121" cy="${head+total+11}" rx="49" ry="5.5" fill="#17383c" opacity=".12" filter="url(#${uid}-shadow)"/>`;
  if(showExtras&&body&&attachments.includes('strap')) {
    const top=body.y+9,bottom=body.y+body.height-8;
    out+=`<g data-module="attachment:strap"><path d="M${bx+3} ${top}C24 ${top-18} 24 ${bottom+13} ${bx+1} ${bottom}" stroke="${tone(colors.strap,-.25)}" stroke-width="7"/><path d="M${bx+3} ${top}C27 ${top-16} 27 ${bottom+10} ${bx+1} ${bottom}" stroke="${colors.strap}" stroke-width="4.3"/><path d="M${bx-2} ${top-3}v10m0 ${bottom-top-13}v10" stroke="url(#${uid}-steel)" stroke-width="4" stroke-linecap="round"/></g>`;
  }
  for(let index=0;index<parts.length;index++) {
    const part=parts[index],y=part.y;
    let graphic='';
    if(part.kind==='body')graphic=bodySegment(uid,{x:bx,y,width:bw,height:part.height,type:build.body,color:colors.body,handleColor:colors.handle,paintKey:'body',logoKey:'body',handlePrefix:uid});
    if(part.kind==='middle')graphic=bodySegment(uid,{x:bx,y,width:bw,height:part.height,type:part.type,color:colors[`middle${part.index}`],paintKey:`middle${part.index}`,logoKey:part.module,handlePrefix:`${uid}-middle${part.index}`});
    if(part.kind==='extension') {
      const paint=colors[`extension${part.index}`];
      graphic=`<path d="M${bx} ${y+2}q${bw/2} 5 ${bw} 0v${part.height-5}q-${bw/2} 6 -${bw} 0Z" fill="url(#${uid}-extension${part.index}-body-clear)"/><path d="M${bx+5} ${y+5}v${part.height-10}m${bw-10}-${part.height-10}v${part.height-10}" stroke="${tone(paint,-.3)}" stroke-opacity=".25" stroke-width=".8"/><path d="M${bx+10} ${y+7}v${part.height-14}" stroke="#fffdf1" stroke-opacity=".7" stroke-width="2.7"/><path d="M${bx} ${y+part.height-7}q${bw/2} 5 ${bw} 0v5q-${bw/2} 5 -${bw} 0Z" fill="url(#${uid}-extension${part.index})"/>`;
    }
    if(part.kind==='base')graphic=baseSegment(uid,bx,y,bw,part.height,build.base,colors.base);
    if(part.kind==='lid')graphic=lidMarkup(uid,build.lid,bx-2,y,bw+4,colors.lid);
    if(part.kind==='snack') {
      const foot=build.base==='narrow'?62:bw,width=Math.min(80,foot+12);
      graphic=snackCompartment(uid,bx+(bw-width)/2,y+2,width,part.height-2,colors.snack);
    }
    if(part.kind!=='lid'&&part.kind!=='snack') {
      graphic+=steel(uid,bx+1,y+1,bw-2);
      if(index===0||exploded)graphic+=upwardThread(uid,bx,y,bw);
      if(part.kind!=='base')graphic+=steel(uid,bx+1,y+part.height-4,bw-2);
    }
    out+=`<g data-module="${part.module}" data-kind="${part.kind}"${part.size?` data-size="${part.size}"`:''}>${graphic}</g>`;
  }
  if(showExtras&&body) {
    const y=body.y,h=body.height;
    if(attachments.includes('boot')){const foot=parts[parts.length-1],w=foot.kind==='snack'?80:build.base==='narrow'?62:bw,x=bx+(bw-w)/2,bottom=foot.y+foot.height;out+=`<g data-module="attachment:boot"><path d="M${x-2} ${bottom-19}q${w/2+2} 6 ${w+4} 0v13q0 9-10 10h-${w-16}q-10-1-10-10Z" fill="url(#${uid}-boot)"/><path d="M${x+4} ${bottom-4}q${w/2-4} 4 ${w-8} 0" stroke="${tone(colors.boot,-.25)}" stroke-width="1"/></g>`;}
    if(attachments.includes('sling')){const top=y+h*.35,height=h*.65;out+=`<g data-module="attachment:sling"><path d="M${bx-4} ${top}C${bx-42} ${y-24} ${bx+bw+44} ${y-23} ${bx+bw+4} ${top}" stroke="${tone(colors.sling,-.18)}" stroke-width="6" fill="none"/><path d="M${bx-5} ${top}q${bw/2+5} 7 ${bw+10} 0v${height-10}q0 12-12 12h-${bw-14}q-12 0-12-12Z" fill="url(#${uid}-sling)" fill-opacity=".85" filter="url(#${uid}-powder)"/><path d="M${bx+1} ${top+8}v${height-20}" stroke="${tone(colors.sling,.4)}" stroke-width="1"/><text x="${bx+bw/2}" y="${top+height*.64}" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" font-weight="700" fill="${ink(colors.sling)}">babo.</text></g>`;}
    ['strawkit','infuser','gasket'].filter(id=>attachments.includes(id)).forEach((id,i)=>{out+=`<g data-module="attachment:${id}" transform="translate(184 ${y+12+i*45}) scale(.39)">${everydayAccessory(uid,id,colors[id])}</g>`;});
    if(attachments.includes('stickers'))out+=`<g data-module="attachment:stickers" transform="translate(${bx+bw*.55} ${y+h*.68}) scale(.25)">${everydayAccessory(uid,'stickers',colors.stickers)}</g>`;
    if(attachments.includes('ringloop'))out+=`<g data-module="attachment:ringloop">${attachmentCollar(uid,bx-.5,y+h*.12,bw+1,colors.ringloop)}</g>`;
    if(attachments.includes('pouch'))out+=`<g data-module="attachment:pouch"><path d="M${bx-8} ${y+h*.48-6}v10" stroke="url(#${uid}-steel)" stroke-width="3"/><rect x="${bx-28}" y="${y+h*.48}" width="37" height="49" rx="9" fill="url(#${uid}-pouch)"/><path d="M${bx-24} ${y+h*.48+12}h29" stroke="${tone(colors.pouch,-.3)}" stroke-width="1.2"/><path d="M${bx+2} ${y+h*.48+13}v7" stroke="url(#${uid}-steel)" stroke-width="2"/><path d="M${bx-24} ${y+h*.48+20}v18q0 5 5 5h19" stroke="${tone(colors.pouch,.3)}" stroke-opacity=".5" stroke-width=".7"/></g>`;
    if(attachments.includes('clip'))out+=`<g data-module="attachment:clip"><rect x="${bx+bw+4}" y="${y+9}" width="16" height="28" rx="8" stroke="url(#${uid}-clip)" stroke-width="4" transform="rotate(-13 ${bx+bw+12} ${y+23})"/><path d="M${bx+bw+16} ${y+13}v15" stroke="url(#${uid}-steel)" stroke-width="2"/></g>`;
    if(attachments.includes('charm'))out+=`<g data-module="attachment:charm"><path d="M${bx+bw+2} ${y+12}q17 9 13 29" stroke="url(#${uid}-steel)" stroke-width="1.5"/><path d="m${bx+bw+15} ${y+36} 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z" fill="url(#${uid}-charm)"/></g>`;
    if(attachments.includes('phone'))out+=`<g data-module="attachment:phone"><path d="M${bx+2} ${y+h*.65}h-27" stroke="url(#${uid}-steel)" stroke-width="2.5" stroke-linecap="round"/><g transform="translate(${bx-46} ${y+h*.65-72}) scale(.25) translate(-50 -39)">${phoneHolder(uid,colors.phone)}</g></g>`;
    if(attachments.includes('brush')) {
      const grip=h*.36,shaft=h*.29,bristle=h*.24,top=y+13,bristleTop=top+grip+shaft;
      out+=`<g data-module="attachment:brush" transform="rotate(7 210 ${y+h/2})"><rect x="206" y="${top}" width="8" height="${grip}" rx="4" fill="url(#${uid}-brush)"/><circle cx="210" cy="${top+6}" r="1.4" fill="#f7f1e7"/><path d="M210 ${top+grip}v${shaft+5}" stroke="url(#${uid}-steel)" stroke-width="2.5"/><rect x="201" y="${bristleTop}" width="18" height="${bristle}" rx="8" fill="#ded8c6"/><g stroke="#bdb8a5" stroke-width=".7">${Array.from({length:6},(_,i)=>`<path d="M202 ${bristleTop+4+i*(bristle-8)/5}h16"/>`).join('')}</g></g>`;
    }
  }
  return out+'</g></svg>';
}
export function accessoryIllustration(id,uid='acc',options={}) {
  uid=key(uid);const colors={lid:'#f67e68',body:'#08788e',base:'#153b35',handle:'#fff6e8',strap:'#ef7092',pouch:'#b6dcce',clip:'#51457f',charm:'#a92c35',brush:'#08788e',phone:'#501344',brass:'#bc8b3f',snack:'#85261e',snackLid:'#fbe6a1',ringloop:'#111214',boot:'#51457f',sling:'#ef7092',strawkit:'#a7cbd4',infuser:'#08788e',gasket:'#111214',stickers:'#f67e68'};
  if(Object.hasOwn(colors,id))colors[id]=safeColor(typeof options==='string'?options:options.color,colors[id]);
  let content='';
  if(['boot','sling','strawkit','infuser','gasket','stickers'].includes(id))content=`<ellipse cx="120" cy="265" rx="76" ry="8" fill="#17383c" opacity=".1" filter="url(#${uid}-shadow)"/><g transform="translate(30 72) scale(1.8)">${everydayAccessory(uid,id,colors[id])}</g>`;
  else if(id==='strap')content=`<ellipse cx="128" cy="282" rx="61" ry="9" fill="#17383c" opacity=".1" filter="url(#${uid}-shadow)"/><path d="M93 88C19 93 31 272 111 265c86-6 99-167 30-177" stroke="${tone(colors.strap,-.25)}" stroke-width="15"/><path d="M93 86C22 95 36 267 111 260c79-7 95-165 30-174" stroke="url(#${uid}-strap)" stroke-width="10"/><path d="M92 86v-15h16v28H92Zm34 0V71h16v28h-16Z" fill="url(#${uid}-steel)"/><rect x="89" y="142" width="21" height="30" rx="4" fill="${tone(colors.strap,-.12)}" transform="rotate(-12 89 142)"/><rect x="94" y="146" width="11" height="21" rx="2" fill="${tone(colors.strap,.26)}" transform="rotate(-12 94 146)"/>`;
  else if(id==='pouch')content=`<ellipse cx="127" cy="278" rx="58" ry="10" fill="#17383c" opacity=".12" filter="url(#${uid}-shadow)"/><path d="M99 95V73q0-19 22-19h8q22 0 22 19v22" stroke="#b3a484" stroke-width="10"/><rect x="64" y="87" width="115" height="182" rx="27" fill="url(#${uid}-pouch)"/><path d="M76 151q48 8 92 0v88q-2 17-20 17H96q-20-1-20-17Z" fill="${tone(colors.pouch,.12)}" stroke="${tone(colors.pouch,-.2)}" stroke-width="1.5"/><path d="M76 113q46 6 92 0" stroke="#a3957c" stroke-width="3"/><path d="M159 115v15" stroke="#80928c" stroke-width="4"/><text x="121" y="204" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="16" letter-spacing="-1" fill="${tone(colors.pouch,-.4)}">babo.</text>`;
  else if(id==='clip')content=`<ellipse cx="125" cy="278" rx="50" ry="9" fill="#17383c" opacity=".1" filter="url(#${uid}-shadow)"/><g transform="rotate(18 120 165)"><path d="M85 103q4-38 39-38h8q37 0 37 40v113q0 40-39 40h-6q-39 0-39-40Z" stroke="${tone(colors.clip,-.22)}" stroke-width="19"/><path d="M85 103q4-38 39-38h8q37 0 37 40v113q0 40-39 40h-6q-39 0-39-40Z" stroke="url(#${uid}-clip)" stroke-width="13"/><path d="M84 129v69" stroke="#5d7774" stroke-width="14"/><path d="M82 133v61" stroke="#d2dcd4" stroke-width="8"/><path d="M76 130h17m-17 67h17" stroke="#405e5b" stroke-width="3"/></g>`;
  else if(id==='charm')content=`<ellipse cx="124" cy="278" rx="38" ry="8" fill="#17383c" opacity=".12" filter="url(#${uid}-shadow)"/><circle cx="123" cy="86" r="19" stroke="url(#${uid}-steel)" stroke-width="5"/><path d="M123 106v37m-7-25h14m-14 13h14" stroke="#95aaa4" stroke-width="3"/><path d="m124 144 12 28 30 3-23 21 7 30-26-15-26 15 6-30-23-21 31-3Z" fill="url(#${uid}-charm)"/><path d="m123 156 8 23 24 2-18 15 4 22-18-12-18 12 4-22-18-15 23-2Z" stroke="${tone(colors.charm,.4)}" stroke-width="1.5"/>`;
  else if(id==='brush')content=`<ellipse cx="123" cy="290" rx="42" ry="8" fill="#17383c" opacity=".1" filter="url(#${uid}-shadow)"/><g transform="rotate(14 120 165)"><rect x="111" y="49" width="18" height="98" rx="9" fill="url(#${uid}-brush)"/><circle cx="120" cy="61" r="3.5" fill="#f3eee2"/><path d="M120 146v80" stroke="url(#${uid}-steel)" stroke-width="6"/><rect x="93" y="213" width="54" height="64" rx="24" fill="#e5decc"/><g stroke="#c4bea9" stroke-width="1.3">${Array.from({length:9},(_,i)=>`<path d="M95 ${220+i*6}h50"/>`).join('')}</g><path d="M103 218v48m9-50v54m10-54v54m10-53v50m9-46v39" stroke="#fff9e8" stroke-width="2" opacity=".7"/></g>`;
  else if(id==='ringloop')content=`<ellipse cx="120" cy="209" rx="75" ry="9" fill="#17383c" opacity=".1" filter="url(#${uid}-shadow)"/><g data-artwork="ringloop"><path d="M48 147c0 36 144 36 144 0v17c0 36-144 36-144 0Z" fill="url(#${uid}-ringloop)"/><path d="M48 147c0-36 144-36 144 0s-144 36-144 0Zm14 0c0-22 116-22 116 0s-116 22-116 0Z" fill="url(#${uid}-ringloop)" fill-rule="evenodd"/><path d="M62 147c0-22 116-22 116 0" stroke="#005a64" stroke-width="3"/><path d="M49 149c2 32 140 32 142 0" stroke="${tone(colors.ringloop,.35)}" stroke-opacity=".55" stroke-width="1.5"/><path d="M51 146H39q-13 0-13 13v12q0 13 13 13h12Z" stroke="url(#${uid}-brass)" stroke-width="6" stroke-linejoin="round"/><path d="M189 146h12q13 0 13 13v12q0 13-13 13h-12Z" stroke="url(#${uid}-brass)" stroke-width="6" stroke-linejoin="round"/><rect x="45" y="143" width="13" height="26" rx="5" fill="url(#${uid}-ringloop)"/><rect x="182" y="143" width="13" height="26" rx="5" fill="url(#${uid}-ringloop)"/><text x="120" y="181" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" font-weight="700" letter-spacing="-.5" fill="${ink(colors.ringloop)}">babo.</text></g>`;
  else if(id==='snack')content=`<ellipse cx="123" cy="247" rx="70" ry="10" fill="#17383c" opacity=".1" filter="url(#${uid}-shadow)"/><path d="M68 139v-14q0-14 14-14h7" stroke="url(#${uid}-steel)" stroke-width="5" stroke-linecap="round"/>${snackCompartment(uid,49,139,142,95,colors.snack)}`;
  else content=`<ellipse cx="123" cy="313" rx="44" ry="6" fill="#17383c" opacity=".1" filter="url(#${uid}-shadow)"/><g transform="translate(0 -18)">${phoneHolder(uid,colors.phone)}</g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 340" fill="none" aria-hidden="true">${defs(uid,colors)}${content}</svg>`;
}
export function stepIllustration(step) {
  const uid=key('step-'+step),colors={lid:'#f67e68',body:'#fbe6a1',base:'#08788e',handle:'#153b35'};let content='';
  if(step==='foundation')content=`<ellipse cx="120" cy="125" rx="49" ry="8" fill="#17383c" opacity=".12"/><path d="M71 69q49 11 98 0l-12 45q-1 8-12 9H95q-11-1-12-9Z" fill="url(#${uid}-base)"/><ellipse cx="120" cy="69" rx="49" ry="9" fill="url(#${uid}-steel)"/><ellipse cx="120" cy="68" rx="42" ry="6" fill="#284b4e"/><path d="M80 82q40 8 80 0" stroke="#fff" stroke-opacity=".2"/>`;
  else if(step==='lid')content=lidMarkup(uid,'straw',73,68,94,colors.lid);
  else if(step==='body')content=`${compactHandle(uid,158,31,104,colors.handle)}<path d="M76 31q41 8 82 0v95q0 8-11 9H87q-11-1-11-9Z" fill="url(#${uid}-body)"/>${steel(uid,76,31,82)}${steel(uid,76,129,82)}<text x="117" y="89" font-family="Arial,sans-serif" font-size="18" font-weight="900" letter-spacing="-1.1" text-anchor="middle" fill="#254448">babo.</text>`;
  else content=`<path d="M93 37c-53 3-51 94 0 97 54 3 54-94 10-97" stroke="#d87566" stroke-width="9"/><rect x="91" y="28" width="17" height="24" rx="5" fill="url(#${uid}-steel)"/><rect x="143" y="53" width="37" height="69" rx="18" stroke="url(#${uid}-steel)" stroke-width="8" transform="rotate(20 160 85)"/><path d="M145 74v24" stroke="#627e78" stroke-width="5"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160" fill="none" aria-hidden="true">${defs(uid,colors)}${content}</svg>`;
}
export function cleaningIllustration() {
  const uid='cleaning-babo';const colors={lid:'#f67e68',body:'#fbe6a1',base:'#08788e',handle:'#08788e'};
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 390" fill="none" aria-hidden="true">${defs(uid,colors)}<g opacity=".12" fill="#17383c" filter="url(#${uid}-shadow)"><ellipse cx="126" cy="284" rx="64" ry="13"/><ellipse cx="279" cy="301" rx="64" ry="13"/><ellipse cx="427" cy="278" rx="55" ry="13"/><ellipse cx="530" cy="250" rx="48" ry="13"/></g><g transform="translate(25 29) rotate(-12 100 180)">${lidMarkup(uid,'straw',48,175,104,colors.lid)}</g><g transform="translate(193 87) rotate(10 60 120)"><path d="M8 24q51 10 102 0v153q0 12-14 13H22q-14-1-14-13Z" fill="url(#${uid}-body)"/><ellipse cx="59" cy="24" rx="51" ry="9" fill="url(#${uid}-steel)"/><ellipse cx="59" cy="24" rx="44" ry="6" fill="#547774"/><ellipse cx="59" cy="26" rx="41" ry="4" fill="#d6dfd0"/>${steel(uid,8,181,102)}<text x="59" y="119" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="23" letter-spacing="-1.4" fill="#244549">babo.</text><path d="M17 42v124" stroke="#fffdf1" stroke-width="3" opacity=".35"/></g><g transform="translate(359 139) rotate(-10 50 70)"><path d="M0 26q50 9 100 0v69q-50 12-100 0Z" fill="url(#${uid}-clear)"/><ellipse cx="50" cy="26" rx="50" ry="9" fill="url(#${uid}-steel)"/><ellipse cx="50" cy="26" rx="44" ry="6" fill="#a7c8bc" fill-opacity=".4"/>${steel(uid,0,93,100)}<path d="M9 40v43" stroke="#fffdf0" stroke-width="4" opacity=".7"/><path d="M67 51h14m-14 12h10m-10 12h14" stroke="#628c82" stroke-width="1.5" opacity=".6"/></g><g transform="translate(475 94) rotate(13 49 90)"><path d="M1 72q49 9 98 0l-10 54q-1 12-13 13H24q-12-1-13-13Z" fill="url(#${uid}-base)"/><ellipse cx="50" cy="72" rx="49" ry="9" fill="url(#${uid}-steel)"/><ellipse cx="50" cy="72" rx="42" ry="6" fill="#25494c"/><path d="M18 128q32 6 64 0" stroke="#064e55" stroke-opacity=".35" stroke-width="2"/></g></svg>`;
}
