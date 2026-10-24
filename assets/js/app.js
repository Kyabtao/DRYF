import { CATS, products, LEVEL_TXT, packPrice, packMRP, PACKS_FOR } from './data/products.js';

/* ============ STATE ============ */
let activeCat = "all", query = "", sortBy = "popular", levelFilter = "all";
let myList = new Set(JSON.parse(localStorage.getItem("dryf-list")||"[]"));
/* cart: key = `${id}|${pack}` -> qty */
let cart = JSON.parse(localStorage.getItem("dryf-cart")||"{}");
let wishlist = new Set(JSON.parse(localStorage.getItem("dryf-wish")||"[]"));
let orders = JSON.parse(localStorage.getItem("dryf-orders")||"[]");
let coupon = null, langHindi = localStorage.getItem("dryf-lang")==="hi";
const COUPONS = {
  DRYF10:{desc:"10% OFF applied 🎉", calc:(sub)=>Math.round(sub*0.10)},
  FESTIVE15:{desc:"15% OFF above ₹1,999 applied 🎉", calc:(sub)=> sub>=1999?Math.round(sub*0.15):0},
  FIRSTBUY:{desc:"₹100 OFF above ₹799 applied 🎉", calc:(sub)=> sub>=799?100:0},
  FREESHIP:{desc:"Free delivery applied 🚚", calc:()=>0, freeShip:true},
};
const $ = s => document.querySelector(s);
const grid = $("#productGrid");
function saveCart(){ localStorage.setItem("dryf-cart", JSON.stringify(cart)); updateCounts(); }
function saveWish(){ localStorage.setItem("dryf-wish", JSON.stringify([...wishlist])); updateCounts(); }
function cartEntries(){ return Object.entries(cart).map(([k,qty])=>{ const [id,pack]=k.split("|"); const p=products[+id]; return {key:k,p,pack,qty,price:packPrice(p,pack),mrp:packMRP(p,pack)}; }).filter(e=>e.p&&e.qty>0); }
function cartCount(){ return cartEntries().reduce((s,e)=>s+e.qty,0); }
function cartSubtotal(){ return cartEntries().reduce((s,e)=>s+e.price*e.qty,0); }
function cartMRPTotal(){ return cartEntries().reduce((s,e)=>s+e.mrp*e.qty,0); }
function displayName(p){ return langHindi && p.deva ? p.deva : p.name; }
function subName(p){ return langHindi && p.deva ? `${p.name} · ${p.translit}` : `${p.translit} · ${p.deva}`; }
function addToCart(id, pack, qty=1, silent=false){
  pack = pack || (PACKS_FOR(products[id])[1] || PACKS_FOR(products[id])[0]);
  const key = id+"|"+pack;
  cart[key]=(cart[key]||0)+qty; if(cart[key]<=0) delete cart[key];
  saveCart(); renderCart();
  if(!silent) toast(`🛒 Added: ${products[id].name} (${pack})`);
}

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
      <div><h3>${c.emoji} ${c.label}</h3><p>${c.blurb}</p><b>${n} items · ${must} bestsellers → Shop now</b></div></button>`;
  }).join("");
  /* Deals of the day: biggest discounts */
  const deals = [...products].sort((a,b)=>b.off-a.off).slice(0,10);
  $("#dealRow").innerHTML = deals.map(p=>`
    <article class="deal-card">
      <img src="${p.stockImg}" onerror="this.onerror=null;this.src='${p.img}'" alt="${p.name}" loading="lazy" referrerpolicy="no-referrer" style="object-position:${p.pos}">
      <div><span class="deal-off">${p.off}% OFF</span>
      <h4>${p.emoji} ${displayName(p)}</h4>
      <p class="hindi">${subName(p)}</p>
      <p><b>${fmt(packPrice(p,"500g"))}</b> <span class="mrp">${fmt(packMRP(p,"500g"))}</span> <small>/ 500g</small></p>
      <button class="add-btn" data-deal="${p.id}" style="margin-top:.5rem;width:100%">🛒 Add 500g to Cart</button></div>
    </article>`).join("");
  document.querySelectorAll("[data-deal]").forEach(b=>b.addEventListener("click",()=>addToCart(+b.dataset.deal,"500g",1)));
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
  else if(sortBy==="discount") list.sort((a,b)=>b.off-a.off);
  else if(sortBy==="az") list.sort((a,b)=>a.name.localeCompare(b.name));
  else if(sortBy==="rating") list.sort((a,b)=>b.rating-a.rating);
  else list.sort((a,b)=>a.level-b.level || b.rating-a.rating);
  return list;
}
function render(){
  const list = filtered();
  $("#resultLine").innerHTML = `Showing <b>${list.length}</b> of ${products.length} products ${activeCat!=="all" ? "in <b>"+CATS[activeCat].label+"</b>" : ""} ${query ? `for “<b>${query}</b>”` : ""} · 🛒 <b>${cartCount()}</b> in cart · 🧺 <b>${myList.size}</b> in Store List`;
  $("#emptyState").hidden = list.length>0;
  grid.innerHTML = list.map((p,i)=>{
    const defPack = PACKS_FOR(p)[1] || PACKS_FOR(p)[0];
    return `
  <article class="card" style="animation-delay:${Math.min(i*35,420)}ms">
    <button class="wish-btn ${wishlist.has(p.id)?'active':''}" data-wish="${p.id}" title="Wishlist">${wishlist.has(p.id)?'❤️':'🤍'}</button>
    <div class="card-media" data-open="${p.id}">
      <img src="${p.stockImg}" onerror="this.onerror=null;this.src='${p.img}'" alt="${p.name}" loading="lazy" referrerpolicy="no-referrer" style="object-position:${p.pos}">
      ${p.badge?`<span class="badge ${p.badge==='Premium'?'premium':p.badge==='New'?'new':''}">${p.badge}</span>`:""}
      <span class="off-tag">${p.off}% OFF</span>
      <span class="lvl">${LEVEL_TXT[p.level]}</span>
      <span class="card-emoji">${p.emoji}</span>
    </div>
    <div class="card-body">
      <h3 data-open="${p.id}">${p.emoji} ${displayName(p)}</h3>
      <p class="hindi">${subName(p)}</p>
      <p class="desc">${p.benefit}</p>
      <span class="stock ${p.stock!=='In Stock'?'low':''}">${p.stock==='In Stock'?'● In Stock':'● '+p.stock}</span>
      <div class="meta">
        <span class="price">${fmt(packPrice(p,defPack))} <span class="mrp">${fmt(packMRP(p,defPack))}</span> <small>/ ${defPack}</small></span>
        <span class="stars" title="${p.rating}/5">${stars(p.rating)} ${p.rating}</span>
      </div>
      <select class="pack-select" data-packsel="${p.id}" aria-label="Pack size">
        ${PACKS_FOR(p).map(pk=>`<option value="${pk}" ${pk===defPack?'selected':''}>${pk} — ${fmt(packPrice(p,pk))}</option>`).join("")}
      </select>
      <div class="card-actions">
        <button class="cart-btn" data-cart="${p.id}">🛒 Add to Cart</button>
        <button class="details-btn" data-open="${p.id}">Details</button>
      </div>
      <div class="mini-actions">
        <button data-add="${p.id}" class="${myList.has(p.id)?'added':''}">${myList.has(p.id)?'✓ Store List':'🧺 Store List'}</button>
        <button data-buy="${p.id}">⚡ Buy Now</button>
      </div>
    </div>
  </article>`;}).join("");
  bindCards();
}
function bindCards(){
  document.querySelectorAll("[data-add]").forEach(b=>b.addEventListener("click",()=>{
    const id=+b.dataset.add;
    if(myList.has(id)){ myList.delete(id); toast("Removed from Store List: "+products[id].name); }
    else { myList.add(id); toast("🧺 Added to Store List: "+products[id].name); }
    saveList(); render();
  }));
  document.querySelectorAll("[data-cart]").forEach(b=>b.addEventListener("click",()=>{
    const id=+b.dataset.cart;
    const sel=document.querySelector(`[data-packsel="${id}"]`);
    addToCart(id, sel?sel.value:undefined, 1);
    updateCounts(); render();
  }));
  document.querySelectorAll("[data-buy]").forEach(b=>b.addEventListener("click",()=>{
    const id=+b.dataset.buy;
    const sel=document.querySelector(`[data-packsel="${id}"]`);
    addToCart(id, sel?sel.value:undefined, 1, true);
    openDrawer("cart");
  }));
  document.querySelectorAll("[data-wish]").forEach(b=>b.addEventListener("click",(e)=>{
    e.stopPropagation();
    const id=+b.dataset.wish;
    wishlist.has(id)?wishlist.delete(id):wishlist.add(id);
    saveWish(); render(); toast(wishlist.has(id)?"❤️ Added to wishlist":"Removed from wishlist");
  }));
  document.querySelectorAll("[data-open]").forEach(el=>el.addEventListener("click",()=>openModal(+el.dataset.open)));
}

/* ============ MODAL ============ */
let modalId = null, modalPack = "500g", modalQty = 1;
function openModal(id){
  const p = products[id]; modalId = id; modalQty = 1;
  modalPack = PACKS_FOR(p)[1] || PACKS_FOR(p)[0];
  $("#modalImg").onerror=function(){this.onerror=null;this.src=p.img;}; $("#modalImg").src = p.stockImg; $("#modalEmoji").textContent = p.emoji;
  $("#modalBadge").textContent = (p.badge||CATS[p.cat].label) + " · " + p.off + "% OFF"; $("#modalBadge").style.position="static";
  $("#modalName").textContent = p.emoji + " " + displayName(p);
  $("#modalHindi").textContent = subName(p) + " · " + CATS[p.cat].label;
  $("#modalDesc").textContent = p.benefit + ". Premium quality, hygienically packed. " + (langHindi ? "शुद्ध, ताज़ा और स्वाद से भरपूर।" : "Pure, fresh and full of taste.");
  $("#modalShelf").textContent = p.shelf; $("#modalRating").textContent = "★ " + p.rating + " / 5";
  $("#modalLevel").textContent = p.stock + " · " + LEVEL_TXT[p.level];
  $("#modalTip").textContent = "💡 " + (p.level===1 ? "Bestseller tip: This sells daily — keep 250g ready packs near billing & offer tasting." :
    p.level===2 ? "Popular choice: Pair it in combos and festive offers to increase basket size." :
    "Premium pick: Small quantity, high margin. Perfect for gifting & special occasions.");
  renderModalPacks();
  const btn = $("#modalAdd");
  btn.textContent = myList.has(id) ? "✓ In Store List — remove" : "🧺 Add to Store List";
  btn.onclick = ()=>{ myList.has(id)?myList.delete(id):myList.add(id); saveList(); openModal(id); render(); };
  const wb = $("#modalWish");
  wb.textContent = wishlist.has(id) ? "❤️ In Wishlist" : "❤️ Wishlist";
  wb.onclick = ()=>{ wishlist.has(id)?wishlist.delete(id):wishlist.add(id); saveWish(); openModal(id); render(); };
  $("#modalWrap").hidden = false;
}
function renderModalPacks(){
  const p = products[modalId];
  $("#modalPacks").innerHTML = PACKS_FOR(p).map(pk=>`<button type="button" class="pack-opt ${pk===modalPack?'active':''}" data-mpack="${pk}">${pk}<small>${fmt(packPrice(p,pk))}</small></button>`).join("");
  document.querySelectorAll("[data-mpack]").forEach(b=>b.addEventListener("click",()=>{ modalPack=b.dataset.mpack; renderModalPacks(); }));
  $("#qtyVal").textContent = modalQty;
  $("#modalPrice").innerHTML = fmt(packPrice(p,modalPack)) + ` <span class="mrp">${fmt(packMRP(p,modalPack))}</span>`;
  $("#qtyTotal").textContent = "= " + fmt(packPrice(p,modalPack)*modalQty);
}
$("#qtyMinus").addEventListener("click",()=>{ modalQty=Math.max(1,modalQty-1); renderModalPacks(); });
$("#qtyPlus").addEventListener("click",()=>{ modalQty=Math.min(20,modalQty+1); renderModalPacks(); });
$("#modalCart").addEventListener("click",()=>{ addToCart(modalId, modalPack, modalQty); $("#modalWrap").hidden=true; openDrawer("cart"); });
$("#modalBuy").addEventListener("click",()=>{ addToCart(modalId, modalPack, modalQty, true); $("#modalWrap").hidden=true; openCheckout(); });
$("#closeModal").addEventListener("click",()=>$("#modalWrap").hidden=true);
$("#modalWrap").addEventListener("click",e=>{ if(e.target.id==="modalWrap") $("#modalWrap").hidden=true; });

/* ============ DRAWER (MY STORE LIST) ============ */
const drawer = $("#drawer"), overlay = $("#overlay");
function showTab(which){
  ["Cart","List","Wish"].forEach(t=>{
    $("#tab"+t).classList.toggle("active", t.toLowerCase()===which);
    $("#panel"+t).hidden = t.toLowerCase()!==which;
  });
  if(which==="cart") renderCart(); if(which==="list") renderDrawer(); if(which==="wish") renderWish();
}
function openDrawer(which="cart"){ showTab(which); drawer.classList.add("open"); overlay.hidden=false; drawer.setAttribute("aria-hidden","false"); }
function closeDrawer(){ drawer.classList.remove("open"); overlay.hidden=true; drawer.setAttribute("aria-hidden","true"); }
$("#cartBtnTop").addEventListener("click",()=>openDrawer("cart"));
$("#cartFab").addEventListener("click",()=>openDrawer("cart"));
$("#storeListBtn").addEventListener("click",()=>openDrawer("list"));
$("#wishlistBtn").addEventListener("click",()=>openDrawer("wish"));
$("#tabCart").addEventListener("click",()=>showTab("cart"));
$("#tabList").addEventListener("click",()=>showTab("list"));
$("#tabWish").addEventListener("click",()=>showTab("wish"));
$("#closeDrawer").addEventListener("click",closeDrawer);
overlay.addEventListener("click",closeDrawer);

/* ---- CART PANEL ---- */
function billCalc(){
  const sub = cartSubtotal(), mrp = cartMRPTotal();
  let couponOff = 0, freeShipByCoupon = false;
  if(coupon && COUPONS[coupon]){ couponOff = COUPONS[coupon].calc(sub); freeShipByCoupon = !!COUPONS[coupon].freeShip; }
  const afterCoupon = sub - couponOff;
  const delivery = !cartCount() ? 0 : (afterCoupon>=999 || freeShipByCoupon ? 0 : 49);
  return {sub, mrp, saved:(mrp-sub)+couponOff, couponOff, delivery, total: afterCoupon+delivery, freeShipByCoupon};
}
function renderCart(){
  const body=$("#cartBody"), entries=cartEntries(), bill=billCalc();
  if(!entries.length){
    body.innerHTML=`<div class="drawer-empty"><div style="font-size:3rem">🛒</div><h3>Your cart is empty</h3><p>Add some badam, kaju, chocolates & more!<br>कुछ मेवा कार्ट में डालिए 😊</p></div>`;
  } else {
    body.innerHTML = entries.map(e=>`
      <div class="cart-item">
        <img src="${e.p.stockImg}" onerror="this.onerror=null;this.src='${e.p.img}'" alt="${e.p.name}" referrerpolicy="no-referrer">
        <div><h4>${e.p.emoji} ${displayName(e.p)}</h4><p>${subName(e.p)} · ${e.pack}</p>
          <div class="qty-stepper" style="margin-top:.3rem"><button data-dec="${e.key}">−</button><b>${e.qty}</b><button data-inc="${e.key}">+</button></div>
        </div>
        <div><div class="ci-price">${fmt(e.price*e.qty)}</div><p class="mrp" style="text-align:right">${fmt(e.mrp*e.qty)}</p><button class="ci-remove" data-cremove="${e.key}">Remove ✕</button></div>
      </div>`).join("");
    body.querySelectorAll("[data-inc]").forEach(b=>b.onclick=()=>{ cart[b.dataset.inc]++; saveCart(); renderCart(); render(); });
    body.querySelectorAll("[data-dec]").forEach(b=>b.onclick=()=>{ const k=b.dataset.dec; cart[k]--; if(cart[k]<=0) delete cart[k]; saveCart(); renderCart(); render(); });
    body.querySelectorAll("[data-cremove]").forEach(b=>b.onclick=()=>{ delete cart[b.dataset.cremove]; saveCart(); renderCart(); render(); toast("Removed from cart"); });
  }
  $("#billSubtotal").textContent = fmt(bill.sub);
  $("#billSave").textContent = "− " + fmt(bill.saved);
  $("#couponRow").hidden = !(coupon && bill.couponOff>0 || (coupon && bill.freeShipByCoupon));
  if(coupon){ $("#couponName").textContent = coupon; $("#billCoupon").textContent = bill.freeShipByCoupon && !bill.couponOff ? "Free Delivery" : "− "+fmt(bill.couponOff); }
  $("#billDelivery").textContent = !cartCount() ? "—" : bill.delivery===0 ? "FREE 🎉" : fmt(bill.delivery);
  $("#billTotal").textContent = fmt(bill.total);
  $("#deliveryHint").textContent = bill.delivery===0 && cartCount() ? "(FREE)" : "";
  const pct = Math.min(100, Math.round(cartSubtotal()/999*100));
  $("#freeShipBar").style.width = pct+"%";
  $("#shipNote").textContent = !cartCount() ? "" : bill.delivery===0 ? "🎉 You unlocked FREE delivery!" : `Add ${fmt(999-cartSubtotal())} more for FREE delivery`;
  $("#checkoutBtn").disabled = !cartCount();
  $("#checkoutBtn").style.opacity = cartCount()?1:.5;
  updateCounts(false);
}
$("#applyCoupon").addEventListener("click",()=>{
  const code=$("#couponInput").value.trim().toUpperCase(), bill=billCalc();
  if(!code) return;
  if(!COUPONS[code]){ $("#couponMsg").textContent="❌ Invalid coupon. Try DRYF10"; $("#couponMsg").style.color="#b3402e"; coupon=null; }
  else if(code==="FESTIVE15" && cartSubtotal()<1999){ $("#couponMsg").textContent="⚠️ FESTIVE15 needs orders above ₹1,999"; $("#couponMsg").style.color="#b3402e"; coupon=null; }
  else if(code==="FIRSTBUY" && cartSubtotal()<799){ $("#couponMsg").textContent="⚠️ FIRSTBUY needs orders above ₹799"; $("#couponMsg").style.color="#b3402e"; coupon=null; }
  else { coupon=code; $("#couponMsg").textContent="✅ "+COUPONS[code].desc; $("#couponMsg").style.color=""; }
  renderCart();
});
$("#clearCart").addEventListener("click",()=>{ cart={}; coupon=null; saveCart(); renderCart(); render(); toast("Cart cleared"); });
$("#checkoutBtn").addEventListener("click",()=>openCheckout());

/* ---- WISHLIST PANEL ---- */
function renderWish(){
  const body=$("#wishBody");
  if(!wishlist.size){ body.innerHTML=`<div class="drawer-empty"><div style="font-size:3rem">❤️</div><h3>Wishlist is empty</h3><p>Tap 🤍 on any product to save it here.</p></div>`; return; }
  body.innerHTML=[...wishlist].map(id=>products[id]).map(p=>`
    <div class="cart-item"><img src="${p.stockImg}" onerror="this.onerror=null;this.src='${p.img}'" alt="${p.name}" referrerpolicy="no-referrer">
      <div><h4>${p.emoji} ${displayName(p)}</h4><p>${subName(p)} · from ${fmt(packPrice(p,"250g"))}</p></div>
      <div><button class="btn btn-gold" data-wishcart="${p.id}" style="padding:.45rem .7rem;font-size:.78rem">🛒 Add</button><br><button class="ci-remove" data-wishremove="${p.id}">Remove ✕</button></div>
    </div>`).join("");
  body.querySelectorAll("[data-wishcart]").forEach(b=>b.onclick=()=>{ addToCart(+b.dataset.wishcart,"500g",1); showTab("cart"); });
  body.querySelectorAll("[data-wishremove]").forEach(b=>b.onclick=()=>{ wishlist.delete(+b.dataset.wishremove); saveWish(); renderWish(); render(); });
}

/* ---- CHECKOUT + ORDERS ---- */
function openCheckout(){
  if(!cartCount()) return toast("Your cart is empty!");
  closeDrawer();
  const bill=billCalc();
  $("#coItems").textContent = cartCount()+" items";
  $("#coTotal").textContent = fmt(bill.total) + (bill.delivery===0?" (Free Delivery)":" (incl. delivery)");
  $("#checkoutWrap").hidden=false;
}
$("#closeCheckout").addEventListener("click",()=>$("#checkoutWrap").hidden=true);
$("#checkoutWrap").addEventListener("click",e=>{ if(e.target.id==="checkoutWrap") $("#checkoutWrap").hidden=true; });
$("#checkoutForm").addEventListener("submit",e=>{
  e.preventDefault();
  const phone=$("#coPhone").value.trim(), pin=$("#coPin").value.trim();
  if(!/^\d{10}$/.test(phone)) return toast("⚠️ Enter a valid 10-digit mobile number");
  if(!/^\d{6}$/.test(pin)) return toast("⚠️ Enter a valid 6-digit PIN code");
  const bill=billCalc();
  const order={ id:"DRYF"+Date.now().toString().slice(-8), date:new Date().toLocaleString("en-IN"),
    name:$("#coName").value.trim(), city:$("#coCity").value.trim(), pay:document.querySelector('input[name="pay"]:checked').value,
    items:cartEntries().map(en=>`${en.p.name} (${en.pack}) × ${en.qty}`), total:bill.total, count:cartCount() };
  orders.unshift(order); localStorage.setItem("dryf-orders", JSON.stringify(orders));
  cart={}; coupon=null; saveCart(); renderCart(); render(); renderOrders();
  $("#checkoutWrap").hidden=true;
  $("#orderIdTxt").textContent="#"+order.id;
  $("#successBill").innerHTML=`<div><span>Items</span><b>${order.count}</b></div><div><span>Payment</span><b>${order.pay}</b></div><div class="bill-total"><span>Demo Total</span><b>${fmt(order.total)}</b></div>`;
  $("#successWrap").hidden=false; launchConfetti();
  ["ts2","ts3","ts4"].forEach((id,i)=>{ const el=document.getElementById(id); el.classList.remove("done"); setTimeout(()=>el.classList.add("done"), 900*(i+1)); });
});
function launchConfetti(){
  const box=$("#confetti"); box.innerHTML="";
  const cols=["#e9a13b","#3e7c4f","#b3402e","#6b2d8f","#f2c14e"];
  for(let i=0;i<50;i++){ const s=document.createElement("i"); s.style.left=Math.random()*100+"%"; s.style.background=cols[i%cols.length]; s.style.animationDuration=(1.2+Math.random()*1.4)+"s"; s.style.animationDelay=(Math.random()*.5)+"s"; s.style.transform=`rotate(${Math.random()*180}deg)`; box.appendChild(s); }
}
$("#successContinue").addEventListener("click",()=>{ $("#successWrap").hidden=true; });
$("#successOrders").addEventListener("click",()=>{ $("#successWrap").hidden=true; document.querySelector("#open-store").scrollIntoView({behavior:"smooth"}); });
function renderOrders(){
  const box=$("#myOrdersBox"); if(!orders.length){ box.hidden=true; return; }
  box.hidden=false;
  $("#myOrdersList").innerHTML=orders.map(o=>`<div class="order-card"><div><b>#${o.id}</b> · ${o.date}<br><small>${o.items.join(", ")}</small></div><div><b>${fmt(o.total)}</b><br><small>${o.pay} · ${o.city}</small><br><span class="stock">● Demo: Packed</span></div></div>`).join("");
}

function listTotal(){
  return [...myList].reduce((s,id)=>{ const p=products[id]; return s + (p.cat==='gifts' ? p.price*5 : p.price*4); },0);
}
function renderDrawer(){
  const body = $("#drawerBody");
  const _ds=$("#tabListCount"); if(_ds) _ds.textContent = myList.size;
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
function updateCounts(refreshDrawer=true){
  $("#countTop").textContent = myList.size;
  $("#wishCount").textContent = wishlist.size;
  const cc = cartCount();
  $("#cartCountTop").textContent = cc; $("#cartCountFab").textContent = cc;
  $("#tabCartCount").textContent = cc; $("#tabListCount").textContent = myList.size;
  $("#fabTotal").textContent = fmt(cartSubtotal());
  if(refreshDrawer && drawer.classList.contains("open")){ renderCart(); renderDrawer(); renderWish(); }
}
function saveList(){ localStorage.setItem("dryf-list", JSON.stringify([...myList])); updateCounts(false); }

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

/* ============ COMBO PACKS ============ */
document.querySelectorAll(".pack-btn").forEach(b=>b.addEventListener("click",()=>{
  const lvl = +b.dataset.pack, target=b.dataset.target;
  const items = products.filter(p=> lvl===3 || p.level<=lvl);
  if(target==="cart"){
    /* keep combos demo-friendly: add 250g of first 12 matching items (or 1 box for gifts) */
    const combo = items.slice(0,12);
    combo.forEach(p=>addToCart(p.id, p.cat==="gifts"?"1 Box":"250g", 1, true));
    saveCart(); renderCart(); render();
    toast(`🎁 Combo added: ${combo.length} items (250g each) to cart!`);
    openDrawer("cart");
  } else {
    let added=0;
    items.forEach(p=>{ if(!myList.has(p.id)){ myList.add(p.id); added++; } });
    saveList(); render();
    toast(added ? `🧺 Added ${added} items to Store List!` : "Already in your Store List");
    if(added) openDrawer("list");
  }
}));

/* ============ LANGUAGE TOGGLE (EN / हिंदी) ============ */
function applyLang(){
  $("#langToggle").textContent = langHindi ? "हिंदी / EN" : "अ / EN";
  document.querySelectorAll("[data-count]"); /* no-op keep counters */
  render(); renderCart();
}
$("#langToggle").addEventListener("click",()=>{
  langHindi=!langHindi; localStorage.setItem("dryf-lang", langHindi?"hi":"en");
  applyLang();
  toast(langHindi ? "🇮🇳 हिंदी नाम दिखाए जा रहे हैं" : "🇬🇧 Showing English names");
});

/* ============ DEAL COUNTDOWN (to midnight) ============ */
setInterval(()=>{
  const now=new Date(), end=new Date(); end.setHours(23,59,59,999);
  let s=Math.max(0,Math.floor((end-now)/1000));
  const h=String(Math.floor(s/3600)).padStart(2,"0"), m=String(Math.floor(s%3600/60)).padStart(2,"0"), sec=String(s%60).padStart(2,"0");
  const el=$("#dealTimer"); if(el) el.textContent=`${h}:${m}:${sec}`;
},1000);

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
$("#langToggle").textContent = langHindi ? "हिंदी / EN" : "अ / EN";
renderPills(); render(); renderCart(); renderOrders(); updateCounts(false);
