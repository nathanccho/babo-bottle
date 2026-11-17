import './style.css';
import './configurator.css';
import { presets, products, cloneBuild, estimateBuild, parts } from './data.js';
import { initCommerce, openBuilder, openCart, openProduct, openSearch, openInfo } from './configurator.js';
import { bottleIllustration, accessoryIllustration, stepIllustration } from './illustrations.js';

const money = value => `$${Number(value).toFixed(0)}`;
const safe = str => String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const featured = presets.slice(0, 3);
const accessoryIds = ['strap','pouch','clip','charm','phone','brush'];
const accessoryItems = accessoryIds.map(id => products.find(p => p.partType === 'attachments' && p.partId === id)).filter(Boolean);
document.querySelector('#accessory-products').innerHTML = accessoryItems.map((p,i) => `
  <article class="accessory-card"><button class="accessory-visual" data-product="${safe(p.id)}" aria-label="View ${safe(p.name)}" style="background:${['#e8e4da','#eee0d2','#e0e8e2','#e9e5dc'][i%4]};width:100%">${accessoryIllustration(p.partId,`accessory-${i}`)}<span>${safe(p.name.toUpperCase())}</span></button><div class="accessory-bottom"><div><h3>${safe(p.name)}</h3><p>${money(p.price)} · Concept accessory</p></div><button data-product="${safe(p.id)}" aria-label="Explore ${safe(p.name)}">+</button></div></article>`).join('');

['foundation','lid','body','accessories'].forEach(step => {document.querySelector(`#step-${step}`).innerHTML = stepIllustration(step);});


document.querySelector('.hero-presets').innerHTML = featured.map((p,i) => `<button class="hero-preset" aria-pressed="${i===0}" data-hero-preset="${safe(p.id)}" style="--preset-color:${p.build.colors.lid}" aria-label="Preview ${safe(p.name)}"><i class="preset-dot" aria-hidden="true"></i>${safe(p.name)}<span aria-hidden="true">↗</span></button>`).join('');
let activeHeroPreset = featured[0].id;
let heroImageSize = { width: 1536, height: 1024 };
const heroPhoto = document.querySelector('#hero-photo');
const heroPhotoMobile = document.querySelector('#hero-photo-mobile');
const heroPhotography = document.querySelector('#hero-photography');
const heroMedia = window.matchMedia('(max-width: 640px)');
const partRegions = [
  ['coral','Straw lid',255,65,245,230],['coral','Smooth body',250,310,240,345],
  ['coral','Clear extension',250,675,245,140],['coral','Base',245,835,250,135],
  ['alpine','Loop lid',640,100,250,235],['alpine','Ribbed body',635,355,245,420],
  ['alpine','Carry strap',880,370,130,415],['alpine','Narrow base',640,810,250,110],
  ['ink','Chug lid',1070,25,255,185],['ink','Handle body',1055,245,195,315],
  ['ink','Compact handle',1250,300,100,175],['ink','Clear extension',1060,580,255,240],
  ['ink','Base',1060,835,260,140]
];
const partHotspots=document.querySelector('#hero-photo-hotspots');
partHotspots.innerHTML=`<svg class="part-hit-map" viewBox="0 0 1536 1024" preserveAspectRatio="xMidYMid slice" aria-label="Explore bottle parts">${partRegions.map(([id,name,x,y,w,h])=>`<a href="#" data-build="${id}" data-part-name="${name}" aria-label="${name}: customize ${featured.find(p=>p.id===id).name}" aria-describedby="hero-part-tooltip"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16"/><title>${name}</title></a>`).join('')}</svg><span id="hero-part-tooltip" class="part-tooltip" role="tooltip" hidden></span>`;
const partMap=partHotspots.querySelector('svg');
const partTooltip=partHotspots.querySelector('.part-tooltip');
function showPart(link,event){
  partTooltip.textContent=link.dataset.partName;partTooltip.hidden=false;
  const bounds=partHotspots.getBoundingClientRect();
  const target=link.getBoundingClientRect();
  const x=event?.clientX ? event.clientX-bounds.left : target.left-bounds.left+target.width/2;
  const y=event?.clientY ? event.clientY-bounds.top : target.top-bounds.top;
  partTooltip.style.left=`${Math.max(78,Math.min(bounds.width-78,x))}px`;
  partTooltip.style.top=`${Math.max(12,Math.min(bounds.height-42,y-40))}px`;
}
partHotspots.querySelectorAll('[data-part-name]').forEach(link=>{
  link.addEventListener('pointerenter',e=>showPart(link,e));
  link.addEventListener('pointermove',e=>showPart(link,e));
  link.addEventListener('focus',()=>showPart(link));
  link.addEventListener('blur',()=>{partTooltip.hidden=true;});
  link.addEventListener('click',e=>{
    e.preventDefault();
    if(window.matchMedia('(hover: none)').matches && partTooltip.dataset.selected!==link.dataset.partName){
      e.stopPropagation();partTooltip.dataset.selected=link.dataset.partName;showPart(link,e);
    }
  });
  link.addEventListener('keydown',e=>{if(e.key===' '){e.preventDefault();link.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true}));}if(e.key==='Escape')partTooltip.hidden=true;});
});
partHotspots.addEventListener('pointerleave',()=>{partTooltip.hidden=true;delete partTooltip.dataset.selected;});

function updateHeroPhoto() {
  const i = Math.max(0, featured.findIndex(p => p.id === activeHeroPreset));
  const panelWidth = heroImageSize.width / 3;
  heroPhotoMobile.setAttribute('viewBox', `${i*panelWidth} 0 ${panelWidth} ${heroImageSize.height}`);
  heroPhotoMobile.setAttribute('aria-label', `${featured[i].name} exploded bottle concept`);
  partMap.setAttribute('viewBox',heroMedia.matches?`${i*512} 0 512 1024`:'0 0 1536 1024');
  partMap.setAttribute('preserveAspectRatio',heroMedia.matches?'xMidYMid meet':'xMidYMid slice');
  partHotspots.querySelectorAll('[data-part-name]').forEach(link=>{link.tabIndex=heroMedia.matches&&link.dataset.build!==activeHeroPreset?-1:0;});
  partTooltip.hidden=true;delete partTooltip.dataset.selected;

  const image = heroPhotoMobile.querySelector('image');
  image.setAttribute('width', heroImageSize.width);image.setAttribute('height', heroImageSize.height);
  document.querySelector('.hero-photo-fallback').innerHTML = featured.map((p,j) => `<div class="hero-fallback-bottle ${j===i?'is-active':''}">${bottleIllustration(p.build,`hero-fallback-${j}`)}</div>`).join('');
}
function markHeroPhotoReady() {
  if (!heroPhoto.naturalWidth) return;
  heroImageSize = {width: heroPhoto.naturalWidth, height: heroPhoto.naturalHeight};
  heroPhoto.width = heroImageSize.width;heroPhoto.height = heroImageSize.height;
  heroPhotography.classList.add('is-loaded');updateHeroPhoto();
}
heroPhoto.addEventListener('load', markHeroPhotoReady);
if(heroPhoto.complete) markHeroPhotoReady();
heroPhoto.addEventListener('error',()=>heroPhotography.classList.remove('is-loaded'));
updateHeroPhoto();
heroMedia.addEventListener('change', updateHeroPhoto);
initCommerce();

document.addEventListener('click', e => {
  const buildButton = e.target.closest('[data-build]');
  if(buildButton){
    openBuilder(buildButton.dataset.build);
    closeMenu();return;
  }
  const heroButton=e.target.closest('[data-hero-preset]');
  if(heroButton){
    activeHeroPreset=heroButton.dataset.heroPreset;
    updateHeroPhoto();
    document.querySelectorAll('[data-hero-preset]').forEach(b=>b.setAttribute('aria-pressed',String(b===heroButton)));

    return;
  }
  if(e.target.closest('[data-cart]')){openCart();return;}
  const productButton=e.target.closest('[data-product]');if(productButton){openProduct(productButton.dataset.product);return;}
  if(e.target.closest('[data-search]')){openSearch();return;}
  const infoButton=e.target.closest('[data-info]');if(infoButton){openInfo(infoButton.dataset.info);closeMenu();return;}
  if(e.target.closest('.main-nav a'))closeMenu();
});

const menuToggle=document.querySelector('.menu-toggle');
function closeMenu(){document.querySelector('.main-nav').classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Open menu');}
menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';document.querySelector('.main-nav').classList.toggle('open',open);menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close menu':'Open menu');});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});

document.querySelector('#current-year').textContent='2026';
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.08});
document.querySelectorAll('.section-heading,.steps-grid,.product-grid,.accessory-grid,.closing-section h2').forEach(el=>{el.classList.add('reveal');observer.observe(el);});



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
  brandOverlay.setAttribute('aria-label',`Brand preview: ${label}`);
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
    brandOverlay.setAttribute('aria-label','Your uploaded logo on the bottle');brandError.hidden=true;brandStatus.textContent='Logo preview updated.';
  };
  probe.onerror=()=>{URL.revokeObjectURL(candidateUrl);if(version===brandUploadVersion){showBrandError('This image could not be opened. Choose another file.');brandUpload.value='';}};
  probe.src=candidateUrl;
});
document.querySelector('#brand-reset').addEventListener('click',()=>{
  brandUploadVersion++;clearBrandImage();brandTextInput.value='YOUR BRAND';brandUpload.value='';brandDark.checked=false;brandOverlay.classList.remove('dark-label');brandError.hidden=true;updateBrandText();brandStatus.textContent='Brand preview reset.';
});
updateBrandText();
window.addEventListener('pagehide',event=>{if(!event.persisted&&brandObjectUrl)URL.revokeObjectURL(brandObjectUrl);});


// A simple first build, carried into the full component configurator.
const makerBuild=cloneBuild(presets[0].build);
makerBuild.extension='none';
let previousMakerHeight=0;
function renderMaker(){
 const options=(id,type,values)=>{document.querySelector(id).innerHTML=values.map(p=>`<button data-maker-type="${type}" data-maker-value="${p.id}" aria-pressed="${makerBuild[type]===p.id}">${safe(p.name)}</button>`).join('');};
 options('#maker-sizes','foundation',parts.foundation);
 options('#maker-extensions','extension',parts.extension);
 document.querySelector('#maker-colors').innerHTML=presets.slice(0,3).map(p=>`<button data-maker-color="${p.id}" aria-label="${safe(p.name)}" aria-pressed="${makerBuild.colors.body===p.build.colors.body && makerBuild.colors.lid===p.build.colors.lid}"><i style="background:${p.build.colors.lid}"></i><i style="background:${p.build.colors.body}"></i>${safe(p.name)}</button>`).join('');
 document.querySelector('#maker-extras').innerHTML=parts.attachments.map(p=>`<button data-maker-extra="${p.id}" aria-pressed="${makerBuild.attachments.includes(p.id)}">${makerBuild.attachments.includes(p.id)?'✓':'+'} ${safe(p.name)}</button>`).join('');
 const preview=document.querySelector('#maker-preview');preview.innerHTML=bottleIllustration(makerBuild,'inline-maker');
 const height=38+(makerBuild.foundation==='mini'?104:makerBuild.foundation==='max'?164:136)+(makerBuild.extension==='none'?0:makerBuild.extension==='long'?54:32)+37;
 if(previousMakerHeight && !matchMedia('(prefers-reduced-motion: reduce)').matches) preview.querySelector('svg').animate([{transform:`scaleY(${previousMakerHeight/height})`},{transform:'scaleY(1)'}],{duration:350,easing:'cubic-bezier(.2,.7,.3,1)'});
 previousMakerHeight=height;
 const estimate=estimateBuild(makerBuild);
 document.querySelector('#maker-capacity').textContent=`Approx. ${estimate.capacity} ml`;
 document.querySelector('#maker-price').textContent=`$${estimate.total} demo total`;
 preview.setAttribute('aria-label',`${estimate.capacity} milliliter bottle, ${makerBuild.extension==='none'?'no':makerBuild.extension} extension, ${makerBuild.attachments.length} attachments`);
}
document.querySelector('.maker-controls').addEventListener('click',e=>{
 const part=e.target.closest('[data-maker-type]'),color=e.target.closest('[data-maker-color]'),extra=e.target.closest('[data-maker-extra]');
 if(part)makerBuild[part.dataset.makerType]=part.dataset.makerValue;
 else if(color)makerBuild.colors=cloneBuild(presets.find(p=>p.id===color.dataset.makerColor).build.colors);
 else if(extra){const id=extra.dataset.makerExtra;makerBuild.attachments=makerBuild.attachments.includes(id)?makerBuild.attachments.filter(x=>x!==id):[...makerBuild.attachments,id];}
 else return;
 const key=part?'[data-maker-type="'+part.dataset.makerType+'"][data-maker-value="'+part.dataset.makerValue+'"]':color?'[data-maker-color="'+color.dataset.makerColor+'"]':'[data-maker-extra="'+extra.dataset.makerExtra+'"]';
 renderMaker();document.querySelector(key)?.focus({preventScroll:true});
});
document.querySelector('#maker-continue').addEventListener('click',()=>openBuilder(makerBuild));
renderMaker();
