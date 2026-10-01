const collections=[
{name:"Projects",description:"Selected projects and initiatives documented in the public Rukun record.",type:"Projects",years:["2019","2022","2023","2024"],keywords:["Heritage Commission","AlMashtal","Designathon","Nuqat"],count:"4 records",url:"projects.html"},
{name:"Research",description:"Public research activity, focus-group methods, and knowledge outputs.",type:"Research",years:["2026"],keywords:["Focus groups","Research","Publications","Coding"],count:"1 record",url:"research.html"},
{name:"Programs & Partnerships",description:"International programs, Saudi editions, and continuing institutional relationships.",type:"Programs",years:["2024","2025","2026"],keywords:["Creative Women Forum","Kilmitain","Riyadh","London"],count:"2 records",url:"programs.html"},
{name:"Knowledge Platforms",description:"Rukun-led public knowledge platforms, with canonical archives linked at source.",type:"Platforms",years:["2024","2025","2026"],keywords:["Knowledge of Design","STEAM","Publications"],count:"1 record",url:"platforms.html"},
{name:"Advisory",description:"The Rukun Advisory Circle and documented advisory members.",type:"Advisory",years:["2026"],keywords:["Advisory","Research","Education"],count:"2 records",url:"advisory.html"}
];

const els={
  search:document.querySelector("#search"),type:document.querySelector("#type"),year:document.querySelector("#year"),
  keyword:document.querySelector("#keyword"),list:document.querySelector("#list"),count:document.querySelector("#resultCount"),
  empty:document.querySelector("#empty"),clear:document.querySelector("#clear")
};
const esc=s=>String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
const uniq=a=>[...new Set(a)].sort((x,y)=>x.localeCompare(y));
function addOption(el,v){const o=document.createElement("option");o.value=v;o.textContent=v;el.appendChild(o)}
uniq(collections.map(x=>x.type)).forEach(v=>addOption(els.type,v));
uniq(collections.flatMap(x=>x.years)).sort((a,b)=>b.localeCompare(a)).forEach(v=>addOption(els.year,v));
uniq(collections.flatMap(x=>x.keywords)).forEach(v=>addOption(els.keyword,v));

function render(){
  const q=els.search.value.trim().toLowerCase(),type=els.type.value,year=els.year.value,keyword=els.keyword.value;
  const rows=collections.filter(r=>{
    const hay=[r.name,r.description,r.type,...r.keywords,...r.years].join(" ").toLowerCase();
    return(!q||hay.includes(q))&&(!type||r.type===type)&&(!year||r.years.includes(year))&&(!keyword||r.keywords.includes(keyword));
  });
  els.list.innerHTML=rows.map(r=>'<article class="rukun-resource">'+
    '<h2>'+esc(r.name)+'</h2>'+
    '<p class="rukun-description">'+esc(r.description)+'</p>'+
    '<div class="rukun-taxonomy"><span><strong>'+esc(r.type)+'</strong></span><span>'+esc(r.count)+'</span><span>'+esc(r.keywords.join(" · "))+'</span></div>'+
    '<a class="rukun-visit" href="'+esc(r.url)+'" aria-label="Open '+esc(r.name)+'">↗</a></article>').join("");
  els.count.textContent=rows.length+" of "+collections.length+" collections";
  els.empty.hidden=rows.length!==0;
}
[els.search,els.type,els.year,els.keyword].forEach(el=>el.addEventListener("input",render));
els.clear.addEventListener("click",()=>{els.search.value="";els.type.value="";els.year.value="";els.keyword.value="";render();els.search.focus()});
render();