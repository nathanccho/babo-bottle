const defaultColors = { lid: '#f36f60', body: '#f6e9ce', extension: '#f6e9ce', base: '#007d87', handle: '#f36f60' };
export const palettes = [
  { name: 'Coral', value: '#f36f60' }, { name: 'Lagoon', value: '#007d87' },
  { name: 'Butter', value: '#f6e9ce' }, { name: 'Sage', value: '#a5b5a1' },
  { name: 'Sky', value: '#a9d4df' }, { name: 'Ink', value: '#253c46' },
  { name: 'Lilac', value: '#b9a6ce' }, { name: 'Cloud', value: '#eeeae2' },
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
  ],
};
export const MAX_EXTENSIONS = 3;
export function getExtensions(build) {
  if (Array.isArray(build?.extensions)) return [...build.extensions];
  return build?.extension && build.extension !== 'none' ? [build.extension] : [];
}
export function setBuildExtensions(build, extensions) {
  build.extensions = [...extensions];
  build.extension = build.extensions[0] || 'none';
  return build;
}
export function cloneBuild(build) {
  const copy = JSON.parse(JSON.stringify(build));
  if (copy && typeof copy === 'object' && !Array.isArray(copy)) setBuildExtensions(copy, getExtensions(copy));
  return copy;
}
function makeBuild(overrides = {}) { return cloneBuild({ foundation: 'core', lid: 'straw', body: 'smooth', extension: 'none', base: 'standard', colors: { ...defaultColors }, attachments: [], ...overrides }); }
export const presets = [
  { id: 'coral', name: 'Coral + cream', description: 'Straw lid, smooth body, short extension.', tag: 'STRAW + CLEAR', build: makeBuild({ extension: 'short', colors: { ...defaultColors, extension: '#eeeae2' } }) },
  { id: 'alpine', name: 'Ocean + sky', description: 'Loop lid, ribbed body, carry strap.', tag: 'LOOP + STRAP', build: makeBuild({ lid: 'loop', body: 'textured', base: 'narrow', colors: { lid: '#007d87', body: '#a9d4df', extension: '#a9d4df', base: '#007d87', handle: '#007d87' }, attachments: ['strap'] }) },
  { id: 'ink', name: 'Ink + cream', description: 'Chug lid, compact handle, long extension.', tag: 'CHUG + HANDLE', build: makeBuild({ lid: 'chug', body: 'handle', extension: 'long', attachments: ['strap'], colors: { lid: '#253c46', body: '#eeeae2', extension: '#eeeae2', base: '#253c46', handle: '#253c46' } }) },
  { id: 'sage', name: 'Seafoam + cream', description: 'Flip lid, smooth body, short extension.', tag: 'FLIP + CLEAR', build: makeBuild({ lid: 'flip', body: 'smooth', extension: 'short', colors: { lid: '#a5b5a1', body: '#f6e9ce', extension: '#a5b5a1', base: '#a5b5a1', handle: '#a5b5a1' } }) },
];
export function getBillOfMaterials(build) {
  const moduleRow = (type, part, suffix = '') => {
    const color = ['lid', 'body', 'extension', 'base'].includes(type) ? build.colors[type] : null;
    const handleColor = type === 'body' && build.body === 'handle' ? build.colors.handle : null;
    return { ...part, type, color, handleColor, sku: `BB-${type.toUpperCase().slice(0, 3)}-${part.id.toUpperCase()}${color ? '-' + color.slice(1).toUpperCase() : ''}${handleColor ? '-H' + handleColor.slice(1).toUpperCase() : ''}${suffix}` };
  };
  const rows = ['foundation', 'lid', 'body'].map(type => moduleRow(type, parts[type].find(p => p.id === build[type]) || parts[type][0]));
  getExtensions(build).forEach((id, index) => {
    const part = parts.extension.find(p => p.id === id && id !== 'none');
    if (part) rows.push({ ...moduleRow('extension', part, `-P${index + 1}`), name: `${part.name} · ${index + 1}`, moduleIndex: index + 1 });
  });
  rows.push(moduleRow('base', parts.base.find(p => p.id === build.base) || parts.base[0]));
  for (const id of build.attachments || []) { const part = parts.attachments.find(p => p.id === id); if (part) rows.push({ ...part, type: 'attachment', sku: `BB-ACC-${id.toUpperCase()}` }); }
  return rows;
}
export function estimateBuild(build) {
  const rows = getBillOfMaterials(build);
  const total = rows.reduce((sum, p) => sum + p.price, 0);
  const foundation = parts.foundation.find(p => p.id === build.foundation) || parts.foundation[0];
  const extensions = getExtensions(build);
  const extensionCapacity = extensions.reduce((sum, id) => sum + (parts.extension.find(p => p.id === id)?.capacity || 0), 0);
  return { total, price: total, capacity: foundation.capacity + extensionCapacity, componentCount: rows.length, extensionCount: extensions.length, extensionCapacity };
}
export function validateBuild(build) {
  if (!build || typeof build !== 'object' || Array.isArray(build)) return 'This build could not be read. Start with a preset.';
  for (const type of ['foundation', 'lid', 'body', 'base']) if (!parts[type].some(p => p.id === build[type])) return 'Please choose a valid component for every step.';
  if (Object.hasOwn(build, 'extensions')) {
    if (!Array.isArray(build.extensions) || build.extensions.length > MAX_EXTENSIONS || build.extensions.some(id => id !== 'short' && id !== 'long')) return 'Choose up to 3 short or long extension modules.';
  } else if (!parts.extension.some(p => p.id === build.extension)) return 'Please choose a valid extension.';
  if (build.extension !== undefined && !parts.extension.some(p => p.id === build.extension)) return 'Please choose a valid extension.';
  if (!build.colors || typeof build.colors !== 'object' || Array.isArray(build.colors)) return 'Please choose a color for every module.';
  if (Object.keys(build.colors).some(key => !['lid', 'body', 'extension', 'base', 'handle'].includes(key))) return 'This build contains an unrecognized module color. Start with a preset.';
  for (const type of ['lid', 'body', 'extension', 'base', 'handle']) if (typeof build.colors[type] !== 'string' || !/^#[0-9a-f]{6}$/i.test(build.colors[type])) return 'One of the module colors could not be read. Choose a preset to begin again.';
  if (!Array.isArray(build.attachments) || build.attachments.length > parts.attachments.length || new Set(build.attachments).size !== build.attachments.length || build.attachments.some(id => typeof id !== 'string' || !parts.attachments.some(p => p.id === id))) return 'One of the selected attachments is unavailable in this concept.';
  if (build.base === 'storage' && getExtensions(build).includes('long')) return 'The Storage base cannot connect with a long extension. Remove every long module or choose a different base.';
  return '';
}
for (const preset of presets) preset.price = estimateBuild(preset.build).total;
export const products = [
  ...presets.map(p => ({ ...p, category: 'Bottles', color: p.build.colors.body })),
  ...['lid', 'body', 'base', 'extension', 'attachments'].flatMap(type => parts[type].filter(p => p.id !== 'none').map(p => ({ ...p, id: `${type}-${p.id}`, category: type === 'attachments' ? 'Accessories' : `${type[0].toUpperCase()}${type.slice(1)}s`, partType: type, partId: p.id, color: type === 'lid' ? '#f36f60' : type === 'base' ? '#007d87' : '#f6e9ce' }))),
];
