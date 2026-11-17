import './style.css';
import './configurator.css';
import { presets, products, cloneBuild, estimateBuild, validateBuild, getExtensions, parts } from './data.js';
import { initCommerce, openBuilder, openCart, openProduct, openSearch, openInfo } from './configurator.js';
import { bottleIllustration } from './illustrations.js';

const money = value => `$${Number(value).toFixed(0)}`;
const safe = str => String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function coverBuild(overrides){return cloneBuild({...presets[0].build,extension:'none',extensions:[],attachments:[],...overrides});}
const coverPresets=[
 {id:'coral',name:'Coral + cream',build:coverBuild({foundation:'core',lid:'straw',body:'smooth',extensions:['short'],base:'standard',colors:{lid:'#f36f60',body:'#f6e9ce',extension:'#eeeae2',base:'#007d87',handle:'#f36f60'}})},
 {id:'navy',name:'Navy + blue',build:coverBuild({lid:'loop',body:'textured',base:'standard',colors:{lid:'#233c61',body:'#7fa1c1',extension:'#eeeae2',base:'#a4d5cd',handle:'#233c61'}})},
 {id:'sage',name:'Sage + mint',build:coverBuild({lid:'chug',body:'smooth',extensions:['short'],base:'standard',colors:{lid:'#a1b18d',body:'#cadbc0',extension:'#eeeae2',base:'#ead7b0',handle:'#a1b18d'}})},
 {id:'rose',name:'Rose + cream',build:coverBuild({lid:'straw',body:'smooth',extensions:['long'],base:'standard',attachments:['pouch','charm','strap'],colors:{lid:'#c97978',body:'#f6e9ce',extension:'#eeeae2',base:'#c97978',handle:'#bd8686'}})},
 {id:'teal',name:'Teal + sand',build:coverBuild({lid:'loop',body:'smooth',extensions:['short'],base:'standard',colors:{lid:'#007d87',body:'#ecd5af',extension:'#eeeae2',base:'#007d87',handle:'#007d87'}})},
 {id:'lavender',name:'Lavender + cream',build:coverBuild({lid:'chug',body:'textured',base:'standard',attachments:['charm'],colors:{lid:'#b9a6ce',body:'#c7b2d6',extension:'#eeeae2',base:'#f6e9ce',handle:'#b9a6ce'}})}
];
const coverRegions=[["coral","Straw lid","147,143 159,109 217,99 272,58 315,75 285,148 305,174 295,222 140,201"],["coral","Smooth body","132,229 297,254 269,476 97,452"],["coral","Short extension","98,483 257,508 244,575 85,550"],["coral","Base","82,576 240,601 230,660 71,635"],["navy","Loop lid","394,171 407,119 437,86 478,73 526,86 554,121 560,171 549,221 394,196"],["navy","Ribbed body","381,238 544,263 497,558 325,531"],["navy","Base","320,572 488,596 478,662 307,637"],["sage","Chug lid","631,132 686,131 693,78 748,88 744,129 796,115 813,132 814,157 792,174 783,203 627,178"],["sage","Smooth body","612,220 776,246 738,489 571,463"],["sage","Short extension","570,489 729,513 718,577 558,554"],["sage","Base","555,585 718,610 706,667 545,643"],["rose","Straw lid","1409,134 1423,104 1480,95 1554,49 1579,63 1547,142 1566,162 1555,211 1398,187"],["rose","Smooth body","1387,225 1553,251 1525,433 1357,407"],["rose","Long extension","1357,440 1514,465 1488,593 1330,570"],["rose","Base","1327,592 1488,617 1478,669 1318,646"],["rose","Carry strap","1550,219 1580,253 1600,518 1580,588 1544,589 1526,562 1548,270"],["rose","Pouch","1361,302 1548,326 1532,417 1346,395"],["rose","Flower charm","1492,365 1532,372 1554,405 1531,435 1495,424 1482,394"],["teal","Loop lid","1668,171 1678,123 1711,88 1753,75 1797,88 1826,123 1835,174 1824,224 1666,198"],["teal","Smooth body","1657,238 1810,261 1780,498 1618,475"],["teal","Short extension","1620,502 1777,526 1764,583 1606,560"],["teal","Base","1604,591 1761,615 1750,668 1592,644"],["lavender","Chug lid","1911,132 1962,132 1971,80 2026,91 2022,132 2074,117 2089,133 2091,156 2068,175 2059,203 1903,179"],["lavender","Ribbed body","1886,227 2051,253 2002,559 1839,534"],["lavender","Base","1836,570 2002,595 1990,664 1821,639"],["lavender","Bead charm","2041,252 2078,256 2093,286 2094,368 2074,394 2052,377 2049,301"]];
const partLayer=document.querySelector('#cover-part-layer');
partLayer.innerHTML=`<svg class="cover-part-map" viewBox="0 0 2172 724" preserveAspectRatio="none" aria-label="Explore bottle parts">${coverRegions.map(([id,name,points])=>`<a href="#make-your-own" data-cover-part="${id}" data-part-name="${name}" aria-label="${name}, ${safe(coverPresets.find(p=>p.id===id).name)}. Customize this bottle." aria-describedby="cover-part-tooltip"><polygon points="${points}"/></a>`).join('')}</svg>`;
const partTooltip=document.querySelector('#cover-part-tooltip');
function showCoverPart(link){partTooltip.textContent=link.dataset.partName;partTooltip.hidden=false;}
partLayer.querySelectorAll('[data-cover-part]').forEach(link=>{
 link.addEventListener('pointerenter',()=>showCoverPart(link));link.addEventListener('focus',()=>showCoverPart(link));link.addEventListener('blur',()=>{partTooltip.hidden=true;});
 link.addEventListener('keydown',e=>{if(e.key==='Escape')partTooltip.hidden=true;if(e.key===' '){e.preventDefault();link.click();}});
});
partLayer.addEventListener('pointerleave',()=>{partTooltip.hidden=true;});
function selectCover(id,scrollPhoto=true){
 const index=coverPresets.findIndex(p=>p.id===id);const preset=coverPresets[index];if(!preset)return;
 Object.assign(makerBuild,cloneBuild(preset.build));renderMaker();
 if(scrollPhoto){const campaign=document.querySelector('#hero-campaign');const center=[.09,.205,.315,.67,.79,.91][index]*campaign.scrollWidth;campaign.scrollTo({left:Math.max(0,center-campaign.clientWidth/2),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
 document.querySelector('#cover-selection-status').textContent=`${preset.name} selected in the bottle builder below.`;
}

const accessoryIds=['strap','pouch','clip','charm','phone','brush'];
document.querySelector('#accessory-products').innerHTML=accessoryIds.map(id=>products.find(p=>p.partType==='attachments'&&p.partId===id)).filter(Boolean).map(p=>`<article class="accessory-card"><button class="accessory-visual" data-product="${safe(p.id)}" aria-label="View ${safe(p.name)}"><img src="/assets/attachment-${p.partId}.webp" width="1024" height="1536" alt="${safe(p.name)} accessory concept" loading="lazy" decoding="async" /></button><div class="accessory-bottom"><div><h3>${safe(p.name)}</h3><p>${money(p.price)} · Concept accessory</p></div><button data-product="${safe(p.id)}">Details</button></div></article>`).join('');

function colorHeadingPeriods(root=document){
 for(const heading of root.querySelectorAll('h1,h2,h3,.hero-slogan')){
  const walker=document.createTreeWalker(heading,NodeFilter.SHOW_TEXT,{acceptNode:node=>node.parentElement.closest('.heading-period,.brand-period')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
  const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  for(const node of nodes){if(!node.textContent.includes('.'))continue;const fragments=node.textContent.split('.');const replacement=document.createDocumentFragment();fragments.forEach((text,i)=>{replacement.append(document.createTextNode(text));if(i<fragments.length-1){const period=document.createElement('span');period.className='heading-period';period.textContent='.';replacement.append(period);}});node.replaceWith(replacement);}
 }
}
colorHeadingPeriods();

const menuToggle=document.querySelector('.menu-toggle');
function closeMenu(){document.querySelector('.main-nav').classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Open menu');}
menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';document.querySelector('.main-nav').classList.toggle('open',open);menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close menu':'Open menu');});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
document.addEventListener('click',e=>{
 const part=e.target.closest('[data-cover-part]');if(part){e.preventDefault();partTooltip.hidden=true;selectCover(part.dataset.coverPart,false);const heading=document.querySelector('#maker-heading');heading.tabIndex=-1;document.querySelector('#make-your-own').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});heading.focus({preventScroll:true});return;}
 const build=e.target.closest('[data-build]');if(build){e.preventDefault();openBuilder(build.dataset.build);closeMenu();return;}
 if(e.target.closest('[data-cart]')){openCart();return;}
 const product=e.target.closest('[data-product]');if(product){openProduct(product.dataset.product);return;}
 if(e.target.closest('[data-search]')){openSearch();return;}
 const info=e.target.closest('[data-info]');if(info){openInfo(info.dataset.info);closeMenu();return;}
 if(e.target.closest('.main-nav a'))closeMenu();
});
initCommerce();

// Brand files stay in this browser. Only a local object URL is used for preview.
const brandTextInput=document.querySelector('#brand-text');
const brandUpload=document.querySelector('#brand-logo-upload');
const brandText=document.querySelector('#brand-logo-text');
const brandImage=document.querySelector('#brand-logo-image');
const brandOverlay=document.querySelector('#brand-logo-overlay');
const brandDark=document.querySelector('#brand-dark');
const brandError=document.querySelector('#brand-upload-error');
const brandStatus=document.querySelector('#brand-status');
let brandObjectUrl=null;
let brandUploadVersion=0;
function clearBrandImage(){
  if(brandObjectUrl){URL.revokeObjectURL(brandObjectUrl);brandObjectUrl=null;}
  brandImage.hidden=true;brandImage.removeAttribute('src');brandText.hidden=false;
}
function updateBrandText(){
  const label=brandTextInput.value.trim()||'YOUR BRAND';
  brandText.textContent=label;
  brandOverlay.classList.toggle('long-label',label.length>14);
  brandOverlay.setAttribute('aria-label',`Engraving preview: ${label}`);
}
function showBrandError(message){brandError.textContent=message;brandError.hidden=false;}
brandTextInput.addEventListener('input',()=>{
  brandUploadVersion++;clearBrandImage();brandUpload.value='';brandError.hidden=true;updateBrandText();
});
brandDark.addEventListener('change',()=>{brandOverlay.classList.toggle('dark-label',brandDark.checked);});
brandUpload.addEventListener('change',()=>{
  const file=brandUpload.files?.[0];if(!file)return;
  const version=++brandUploadVersion;
  if(!['image/png','image/jpeg','image/webp'].includes(file.type)){showBrandError('Choose a PNG, JPG, or WebP image.');brandUpload.value='';return;}
  if(file.size>5*1024*1024){showBrandError('Choose an image under 5 MB.');brandUpload.value='';return;}
  const candidateUrl=URL.createObjectURL(file);const probe=new Image();
  probe.onload=()=>{
    if(version!==brandUploadVersion){URL.revokeObjectURL(candidateUrl);return;}
    clearBrandImage();brandObjectUrl=candidateUrl;brandImage.src=candidateUrl;brandImage.hidden=false;brandText.hidden=true;
    brandOverlay.setAttribute('aria-label','Your uploaded logo engraved on the bottle');brandError.hidden=true;brandStatus.textContent='Engraving preview updated.';
  };
  probe.onerror=()=>{URL.revokeObjectURL(candidateUrl);if(version===brandUploadVersion){showBrandError('This image could not be opened. Choose another file.');brandUpload.value='';}};
  probe.src=candidateUrl;
});
document.querySelector('#brand-reset').addEventListener('click',()=>{
  brandUploadVersion++;clearBrandImage();brandTextInput.value='YOUR BRAND';brandUpload.value='';brandDark.checked=false;brandOverlay.classList.remove('dark-label');brandError.hidden=true;updateBrandText();brandStatus.textContent='Brand preview reset.';
});
updateBrandText();
window.addEventListener('pagehide',event=>{if(!event.persisted&&brandObjectUrl)URL.revokeObjectURL(brandObjectUrl);});



// The landing station uses the same build model and validation as the configurator.
const makerBuild=cloneBuild(coverPresets[0].build);
function setMakerExtensions(values){makerBuild.extensions=[...values];makerBuild.extension=values[0]||'none';}
function renderMaker(){
 const extensionStack=getExtensions(makerBuild);
 document.querySelector('#maker-sizes').innerHTML=parts.foundation.map(p=>`<button data-maker-type="foundation" data-maker-value="${p.id}" aria-pressed="${makerBuild.foundation===p.id}">${safe(p.name)}</button>`).join('');
 document.querySelector('#maker-parts').innerHTML=['lid','body','base'].map(type=>`<label>${type[0].toUpperCase()+type.slice(1)}<select data-maker-select="${type}">${parts[type].map(p=>`<option value="${p.id}" ${makerBuild[type]===p.id?'selected':''} ${type==='base'&&p.id==='storage'&&extensionStack.includes('long')?'disabled':''}>${safe(p.name)}</option>`).join('')}</select></label>`).join('');
 document.querySelector('#maker-stack').innerHTML=extensionStack.length?extensionStack.map((id,index)=>`<div class="maker-module"><span><i aria-hidden="true"></i>${id==='long'?'Long':'Short'} extension <small>+${id==='long'?300:150} ml</small></span><button data-maker-remove="${index}" aria-label="Remove ${id} extension ${index+1}">Remove</button></div>`).join(''):'<p class="maker-empty-stack">No extensions. Add a module below.</p>';
 document.querySelector('#maker-extensions').innerHTML=['short','long'].map(id=>`<button data-maker-add="${id}" ${extensionStack.length>=3||id==='long'&&makerBuild.base==='storage'?'disabled':''}>Add ${id} <span>+${id==='long'?300:150} ml</span></button>`).join('');
 document.querySelector('#maker-colors').innerHTML=coverPresets.map(p=>`<button data-maker-color="${p.id}" aria-label="${safe(p.name)}" aria-pressed="${makerBuild.colors.body===p.build.colors.body&&makerBuild.colors.lid===p.build.colors.lid}"><span class="color-pair" aria-hidden="true"><i style="background:${p.build.colors.lid}"></i><i style="background:${p.build.colors.body}"></i></span>${safe(p.name)}</button>`).join('');
 document.querySelector('#maker-extras').innerHTML=parts.attachments.map(p=>`<button data-maker-extra="${p.id}" aria-pressed="${makerBuild.attachments.includes(p.id)}">${safe(p.name)}</button>`).join('');
 const preview=document.querySelector('#maker-preview');preview.innerHTML=bottleIllustration(makerBuild,'inline-maker',{fit:false});
 const svg=preview.querySelector('svg');if(svg){const height=svg.viewBox.baseVal.height;svg.style.height=`${height*1.1}px`;svg.style.width=`${svg.viewBox.baseVal.width*1.1}px`;}
 const estimate=estimateBuild(makerBuild);document.querySelector('#maker-capacity').textContent=`Approx. ${estimate.capacity} ml · ${extensionStack.length} ${extensionStack.length===1?'extension':'extensions'}`;document.querySelector('#maker-price').textContent=`${money(estimate.total)} demo total`;
 preview.setAttribute('aria-label',`${estimate.capacity} milliliter bottle, ${extensionStack.length} stacked extensions, ${makerBuild.attachments.length} attachments`);
}
function commitMaker(change){const before=cloneBuild(makerBuild);change();const error=validateBuild(makerBuild);if(error)Object.assign(makerBuild,before);const notice=document.querySelector('#maker-error');notice.textContent=error;notice.hidden=!error;renderMaker();}
document.querySelector('.maker-controls').addEventListener('click',e=>{
 const part=e.target.closest('[data-maker-type]'),add=e.target.closest('[data-maker-add]'),remove=e.target.closest('[data-maker-remove]'),color=e.target.closest('[data-maker-color]'),extra=e.target.closest('[data-maker-extra]');
 if(part)commitMaker(()=>makerBuild[part.dataset.makerType]=part.dataset.makerValue);
 else if(add&&!add.disabled)commitMaker(()=>setMakerExtensions([...getExtensions(makerBuild),add.dataset.makerAdd]));
 else if(remove)commitMaker(()=>setMakerExtensions(getExtensions(makerBuild).filter((_,i)=>i!==Number(remove.dataset.makerRemove))));
 else if(color)commitMaker(()=>makerBuild.colors={...coverPresets.find(p=>p.id===color.dataset.makerColor).build.colors});
 else if(extra)commitMaker(()=>{const id=extra.dataset.makerExtra;makerBuild.attachments=makerBuild.attachments.includes(id)?makerBuild.attachments.filter(x=>x!==id):[...makerBuild.attachments,id];});
 else return;
 const key=part?`[data-maker-type="${part.dataset.makerType}"][data-maker-value="${part.dataset.makerValue}"]`:add?`[data-maker-add="${add.dataset.makerAdd}"]`:remove?'[data-maker-add="short"]':color?`[data-maker-color="${color.dataset.makerColor}"]`:`[data-maker-extra="${extra.dataset.makerExtra}"]`;document.querySelector(key)?.focus({preventScroll:true});
});
document.querySelector('.maker-controls').addEventListener('change',e=>{const select=e.target.closest('[data-maker-select]');if(!select)return;const type=select.dataset.makerSelect;const value=select.value;commitMaker(()=>makerBuild[type]=value);document.querySelector(`[data-maker-select="${type}"]`)?.focus({preventScroll:true});});
document.querySelector('#maker-continue').addEventListener('click',()=>openBuilder(makerBuild));
renderMaker();
