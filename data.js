const defaultColors = { lid:'#153b35', body:'#f67e68', extension:'#fff6e8', base:'#fbe6a1', handle:'#153b35' };
export const palettes = [
 {name:'Coral',value:'#f67e68'},{name:'Butter',value:'#fbe6a1'},{name:'Forest',value:'#153b35'},
 {name:'Dusty blue',value:'#99acc6'},{name:'Navy',value:'#07152f'},{name:'Cool grey',value:'#b8c2c3'},
 {name:'Yellow',value:'#ffe000'},{name:'Seafoam',value:'#b6dcce'},{name:'Teal',value:'#08788e'},
 {name:'Rose',value:'#ef7092'},{name:'Brick',value:'#85261e'},{name:'Clay',value:'#a36751'},
 {name:'Sage',value:'#b5cec5'},{name:'Black',value:'#111214'},{name:'Red',value:'#a92c35'},
 {name:'Violet',value:'#51457f'},{name:'Plum',value:'#501344'},{name:'Ice',value:'#a7cbd4'},
];
export const parts = {
  foundation: [
    { id: 'core', name: 'Everyday', subtitle: 'Core · approx. 500 ml', price: 14, capacity: 500, description: 'An everyday size.' },
    { id: 'mini', name: 'Small', subtitle: 'Mini · approx. 350 ml', price: 12, capacity: 350, description: 'A smaller size.' },
    { id: 'max', name: 'Large', subtitle: 'Max · approx. 750 ml', price: 18, capacity: 750, description: 'A larger size.' },
  ],
  lid: [
    { id: 'straw', name: 'Straw lid', subtitle: 'Flip-up straw', price: 10, description: 'A flip-up straw concept for sipping on the move.' },
    { id: 'chug', name: 'Chug lid', subtitle: 'Open spout', price: 9, description: 'An open-spout concept with a screw-on cap.' },
    { id: 'loop', name: 'Loop lid', subtitle: 'Built-in carry loop', price: 11, description: 'A simple screw-top with an integrated carry loop.' },
    { id: 'flip', name: 'Flip lid', subtitle: 'Covered flip spout', price: 12, description: 'A covered spout concept with a flip-top cap.' },
  ],
  body: [
    { id: 'smooth', name: 'Smooth body', subtitle: 'Smooth matte finish', price: 14, description: 'A clean cylindrical body with a softly matte finish.' },
    { id: 'handle', name: 'Handle body', subtitle: 'Compact side handle', price: 18, description: 'An integrated handle with its own color choice.' },
    { id: 'textured', name: 'Ribbed body', subtitle: 'Ribbed surface', price: 17, description: 'A ribbed surface for added grip.' },
    { id: 'clear', name: 'Clear body', subtitle: 'Transparent body', price: 16, description: 'A translucent body concept; final materials are unconfirmed.' },
  ],
  extension: [
    { id: 'none', name: 'No extension', subtitle: 'No extension', price: 0, capacity: 0, description: 'Keep your original foundation capacity.' },
    { id: 'short', name: 'Short extension', subtitle: 'Short · approx. +150 ml', price: 7, capacity: 150, description: 'Add a short module between the body and base.' },
    { id: 'long', name: 'Long extension', subtitle: 'Long · approx. +300 ml', price: 10, capacity: 300, description: 'Add a longer module. Not available with the storage base.' },
  ],
  base: [
    { id: 'standard', name: 'Standard base', subtitle: 'Flat base', price: 7, description: 'The standard flat-bottom module.' },
    { id: 'narrow', name: 'Narrow base', subtitle: 'Narrow profile', price: 9, description: 'A narrower-footprint concept. Cup-holder fit is not verified.' },
    { id: 'storage', name: 'Storage base', subtitle: 'Storage compartment', price: 13, description: 'A dry-storage concept. Incompatible with the long extension.' },
  ],
  attachments: [
    { id: 'strap', name: 'Carry strap', subtitle: 'Adjustable strap', price: 8, description: 'An adjustable carry-strap concept.' },
    { id: 'pouch', name: 'Pouch', subtitle: 'Clip-on storage', price: 12, description: 'A small clip-on pocket concept.' },
    { id: 'clip', name: 'Carabiner', subtitle: 'Attach to a carry point', price: 5, description: 'An accessory clip. Not for climbing or safety use.' },
    { id: 'charm', name: 'Bottle charm', subtitle: 'Removable charm', price: 4, description: 'A removable bottle charm.' },
    { id: 'brush', name: 'Cleaning brush', subtitle: 'Bottle brush', price: 6, description: 'A bottle-cleaning brush concept; final dimensions are unconfirmed.' },
    { id: 'phone', name: 'Phone holder', subtitle: 'Clip-on phone holder', price: 7, description: 'A phone-holder attachment concept; fit and load rating are unverified.' },
    { id: 'snack', name: 'Snack compartment', subtitle: 'Separate snack storage', price: 10, description: 'A separate snack-compartment attachment concept. Food-contact materials, sealing, and attachment fit are unverified.' },
    { id: 'ringloop', name: 'Attachment loop', subtitle: 'Rings for clips and charms', price: 6, description: 'A slim silicone-collar concept with two small metal D-rings. Separate from the carabiner. Materials, fit, and load rating are unverified.' },
    { id: 'boot', name: 'Protective boot', subtitle: 'Removable base sleeve', price: 8, description: 'A removable base-sleeve concept. Final materials, fit, and protection performance are unverified.' },
    { id: 'sling', name: 'Bottle sling', subtitle: 'Crossbody bottle carrier', price: 14, description: 'A crossbody bottle-sling concept. Bottle fit, materials, and load rating are unverified.' },
    { id: 'strawkit', name: 'Spare straw set', subtitle: 'Replacement straw concept', price: 6, description: 'A spare-straw set concept. Straw dimensions, lid fit, materials, and care instructions are unverified.' },
    { id: 'infuser', name: 'Tea infuser', subtitle: 'Removable tea basket', price: 12, description: 'A removable tea-infuser concept. Dimensions, food-contact materials, temperature suitability, and fit are unverified.' },
    { id: 'gasket', name: 'Spare seal set', subtitle: 'Replacement seal concept', price: 5, description: 'A spare seal-set concept. Seal dimensions, materials, and leak performance are unverified.' },
    { id: 'stickers', name: 'Sticker pack', subtitle: 'Decorative bottle stickers', price: 4, description: 'A decorative sticker-pack concept. Adhesive, surface compatibility, and durability are unverified.' },
  ],
};
export const MAX_EXTENSIONS = 3;
export const MAX_MIDDLE_SECTIONS = 3;
export const defaultAttachmentColors = { strap:'#ef7092', pouch:'#b6dcce', clip:'#51457f', charm:'#a92c35', brush:'#08788e', phone:'#501344', snack:'#85261e', ringloop:'#111214', boot:'#51457f', sling:'#ef7092', strawkit:'#a7cbd4', infuser:'#08788e', gasket:'#111214', stickers:'#f67e68' };
export const middleSectionSizes = [ { id:'short', name:'Short', capacity:150 }, { id:'long', name:'Long', capacity:300 } ];
export function getExtensions(build) {
  if (Array.isArray(build?.extensions)) return [...build.extensions];
  return build?.extension && build.extension !== 'none' ? [build.extension] : [];
}
export function getExtensionColors(build) { return getExtensions(build).map((_,index) => build?.extensionColors?.[index] || build?.colors?.extension || '#fff6e8'); }
export function setBuildExtensions(build, extensions, colors) {
  const previous = getExtensionColors(build);
  build.extensions = [...extensions];
  build.extension = build.extensions[0] || 'none';
  if (colors !== undefined || build.extensionColors !== undefined) build.extensionColors = extensions.map((_,index) => colors?.[index] || previous[index] || build.colors.extension);
  return build;
}
export function getMiddleSections(build) { return Array.isArray(build?.middleSections) ? build.middleSections.map(section => ({type:section.type,size:section.size,color:section.color})) : []; }
export function setMiddleSections(build, sections) { build.middleSections = sections.map(section => ({type:section.type,size:section.size,color:section.color})); return build; }
export function getMiddleSectionInfo(section) {
  const body = parts.body.find(part => part.id === section.type) || parts.body[0];
  const size = middleSectionSizes.find(size => size.id === section.size) || middleSectionSizes[0];
  return { id:`middle-${body.id}-${size.id}`, type:body.id, size:size.id, name:`${size.name} ${body.name.toLowerCase().replace(' body','')} middle`, price:body.price + (size.id === 'long' ? -1 : -5), capacity:size.capacity, color:section.color };
}
export function getAttachmentColor(build, id) { return build?.attachmentColors?.[id] || defaultAttachmentColors[id] || '#08788e'; }
export function cloneBuild(build) {
  const copy = JSON.parse(JSON.stringify(build));
  if (copy && typeof copy === 'object' && !Array.isArray(copy) && copy.foundation && copy.colors) {
    setBuildExtensions(copy, getExtensions(copy));
    setMiddleSections(copy, getMiddleSections(copy));
    copy.attachmentColors = { ...(copy.attachmentColors || {}) };
  }
  return copy;
}
function makeBuild(overrides = {}) { return cloneBuild({ foundation: 'core', lid: 'straw', body: 'smooth', extension: 'none', base: 'standard', colors: { ...defaultColors }, attachments: [], ...overrides }); }
export const presets = [
 {id:'coral',name:'Coral + butter',description:'Straw lid, smooth body, short extension.',tag:'STRAW + CLEAR',build:makeBuild({extension:'short',colors:{...defaultColors}})},
 {id:'alpine',name:'Dusty blue + navy',description:'Loop lid, ribbed body, carry strap.',tag:'LOOP + STRAP',build:makeBuild({lid:'loop',body:'textured',base:'narrow',colors:{lid:'#07152f',body:'#99acc6',extension:'#fff6e8',base:'#b8c2c3',handle:'#07152f'},attachments:['strap'],attachmentColors:{strap:'#ef7092'}})},
 {id:'ink',name:'Clay + black',description:'Chug lid, compact handle, long extension.',tag:'CHUG + HANDLE',build:makeBuild({lid:'chug',body:'handle',extension:'long',attachments:['strap'],attachmentColors:{strap:'#ef7092'},colors:{lid:'#b5cec5',body:'#a36751',extension:'#fff6e8',base:'#111214',handle:'#b5cec5'}})},
 {id:'sage',name:'Yellow + seafoam',description:'Flip lid, smooth body, short extension.',tag:'FLIP + CLEAR',build:makeBuild({lid:'flip',body:'smooth',extension:'short',colors:{lid:'#08788e',body:'#ffe000',extension:'#fff6e8',base:'#b6dcce',handle:'#08788e'}})},
];
export function getBillOfMaterials(build) {
  const moduleRow = (type, part, suffix = '', customColor) => {
    const color = customColor || (['lid', 'body', 'extension', 'base'].includes(type) ? build.colors[type] : null);
    const handleColor = type === 'body' && build.body === 'handle' ? build.colors.handle : null;
    return { ...part, type, color, handleColor, sku: `BB-${type.toUpperCase().slice(0, 3)}-${part.id.toUpperCase()}${color ? '-' + color.slice(1).toUpperCase() : ''}${handleColor ? '-H' + handleColor.slice(1).toUpperCase() : ''}${suffix}` };
  };
  const rows = ['foundation', 'lid'].map(type => moduleRow(type, parts[type].find(p => p.id === build[type]) || parts[type][0]));
  getMiddleSections(build).forEach((section,index) => { const part = getMiddleSectionInfo(section); rows.push({ ...moduleRow('middle',part,`-P${index+1}`,section.color), name:`${part.name} · ${index+1}`, moduleIndex:index+1 }); });
  rows.push(moduleRow('body',parts.body.find(p => p.id === build.body) || parts.body[0]));
  const extensionColors = getExtensionColors(build);
  getExtensions(build).forEach((id, index) => {
    const part = parts.extension.find(p => p.id === id && id !== 'none');
    if (part) rows.push({ ...moduleRow('extension', part, `-P${index + 1}`,extensionColors[index]), name: `${part.name} · ${index + 1}`, moduleIndex: index + 1 });
  });
  rows.push(moduleRow('base', parts.base.find(p => p.id === build.base) || parts.base[0]));
  for (const id of build.attachments || []) { const part = parts.attachments.find(p => p.id === id); if (part) { const color=getAttachmentColor(build,id); rows.push({ ...part, type:'attachment',color,sku:`BB-ACC-${id.toUpperCase()}-${color.slice(1).toUpperCase()}` }); } }
  return rows;
}
export function estimateBuild(build) {
  const rows = getBillOfMaterials(build);
  const total = rows.reduce((sum, p) => sum + p.price, 0);
  const foundation = parts.foundation.find(p => p.id === build.foundation) || parts.foundation[0];
  const extensions = getExtensions(build), middleSections=getMiddleSections(build);
  const extensionCapacity = extensions.reduce((sum, id) => sum + (parts.extension.find(p => p.id === id)?.capacity || 0), 0);
  const middleCapacity = middleSections.reduce((sum,section)=>sum+getMiddleSectionInfo(section).capacity,0);
  return { total, price: total, capacity: foundation.capacity + extensionCapacity + middleCapacity, componentCount: rows.length, extensionCount: extensions.length, extensionCapacity, middleCount:middleSections.length, middleCapacity };
}
export function validateBuild(build) {
  const hex = value => typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value);
  if (!build || typeof build !== 'object' || Array.isArray(build)) return 'This build could not be read. Start with a preset.';
  for (const type of ['foundation', 'lid', 'body', 'base']) if (!parts[type].some(p => p.id === build[type])) return 'Please choose a valid component for every step.';
  if (Object.hasOwn(build, 'extensions')) {
    if (!Array.isArray(build.extensions) || build.extensions.length > MAX_EXTENSIONS || build.extensions.some(id => id !== 'short' && id !== 'long')) return 'Choose up to 3 short or long extension modules.';
  } else if (!parts.extension.some(p => p.id === build.extension)) return 'Please choose a valid extension.';
  if (build.extension !== undefined && !parts.extension.some(p => p.id === build.extension)) return 'Please choose a valid extension.';
  if (build.extensionColors !== undefined && (!Array.isArray(build.extensionColors) || build.extensionColors.length !== getExtensions(build).length || build.extensionColors.some(color=>!hex(color)))) return 'Choose a valid color for each lower extension.';
  if (build.middleSections !== undefined && (!Array.isArray(build.middleSections) || build.middleSections.length > MAX_MIDDLE_SECTIONS || build.middleSections.some(section => !section || typeof section !== 'object' || Array.isArray(section) || Object.keys(section).some(key=>!['type','size','color'].includes(key)) || !parts.body.some(part=>part.id===section.type) || !middleSectionSizes.some(size=>size.id===section.size) || !hex(section.color)))) return 'Choose up to 3 middle sections, each with a valid type, size, and color.';
  if (!build.colors || typeof build.colors !== 'object' || Array.isArray(build.colors)) return 'Please choose a color for every module.';
  if (Object.keys(build.colors).some(key => !['lid', 'body', 'extension', 'base', 'handle'].includes(key))) return 'This build contains an unrecognized module color. Start with a preset.';
  for (const type of ['lid', 'body', 'extension', 'base', 'handle']) if (!hex(build.colors[type])) return 'One of the module colors could not be read. Choose a preset to begin again.';
  if (!Array.isArray(build.attachments) || build.attachments.length > parts.attachments.length || new Set(build.attachments).size !== build.attachments.length || build.attachments.some(id => typeof id !== 'string' || !parts.attachments.some(p => p.id === id))) return 'One of the selected attachments is unavailable in this concept.';
  if (build.attachmentColors !== undefined && (!build.attachmentColors || typeof build.attachmentColors !== 'object' || Array.isArray(build.attachmentColors) || Object.entries(build.attachmentColors).some(([id,color])=>!parts.attachments.some(part=>part.id===id) || !hex(color)))) return 'One of the attachment colors could not be read.';
  if (build.base === 'storage' && getExtensions(build).includes('long')) return 'The Storage base cannot connect with a long lower extension. Remove every long lower module or choose a different base.';
  return '';
}
for (const preset of presets) preset.price = estimateBuild(preset.build).total;
export const products = [
  ...presets.map(p => ({ ...p, category: 'Bottles', color: p.build.colors.body })),
  ...['lid', 'body', 'base', 'extension', 'attachments'].flatMap(type => parts[type].filter(p => p.id !== 'none').map(p => ({ ...p, id: `${type}-${p.id}`, category: ({lid:'Lids',body:'Bodies',base:'Bases',extension:'Extensions',attachments:'Accessories'})[type], partType: type, partId: p.id, color: type === 'attachments' ? defaultAttachmentColors[p.id] : type === 'lid' ? '#f67e68' : type === 'base' ? '#08788e' : '#fbe6a1' }))),
];
