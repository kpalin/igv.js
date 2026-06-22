import { chromium } from 'playwright';
import { readFileSync } from 'fs';
const IGV=readFileSync('vendor/igv.esm.min.js'),OSD=readFileSync('vendor/openseadragon.min.js'),G3=readFileSync('vendor/genomes3.json');
const cors={'access-control-allow-origin':'*'};
async function attempt(n){
  const browser=await chromium.launch();
  const ctx=await browser.newContext({viewport:{width:1700,height:2000}, recordHar:{path:'session.har', mode:'full', content:'embed'}});
  const page=await ctx.newPage();
  await page.route('**/igv@3.8.1/dist/igv.esm.min.js',r=>r.fulfill({contentType:'application/javascript',headers:cors,body:IGV}));
  await page.route('**/openseadragon@5.0/build/openseadragon/openseadragon.min.js',r=>r.fulfill({contentType:'application/javascript',headers:cors,body:OSD}));
  await page.route('**/genomes/genomes3.json',r=>r.fulfill({contentType:'application/json',headers:cors,body:G3}));
  await page.goto('http://localhost:8000/gp5d_1kx_view.html',{waitUntil:'load'});
  let ok=false;
  for(let i=0;i<30;i++){await page.waitForTimeout(4000);
    ok=await page.evaluate(()=>{const x=document.getElementById('igvDivX'),y=document.getElementById('igvDivY');return !!(window.igvX&&window.igvY&&x.shadowRoot&&x.shadowRoot.querySelectorAll('.igv-viewport').length>3&&y.shadowRoot&&y.shadowRoot.querySelectorAll('.igv-viewport').length>3);});
    if(ok)break;}
  await page.waitForTimeout(4000); // let lingering track/tile requests finish & be recorded
  await ctx.close(); await browser.close();
  console.log(`attempt ${n}: ok=${ok}`);
  return ok;
}
let ok=false;
for(let n=1;n<=6 && !ok;n++){ ok=await attempt(n); }
console.log(ok?'HAR COMPLETE':'HAR still incomplete');
