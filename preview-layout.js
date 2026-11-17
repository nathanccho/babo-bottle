// Keep a fixed product centerline and floor. Small parts keep their real size;
// only stacks taller than the stage need the camera to pull back.
export function previewLayout({width, height, bounds, bottom}) {
  const w=Math.max(120,width),h=Math.max(64,height);
  const normalScale=Math.min((w-32)/232,(h-28)/270,1.8);
  const floor=Number.isFinite(bottom)?bottom:bounds.y+bounds.height;
  const top=Math.min(bounds.y-14,floor-270);
  const halfWidth=Math.max(116,120-bounds.x+12,bounds.x+bounds.width-120+12);
  const scale=Math.max(.05,Math.min(normalScale,(w-24)/(halfWidth*2),(h-42)/(floor-top)));
  const viewWidth=w/scale,viewHeight=h/scale;
  const y=floor-(h-28)/scale;
  return {viewBox:`${120-viewWidth/2} ${y} ${viewWidth} ${viewHeight}`,scale,floor};
}
