import './style.css';
import './configurator.css';
import { initI18n } from './i18n.js';
import { presets, products, cloneBuild, estimateBuild, validateBuild, getExtensions, getExtensionColors, setBuildExtensions, getMiddleSections, setMiddleSections, getMiddleSectionInfo, getAttachmentColor, palettes, parts } from './data.js';
import { initCommerce, openBuilder, openCart, openProduct, openSearch, openInfo } from './configurator.js';
import { bottleIllustration } from './illustrations.js';
import { previewLayout } from './preview-layout.js';

const money = value => `$${Number(value).toFixed(0)}`;
const safe = str => String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function coverBuild(overrides){return cloneBuild({...presets[0].build,extension:'none',extensions:[],attachments:[],...overrides});}
const coverPresets=[
 {id:'coral',name:'Coral + butter',build:coverBuild({foundation:'core',lid:'straw',body:'smooth',extensions:['short'],base:'standard',colors:{lid:'#153b35',body:'#f67e68',extension:'#fff6e8',base:'#fbe6a1',handle:'#153b35'}})},
 {id:'navy',name:'Dusty blue + navy',build:coverBuild({lid:'loop',body:'textured',middleSections:[{type:'smooth',size:'short',color:'#b8c2c3'}],extensions:[],base:'standard',colors:{lid:'#07152f',body:'#99acc6',extension:'#fff6e8',base:'#b8c2c3',handle:'#07152f'}})},
 {id:'sage',name:'Yellow + seafoam',build:coverBuild({lid:'chug',body:'smooth',extensions:[],base:'standard',colors:{lid:'#08788e',body:'#ffe000',extension:'#fff6e8',base:'#b6dcce',handle:'#08788e'}})},
 {id:'rose',name:'Rose + brick',build:coverBuild({lid:'straw',body:'smooth',extensions:['long'],base:'standard',attachments:['pouch','charm','strap'],attachmentColors:{pouch:'#b6dcce',charm:'#85261e',strap:'#ef7092'},colors:{lid:'#ef7092',body:'#85261e',extension:'#fff6e8',base:'#ef7092',handle:'#ef7092'}})},
 {id:'teal',name:'Clay + black',build:coverBuild({lid:'loop',body:'smooth',extensions:[],base:'standard',colors:{lid:'#b5cec5',body:'#a36751',extension:'#fff6e8',base:'#111214',handle:'#b5cec5'}})},
 {id:'lavender',name:'Plum + violet',build:coverBuild({lid:'chug',body:'textured',middleSections:[{type:'smooth',size:'short',color:'#51457f'}],extensions:[],base:'standard',attachments:['charm'],attachmentColors:{charm:'#ef7092'},colors:{lid:'#a92c35',body:'#501344',extension:'#fff6e8',base:'#51457f',handle:'#a92c35'}})}
];
const coverRegions=[["coral","Straw lid","164,122 170,102 194,88 229,87 254,96 283,49 309,57 285,122 301,144 295,185 282,192 256,197 214,193 177,185 158,176 153,173 155,144"],["coral","Smooth body","159,215 219,218 271,229 268,244 278,249 285,266 260,438 248,448 224,455 181,454 137,445 116,439 110,431 110,416 138,250 147,239 158,238"],["coral","Short extension","119,475 172,479 237,490 236,504 244,507 236,559 226,571 200,576 168,572 127,565 110,558 101,549 107,506 112,490"],["coral","Base","99,584 154,588 225,601 225,612 234,618 229,649 218,667 202,674 134,673 101,660 84,645 87,615 91,600 99,599"],["navy","Loop lid","397,184 409,150 430,123 458,110 492,108 523,120 540,143 545,173 542,209 531,222 518,234 494,239 452,233 415,224 398,215 390,200"],["navy","Short smooth body section","406,248 458,251 516,263 515,276 524,284 525,294 515,327 503,337 479,341 436,334 402,327 388,318 385,306 392,280 402,270 406,270"],["navy","Ribbed body","402,345 457,348 514,358 512,374 523,381 529,397 497,585 485,597 464,605 437,603 389,595 357,590 343,581 342,565 373,384 386,370 401,368"],["navy","Base","349,602 406,606 482,619 480,632 489,639 481,663 468,678 448,685 380,683 349,673 333,656 336,629 342,615 350,616"],["sage","Chug lid","637,260 667,258 679,213 728,218 726,248 758,239 781,244 792,259 788,280 772,293 764,294 759,316 745,327 720,333 680,326 645,319 628,308 626,291"],["sage","Smooth body","635,348 688,352 745,363 743,378 753,386 758,402 732,584 719,596 697,604 668,601 628,594 594,588 580,577 580,561 610,386 622,372 635,371"],["sage","Base","585,602 640,606 716,618 714,632 723,638 717,664 704,679 685,686 620,684 589,673 573,657 576,629 582,615 586,616"],["rose","Straw lid","1425,120 1437,98 1462,86 1492,84 1522,95 1553,45 1576,55 1550,121 1565,141 1557,181 1544,190 1518,195 1474,190 1438,182 1420,173 1413,167 1416,142"],["rose","Smooth body","1417,208 1471,213 1528,224 1527,239 1538,246 1545,262 1518,406 1505,419 1481,427 1453,425 1415,418 1382,411 1367,401 1361,379 1390,241 1401,229 1417,230"],["rose","Long extension","1372,433 1435,438 1497,450 1496,465 1507,469 1488,570 1474,581 1447,586 1419,581 1376,574 1356,568 1346,560 1361,463 1367,449"],["rose","Base","1344,593 1403,597 1484,610 1481,624 1491,630 1484,658 1470,676 1453,682 1390,678 1346,665 1328,649 1333,619 1338,606 1345,607"],["rose","Carry strap","1539,216 1554,219 1565,242 1560,256 1576,271 1584,312 1594,399 1596,465 1590,515 1574,549 1552,557 1533,548 1528,530 1534,490 1542,443 1550,383 1551,330 1544,284 1536,273 1533,255 1529,239"],["rose","Pouch","1375,292 1537,315 1544,330 1533,385 1522,406 1384,393 1365,383 1359,366 1367,315"],["rose","Flower charm","1497,346 1521,349 1541,364 1546,384 1538,400 1524,411 1504,409 1488,398 1483,381 1485,363"],["teal","Loop lid","1669,282 1680,248 1704,224 1735,211 1768,209 1796,221 1814,245 1820,278 1818,313 1804,328 1787,337 1762,341 1721,334 1689,326 1673,317 1663,302"],["teal","Smooth body","1682,348 1734,351 1791,363 1789,379 1800,386 1805,402 1776,586 1762,597 1738,605 1708,603 1668,595 1642,588 1627,578 1626,563 1657,386 1670,373 1682,372"],["teal","Base","1631,603 1686,607 1754,620 1752,633 1761,640 1754,665 1741,679 1723,686 1654,683 1624,671 1608,656 1612,630 1620,616 1631,616"],["lavender","Chug lid","1919,161 1954,157 1962,116 2018,123 2016,156 2052,145 2072,149 2087,163 2085,184 2071,196 2055,201 2050,222 2035,231 2010,236 1971,230 1936,222 1919,213 1908,197 1910,178"],["lavender","Short smooth body section","1923,249 1973,253 2038,264 2037,277 2047,284 2052,296 2044,327 2032,337 2007,341 1963,334 1928,328 1912,319 1903,307 1911,281 1922,271 1923,271"],["lavender","Ribbed body","1911,346 1970,351 2034,362 2032,378 2043,385 2047,402 2020,587 2005,599 1982,608 1948,605 1905,598 1880,592 1864,581 1863,564 1891,386 1901,373 1912,372"],["lavender","Base","1867,607 1924,611 2004,625 2002,637 2010,645 2003,667 1989,681 1970,688 1904,683 1871,672 1854,657 1859,632 1864,620 1868,620"],["lavender","Bead charm","2031,363 2052,373 2062,396 2072,411 2084,426 2090,449 2085,467 2087,488 2080,507 2068,518 2056,507 2054,488 2057,468 2046,453 2050,433 2056,420 2042,396 2030,381"]];
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
 const header=document.querySelector('.site-header');
 const headerPosition=header?getComputedStyle(header).position:'';
 const headerBottom=header&&['fixed','sticky'].includes(headerPosition)?Math.max(0,header.getBoundingClientRect().bottom):0;
 const visibleTop=Math.max(campaign.top,headerBottom,0)+8,visibleBottom=Math.min(campaign.bottom,window.innerHeight)-8;
 if(visibleBottom-visibleTop<label.height){partTooltip.style.visibility='hidden';return;}
 partTooltip.style.visibility='';
 const left=Math.max(campaign.left,0)+label.width/2+10,right=Math.min(campaign.right,window.innerWidth)-label.width/2-10;
 const x=Math.max(left,Math.min(right,target.left+target.width/2));
 const above=target.top-11-label.height,below=target.bottom+11;
 let y=above>=visibleTop?above:below+label.height<=visibleBottom?below:Math.max(visibleTop,Math.min(visibleBottom-label.height,above));
 partTooltip.style.left=`${x-composition.left}px`;partTooltip.style.top=`${y-composition.top}px`;partTooltip.style.bottom='auto';partTooltip.style.transform='translateX(-50%)';
}
function showCoverPart(link){activePartLink=link;partTooltip.textContent=link.dataset.partName;partTooltip.hidden=false;positionCoverTooltip();}
partLayer.querySelectorAll('[data-cover-part]').forEach(link=>{
 link.addEventListener('pointerenter',()=>showCoverPart(link));link.addEventListener('focus',()=>showCoverPart(link));link.addEventListener('blur',hideCoverPart);link.addEventListener('pointerleave',()=>{if(document.activeElement!==link)hideCoverPart();});
 link.addEventListener('keydown',e=>{if(e.key==='Escape')hideCoverPart();if(e.key===' '){e.preventDefault();link.click();}});
});
partLayer.addEventListener('pointerleave',()=>{if(!partLayer.contains(document.activeElement))hideCoverPart();});
document.querySelector('#hero-campaign').addEventListener('scroll',positionCoverTooltip,{passive:true});window.addEventListener('resize',positionCoverTooltip);window.addEventListener('scroll',positionCoverTooltip,{passive:true});document.querySelector('#hero-cover').addEventListener('load',positionCoverTooltip);
function selectCover(id,scrollPhoto=true){
 const index=coverPresets.findIndex(p=>p.id===id);const preset=coverPresets[index];if(!preset)return;
 Object.keys(makerBuild).forEach(key=>delete makerBuild[key]);Object.assign(makerBuild,cloneBuild(preset.build));makerPlaced=new Set(['base','body','lid']);makerActive='body';renderMaker();
 if(scrollPhoto){const campaign=document.querySelector('#hero-campaign');const center=[.09,.205,.315,.67,.79,.91][index]*campaign.scrollWidth;campaign.scrollTo({left:Math.max(0,center-campaign.clientWidth/2),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
 document.querySelector('#cover-selection-status').textContent=`${preset.name} selected in the bottle builder below.`;
}

const catalogCategories=[['all','All'],['lid','Lids'],['body','Bodies'],['extension','Extensions'],['base','Bases'],['attachments','Attachments']];
const catalogProducts=products.filter(p=>['lid','body','extension','base','attachments'].includes(p.partType));
let catalogCategory='all';
let catalogExpanded=false;
const catalogPreviewIds=['lid-straw','body-textured','attachments-boot','extension-short','base-standard','lid-chug','body-clear','attachments-sling','extension-long','base-storage','lid-loop','body-handle','attachments-charm','attachments-snack','attachments-ringloop'];
function catalogPreviewItems(){
 const chosen=catalogPreviewIds.map(id=>catalogProducts.find(p=>p.id===id)).filter(Boolean);
 const groups=catalogCategories.filter(([id])=>id!=='all').map(([id])=>catalogProducts.filter(p=>p.partType===id));
 for(let offset=0;chosen.length<15&&groups.some(group=>group[offset]);offset++)for(const group of groups){const item=group[offset];if(item&&!chosen.some(p=>p.id===item.id)&&chosen.length<15)chosen.push(item);}
 return chosen;
}
function renderPartCatalog(){
 document.querySelector('#part-category-filters').innerHTML=catalogCategories.map(([id,label])=>`<button data-part-filter="${id}" aria-pressed="${catalogCategory===id}">${label}</button>`).join('');
 const matches=catalogProducts.filter(p=>catalogCategory==='all'||p.partType===catalogCategory);
 const items=catalogCategory==='all'&&!catalogExpanded?catalogPreviewItems():matches;
 document.querySelector('#accessory-products').innerHTML=items.map(p=>`<article class="accessory-card"><button class="accessory-visual" data-product="${safe(p.id)}" aria-label="View ${safe(p.name)}"><img src="/assets/reference-palette/${p.partType==='attachments'?'attachment-'+p.partId:'part-'+p.partType+'-'+p.partId}.webp?v=reference-palette-1" width="1536" height="1024" alt="${safe(p.name)} concept" loading="lazy" decoding="async" /></button><div class="accessory-bottom"><div><h3><button data-product="${safe(p.id)}">${safe(p.name)}</button></h3><p>${money(p.price)}</p></div></div></article>`).join('');
 const toggle=document.querySelector('#parts-see-all');toggle.hidden=catalogCategory!=='all'||catalogProducts.length<=15;toggle.setAttribute('aria-expanded',String(catalogExpanded));toggle.textContent=catalogExpanded?'Show less':'See all';
 document.querySelector('#parts-visible-count').textContent=catalogCategory==='all'?`${items.length} of ${catalogProducts.length} parts`:`${items.length} parts`;
 document.querySelector('#part-filter-status').textContent=`${items.length} parts shown.`;
}
renderPartCatalog();
document.querySelector('#parts-see-all').addEventListener('click',()=>{catalogExpanded=!catalogExpanded;renderPartCatalog();});

function colorHeadingPeriods(root=document){
 for(const heading of root.querySelectorAll('h1,h2,h3,.hero-slogan,.footer-pitch')){
  const walker=document.createTreeWalker(heading,NodeFilter.SHOW_TEXT,{acceptNode:node=>node.parentElement.closest('.heading-period,.brand-period')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
  const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
  for(const node of nodes){if(!node.textContent.includes('.'))continue;const fragments=node.textContent.split('.');const replacement=document.createDocumentFragment();fragments.forEach((text,i)=>{replacement.append(document.createTextNode(text));if(i<fragments.length-1){const period=document.createElement('span');period.className='heading-period';period.textContent='.';replacement.append(period);}});node.replaceWith(replacement);}
 }
}
colorHeadingPeriods();

const menuToggle=document.querySelector('.menu-toggle');
function closeMenu(){document.querySelector('.main-nav').classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Open menu');}
menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';document.querySelector('.main-nav').classList.toggle('open',open);menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close menu':'Open menu');});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuToggle.getAttribute('aria-expanded')==='true'){closeMenu();menuToggle.focus();}});
matchMedia('(min-width:641px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
document.addEventListener('click',e=>{
 if(!e.target.closest('.main-nav,.menu-toggle'))closeMenu();
 if(e.target.closest('a[href="#branding"]'))document.querySelector('#branding').open=true;
 const filter=e.target.closest('[data-part-filter]');if(filter){catalogCategory=filter.dataset.partFilter;catalogExpanded=false;renderPartCatalog();document.querySelector(`[data-part-filter="${catalogCategory}"]`)?.focus({preventScroll:true});return;}
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



// Build placement is separate from the valid configuration sent to review.
const makerBuild=coverBuild({extensions:[],middleSections:[],attachments:[],attachmentColors:{}});
let makerPlaced=new Set();
let makerActive='base';
let makerOpenPanels=new Set();
let makerNotice='';
const coreOrder=['base','body','lid'];
const coreLabels={base:'Base',body:'Body',lid:'Lid'};
function makerCoreComplete(){return coreOrder.every(id=>makerPlaced.has(id));}
function partPhoto(type,id){return `/assets/reference-palette/${type==='attachments'?'attachment-'+id:'part-'+type+'-'+id}.webp?v=reference-palette-1`;}
function makerSwatches(value,target,label='Color'){
 const choices=palettes.some(p=>p.value.toLowerCase()===value.toLowerCase())?palettes:[{name:'Current',value},...palettes];
 return `<div class="maker-color-field"><div class="maker-field-heading"><span>${label}</span><label class="maker-custom-color">Custom<input type="color" value="${value}" data-maker-custom-color="${target}" aria-label="Custom ${label.toLowerCase()}" /></label></div><div class="maker-swatches" role="group" aria-label="${label}">${choices.map(p=>`<button class="maker-swatch" style="--swatch:${p.value}" data-maker-action="color" data-maker-target="${target}" data-maker-value="${p.value}" aria-label="${label}: ${safe(p.name)}" aria-pressed="${p.value.toLowerCase()===value.toLowerCase()}" title="${safe(p.name)}"></button>`).join('')}</div></div>`;
}
function makerTypeCards(type,current,target,placed=true){
 return `<div class="maker-type-cards">${parts[type].map(p=>{const disabled=type==='base'&&p.id==='storage'&&getExtensions(makerBuild).includes('long');return `<button class="maker-type-card" data-maker-action="type" data-maker-target="${target}" data-maker-value="${p.id}" aria-pressed="${placed&&current===p.id}" ${disabled?'disabled title="Remove long extensions before choosing a Storage base"':''}><img src="${partPhoto(type,p.id)}" width="1536" height="1024" alt="" loading="eager" decoding="async" /><span>${safe(p.name)}</span>${!placed?'<small>Add to bottle</small>':''}</button>`;}).join('')}</div>`;
}
function makerSizeToggle(value,target){return `<div class="maker-size-toggle" role="group" aria-label="Module size">${['short','long'].map(size=>`<button data-maker-action="size" data-maker-target="${target}" data-maker-value="${size}" aria-pressed="${value===size}" ${target.startsWith('extension:')&&size==='long'&&makerBuild.base==='storage'?'disabled':''}>${size==='short'?'Short':'Long'} <span>+${size==='short'?150:300} ml</span></button>`).join('')}</div>`;}
function makerEditorMarkup(){
 const [kind,key]=makerActive.split(':');
 if(kind==='attachments')return '<div class="maker-editor-heading"><h3>Attachments.</h3><span>Choose what you need, or review your bottle.</span></div>';
 if(coreOrder.includes(kind)){
  const placed=makerPlaced.has(kind),next={base:'body',body:'lid',lid:'attachments'}[kind];
  const title=placed?`Edit your ${kind}.`:`Choose your ${kind}.`;
  let html=`<div class="maker-editor-heading"><p>${placed?'EDIT PART':'ADD A PART'}</p><h3>${title}</h3><span>${placed?'Choose a type and color.':'Choose a type to add this piece.'}</span></div>${makerTypeCards(kind,makerBuild[kind],kind,placed)}`;
  if(placed&&kind==='body')html+=`<label class="maker-field-heading maker-foundation-field">Body size<select data-maker-change="foundation">${parts.foundation.map(p=>`<option value="${p.id}" ${p.id===makerBuild.foundation?'selected':''}>${safe(p.name)} · approx. ${p.capacity} ml</option>`).join('')}</select></label>`;
  if(placed)html+=makerSwatches(makerBuild.colors[kind],kind,`${coreLabels[kind]} color`)+(kind==='body'&&makerBuild.body==='handle'?makerSwatches(makerBuild.colors.handle,'handle','Handle color'):'');
  if(placed)html+=`<div class="maker-editor-actions"><button class="maker-next" data-maker-action="edit" data-maker-target="${next}">Next: ${next}</button><button class="maker-remove" data-maker-action="remove-core" data-maker-target="${kind}">Remove ${kind}</button></div>`;
  return html;
 }
 if(kind==='middle'){
  const index=Number(key),section=getMiddleSections(makerBuild)[index];if(!section){makerActive='body';return makerEditorMarkup();}
  return `<div class="maker-editor-heading"><p>BODY SECTION ${index+1}</p><h3>Edit this section.</h3><span>This module stacks above the main body.</span></div>${makerTypeCards('body',section.type,makerActive)}${makerSizeToggle(section.size,makerActive)}${makerSwatches(section.color,makerActive,'Section color')}<button class="maker-remove" data-maker-action="remove-middle" data-maker-value="${index}">Remove section</button>`;
 }
 if(kind==='extension'){
  const index=Number(key),size=getExtensions(makerBuild)[index];if(!size){makerActive='body';return makerEditorMarkup();}
  return `<div class="maker-editor-heading"><p>LOWER EXTENSION ${index+1}</p><h3>Edit this extension.</h3><span>This module sits between the body and base.</span></div><div class="maker-extension-photo"><img src="${partPhoto('extension',size)}" width="1536" height="1024" alt="${size} clear extension" /></div>${makerSizeToggle(size,makerActive)}${makerSwatches(getExtensionColors(makerBuild)[index],makerActive,'Extension color')}<button class="maker-remove" data-maker-action="remove-extension" data-maker-value="${index}">Remove extension</button>`;
 }
 if(kind==='attachment'){
  const id=key,part=parts.attachments.find(p=>p.id===id);if(!part||!makerBuild.attachments.includes(id)){makerActive='body';return makerEditorMarkup();}
  return `<div class="maker-editor-heading"><p>ATTACHMENT</p><h3>${safe(part.name)}</h3><span>Choose a type and its own color.</span></div><div class="maker-attachment-selected"><img src="${partPhoto('attachments',id)}" width="1536" height="1024" alt="${safe(part.name)}" /></div><label class="maker-field-heading maker-attachment-type">Attachment type<select data-maker-change="attachment-type" data-maker-target="${id}">${parts.attachments.map(p=>`<option value="${p.id}" ${p.id===id?'selected':''} ${p.id!==id&&makerBuild.attachments.includes(p.id)?'disabled':''}>${safe(p.name)}</option>`).join('')}</select></label>${makerSwatches(getAttachmentColor(makerBuild,id),makerActive,'Attachment color')}<button class="maker-remove" data-maker-action="remove-attachment" data-maker-value="${id}">Remove attachment</button>`;
 }
 makerActive='base';return makerEditorMarkup();
}
function makerAdditionsMarkup(){
 const kind=makerActive.split(':')[0],middles=getMiddleSections(makerBuild),extensions=getExtensions(makerBuild);
 if(['body','middle','extension'].includes(kind)&&makerPlaced.has('body')){
  const chip=(target,label,remove,index)=>`<span class="maker-compartment-chip"><button data-maker-action="edit" data-maker-target="${target}" aria-pressed="${makerActive===target}">${safe(label)}</button>${remove?`<button data-maker-action="${remove}" data-maker-value="${index}" aria-label="Remove ${safe(label)}">×</button>`:''}</span>`;
  return `<div class="maker-body-stack"><div class="maker-stack-heading"><strong>Body compartments</strong><small>${1+middles.length+extensions.length} added</small></div><div class="maker-compartment-list">${chip('body','Main body')}${middles.map((m,i)=>chip(`middle:${i}`,`Body ${i+2}`,'remove-middle',i)).join('')}${extensions.map((id,i)=>chip(`extension:${i}`,`Clear ${i+1}`,'remove-extension',i)).join('')}</div><div class="maker-stack-add"><button data-maker-action="add-middle" ${middles.length>=3?'disabled':''}>+ Body compartment</button><button data-maker-action="add-extension" data-maker-value="short" ${extensions.length>=3?'disabled':''}>+ Clear compartment</button></div></div>`;
 }
 if(['attachments','attachment'].includes(kind))return `<div class="maker-attachment-picker">${parts.attachments.map(p=>`<button data-maker-action="attachment" data-maker-value="${p.id}" aria-pressed="${makerBuild.attachments.includes(p.id)}" aria-label="${makerBuild.attachments.includes(p.id)?'Edit':'Add'} ${safe(p.name)}"><img src="${partPhoto('attachments',p.id)}" width="1536" height="1024" alt="" loading="lazy" /><span>${safe(p.name)}</span></button>`).join('')}</div>`;
 return '';
}
function makerVisibleParts(){return [...makerPlaced,...(makerPlaced.has('body')?['extensions','middleSections','attachments']:[])];}
function makerTotals(){
 const estimate=estimateBuild(makerBuild);
 if(!makerPlaced.has('body'))return {capacity:0,total:(makerPlaced.has('base')?parts.base.find(p=>p.id===makerBuild.base).price:0)+(makerPlaced.has('lid')?parts.lid.find(p=>p.id===makerBuild.lid).price:0)};
 return {capacity:estimate.capacity,total:estimate.total-(makerPlaced.has('base')?0:parts.base.find(p=>p.id===makerBuild.base).price)-(makerPlaced.has('lid')?0:parts.lid.find(p=>p.id===makerBuild.lid).price)};
}
function renderMakerPreview(){
 const preview=document.querySelector('#maker-preview');
 if(!makerPlaced.size){preview.innerHTML='<div class="maker-empty-state"><span>01</span><h3>Start with the base.</h3><p>Choose a shape to place your first piece.</p></div>';return;}
 preview.innerHTML=bottleIllustration(makerBuild,'inline-maker',{fit:false,visibleParts:makerVisibleParts()});
 const svg=preview.querySelector('svg');if(!svg)return;
 svg.removeAttribute('aria-hidden');svg.setAttribute('role','group');svg.setAttribute('aria-label','Edit bottle parts');
 const box=svg.getBBox();
 if(box.width>0&&box.height>0){
  const layout=previewLayout({width:preview.clientWidth,height:preview.clientHeight,bounds:box,bottom:Number(svg.dataset.bottleBottom)});
  svg.setAttribute('viewBox',layout.viewBox);
  svg.style.width='100%';svg.style.height='100%';
 }
 svg.querySelectorAll('[data-module]').forEach(group=>{const id=group.dataset.module;if(!coreOrder.includes(id)&&!id.includes(':'))return;group.classList.add('maker-preview-part');group.classList.toggle('is-selected',id===makerActive);group.setAttribute('role','button');group.setAttribute('tabindex','0');group.setAttribute('aria-label',`Edit ${makerPartName(id)}`);});
}
function makerPartName(id){if(coreLabels[id])return coreLabels[id].toLowerCase();const [kind,key]=id.split(':');if(kind==='middle')return `body section ${Number(key)+1}`;if(kind==='extension')return `extension ${Number(key)+1}`;return parts.attachments.find(p=>p.id===key)?.name.toLowerCase()||'part';}
function renderMaker(){
 const kind=makerActive.split(':')[0],activeStep=['middle','extension'].includes(kind)?'body':kind==='attachment'?'attachments':kind;
 const steps=[...coreOrder,'attachments'];
 document.querySelector('#maker-core-tabs').innerHTML=steps.map((id,index)=>`<button data-maker-action="edit" data-maker-target="${id}" aria-pressed="${activeStep===id}" ${id==='body'&&!makerPlaced.has('base')&&!makerPlaced.has('body')||id==='lid'&&!makerPlaced.has('body')&&!makerPlaced.has('lid')||id==='attachments'&&!makerCoreComplete()?'disabled':''}><span>${makerPlaced.has(id)?'✓':index+1}</span>${coreLabels[id]||'Attachments'}</button>`).join('');
 document.querySelector('#maker-guidance').textContent=`Step ${steps.indexOf(activeStep)+1} of 4`;
 document.querySelector('.maker-edit-scroll').dataset.step=activeStep;
 document.querySelector('#maker-editor').innerHTML=makerEditorMarkup();document.querySelector('#maker-additions').innerHTML=makerAdditionsMarkup();renderMakerPreview();
 const totals=makerTotals();document.querySelector('#maker-piece-count').textContent=`${makerPlaced.size} of 3 main parts`;
 document.querySelector('#maker-preview-hint').textContent=makerPlaced.size?'Click any part to edit it.':'Choose a base to begin.';
 document.querySelector('#maker-capacity').textContent=totals.capacity?`Approx. ${totals.capacity} ml`:'Your build starts here';document.querySelector('#maker-price').textContent=`${money(totals.total)} total`;
 document.querySelector('#maker-continue').disabled=!makerCoreComplete();document.querySelector('#maker-review-note').textContent=makerCoreComplete()?'Estimated capacity':'Add a base, body, and lid to review.';
 const notice=document.querySelector('#maker-error');notice.textContent=makerNotice;notice.hidden=!makerNotice;colorHeadingPeriods(document.querySelector('#make-your-own'));
}
function makerFocusDescriptor(element){if(!element)return null;const names=['makerAction','makerTarget','makerValue','makerCustomColor','makerChange','module'];const descriptor={};for(const name of names)if(element.dataset?.[name]!==undefined)descriptor[name]=element.dataset[name];return Object.keys(descriptor).length?descriptor:null;}
function makerScrollBehavior(){return matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth';}
function focusMakerEditor(scroll=false){
 const editor=document.querySelector('#maker-editor'),heading=editor?.querySelector('h3');
 if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}
 if(scroll)editor?.scrollIntoView({behavior:'instant',block:'nearest'});
}
function restoreMakerFocus(descriptor){
 if(!descriptor)return false;
 const candidates=document.querySelectorAll('#make-your-own [data-maker-action],#make-your-own [data-maker-custom-color],#make-your-own [data-maker-change],#make-your-own [data-module]');
 for(const element of candidates){if(!element.disabled&&Object.entries(descriptor).every(([key,value])=>element.dataset[key]===value)){element.focus({preventScroll:true});return true;}}
 focusMakerEditor();return false;
}
function commitMaker(change){
 const scrollX=window.scrollX,scrollY=window.scrollY;
 const focus=makerFocusDescriptor(document.activeElement);
 const before=cloneBuild(makerBuild),beforePlaced=new Set(makerPlaced),beforeActive=makerActive;
 change();const error=validateBuild(makerBuild);if(error){Object.keys(makerBuild).forEach(k=>delete makerBuild[k]);Object.assign(makerBuild,before);makerPlaced=beforePlaced;makerActive=beforeActive;}
 makerNotice=error||'';renderMaker();restoreMakerFocus(focus);window.scrollTo({left:scrollX,top:scrollY,behavior:'instant'});
}
function setMakerColor(target,color){
 if(coreOrder.includes(target)||target==='handle'){makerBuild.colors[target]=color;return;}
 const [kind,key]=target.split(':');if(kind==='middle'){const sections=getMiddleSections(makerBuild);sections[Number(key)].color=color;setMiddleSections(makerBuild,sections);}
 if(kind==='extension'){const colors=getExtensionColors(makerBuild);colors[Number(key)]=color;setBuildExtensions(makerBuild,getExtensions(makerBuild),colors);}
 if(kind==='attachment'){makerBuild.attachmentColors={...makerBuild.attachmentColors,[key]:color};}
}
function normalizeMakerPart(target){return parts.attachments.some(p=>p.id===target)?`attachment:${target}`:target;}
function editMakerPart(target){makerActive=normalizeMakerPart(target);makerNotice='';renderMaker();document.querySelector('.maker-edit-scroll').scrollTop=0;focusMakerEditor();}
function runMakerAction(button){
 const action=button.dataset.makerAction,target=button.dataset.makerTarget,value=button.dataset.makerValue;
 if(button.disabled)return;
 if(action==='edit'){editMakerPart(target);if(button.classList.contains('maker-next'))focusMakerEditor(true);return;}
 if(action==='more'){editMakerPart('attachments');return;}
 commitMaker(()=>{
  if(action==='type'){
   if(coreOrder.includes(target)){makerBuild[target]=value;makerPlaced.add(target);}
   else {const index=Number(target.split(':')[1]),sections=getMiddleSections(makerBuild);sections[index].type=value;setMiddleSections(makerBuild,sections);}
  }
  if(action==='color')setMakerColor(target,value);
  if(action==='size'){
   const [kind,key]=target.split(':');if(kind==='middle'){const sections=getMiddleSections(makerBuild);sections[Number(key)].size=value;setMiddleSections(makerBuild,sections);}else{const ids=getExtensions(makerBuild);ids[Number(key)]=value;setBuildExtensions(makerBuild,ids,getExtensionColors(makerBuild));}
  }
  if(action==='remove-core'){makerPlaced.delete(target);makerActive=target;}
  if(action==='add-middle'){const sections=getMiddleSections(makerBuild);sections.push({type:'smooth',size:'short',color:makerBuild.colors.body});setMiddleSections(makerBuild,sections);makerActive=`middle:${sections.length-1}`;makerOpenPanels.add('middle');}
  if(action==='remove-middle'){setMiddleSections(makerBuild,getMiddleSections(makerBuild).filter((_,i)=>i!==Number(value)));makerActive='body';}
  if(action==='add-extension'){const ids=getExtensions(makerBuild),colors=getExtensionColors(makerBuild);ids.push(value);colors.push(makerBuild.colors.extension);setBuildExtensions(makerBuild,ids,colors);makerActive=`extension:${ids.length-1}`;makerOpenPanels.add('extension');}
  if(action==='remove-extension'){setBuildExtensions(makerBuild,getExtensions(makerBuild).filter((_,i)=>i!==Number(value)),getExtensionColors(makerBuild).filter((_,i)=>i!==Number(value)));makerActive='body';}
  if(action==='attachment'){if(!makerBuild.attachments.includes(value)){makerBuild.attachments.push(value);makerBuild.attachmentColors={...makerBuild.attachmentColors,[value]:getAttachmentColor(makerBuild,value)};}makerActive=`attachment:${value}`;makerOpenPanels.add('attachment');}
  if(action==='remove-attachment'){makerBuild.attachments=makerBuild.attachments.filter(id=>id!==value);delete makerBuild.attachmentColors?.[value];makerActive='attachments';}
 });
 if(['add-middle','add-extension','attachment'].includes(action)&&!makerNotice)focusMakerEditor(true);
 if(['remove-core','remove-middle','remove-extension','remove-attachment'].includes(action))focusMakerEditor();
}
document.querySelector('.maker-controls').addEventListener('click',e=>{const button=e.target.closest('[data-maker-action]');if(button)runMakerAction(button);});
document.querySelector('.maker-controls').addEventListener('toggle',e=>{const details=e.target.closest('details[data-maker-panel]');if(!details||!details.isConnected)return;if(details.open)makerOpenPanels.add(details.dataset.makerPanel);else makerOpenPanels.delete(details.dataset.makerPanel);},true);
document.querySelector('.maker-controls').addEventListener('change',e=>{
 const color=e.target.closest('[data-maker-custom-color]');if(color){commitMaker(()=>setMakerColor(color.dataset.makerCustomColor,color.value));return;}
 const field=e.target.closest('[data-maker-change]');if(!field)return;
 if(field.dataset.makerChange==='foundation')commitMaker(()=>makerBuild.foundation=field.value);
 if(field.dataset.makerChange==='attachment-type')commitMaker(()=>{const previous=field.dataset.makerTarget,next=field.value,color=getAttachmentColor(makerBuild,previous);makerBuild.attachments=makerBuild.attachments.map(id=>id===previous?next:id);delete makerBuild.attachmentColors?.[previous];makerBuild.attachmentColors={...makerBuild.attachmentColors,[next]:color};makerActive=`attachment:${next}`;});
 if(field.dataset.makerChange==='attachment-type')document.querySelector('[data-maker-change="attachment-type"]')?.focus({preventScroll:true});
});
document.querySelector('#maker-preview').addEventListener('click',e=>{const group=e.target.closest('[data-module]');if(group)editMakerPart(group.dataset.module);});
document.querySelector('#maker-preview').addEventListener('keydown',e=>{const group=e.target.closest('[data-module]');if(group&&['Enter',' '].includes(e.key)){e.preventDefault();editMakerPart(group.dataset.module);}});
document.querySelector('#maker-reset').addEventListener('click',()=>{const clean=coverBuild({extensions:[],middleSections:[],attachments:[],attachmentColors:{}});Object.keys(makerBuild).forEach(k=>delete makerBuild[k]);Object.assign(makerBuild,clean);makerPlaced=new Set();makerActive='base';makerOpenPanels=new Set();makerNotice='';renderMaker();});
document.querySelector('#maker-continue').addEventListener('click',()=>{if(makerCoreComplete())openBuilder(makerBuild,{step:5});});
const makerPreviewSize=document.querySelector('#maker-preview-size');
makerPreviewSize?.addEventListener('click',()=>{const stage=document.querySelector('.maker-stage'),expanded=stage.classList.toggle('is-expanded');makerPreviewSize.setAttribute('aria-expanded',String(expanded));makerPreviewSize.textContent=expanded?'Compact':'Expand';requestAnimationFrame(renderMakerPreview);});
let makerResizeFrame;
window.addEventListener('resize',()=>{cancelAnimationFrame(makerResizeFrame);makerResizeFrame=requestAnimationFrame(renderMakerPreview);});
renderMaker();

initI18n();
