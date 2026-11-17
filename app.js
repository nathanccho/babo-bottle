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
 {id:'navy',name:'Navy + blue',build:coverBuild({lid:'loop',body:'textured',extensions:['short'],base:'standard',colors:{lid:'#233c61',body:'#7fa1c1',extension:'#eeeae2',base:'#a4d5cd',handle:'#233c61'}})},
 {id:'sage',name:'Sage + mint',build:coverBuild({lid:'chug',body:'smooth',extensions:['short'],base:'standard',colors:{lid:'#a1b18d',body:'#cadbc0',extension:'#eeeae2',base:'#ead7b0',handle:'#a1b18d'}})},
 {id:'rose',name:'Rose + cream',build:coverBuild({lid:'straw',body:'smooth',extensions:['long'],base:'standard',attachments:['pouch','charm','strap'],colors:{lid:'#c97978',body:'#f6e9ce',extension:'#eeeae2',base:'#c97978',handle:'#bd8686'}})},
 {id:'teal',name:'Teal + sand',build:coverBuild({lid:'loop',body:'smooth',extensions:['short'],base:'standard',colors:{lid:'#007d87',body:'#ecd5af',extension:'#eeeae2',base:'#007d87',handle:'#007d87'}})},
 {id:'lavender',name:'Lavender + cream',build:coverBuild({lid:'chug',body:'textured',extensions:['short'],base:'standard',attachments:['charm'],colors:{lid:'#b9a6ce',body:'#c7b2d6',extension:'#eeeae2',base:'#f6e9ce',handle:'#b9a6ce'}})}
];
const coverRegions=[["coral","Straw lid","164,122 170,102 194,88 229,87 254,96 283,49 309,57 285,122 301,144 295,185 282,192 256,197 214,193 177,185 158,176 153,173 155,144"],["coral","Smooth body","159,215 219,218 271,229 268,244 278,249 285,266 260,438 248,448 224,455 181,454 137,445 116,439 110,431 110,416 138,250 147,239 158,238"],["coral","Short extension","119,475 172,479 237,490 236,504 244,507 236,559 226,571 200,576 168,572 127,565 110,558 101,549 107,506 112,490"],["coral","Base","99,584 154,588 225,601 225,612 234,618 229,649 218,667 202,674 134,673 101,660 84,645 87,615 91,600 99,599"],["navy","Loop lid","400,145 409,112 431,84 458,69 492,65 525,79 546,104 553,137 552,171 541,190 527,197 503,200 461,196 419,187 403,178 394,162"],["navy","Ribbed body","407,215 466,217 522,228 520,245 529,251 534,268 499,478 487,486 467,492 440,491 391,482 358,476 346,468 344,459 378,251 391,238 407,238"],["navy","Short extension","354,513 411,517 476,530 475,541 481,545 471,579 458,588 431,592 403,589 367,581 349,575 341,566 347,535 351,526"],["navy","Base","343,595 411,599 472,611 470,624 478,630 472,657 461,674 444,680 372,680 340,669 324,653 327,622 331,610 342,608"],["sage","Chug lid","643,115 682,113 691,73 741,81 741,111 777,102 798,105 813,121 812,143 798,155 777,159 770,179 755,189 731,194 687,188 653,179 637,167 636,163 638,139"],["sage","Smooth body","638,211 696,214 752,225 750,239 759,247 764,264 736,448 723,461 700,470 671,469 632,461 603,453 589,442 587,425 613,248 625,233 638,233"],["sage","Short extension","594,481 654,485 715,497 714,511 723,514 714,558 701,574 674,581 646,577 607,569 588,560 579,551 586,511 591,500"],["sage","Base","580,589 644,593 709,605 708,620 717,625 711,655 701,673 684,680 617,678 580,666 562,650 566,621 572,605 581,605"],["rose","Straw lid","1425,120 1437,98 1462,86 1492,84 1522,95 1553,45 1576,55 1550,121 1565,141 1557,181 1544,190 1518,195 1474,190 1438,182 1420,173 1413,167 1416,142"],["rose","Smooth body","1417,208 1471,213 1528,224 1527,239 1538,246 1545,262 1518,406 1505,419 1481,427 1453,425 1415,418 1382,411 1367,401 1361,379 1390,241 1401,229 1417,230"],["rose","Long extension","1372,433 1435,438 1497,450 1496,465 1507,469 1488,570 1474,581 1447,586 1419,581 1376,574 1356,568 1346,560 1361,463 1367,449"],["rose","Base","1344,593 1403,597 1484,610 1481,624 1491,630 1484,658 1470,676 1453,682 1390,678 1346,665 1328,649 1333,619 1338,606 1345,607"],["rose","Carry strap","1539,216 1554,219 1565,242 1560,256 1576,271 1584,312 1594,399 1596,465 1590,515 1574,549 1552,557 1533,548 1528,530 1534,490 1542,443 1550,383 1551,330 1544,284 1536,273 1533,255 1529,239"],["rose","Pouch","1375,292 1537,315 1544,330 1533,385 1522,406 1384,393 1365,383 1359,366 1367,315"],["rose","Flower charm","1497,346 1521,349 1541,364 1546,384 1538,400 1524,411 1504,409 1488,398 1483,381 1485,363"],["teal","Loop lid","1674,145 1684,112 1708,86 1738,72 1771,69 1800,81 1820,107 1828,137 1827,174 1816,189 1802,197 1776,201 1732,197 1699,188 1682,179 1670,161"],["teal","Smooth body","1687,216 1741,219 1794,231 1792,246 1803,253 1808,270 1777,455 1764,467 1740,476 1710,473 1671,466 1645,457 1630,447 1630,430 1659,252 1671,239 1687,239"],["teal","Short extension","1641,490 1695,495 1757,508 1756,523 1763,526 1755,565 1741,579 1717,585 1686,582 1646,573 1632,567 1623,561 1630,520 1637,506"],["teal","Base","1628,594 1686,598 1753,612 1752,626 1760,632 1753,657 1740,676 1723,683 1654,679 1625,667 1606,652 1611,622 1619,607 1629,608"],["lavender","Chug lid","1919,119 1961,116 1970,74 2025,83 2024,117 2060,106 2081,111 2095,128 2092,148 2078,161 2059,166 2051,184 2037,192 2012,196 1971,189 1938,181 1922,173 1915,167 1915,141"],["lavender","Ribbed body","1922,215 1975,219 2038,230 2036,245 2045,252 2051,268 2017,487 2003,496 1980,502 1947,497 1903,490 1878,482 1866,474 1865,461 1899,251 1911,238 1922,239"],["lavender","Short extension","1881,518 1936,522 1999,535 1998,548 2005,552 1999,582 1986,591 1960,597 1933,592 1892,585 1874,580 1863,573 1870,546 1877,531"],["lavender","Base","1860,603 1923,607 1996,620 1994,635 2002,641 1995,662 1981,679 1964,685 1899,680 1865,668 1846,653 1851,626 1857,614 1861,615"],["lavender","Bead charm","2037,230 2057,239 2066,261 2077,279 2088,293 2094,316 2089,335 2091,355 2084,376 2071,386 2059,375 2058,355 2059,337 2050,322 2054,302 2059,290 2046,265 2034,250"]];
function roundedRegion(points,radius=10){
 const vertices=points.split(/\s+/).map(pair=>pair.split(',').map(Number));
 const corners=vertices.map((point,index)=>{const prev=vertices[(index+vertices.length-1)%vertices.length],next=vertices[(index+1)%vertices.length];const before=Math.hypot(prev[0]-point[0],prev[1]-point[1]),after=Math.hypot(next[0]-point[0],next[1]-point[1]);const r=Math.min(radius,before/3,after/3);return {point,start:[point[0]+(prev[0]-point[0])*r/before,point[1]+(prev[1]-point[1])*r/before],end:[point[0]+(next[0]-point[0])*r/after,point[1]+(next[1]-point[1])*r/after]};});
 return corners.map((corner,index)=>`${index?'L':'M'}${corner.start.join(',')}Q${corner.point.join(',')} ${corner.end.join(',')}`).join('')+'Z';
}
const partLayer=document.querySelector('#cover-part-layer');
partLayer.innerHTML=`<svg class="cover-part-map" viewBox="0 0 2172 724" preserveAspectRatio="none" aria-label="Explore bottle parts">${coverRegions.map(([id,name,points])=>`<a href="#make-your-own" data-cover-part="${id}" data-part-name="${name}" aria-label="${name}, ${safe(coverPresets.find(p=>p.id===id).name)}. Customize this bottle." aria-describedby="cover-part-tooltip"><path d="${roundedRegion(points)}"/></a>`).join('')}</svg>`;
const partTooltip=document.querySelector('#cover-part-tooltip');
let activePartLink=null;
function hideCoverPart(){partTooltip.hidden=true;activePartLink=null;}
function positionCoverTooltip(){
 if(!activePartLink||partTooltip.hidden)return;
 const composition=document.querySelector('.hero-composition').getBoundingClientRect(),campaign=document.querySelector('#hero-campaign').getBoundingClientRect(),target=activePartLink.getBoundingClientRect(),label=partTooltip.getBoundingClientRect();
 const left=Math.max(campaign.left,0)+label.width/2+10,right=Math.min(campaign.right,window.innerWidth)-label.width/2-10;
 const x=Math.max(left,Math.min(right,target.left+target.width/2));
 let y=target.top-11,below=y-label.height<campaign.top+8;
 if(below)y=Math.min(target.bottom+11,campaign.bottom-label.height-8);
 partTooltip.style.left=`${x-composition.left}px`;partTooltip.style.top=`${y-composition.top}px`;partTooltip.style.bottom='auto';partTooltip.style.transform=below?'translate(-50%,0)':'translate(-50%,-100%)';
}
function showCoverPart(link){activePartLink=link;partTooltip.textContent=link.dataset.partName;partTooltip.hidden=false;positionCoverTooltip();}
partLayer.querySelectorAll('[data-cover-part]').forEach(link=>{
 link.addEventListener('pointerenter',()=>showCoverPart(link));link.addEventListener('focus',()=>showCoverPart(link));link.addEventListener('blur',hideCoverPart);link.addEventListener('pointerleave',()=>{if(document.activeElement!==link)hideCoverPart();});
 link.addEventListener('keydown',e=>{if(e.key==='Escape')hideCoverPart();if(e.key===' '){e.preventDefault();link.click();}});
});
partLayer.addEventListener('pointerleave',()=>{if(!partLayer.contains(document.activeElement))hideCoverPart();});
document.querySelector('#hero-campaign').addEventListener('scroll',positionCoverTooltip,{passive:true});window.addEventListener('resize',positionCoverTooltip);document.querySelector('#hero-cover').addEventListener('load',positionCoverTooltip);
function selectCover(id,scrollPhoto=true){
 const index=coverPresets.findIndex(p=>p.id===id);const preset=coverPresets[index];if(!preset)return;
 Object.assign(makerBuild,cloneBuild(preset.build));renderMaker();
 if(scrollPhoto){const campaign=document.querySelector('#hero-campaign');const center=[.09,.205,.315,.67,.79,.91][index]*campaign.scrollWidth;campaign.scrollTo({left:Math.max(0,center-campaign.clientWidth/2),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
 document.querySelector('#cover-selection-status').textContent=`${preset.name} selected in the bottle builder below.`;
}

const accessoryIds=['strap','pouch','clip','charm','phone','brush','snack','ringloop'];
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
 const part=e.target.closest('[data-cover-part]');if(part){e.preventDefault();hideCoverPart();selectCover(part.dataset.coverPart,false);const heading=document.querySelector('#maker-heading');heading.tabIndex=-1;document.querySelector('#make-your-own').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});heading.focus({preventScroll:true});return;}
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
