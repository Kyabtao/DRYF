/* ============ DATA ============ */
/* level: 1=Must-Have, 2=Popular, 3=Premium/Exotic | price = indicative ₹ per 500g (gift = per box) */
const CATS = {
  nuts:     {label:"Dry Fruits & Nuts", emoji:"🌰", img:"images/nuts.jpg", blurb:"The core of every store — badam, kaju, pista, dates & more."},
  berries:  {label:"Berries & Dried Fruits", emoji:"🫐", img:"images/berries.jpg", blurb:"Colourful, healthy & premium — cranberry, kiwi, mango & more."},
  seeds:    {label:"Seeds & Makhana", emoji:"🌻", img:"images/seeds.jpg", blurb:"Superfood seeds for fitness, fasting & daily nutrition."},
  chocolate:{label:"Chocolates", emoji:"🍫", img:"images/chocolate.jpg", blurb:"Bars, truffles, coated nuts & sugar-free delights."},
  snacks:   {label:"Roasted & Masala Snacks", emoji:"🔥", img:"images/snacks.jpg", blurb:"Flavoured, roasted & ready-to-eat snacking range."},
  gifts:    {label:"Gift Hampers & Combos", emoji:"🎁", img:"images/gift.jpg", blurb:"Festive boxes & hampers — your highest-margin shelf."},
};
/* [name, hindi, cat, price, emoji, level, shelfLife, benefit] */
const RAW = [
/* ---- DRY FRUITS & NUTS ---- */
["Almonds California","Badam · बादाम","nuts",620,"🌰",1,"6–9 months","Brain, heart & skin health; the #1 selling nut in India"],
["Almonds Mamra Premium","Mamra Badam · मामरा बादाम","nuts",1450,"💎",3,"6–9 months","Oil-rich Iranian almonds; premium customers ask for it by name"],
["Cashews W240","Kaju W240 · काजू","nuts",780,"🥜",1,"5–6 months","Largest, costliest cashew grade — festive & gift favourite"],
["Cashews W320","Kaju W320 · काजू","nuts",650,"🥜",1,"5–6 months","Everyday bestseller grade for homes, sweets & cooking"],
["Cashew Splits & Pieces","Kaju Tukda · काजू टुकड़ा","nuts",420,"🥜",2,"5–6 months","For gravies, sweets, bakeries & hotels — bulk buyers love it"],
["Pistachios Salted Irani","Namkeen Pista · पिस्ता","nuts",720,"💚",1,"6 months","Roasted salted snacking nut; high repeat purchase"],
["Pistachio Kernels Plain","Pista Giri · पिस्ता गिरी","nuts",1150,"💚",2,"6 months","Shell-less kernels for sweets, kulfi, bakery & garnishing"],
["Walnuts Kashmiri Kernels","Akhrot Giri · अखरोट","nuts",690,"🧠",1,"4–6 months","Omega-3 rich brain food; strong winter demand"],
["Walnuts in Shell Chile","Sabut Akhrot · अखरोट","nuts",480,"🧠",2,"6–9 months","Whole walnuts — long shelf life, puja & winter sales"],
["Golden Raisins","Sunahri Kishmish · किशमिश","nuts",260,"🍇",1,"6–9 months","Daily-use raisin for homes, sweets, poha & kids' tiffins"],
["Black Raisins Seedless","Kali Kishmish · काली किशमिश","nuts",340,"🍇",2,"6 months","Iron-rich; popular with women & health-conscious buyers"],
["Green Long Raisins","Lambi Hari Kishmish · किशमिश","nuts",310,"🍇",2,"6 months","Long Sangli-style raisins; great look in biryani & mixes"],
["Dried Figs (Anjeer)","Anjeer · अंजीर","nuts",850,"🍈",1,"4–6 months","Fibre-rich premium fruit; soaked-anjeer morning ritual trend"],
["Medjool Dates Jumbo","Medjool Khajoor · खजूर","nuts",950,"🌴",2,"6–12 months","King of dates — big, soft, caramel-sweet; premium gifting"],
["Ajwa Dates","Ajwa Khajoor · अजवा खजूर","nuts",1600,"🕌",3,"6–12 months","Madinah's famous dates; deep religious & premium demand"],
["Kimia / Soft Dates","Kimia Khajoor · खजूर","nuts",290,"🌴",1,"6 months","Soft, sweet everyday dates — Ramzan & daily energy"],
["Dried Apricots Turkish","Khubani · खुबानी","nuts",560,"🍑",2,"6 months","Bright orange apricots for snacking, desserts & mixes"],
["Hazelnuts","Hazelnut · हेज़लनट","nuts",890,"🌰",3,"6 months","For chocolate lovers, coffee shops & premium baking"],
["Macadamia Nuts","Macadamia · मैकाडामिया","nuts",1750,"🤍",3,"4–6 months","Buttery luxury nut; small quantity, very high margin"],
["Pine Nuts (Chilgoza)","Chilgoza · चिलगोज़ा","nuts",2900,"🌲",3,"3–4 months","Winter delicacy with cult demand — stock in season"],
["Pecan Nuts","Pecan · पेकन","nuts",1250,"🥧",3,"6 months","For pies, pralines & premium health customers"],
["Brazil Nuts","Brazil Nut · ब्राज़ील नट","nuts",1150,"🌎",3,"4–6 months","Selenium superfood — just 1–2 a day; fitness favourite"],
/* ---- BERRIES & DRIED FRUITS ---- */
["Dried Cranberries","Cranberry · क्रैनबेरी","berries",430,"🔴",2,"9–12 months","Tart-sweet berry for baking, salads & healthy snacking"],
["Dried Blueberries","Blueberry · ब्लूबेरी","berries",980,"🫐",2,"9–12 months","Antioxidant star; premium breakfast & baking demand"],
["Dried Strawberries","Strawberry · स्ट्रॉबेरी","berries",520,"🍓",2,"6–9 months","Kids love it — tiffin, trail mixes & gifting colour"],
["Dried Kiwi Slices","Kiwi · कीवी","berries",360,"🥝",2,"6–9 months","Tangy green slices; eye-catching in mixes & hampers"],
["Dried Mango Slices","Aam Papad style · आम","berries",390,"🥭",2,"6–9 months","India's favourite fruit, all year round"],
["Dried Pineapple","Ananas · अनानास","berries",330,"🍍",2,"6–9 months","Sweet rings/chunks for snacking & cake decoration"],
["Dried Papaya","Papita · पपीता","berries",240,"🧡",2,"6 months","Budget dried fruit for mixes, Tutti-Frutti & sweets"],
["Prunes (Dried Plums)","Sukha Aloo Bukhara · प्रून","berries",480,"🍑",2,"9–12 months","Famous for digestion; strong demand from seniors"],
["Dried Cherries","Cherry · चेरी","berries",720,"🍒",3,"9 months","Premium baking & chocolate-pairing fruit"],
["Goji Berries","Goji · गोजी बेरी","berries",890,"❤️",3,"9–12 months","Himalayan superfood for teas, smoothies & fitness"],
["Sweet Amla Candy","Amla Candy · आंवला कैंडी","berries",210,"💚",1,"6 months","Vitamin-C candy; ayurvedic shops & kids both buy it"],
["Dried Orange Slices","Santra · संतरा","berries",340,"🍊",3,"6–9 months","Pretty garnish for drinks, cakes & gift boxes"],
["Blackcurrants","Kala Kishmish Berry · ब्लैककरंट","berries",610,"🖤",3,"9 months","Deep-flavour berry for ice-creams & baking"],
["Dried Mulberries","Shahtoot · शहतूत","berries",540,"🍇",3,"6 months","Soft, honey-sweet superfruit; growing urban demand"],
["Dried Coconut Slices","Sukha Nariyal · नारियल","berries",230,"🥥",2,"4–6 months","For cooking, prasad, mixes & South-Indian homes"],
["Dried Guava","Amrood · अमरूद","berries",300,"🍈",3,"6 months","Chewy tangy snack; different item to stand out"],
/* ---- SEEDS & MAKHANA ---- */
["Pumpkin Seeds","Kaddu ke Beej · पम्पकिन सीड","seeds",380,"🎃",1,"6–9 months","Protein & zinc-rich green seeds; #1 selling seed"],
["Sunflower Seeds","Surajmukhi Beej · सूरजमुखी","seeds",220,"🌻",1,"6 months","Budget healthy snack; salads & bird-to-bowl demand"],
["Watermelon Seeds (Magaj)","Tarbuj Magaj · तरबूज मगज","seeds",420,"🍉",1,"6 months","Essential for gravies, sweets & restaurant kitchens"],
["Muskmelon Seeds (Magaj)","Kharbooj Magaj · खरबूज मगज","seeds",390,"🍈",1,"6 months","Char-magaj base for rich curries & thandai"],
["Chia Seeds","Chia · चिया सीड","seeds",260,"⚫",1,"12 months","Weight-loss & smoothie star; huge online demand"],
["Flax Seeds (Alsi)","Alsi · अलसी","seeds",140,"🌾",1,"6–9 months","Omega-3 budget superfood; also sell roasted version"],
["Basil Seeds (Sabja)","Sabja / Tulsi Beej · सब्जा","seeds",240,"💧",1,"12 months","Falooda & summer drinks essential; swells in water"],
["Sesame Seeds White","Safed Til · सफ़ेद तिल","seeds",190,"⚪",1,"6 months","Winter laddoo, chikki & cooking staple"],
["Sesame Seeds Black","Kala Til · काला तिल","seeds",210,"⚫",2,"6 months","Puja, winter sweets & Korean/Japanese cooking"],
["Quinoa","Quinoa · क्विनोआ","seeds",330,"🌾",2,"12 months","High-protein grain for fitness & diabetic customers"],
["Poppy Seeds (Khus Khus)","Khus Khus · खसखस","seeds",980,"🤍",2,"4–6 months","Premium cooking seed for gravies & desserts"],
["Hemp Seeds","Bhang Beej (food grade) · हेम्प","seeds",750,"🌿",3,"6 months","Trendy plant-protein seed for urban health buyers"],
["Fox Nuts Raw (Makhana)","Makhana · मखाना","seeds",520,"⚪",1,"6 months","Vrat/fasting favourite; roast it in-store for margin"],
["Char Magaj Mix","Char Magaj · चार मगज","seeds",410,"🥄",2,"6 months","4-seed melon mix — mithai & hotel bulk demand"],
["Roasted Seed Mix","Bhuna Beej Mix · सीड मिक्स","seeds",360,"🥗",2,"4–6 months","Ready-to-eat pumpkin+sunflower+flax for salads"],
["Moringa Seeds","Sahjan Beej · मोरिंगा","seeds",300,"🌱",3,"9 months","Ayurvedic niche; herbal & wellness customers"],
/* ---- CHOCOLATES ---- */
["Dark Chocolate 85%","Bitter Dark · डार्क चॉकलेट","chocolate",340,"🍫",2,"9–12 months","For serious dark lovers & sugar-conscious buyers"],
["Dark Chocolate 70%","Dark 70% · डार्क चॉकलेट","chocolate",290,"🍫",1,"9–12 months","The most gifted & most re-ordered dark bar"],
["Dark Chocolate 55%","Mild Dark · डार्क चॉकलेट","chocolate",240,"🍫",1,"9–12 months","Entry dark chocolate — easy first upgrade from milk"],
["Milk Chocolate Bar","Doodh Chocolate · मिल्क चॉकलेट","chocolate",190,"🥛",1,"9 months","All-time family & kids favourite"],
["White Chocolate","White Chocolate · व्हाइट चॉकलेट","chocolate",230,"🤍",2,"9 months","Creamy sweet bars, baking & festive gifting"],
["Hazelnut Chocolate","Hazelnut Bar · हेज़लनट चॉकलेट","chocolate",310,"🌰",2,"9 months","Premium nutty bar; coffee-shop pairing star"],
["Roasted Almond Chocolate","Badam Chocolate · बादाम चॉकलेट","chocolate",330,"🌰",1,"9 months","Your own dry-fruit + chocolate crossover hero"],
["Sugar-Free Dark Chocolate","Sugar-Free · शुगर-फ्री","chocolate",360,"💪",2,"9–12 months","Diabetic & keto customers actively search for this"],
["Choco-Coated Almonds","Choco Badam · चॉकलेट बादाम","chocolate",450,"🍬",1,"6 months","Bite-size luxury; best impulse buy at billing counter"],
["Choco-Coated Cashews","Choco Kaju · चॉकलेट काजू","chocolate",470,"🍬",2,"6 months","Creamy cashew in chocolate — gift-box favourite"],
["Choco-Coated Raisins","Choco Kishmish · चॉकलेट किशमिश","chocolate",320,"🍬",2,"6 months","Kids' pocket packs & movie-time snack"],
["Chocolate Dates","Choco Khajoor · चॉकलेट खजूर","chocolate",650,"🌴",2,"6 months","Date + nut + chocolate; Ramzan & wedding premium item"],
["Assorted Truffles","Truffles · ट्रफ़ल","chocolate",780,"✨",3,"3–6 months","Luxury melt-in-mouth balls for celebrations"],
["Nut Pralines","Praline · प्रालीन","chocolate",690,"✨",3,"3–6 months","Crunchy caramelised nut chocolates; gift staple"],
["Centre-Filled Chocolates","Filled Chocolate · भरी चॉकलेट","chocolate",380,"💝",2,"6–9 months","Caramel, coffee & fruit fillings — festive demand"],
["Chocolate Coins & Gems style","Coins · चॉकलेट सिक्के","chocolate",260,"🪙",2,"9 months","Kids, birthdays, return gifts & puja prasad"],
["Dark Choco Chips","Choco Chips · चॉकलेट चिप्स","chocolate",240,"🍪",2,"9–12 months","Home bakers & cafes buy this every month"],
["Cooking / Compound Chocolate","Baking Chocolate · कुकिंग चॉकलेट","chocolate",210,"👩‍🍳",2,"9–12 months","For home bakers, brownies, cakes — repeat B2B buyers"],
["Hot Chocolate Premix","Hot Chocolate · हॉट चॉकलेट","chocolate",350,"☕",3,"9 months","Winter cafe-style drink at home; cosy-season seller"],
["Couverture Chocolate Callets","Couverture · कुवर्चर","chocolate",520,"🎂",3,"9–12 months","Real-cocoa-butter baking chocolate for pros"],
/* ---- ROASTED & MASALA SNACKS ---- */
["Peri Peri Almonds","Peri Peri Badam · पेरी पेरी बादाम","snacks",640,"🔥",2,"4–6 months","Spicy roasted almonds; young snackers' favourite"],
["Smoked Almonds","Smoked Badam · स्मोक्ड बादाम","snacks",660,"🔥",3,"4–6 months","Premium smoky flavour — party & bar snack"],
["Masala Cashews","Masala Kaju · मसाला काजू","snacks",690,"🌶️",1,"4–6 months","Chaat-masala cashews; tea-time bestseller"],
["Black Pepper Cashews","Kali Mirch Kaju · काली मिर्च काजू","snacks",690,"🌶️",2,"4–6 months","Mild-spicy premium flavour for gifting & travel"],
["Roasted Salted Makhana","Namkeen Makhana · मखाना","snacks",290,"🍿",1,"3–4 months","Light guilt-free snack; office & travel packs"],
["Peri Peri Makhana","Peri Peri Makhana · मखाना","snacks",300,"🍿",2,"3–4 months","Flavoured makhana outsells plain in cities"],
["Cheese / Tangy Makhana","Cheese Makhana · मखाना","snacks",310,"🧀",2,"3–4 months","Kids & cheese lovers; try 3–4 flavours of makhana"],
["Classic Trail Mix","Trail Mix · ट्रेल मिक्स","snacks",480,"🥾",1,"4–6 months","Nuts+seeds+raisins; gym & office snacking hero"],
["Berry Trail Mix","Berry Mix · बेरी मिक्स","snacks",560,"🫐",2,"4–6 months","Colourful premium mix — looks great in jars"],
["Panchmeva Mix","Panchmeva · पंचमेवा","snacks",520,"🙏",1,"6 months","5-in-1 prasad/vrat mix; Navratri & puja demand"],
["Daily Dry Fruit Mix","Roz ka Mix · डेली मिक्स","snacks",450,"🥣",1,"4–6 months","Pre-mixed daily health pack for families"],
["Honey Roasted Nuts","Shahad Nuts · हनी नट्स","snacks",580,"🍯",3,"4 months","Sweet-crunchy premium snack & gifting item"],
["Spicy Trail Mix (Indian Masala)","Masala Trail Mix · मसाला मिक्स","snacks",460,"🌶️",2,"4 months","Indian-spice version of trail mix; evening snack"],
["Protein Seed & Nut Mix","Protein Mix · प्रोटीन मिक्स","snacks",540,"💪",2,"4 months","For gym-goers; label the protein on the pack"],
/* ---- GIFT HAMPERS & COMBOS ---- */
["Essential Dry Fruit Box 500g","Gift Box · गिफ्ट बॉक्स","gifts",699,"🎁",1,"— (pack fresh)","4–5 daily nuts in a ready box; walk-in gifting"],
["Premium Dry Fruit Box 1kg","Premium Box · प्रीमियम बॉक्स","gifts",1499,"🎁",1,"— (pack fresh)","Diwali & wedding bestseller; keep ready Oct–Nov"],
["Luxury Wedding Hamper","Shaadi Hamper · शादी हैम्पर","gifts",2999,"💍",3,"— (pack fresh)","Premium nuts, berries & chocolates in decor tray"],
["Corporate Gift Hamper","Corporate Hamper · कॉर्पोरेट गिफ्ट","gifts",1999,"🏢",2,"— (pack fresh)","Bulk orders from offices — highest profit orders"],
["Chocolate Celebration Box","Choco Box · चॉकलेट बॉक्स","gifts",899,"🍫",2,"3–6 months","Truffles & coated nuts for birthdays & Diwali"],
["Berry Blast Gift Box","Berry Box · बेरी बॉक्स","gifts",1099,"🫐",3,"6–9 months","Imported berries box for health-gifting trend"],
["Stuffed Medjool Dates Box","Bhara Khajoor · भरा खजूर","gifts",1199,"🌴",3,"3 months","Dates stuffed with nuts & chocolate; luxury item"],
["Dry Fruit Laddoo (Sugar-Free)","Mewa Laddoo · मेवा लड्डू","gifts",640,"🍡",2,"1–2 months","No-sugar festive sweet; make/buy fresh weekly"],
["Sugar-Free Healthy Hamper","Sugar-Free Hamper · शुगर-फ्री हैम्पर","gifts",1599,"💚",2,"— (pack fresh)","For diabetic elders — thoughtful, fast-growing niche"],
["Festival Mithaas Hamper","Festive Hamper · त्योहार हैम्पर","gifts",2499,"🪔",2,"— (pack fresh)","Your Diwali showpiece — display it at the entrance"],
];

const LEVEL_TXT = {1:"⭐ Must-Have",2:"🔥 Popular",3:"💎 Premium / Exotic"};
const CAT_IMG_POS = ["center","top","bottom","left","right"];

const products = RAW.map((r,i)=>({id:i, name:r[0], hindi:r[1], cat:r[2], price:r[3], emoji:r[4], level:r[5], shelf:r[6], benefit:r[7],
  rating:(4.2 + ((i*7)%9)/10).toFixed(1),
  badge: r[5]===1 ? "Bestseller" : r[5]===3 ? "Premium" : (i%5===0 ? "New" : ""),
  img: CATS[r[2]].img, pos: CAT_IMG_POS[i%CAT_IMG_POS.length] }));

/* ============ STATE ============ */
let activeCat = "all", query = "", sortBy = "popular", levelFilter = "all";
let myList = new Set(JSON.parse(localStorage.getItem("dryf-list")||"[]"));
const $ = s => document.querySelector(s);
const grid = $("#productGrid");

function saveList(){ localStorage.setItem("dryf-list", JSON.stringify([...myList])); updateCounts(); }
function fmt(n){ return "₹" + n.toLocaleString("en-IN"); }
function stars(r){ const f=Math.round(r); return "★".repeat(f)+"☆".repeat(5-f); }

function toast(msg){ const t=$("#toast"); t.textContent=msg; t.classList.add("show"); clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove("show"),2400); }

/* ============ MARQUEE + CATEGORIES ============ */
(function(){
  const items = products.slice(0,28).map(p=>`<span>${p.emoji} ${p.name}</span>`).join("<span>✦</span>");
  $("#marqueeTrack").innerHTML = items + "<span>✦</span>" + items;
  $("#catGrid").innerHTML = Object.entries(CATS).map(([k,c])=>{
    const n = products.filter(p=>p.cat===k).length;
    const must = products.filter(p=>p.cat===k && p.level===1).length;
    return `<button class="cat-card reveal" data-cat="${k}">
      <img src="${c.img}" alt="${c.label}" loading="lazy">
      <div><h3>${c.emoji} ${c.label}</h3><p>${c.blurb}</p><b>${n} items · ${must} must-haves →</b></div></button>`;
  }).join("");
  document.querySelectorAll(".cat-card").forEach(b=>b.addEventListener("click",()=>{
    setCat(b.dataset.cat); document.querySelector("#catalogue").scrollIntoView({behavior:"smooth"});
  }));
})();

/* ============ PILLS ============ */
function renderPills(){
  const counts = {all: products.length};
  Object.keys(CATS).forEach(k=>counts[k]=products.filter(p=>p.cat===k).length);
  $("#pillRow").innerHTML =
    `<button class="pill ${activeCat==='all'?'active':''}" data-cat="all">✨ All Items <small>${counts.all}</small></button>` +
    Object.entries(CATS).map(([k,c])=>`<button class="pill ${activeCat===k?'active':''}" data-cat="${k}">${c.emoji} ${c.label} <small>${counts[k]}</small></button>`).join("");
  document.querySelectorAll(".pill").forEach(p=>p.addEventListener("click",()=>setCat(p.dataset.cat)));
}
function setCat(k){ activeCat=k; renderPills(); render(); }

/* ============ RENDER GRID ============ */
function filtered(){
  let list = products.filter(p =>
    (activeCat==="all" || p.cat===activeCat) &&
    (levelFilter==="all" || (levelFilter==="3" ? p.level===3 : p.level <= +levelFilter)) &&
    (p.name+" "+p.hindi+" "+CATS[p.cat].label).toLowerCase().includes(query)
  );
  if(sortBy==="price-low") list.sort((a,b)=>a.price-b.price);
  else if(sortBy==="price-high") list.sort((a,b)=>b.price-a.price);
  else if(sortBy==="az") list.sort((a,b)=>a.name.localeCompare(b.name));
  else if(sortBy==="rating") list.sort((a,b)=>b.rating-a.rating);
  else list.sort((a,b)=>a.level-b.level || b.rating-a.rating);
  return list;
}
function render(){
  const list = filtered();
  $("#resultLine").innerHTML = `Showing <b>${list.length}</b> of ${products.length} items ${activeCat!=="all" ? "in <b>"+CATS[activeCat].label+"</b>" : ""} ${query ? `for “<b>${query}</b>”` : ""} · <b>${myList.size}</b> in My Store List`;
  $("#emptyState").hidden = list.length>0;
  grid.innerHTML = list.map((p,i)=>`
  <article class="card" style="animation-delay:${Math.min(i*35,420)}ms">
    <div class="card-media" data-open="${p.id}">
      <img src="${p.img}" alt="${p.name}" loading="lazy" style="object-position:${p.pos}">
      ${p.badge?`<span class="badge ${p.badge==='Premium'?'premium':p.badge==='New'?'new':''}">${p.badge}</span>`:""}
      <span class="lvl">${LEVEL_TXT[p.level]}</span>
      <span class="card-emoji">${p.emoji}</span>
    </div>
    <div class="card-body">
      <h3 data-open="${p.id}">${p.name}</h3>
      <p class="hindi">${p.hindi}</p>
      <p class="desc">${p.benefit}</p>
      <div class="meta">
        <span class="price">${fmt(p.price)} <small>/ ${p.cat==='gifts'?'box':'500g'}</small></span>
        <span class="stars" title="${p.rating}/5">${stars(p.rating)} ${p.rating}</span>
      </div>
      <div class="card-actions">
        <button class="add-btn ${myList.has(p.id)?'added':''}" data-add="${p.id}">${myList.has(p.id)?'✓ In My List':'＋ My List'}</button>
        <button class="details-btn" data-open="${p.id}">Details</button>
      </div>
    </div>
  </article>`).join("");
  bindCards();
}
function bindCards(){
  document.querySelectorAll("[data-add]").forEach(b=>b.addEventListener("click",()=>{
    const id=+b.dataset.add;
    if(myList.has(id)){ myList.delete(id); toast("Removed: "+products[id].name); }
    else { myList.add(id); toast("✓ Added to My Store List: "+products[id].name); }
    saveList(); render();
  }));
  document.querySelectorAll("[data-open]").forEach(el=>el.addEventListener("click",()=>openModal(+el.dataset.open)));
}

/* ============ MODAL ============ */
let modalId = null;
function openModal(id){
  const p = products[id]; modalId = id;
  $("#modalImg").src = p.img; $("#modalEmoji").textContent = p.emoji;
  $("#modalBadge").textContent = (p.badge||CATS[p.cat].label); $("#modalBadge").style.position="static";
  $("#modalName").textContent = p.name; $("#modalHindi").textContent = p.hindi + " · " + CATS[p.cat].label;
  $("#modalDesc").textContent = p.benefit + ". A proven item for any dry fruits store — keep it in attractive airtight jars and offer tasting samples to increase conversion.";
  $("#modalPrice").textContent = fmt(p.price) + (p.cat==='gifts' ? " / box" : " / 500g");
  $("#modalShelf").textContent = p.shelf; $("#modalRating").textContent = "★ " + p.rating + " / 5";
  $("#modalLevel").textContent = LEVEL_TXT[p.level];
  $("#modalTip").textContent = "💡 Store tip: " + (p.level===1 ? "Never let this go out of stock — it's a daily seller. Keep 250g ready packs near billing." :
    p.level===2 ? "Stock moderate quantity and push it with combos, free tasting and festive offers." :
    "Keep small display quantity, sell on order / festive demand. High margin, slow rotation — don't overstock.");
  const btn = $("#modalAdd");
  btn.textContent = myList.has(id) ? "✓ In My Store List — tap to remove" : "＋ Add to My Store List";
  btn.onclick = ()=>{ myList.has(id)?myList.delete(id):myList.add(id); saveList(); openModal(id); render(); };
  $("#modalWrap").hidden = false;
}
$("#closeModal").addEventListener("click",()=>$("#modalWrap").hidden=true);
$("#modalWrap").addEventListener("click",e=>{ if(e.target.id==="modalWrap") $("#modalWrap").hidden=true; });

/* ============ DRAWER (MY STORE LIST) ============ */
const drawer = $("#drawer"), overlay = $("#overlay");
function openDrawer(){ renderDrawer(); drawer.classList.add("open"); overlay.hidden=false; drawer.setAttribute("aria-hidden","false"); }
function closeDrawer(){ drawer.classList.remove("open"); overlay.hidden=true; drawer.setAttribute("aria-hidden","true"); }
["openDrawerTop","openDrawerFab"].forEach(id=>document.getElementById(id).addEventListener("click",openDrawer));
$("#closeDrawer").addEventListener("click",closeDrawer);
overlay.addEventListener("click",closeDrawer);

function listTotal(){
  return [...myList].reduce((s,id)=>{ const p=products[id]; return s + (p.cat==='gifts' ? p.price*5 : p.price*4); },0);
}
function renderDrawer(){
  const body = $("#drawerBody");
  $("#drawerSub").textContent = myList.size ? `${myList.size} items selected for your store` : "Items you ticked for your store";
  if(!myList.size){
    body.innerHTML = `<div class="drawer-empty"><div style="font-size:3rem">🧺</div><h3>Your list is empty</h3><p>Go to the catalogue and tap <b>＋ My List</b> on items you want to sell — or add a Starter Pack in one click.</p></div>`;
  } else {
    body.innerHTML = Object.entries(CATS).map(([k,c])=>{
      const items = [...myList].map(id=>products[id]).filter(p=>p.cat===k);
      if(!items.length) return "";
      return `<div class="drawer-group">${c.emoji} ${c.label}</div>` + items.map(p=>
        `<div class="drawer-item"><span>${p.emoji} ${p.name}<br><small style="color:var(--muted)">${fmt(p.price)}${p.cat==='gifts'?'/box':'/500g'}</small></span><button data-remove="${p.id}" title="Remove">✕</button></div>`).join("");
    }).join("");
    body.querySelectorAll("[data-remove]").forEach(b=>b.addEventListener("click",()=>{ myList.delete(+b.dataset.remove); saveList(); renderDrawer(); render(); }));
  }
  $("#totalValue").textContent = fmt(listTotal());
}
function updateCounts(){ $("#countTop").textContent = myList.size; $("#countFab").textContent = myList.size; if(drawer.classList.contains("open")) renderDrawer(); }

$("#clearList").addEventListener("click",()=>{ if(!myList.size) return; myList.clear(); saveList(); renderDrawer(); render(); toast("My Store List cleared"); });

function listText(){
  return [...myList].map(id=>products[id]).map(p=>`${p.emoji} ${p.name} (${p.hindi}) — ${fmt(p.price)}${p.cat==='gifts'?'/box':'/500g'}`).join("\n");
}
$("#copyList").addEventListener("click",async()=>{
  if(!myList.size) return toast("Add some items first!");
  const txt = "MY DRY FRUITS STORE LIST ("+myList.size+" items)\n\n"+listText()+`\n\nEst. opening stock (2kg each): ${fmt(listTotal())}`;
  try{ await navigator.clipboard.writeText(txt); toast("📋 List copied — paste it anywhere!"); }
  catch{ toast("Copy not allowed here — use Download CSV"); }
});
$("#downloadCsv").addEventListener("click",()=>{
  if(!myList.size) return toast("Add some items first!");
  const rows = [["Item","Hindi Name","Category","Indicative Price (Rs)","Unit","Shelf Life","Level"],
    ...[...myList].map(id=>products[id]).map(p=>[p.name,p.hindi,CATS[p.cat].label,p.price,p.cat==='gifts'?"box":"500g",p.shelf,LEVEL_TXT[p.level]])];
  const csv = rows.map(r=>r.map(x=>`"${String(x).replaceAll('"','""')}"`).join(",")).join("\n");
  const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob(["\ufeff"+csv],{type:"text/csv"})); a.download="my-dry-fruits-store-list.csv"; a.click();
  toast("⬇ CSV downloaded");
});
$("#printList").addEventListener("click",()=>{ if(!myList.size) return toast("Add some items first!"); openDrawer(); setTimeout(()=>window.print(),350); });

/* ============ STARTER PACKS ============ */
document.querySelectorAll(".pack-btn").forEach(b=>b.addEventListener("click",()=>{
  const lvl = +b.dataset.pack; let added=0;
  products.forEach(p=>{ if(lvl===3 || p.level<=lvl){ if(!myList.has(p.id)){ myList.add(p.id); added++; } } });
  saveList(); render();
  toast(added ? `🎁 Added ${added} items to My Store List!` : "Those items are already in your list");
  if(added) openDrawer();
}));

/* ============ CONTROLS ============ */
$("#searchInput").addEventListener("input",e=>{ query=e.target.value.trim().toLowerCase(); render(); });
$("#sortSelect").addEventListener("change",e=>{ sortBy=e.target.value; render(); });
$("#levelSelect").addEventListener("change",e=>{ levelFilter=e.target.value; render(); });
$("#clearFilters").addEventListener("click",()=>{ query=""; $("#searchInput").value=""; levelFilter="all"; $("#levelSelect").value="all"; setCat("all"); });

/* ============ ANIMATIONS ============ */
const io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target);} }),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
/* animated counters */
const cio = new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting) return; cio.unobserve(e.target);
  const target=+e.target.dataset.count, t0=performance.now();
  (function tick(t){ const p=Math.min((t-t0)/1200,1); e.target.textContent=Math.round(target*(1-Math.pow(1-p,3))); if(p<1) requestAnimationFrame(tick); })(t0);
}),{threshold:.6});
document.querySelectorAll("[data-count]").forEach(el=>cio.observe(el));
/* re-observe dynamically added category cards */
setTimeout(()=>document.querySelectorAll(".cat-card.reveal").forEach(el=>io.observe(el)),50);
document.addEventListener("keydown",e=>{ if(e.key==="Escape"){ closeDrawer(); $("#modalWrap").hidden=true; } });

/* init */
renderPills(); render(); updateCounts();
