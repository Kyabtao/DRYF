/**
 * Shared site layout — header, footer, cart drawer and all popups live
 * in ONE place and are mounted into every page. Edit here, it changes
 * on Home, Shop, Categories, Category, Deals, Product and Guide pages.
 */
import { CATS, products } from "./data/products.js";

const NAV = [
  ["home", "index.html", "Home"],
  ["shop", "shop.html", "Shop"],
  ["categories", "categories.html", "Categories"],
  ["deals", "deals.html", "Deals"],
  ["combos", "deals.html#packs", "Combos"],
  ["guide", "guide.html", "Store Guide"],
];

export function mountLayout(page) {
  const counts = {};
  products.forEach(p => { counts[p.cat] = (counts[p.cat] || 0) + 1; });

  document.getElementById("site-header").innerHTML = `
  <div class="announce">🚚 <b>FREE Delivery</b> on orders above ₹999 &nbsp;·&nbsp; 💵 COD Available &nbsp;·&nbsp; 🎟 Use code <b>DRYF10</b> for 10% OFF &nbsp;·&nbsp; <span class="demo-tag">DEMO STORE — no real payment</span></div>
  <header class="nav" id="top">
    <a class="logo" href="index.html"><span class="logo-badge">🌰</span> DRYF<small>Dry Fruits • Seeds • Chocolates</small></a>
    <nav class="nav-links">
      ${NAV.map(([k, href, label]) => `<a href="${href}" class="${page === k || (page === "category" && k === "categories") || (page === "product" && k === "shop") ? "active" : ""}">${label}</a>`).join("")}
    </nav>
    <div class="nav-actions">
      <button class="lang-btn" id="langToggle" title="हिंदी / English">अ / EN</button>
      <button class="btn btn-light nav-btn" id="wishlistBtn">❤️ <span class="count-pill alt" id="wishCount">0</span></button>
      <button class="btn btn-light nav-btn" id="storeListBtn">🧺 List <span class="count-pill alt" id="countTop">0</span></button>
      <button class="btn btn-dark nav-btn" id="cartBtnTop">🛒 Cart <span class="count-pill" id="cartCountTop">0</span></button>
    </div>
  </header>`;

  document.getElementById("site-footer").innerHTML = `
  <footer>
    <div class="foot-logo">🌰 DRYF</div>
    <nav class="foot-links">
      <a href="index.html">Home</a><a href="shop.html">Shop All</a><a href="categories.html">Categories</a>
      <a href="deals.html">Deals</a><a href="guide.html">Store Guide</a><a href="shop.html?q=kesar">Search Kesar</a>
    </nav>
    <nav class="foot-cats">
      ${Object.entries(CATS).map(([k, c]) => `<a href="category.html?cat=${k}">${c.emoji} ${c.label} (${counts[k] || 0})</a>`).join("")}
    </nav>
    <p><b>Demo e-commerce website</b> — no real payment, delivery or order will happen. Prices are indicative for demo &amp; planning.</p>
    <p class="hindi-foot">शुद्ध मेवा · ताज़ा स्वाद · हर घर तक — DRYF Demo Store</p>
    <a href="#top">↑ Back to top</a>
  </footer>`;

  document.getElementById("site-overlays").innerHTML = `
  <button class="fab" id="cartFab">🛒 Cart · <span id="fabTotal">₹0</span> <span class="count-pill" id="cartCountFab">0</span></button>

  <div class="overlay" id="overlay" hidden></div>
  <aside class="drawer" id="drawer" aria-hidden="true">
    <div class="drawer-head">
      <div class="drawer-tabs">
        <button class="dtab active" id="tabCart">🛒 Cart <span id="tabCartCount">0</span></button>
        <button class="dtab" id="tabList">🧺 Store List <span id="tabListCount">0</span></button>
        <button class="dtab" id="tabWish">❤️ Wishlist</button>
      </div>
      <button class="icon-btn" id="closeDrawer">✕</button>
    </div>
    <div class="drawer-panel" id="panelCart">
      <div class="drawer-body" id="cartBody"></div>
      <div class="drawer-foot" id="cartFoot">
        <div class="coupon-row">
          <input id="couponInput" placeholder="Coupon code — try DRYF10">
          <button class="btn btn-dark" id="applyCoupon">Apply</button>
        </div>
        <p class="coupon-msg" id="couponMsg"></p>
        <div class="bill">
          <div><span>Subtotal</span><b id="billSubtotal">₹0</b></div>
          <div class="save"><span>You save (discounts)</span><b id="billSave">− ₹0</b></div>
          <div id="couponRow" hidden><span>Coupon <b id="couponName"></b></span><b id="billCoupon">− ₹0</b></div>
          <div><span>Delivery <small id="deliveryHint"></small></span><b id="billDelivery">—</b></div>
          <div class="bill-total"><span>Total</span><b id="billTotal">₹0</b></div>
        </div>
        <div class="free-ship"><div id="freeShipBar"></div></div>
        <p class="ship-note" id="shipNote"></p>
        <button class="btn btn-gold checkout-btn" id="checkoutBtn">Proceed to Checkout →</button>
        <button class="btn btn-light checkout-btn" id="clearCart">Clear Cart</button>
      </div>
    </div>
    <div class="drawer-panel" id="panelList" hidden>
      <div class="drawer-body" id="drawerBody"></div>
      <div class="drawer-foot">
        <div class="total-row"><span>Est. opening stock*</span><b id="totalValue">₹0</b></div>
        <p class="fine dark-fine">*Rough estimate at 2 kg of every ticked item (gift boxes × 5).</p>
        <div class="drawer-actions">
          <button class="btn btn-gold" id="downloadCsv">⬇ CSV</button>
          <button class="btn btn-dark" id="copyList">📋 Copy</button>
          <button class="btn btn-light" id="printList">🖨 Print</button>
          <button class="btn btn-light danger" id="clearList">Clear</button>
        </div>
      </div>
    </div>
    <div class="drawer-panel" id="panelWish" hidden>
      <div class="drawer-body" id="wishBody"></div>
    </div>
  </aside>

  <div class="modal-wrap" id="modalWrap" hidden>
    <div class="modal" role="dialog" aria-modal="true">
      <button class="icon-btn modal-close" id="closeModal">✕</button>
      <div class="modal-media"><img id="modalImg" alt=""><span id="modalEmoji"></span></div>
      <div class="modal-body">
        <span class="badge" id="modalBadge"></span>
        <h3 id="modalName"></h3>
        <p class="hindi big-hindi" id="modalHindi"></p>
        <p id="modalDesc"></p>
        <div class="modal-facts">
          <div><span>Price</span><b id="modalPrice"></b></div>
          <div><span>Shelf life</span><b id="modalShelf"></b></div>
          <div><span>Rating</span><b id="modalRating"></b></div>
          <div><span>Availability</span><b id="modalLevel"></b></div>
        </div>
        <label class="pack-label">Pack size चुनें / Pack Size</label>
        <div class="pack-options" id="modalPacks"></div>
        <div class="qty-row">
          <span>Quantity</span>
          <div class="qty-stepper"><button id="qtyMinus">−</button><b id="qtyVal">1</b><button id="qtyPlus">+</button></div>
          <b class="qty-total" id="qtyTotal"></b>
        </div>
        <p class="tip" id="modalTip"></p>
        <div class="modal-actions">
          <button class="btn btn-gold" id="modalCart">🛒 Add to Cart</button>
          <button class="btn btn-dark" id="modalBuy">⚡ Buy Now (Demo)</button>
        </div>
        <div class="modal-actions secondary">
          <button class="btn btn-light" id="modalWish">❤️ Wishlist</button>
          <button class="btn btn-light" id="modalAdd"></button>
        </div>
        <a class="full-page-link" id="modalFullPage" href="shop.html">View full product page →</a>
      </div>
    </div>
  </div>

  <div class="modal-wrap" id="checkoutWrap" hidden>
    <div class="modal checkout-modal">
      <button class="icon-btn modal-close" id="closeCheckout">✕</button>
      <div class="checkout-body">
        <h3>📝 Demo Checkout</h3>
        <p class="muted">यह डेमो है — This is a demo. No real payment will be taken.</p>
        <form id="checkoutForm">
          <label>Full Name / पूरा नाम *<input required id="coName" placeholder="e.g. Rahul Sharma"></label>
          <label>Mobile Number / मोबाइल *<input required id="coPhone" inputmode="numeric" maxlength="10" placeholder="10-digit mobile"></label>
          <label>Delivery Address / पता *<textarea required id="coAddress" rows="2" placeholder="House no, street, landmark"></textarea></label>
          <div class="form-2">
            <label>City / शहर *<input required id="coCity" placeholder="Delhi"></label>
            <label>PIN Code *<input required id="coPin" inputmode="numeric" maxlength="6" placeholder="110001"></label>
          </div>
          <label>Payment Method / भुगतान (Demo)
            <div class="pay-options">
              <label class="pay-opt"><input type="radio" name="pay" value="UPI (Demo)" checked> 📱 UPI</label>
              <label class="pay-opt"><input type="radio" name="pay" value="Card (Demo)"> 💳 Card</label>
              <label class="pay-opt"><input type="radio" name="pay" value="Cash on Delivery"> 💵 COD</label>
            </div>
          </label>
          <div class="bill checkout-bill">
            <div><span>Items</span><b id="coItems"></b></div>
            <div class="bill-total"><span>Total Payable</span><b id="coTotal"></b></div>
          </div>
          <button class="btn btn-gold checkout-submit" type="submit">✅ Place Demo Order</button>
        </form>
      </div>
    </div>
  </div>

  <div class="modal-wrap" id="successWrap" hidden>
    <div class="modal success-modal">
      <div class="confetti" id="confetti"></div>
      <div class="success-body">
        <div class="success-tick">✓</div>
        <h3>Order Placed! 🎉</h3>
        <p class="hindi big-hindi">धन्यवाद! आपका ऑर्डर मिल गया है।</p>
        <p>Demo Order ID: <b id="orderIdTxt"></b></p>
        <div class="track">
          <div class="tstep done"><span>🧾</span>Placed<small>Just now</small></div>
          <div class="tline"></div>
          <div class="tstep" id="ts2"><span>🫙</span>Packed<small>Demo</small></div>
          <div class="tline"></div>
          <div class="tstep" id="ts3"><span>🚚</span>Shipped<small>Demo</small></div>
          <div class="tline"></div>
          <div class="tstep" id="ts4"><span>🏠</span>Delivered<small>2–3 days</small></div>
        </div>
        <div class="bill" id="successBill"></div>
        <button class="btn btn-gold" id="successContinue">Continue Shopping</button>
        <button class="btn btn-light" id="successOrders">View My Orders</button>
      </div>
    </div>
  </div>

  <div class="toast" id="toast"></div>`;
}
