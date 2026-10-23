/* ============ DATA ============ */
/* level: 1=Must-Have, 2=Popular, 3=Premium/Exotic | price = indicative ₹ per 500g (gift = per box) */
const CATS = {
  nuts:     {label:"Dry Fruits & Nuts", emoji:"🌰", img:"images/nuts.jpg", blurb:"The core of every store — badam, kaju, pista, dates & more."},
  berries:  {label:"Berries & Dried Fruits", emoji:"🫐", img:"images/berries.jpg", blurb:"Colourful, healthy & premium — cranberry, kiwi, mango & more."},
  seeds:    {label:"Seeds & Makhana", emoji:"🌻", img:"images/seeds.jpg", blurb:"Superfood seeds for fitness, fasting & daily nutrition."},
  chocolate:{label:"Chocolates", emoji:"🍫", img:"images/chocolate.jpg", blurb:"Bars, truffles, coated nuts & sugar-free delights."},
  snacks:   {label:"Roasted & Masala Snacks", emoji:"🔥", img:"images/snacks.jpg", blurb:"Flavoured, roasted & ready-to-eat snacking range."},
  gifts:    {label:"Gift Hampers & Combos", emoji:"🎁", img:"images/gift.jpg", blurb:"Festive boxes & hampers — your highest-margin shelf."},
  sweets:   {label:"Indian Sweets & Traditional", hindi:"भारतीय मिठास", emoji:"🍬", img:"images/sweets.jpg", blurb:"Mewa sweets, laddoo, chikki, panjeeri & festive mithaas."},
  pantry:   {label:"Health Pantry & More", hindi:"हेल्थ पैंट्री", emoji:"🍯", img:"images/pantry.jpg", blurb:"Honey, kesar, elaichi, nut butters, oats & health mixes."},
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

/* ---- MORE PRODUCTS (added for demo e-commerce) ---- */
const EXTRA = [
["Cashews W180 King Size","Kaju W180 · काजू W180","nuts",920,"👑",3,"5–6 months","Extra-large king cashews; showpiece premium grade"],
["Safawi Dates","Safawi Khajoor · सफ़ावी खजूर","nuts",620,"🌴",2,"6–12 months","Dark, chewy Madinah dates; Ramzan premium seller"],
["Sukkari Dates","Sukkari Khajoor · सुक्करी खजूर","nuts",540,"🌴",2,"6 months","Golden crunchy-sweet 'royal' dates from Qassim"],
["Mabroom Dates","Mabroom Khajoor · मबरूम खजूर","nuts",780,"🌴",3,"6–12 months","Long, elegant premium dates for gifting"],
["Zahidi Dates","Zahidi Khajoor · ज़ाहिदी खजूर","nuts",220,"🌴",1,"6–9 months","Budget dry dates; cooking, sweets & daily use"],
["Almond Slices (Badam Katran)","Badam Katran · बादाम कतरन","nuts",680,"🔪",2,"4–6 months","Slivered almonds for kheer, sweets & garnishing"],
["Roasted Peanuts","Bhuni Moongphali · भुनी मूँगफली","nuts",130,"🥜",1,"3–4 months","India's favourite budget snack nut; huge volume seller"],
["Watermelon Seeds Roasted","Bhune Tarbuj Beej · भुने तरबूज बीज","seeds",260,"🍉",2,"4 months","Salted roasted snack version of magaj seeds"],
["Garden Cress Seeds (Halim)","Halim / Asaliya · हलीम बीज","seeds",280,"🌱",2,"9 months","Iron-rich aliv seeds for laddoo & health drinks"],
["Nigella Seeds (Kalonji)","Kalonji · कलौंजी","seeds",320,"⚫",1,"9 months","Kitchen + ayurvedic essential; pickles & naan topping"],
["Cucumber Seeds","Kakdi ke Beej · ककड़ी बीज","seeds",240,"🥒",2,"9 months","Cooling summer seed for drinks & char-magaj mixes"],
["Sabja Drink Seeds Premium","Sabja Premium · सब्जा","seeds",260,"💧",2,"12 months","Clean bold sabja for falooda shops & cafes (B2B)"],
["Dried Raspberries","Raspberry · रास्पबेरी","berries",1050,"🩷",3,"9 months","Tangy premium berry for desserts & baking"],
["Golden Berries (Rasbhari)","Rasbhari · रसभरी","berries",680,"🟡",3,"9 months","Cape gooseberry; tangy superfruit snack"],
["Dried Dragon Fruit","Dragon Fruit · ड्रैगन फ्रूट","berries",720,"🐉",3,"6 months","Exotic pink-white slices; Instagram-friendly product"],
["Dried Peach Slices","Aadu · आड़ू","berries",460,"🍑",3,"6 months","Soft sweet peach; premium trail-mix ingredient"],
["Dried Apple Rings","Seb ke Ring · सेब","berries",320,"🍎",2,"6 months","Light chewy snack for kids & travellers"],
["Date Powder (Natural Sweetener)","Khajoor Powder · खजूर पाउडर","pantry",340,"🌴",2,"6 months","Refined-sugar alternative for baking & baby food"],
["Ruby Chocolate","Ruby Chocolate · रूबी चॉकलेट","chocolate",420,"🩷",3,"9 months","Pink chocolate; unique product no nearby shop has"],
["Cocoa Powder Unsweetened","Cocoa Powder · कोको पाउडर","chocolate",280,"🍫",1,"12 months","Baking essential; home bakers & cafes reorder monthly"],
["Hazelnut Chocolate Spread","Choco Spread · चॉकलेट स्प्रेड","chocolate",310,"🥄",1,"9 months","Bread & pancake favourite of kids; fast FMCG mover"],
["Choco-Coated Strawberries","Choco Strawberry · चॉकलेट स्ट्रॉबेरी","chocolate",560,"🍓",3,"6 months","Premium coated berry; Valentine & gifting star"],
["Chocolate Coffee Beans","Coffee Beans Choco · कॉफ़ी चॉकलेट","chocolate",480,"☕",3,"9 months","Espresso beans in dark chocolate; office snack"],
["Wafer Chocolate Sticks","Wafer Sticks · वेफ़र स्टिक्स","chocolate",220,"🥖",2,"9 months","Kids' lunchbox & return-gift favourite"],
["Mini Chocolate Bars (Kids Pack)","Mini Bars · मिनी चॉकलेट","chocolate",180,"🧒",1,"9 months","Small-price packs that sell at billing counter daily"],
["Banana Chips","Kele ke Chips · केले के चिप्स","snacks",180,"🍌",1,"2–3 months","Kerala-style chips; tea-time volume seller"],
["Roasted Chana (With Skin)","Bhuna Chana · भुना चना","snacks",150,"🫘",1,"3 months","Desi protein snack; gym & travel staple"],
["Masala Peanuts","Masala Moongphali · मसाला मूँगफली","snacks",160,"🌶️",1,"3 months","Chaat-masala peanuts; evening snack bestseller"],
["Roasted Soya Nuts","Soya Nuts · सोया नट्स","snacks",170,"💪",2,"4 months","High-protein budget snack for fitness buyers"],
["Caramel Makhana (Sweet)","Caramel Makhana · कैरामल मखाना","snacks",320,"🍮",2,"3 months","Sweet crunchy makhana; dessert-style snacking"],
["Granola Bars (Box of 6)","Granola Bar · ग्रेनोला बार","snacks",299,"🍫",2,"6 months","On-the-go breakfast bars; office & gym demand"],
["Protein Bars (Box of 6)","Protein Bar · प्रोटीन बार","snacks",499,"🏋️",2,"6 months","Fitness category entry; high repeat purchase"],
["Kaju Katli Style Mewa Barfi","Mewa Barfi · मेवा बर्फ़ी","sweets",720,"🍬",1,"15–30 days","Cashew-rich festive sweet; Diwali volume item"],
["Dry Fruit Bites (No Added Sugar)","Mewa Bites · मेवा बाइट्स","sweets",560,"🍬",1,"1–2 months","Dates & nuts bites; healthy mithai alternative"],
["Anjeer Dry Fruit Roll","Anjeer Roll · अंजीर रोल","sweets",680,"🌀",2,"1–2 months","Fig roll stuffed with nuts; premium sweet counter item"],
["Gond ke Laddoo","Gond Laddoo · गोंद के लड्डू","sweets",480,"🍡",1,"1 month","Winter strength laddoo; new mothers & elders love it"],
["Dry Fruit Panjeeri","Panjeeri · पंजीरी","sweets",440,"🥣",1,"1–2 months","Post-delivery & winter health mix; Punjabi homes staple"],
["Peanut Chikki","Moongphali Chikki · मूँगफली चिक्की","sweets",140,"🥜",1,"3 months","Lonavala-style chikki; pocket-price sweet seller"],
["Til Gajak / Revdi","Til Gajak · तिल गजक","sweets",190,"❄️",1,"3 months","Winter sesame sweet; Lohri & Makar Sankranti star"],
["Dhaga Mishri","Dhaga Mishri · धागा मिश्री","sweets",120,"🧊",1,"12 months","Thread rock-sugar for puja, fennel pairing & summer drinks"],
["Dry Fruit Soan Papdi","Soan Papdi · सोन पापड़ी","sweets",260,"🍮",2,"3 months","Festive gifting sweet at friendly price point"],
["Energy Laddoo (Til-Mewa)","Energy Laddoo · एनर्जी लड्डू","sweets",420,"⚡",2,"1 month","Til, dates & nuts laddoo; winter + fitness both"],
["Pure Raw Honey 500g","Shahad · शहद","pantry",349,"🍯",1,"18 months","Daily-use honey; tea, ayurveda & immunity demand"],
["Kesar Saffron 1g","Kesar · केसर","pantry",599,"🟠",2,"12 months","Premium Mongra saffron; tiny pack, high value & margin"],
["Green Cardamom 8mm","Hari Elaichi · हरी इलायची","pantry",1450,"💚",2,"9–12 months","Bold elaichi for chai, sweets & biryani homes"],
["Peanut Butter Creamy","Peanut Butter · पीनट बटर","pantry",249,"🥜",1,"9 months","Gym & kids staple; bread spread bestseller"],
["Almond Butter","Badam Butter · बादाम बटर","pantry",549,"🌰",3,"6 months","Premium nut butter for health-conscious buyers"],
["Rolled Oats","Oats · ओट्स","pantry",160,"🥣",1,"12 months","Breakfast essential; pairs with your berries & seeds"],
["Fruit & Nut Granola","Granola · ग्रेनोला","pantry",329,"🥣",2,"6 months","Ready breakfast cereal with your own dry fruits"],
["Kids Dry Fruit Powder","Baccho ka Mewa Powder · बच्चों का मेवा पाउडर","pantry",399,"👶",2,"3 months","Badam-kaju powder for milk; mothers search for it"],
["Kesar Badam Milk Mix","Badam Doodh Mix · बादाम दूध मिक्स","pantry",349,"🥛",1,"6 months","Instant kesar badam milk; winter evening drink"],
["Thandai Powder","Thandai Masala · ठंडाई पाउडर","pantry",299,"❄️",2,"6 months","Holi & summer star; badam-pista-kesar drink mix"],
["Turmeric Latte Mix (Haldi Doodh)","Haldi Doodh Mix · हल्दी दूध मिक्स","pantry",279,"🟡",3,"9 months","Golden milk trend; immunity-positioned product"],
["Baby Shower Gift Hamper","Baby Shower Hamper · बेबी शावर हैम्पर","gifts",1799,"👶",3,"— (pack fresh)","Dry fruits for new mothers; growing gifting occasion"],
["Housewarming Hamper","Griha Pravesh Hamper · गृह प्रवेश हैम्पर","gifts",1699,"🏠",2,"— (pack fresh)","Nuts & sweets box for new-home visits"],
["Ramadan Dates Gift Box","Ramzan Dates Box · रमज़ान डेट्स बॉक्स","gifts",999,"🌙",2,"6 months","Assorted premium dates; Ramzan season special"],
];
RAW.push(...EXTRA);
const LEVEL_TXT = {1:"⭐ Must-Have",2:"🔥 Popular",3:"💎 Premium / Exotic"};
const CAT_IMG_POS = ["center","top","bottom","left","right"];

const products = RAW.map((r,i)=>{
  const parts = String(r[1]).split("·").map(s=>s.trim());
  const off = 10 + (i*7)%26; /* 10–35% demo discount */
  return {id:i, name:r[0], hindi:r[1], translit:parts[0]||r[0], deva:parts[1]||"",
    cat:r[2], price:r[3], emoji:r[4], level:r[5], shelf:r[6], benefit:r[7],
    rating:(4.2 + ((i*7)%9)/10).toFixed(1), off,
    mrp: Math.round(r[3]/(1-off/100)/5)*5,
    stock: (i%9===4) ? "Only few left!" : "In Stock",
    badge: r[5]===1 ? "Bestseller" : r[5]===3 ? "Premium" : (i%5===0 ? "New" : ""),
    img: CATS[r[2]].img, pos: CAT_IMG_POS[i%CAT_IMG_POS.length] };
});
/* Pack prices: 250g / 500g / 1kg (1kg gets extra ~5% value) ; gifts = per box */
function packPrice(p, pack){
  if(p.cat==="gifts") return p.price;
  if(pack==="250g") return Math.round(p.price/2);
  if(pack==="1kg") return Math.round(p.price*1.9);
  return p.price;
}
function packMRP(p, pack){ const off=p.off/100; return Math.round(packPrice(p,pack)/(1-off)/5)*5; }
const PACKS_FOR = p => (p.cat==="gifts") ? ["1 Box"] : ["250g","500g","1kg"];

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
      <img src="${p.img}" alt="${p.name}" loading="lazy" style="object-position:${p.pos}">
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
      <img src="${p.img}" alt="${p.name}" loading="lazy" style="object-position:${p.pos}">
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
  $("#modalImg").src = p.img; $("#modalEmoji").textContent = p.emoji;
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
        <img src="${e.p.img}" alt="${e.p.name}">
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
    <div class="cart-item"><img src="${p.img}" alt="${p.name}">
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
