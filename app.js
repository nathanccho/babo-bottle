import './style.css';
import './configurator.css';
import { presets, products, cloneBuild } from './data.js';
import { initCommerce, openBuilder, openCart, openProduct, openSearch, openInfo } from './configurator.js';
import { bottleIllustration, accessoryIllustration, stepIllustration, cleaningIllustration } from './illustrations.js';

const money = value => `$${Number(value).toFixed(0)}`;
const safe = str => String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const featured = presets.slice(0, 3);
const cardBackgrounds = ['#eee5d8', '#e1e9e3', '#e5e4e8'];
const portraitAssets = { coral:'babo-daydreamer.webp', alpine:'babo-trail-mix.webp', ink:'babo-night-owl.webp' };

document.querySelector('#popular-builds').innerHTML = featured.map((p, i) => `
  <article class="product-card">
    <div class="product-visual" style="--product-bg:${cardBackgrounds[i]}">
      <span class="product-tag">${['CORAL / CREAM','TEAL / SKY','INK / CLOUD'][i]}</span>
      <button data-product="${safe(p.id)}" aria-label="View details for ${safe(p.name)}">↗</button>
      <div class="product-photo-fallback" aria-hidden="true">${bottleIllustration(p.build, `popular-${i}`)}</div>
      <svg class="product-photograph" viewBox="${i*512} 0 512 1024" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${safe(p.name)} assembled bottle concept"><image href="/assets/babo-colorways.webp" width="1536" height="1024" /></svg>
      <img class="product-portrait" src="/assets/${portraitAssets[p.id]}" width="1024" height="1536" alt="${safe(p.name)} Babo bottle concept, assembled in ${i===0?'coral, warm cream, and teal':i===1?'deep teal and sky blue':'ink and cloud'} colors." loading="lazy" decoding="async" />
    </div>
    <div class="product-bottom"><div><h3>${safe(p.name)}</h3><p>${i === 0 ? 'Coral / cream / teal' : i === 1 ? 'Sky / ocean' : 'Ink / cloud'}</p></div><span class="product-price">${money(p.price)}</span></div>
    <div class="product-card-bottom"><div class="product-swatches" aria-label="${safe(p.name)} colors">${[...new Set(Object.values(p.build.colors))].slice(0,3).map(c => `<span style="--swatch:${c}"></span>`).join('')}</div><button data-build="${safe(p.id)}">Customize this <span aria-hidden="true">↗</span></button></div>
  </article>`).join('');

const accessoryIds = ['strap','pouch','clip','brush'];
const accessoryItems = accessoryIds.map(id => products.find(p => p.partType === 'attachments' && p.partId === id)).filter(Boolean);
document.querySelector('#accessory-products').innerHTML = accessoryItems.map((p,i) => `
  <article class="accessory-card"><button class="accessory-visual" data-product="${safe(p.id)}" aria-label="View ${safe(p.name)}" style="background:${['#e8e4da','#eee0d2','#e0e8e2','#e9e5dc'][i]};width:100%">${accessoryIllustration(p.partId,`accessory-${i}`)}<span>${['CARRY STRAP','POCKET POUCH','CARABINER','CLEANING BRUSH'][i]}</span></button><div class="accessory-bottom"><div><h3>${safe(p.name)}</h3><p>${money(p.price)} · Concept accessory</p></div><button data-product="${safe(p.id)}" aria-label="Explore ${safe(p.name)}">+</button></div></article>`).join('');

['foundation','lid','body','accessories'].forEach(step => {document.querySelector(`#step-${step}`).innerHTML = stepIllustration(step);});
document.querySelector('.cleaning-fallback').innerHTML = cleaningIllustration();

document.querySelector('.hero-presets').innerHTML = featured.map((p,i) => `<button class="hero-preset" aria-pressed="${i===0}" data-hero-preset="${safe(p.id)}" style="--preset-color:${p.build.colors.lid}" aria-label="Preview ${safe(p.name)}"><i class="preset-dot" aria-hidden="true"></i>${safe(p.name)}<span aria-hidden="true">↗</span></button>`).join('');
let activeHeroPreset = featured[0].id;
let heroImageSize = { width: 1536, height: 1024 };
const heroPhoto = document.querySelector('#hero-photo');
const heroPhotoMobile = document.querySelector('#hero-photo-mobile');
const heroPhotography = document.querySelector('#hero-photography');
const heroMedia = window.matchMedia('(max-width: 640px)');
document.querySelector('#hero-photo-hotspots').innerHTML=featured.map(p=>`<button class="hero-photo-hotspot" data-build="${safe(p.id)}" aria-label="Customize ${safe(p.name)}"><span>Customize ${safe(p.name.replace(/^The /,'the '))} <i aria-hidden="true">↗</i></span></button>`).join('');
function updateHeroPhoto() {
  const i = Math.max(0, featured.findIndex(p => p.id === activeHeroPreset));
  const panelWidth = heroImageSize.width / 3;
  heroPhotoMobile.setAttribute('viewBox', `${i*panelWidth} 0 ${panelWidth} ${heroImageSize.height}`);
  heroPhotoMobile.setAttribute('aria-label', `${featured[i].name} exploded bottle concept`);
  document.querySelectorAll('.hero-photo-hotspot').forEach(button=>{const active=button.dataset.build===activeHeroPreset;button.classList.toggle('is-active',active);button.tabIndex=heroMedia.matches&&!active?-1:0;});
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
document.querySelectorAll('.product-portrait').forEach(img=>{
  const ready=()=>{if(img.naturalWidth)img.closest('.product-visual').classList.add('has-portrait');};
  img.addEventListener('load',ready);if(img.complete)ready();
});
const colorwayImage = new Image();
colorwayImage.addEventListener('load',()=>{
  document.querySelectorAll('.product-photograph').forEach((svg,i)=>{
    svg.setAttribute('viewBox',`${i*colorwayImage.naturalWidth/3} 0 ${colorwayImage.naturalWidth/3} ${colorwayImage.naturalHeight}`);
    const img=svg.querySelector('image');img.setAttribute('width',colorwayImage.naturalWidth);img.setAttribute('height',colorwayImage.naturalHeight);
    svg.closest('.product-visual').classList.add('has-photography');
  });
});
colorwayImage.src='/assets/babo-colorways.webp';
const everydayPhoto=document.querySelector('.everyday-photo');
const markEveryday=()=>{if(everydayPhoto.naturalWidth)everydayPhoto.closest('.everyday-visual').classList.add('has-photography');};
everydayPhoto.addEventListener('load',markEveryday);if(everydayPhoto.complete)markEveryday();
const detailPhoto=document.querySelector('#cleaning-art>img');
const markDetails=()=>{if(detailPhoto.naturalWidth)detailPhoto.parentElement.classList.add('has-photography');};
detailPhoto.addEventListener('load',markDetails);if(detailPhoto.complete)markDetails();

const dailyBase = cloneBuild(presets[0].build);
dailyBase.extension = 'none';dailyBase.body='smooth';dailyBase.attachments=[];
const extraBase = cloneBuild(presets[0].build);
extraBase.extension='long';extraBase.body='handle';extraBase.colors.body='#007d87';extraBase.colors.handle='#f36f60';
const handsBase = cloneBuild(presets[1].build);
handsBase.body='smooth';handsBase.extension='none';handsBase.attachments=['strap','pouch'];
const days = {
  daily: {build:dailyBase,title:'The everyday setup.',copy:'Choose a body and colors. Add only the parts you need.',preset:'coral'},
  extra: {build:extraBase,title:'Add an extension.',copy:'Change the size with an extra module. Choose a handle if you need one.',preset:'coral'},
  handsfree: {build:handsBase,title:'Add a carry strap.',copy:'Keep your hands free. Add a pouch for small essentials.',preset:'alpine'}
};
let currentDay='daily';
function setDay(id){
  if(!days[id])return;
  currentDay=id;
  document.querySelectorAll('[data-day]').forEach(b=>{b.setAttribute('aria-selected',String(b.dataset.day===id));b.tabIndex=b.dataset.day===id?0:-1;});
  document.querySelector('#day-title').textContent=days[id].title;
  document.querySelector('#day-copy').textContent=days[id].copy;
  document.querySelector('#everyday-bottle').innerHTML=bottleIllustration(days[id].build,`everyday-${id}`);
}
setDay('daily');

initCommerce();

document.addEventListener('click', e => {
  const buildButton = e.target.closest('[data-build]');
  if(buildButton){
    if(buildButton.id==='day-build') openBuilder(days[currentDay].build);
    else openBuilder(buildButton.dataset.build);
    closeMenu();return;
  }
  const heroButton=e.target.closest('[data-hero-preset]');
  if(heroButton){
    activeHeroPreset=heroButton.dataset.heroPreset;
    updateHeroPhoto();
    document.querySelectorAll('[data-hero-preset]').forEach(b=>b.setAttribute('aria-pressed',String(b===heroButton)));
    document.querySelector('.hero-actions [data-build]').dataset.build=heroButton.dataset.heroPreset;
    return;
  }
  if(e.target.closest('[data-cart]')){openCart();return;}
  const productButton=e.target.closest('[data-product]');if(productButton){openProduct(productButton.dataset.product);return;}
  if(e.target.closest('[data-search]')){openSearch();return;}
  const infoButton=e.target.closest('[data-info]');if(infoButton){openInfo(infoButton.dataset.info);closeMenu();return;}
  const dayButton=e.target.closest('[data-day]');if(dayButton){setDay(dayButton.dataset.day);return;}
  if(e.target.closest('.main-nav a'))closeMenu();
});

document.querySelector('.day-tabs').addEventListener('keydown',e=>{
  if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){
    e.preventDefault();const keys=Object.keys(days);let i=keys.indexOf(currentDay);
    if(e.key==='Home')i=0;else if(e.key==='End')i=keys.length-1;else i=(i+(e.key==='ArrowRight'?1:-1)+keys.length)%keys.length;
    setDay(keys[i]);document.querySelector(`[data-day="${keys[i]}"]`).focus();
  }
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
