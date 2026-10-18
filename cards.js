// ===================== 卡片庫（權益資料） =====================
// 權益改版時只要改這個檔案，並把該卡的 updated 改成今天日期，再上傳到 GitHub。
// 使用者打開 App 時會看到「權益有更新」，按套用即可（保留各自的結帳日、方案、紀錄）。
//
// 欄位說明
//   base        基本回饋率，依地區：tw 國內、overseas 海外預設，可另外指定 jp / kr / th / os
//   rules       這張卡所有方案都適用的加碼規則
//   plans       需要切換方案的卡才有（例如台新切換刷），每個方案各自有 rules
//   rule.rate   加碼回饋率，疊加在 base 之上（0.03 = 3%）
//   rule.merchants / categories   指定店家 / 類別，符合任一即可；兩者都沒有 = 所有消費
//   rule.regions / pay            限定地區 / 付款方式，沒有 = 不限
//   rule.holiday   只限國定例假日       rule.minSingle  單筆最低金額
//   rule.cap       回饋上限（元）        rule.capPeriod  cycle 帳單週期 / month 自然月 / quarter 季
//   rule.group     同一方案內 group 相同取最高、不同 group 疊加（預設 main）
//   類別代碼：dining 餐飲, delivery 外送, online 網購, cvs 超商, dept 百貨/Outlet, grocery 量販超市,
//             transport 交通, fuel 加油充電, drug 藥妝藥局, home 居家/服飾, travel 航空/訂房/旅行社,
//             ent 訂閱/娛樂, insurance 保費, general 其他
//   付款代碼：card 實體卡/線上刷卡, tspay 台新Pay, linepay LINE Pay, nfc Apple/Google Pay, icash 全盈+Pay

window.CARD_LIBRARY = {
  updated: '2026-10-18',
  cards: [
    {
      id: 'taishin', name: '台新 Richart（含 @GoGo / FlyGo）', bank: '台新', updated: '2026-10-18',
      pointName: '台新Point', pointValue: 1, base: { tw: 0.003, overseas: 0.003 },
      switchable: true, defaultPlan: 'daily', validUntil: '2027-03-31',
      notes: '以 LEVEL 2（已設定台新帳戶自動扣繳）計算；未設定者多數方案只有 0.3%。所有台新切換刷卡共用一個方案，每日限切一次，以當天 23:59 前最後選定的方案計算。台新Point 折抵帳單上限 30%。加碼回饋總額以永久額度+30萬為限（等同無上限）。',
      sources: ['https://www.cardu.com.tw/message/detail.php?58136=', 'https://www.money101.com.tw/blog/%E5%8F%B0%E6%96%B0richart%E5%8D%A1'],
      rules: [
        { id: 'ts-ins', label: '保費一次付清 1.3%', categories: ['insurance'], rate: 0.01 }
      ],
      plans: [
        { id: 'pay', name: 'Pay著刷', rules: [
          { id: 'ts-pay-ts', label: '台新Pay 綁定 3.8%', pay: ['tspay'], rate: 0.035 },
          { id: 'ts-pay-line', label: 'LINE Pay / 全盈+Pay 綁定 2.3%', pay: ['linepay', 'icash'], rate: 0.02 }
        ]},
        { id: 'daily', name: '天天刷', rules: [
          { id: 'ts-daily-cvs', label: '7-11 / 全家（限台新Pay）3.3%', pay: ['tspay'], rate: 0.03,
            merchants: ['7-11', '7-ELEVEN', '統一超商', '全家'] },
          { id: 'ts-daily', label: '量販/交通/加油/藥妝 3.3%', rate: 0.03, merchants: [
            '萬家福', '家樂福', '樂家康', '大買家', '唐吉訶德', 'LOPIA', '智生活',
            '台鐵', '臺鐵', '高鐵', '台灣大車隊', 'LINE GO', 'LINEGO', 'Yoxi', 'Uber', 'Bolt',
            '中油', '全國加油', '全國特急電', 'EVOASIS', '源點', 'EVALUE', '華城電能', 'USPACE', 'Autopass', '車麻吉',
            '寶雅', '康是美', '屈臣氏', '杏一', '大樹藥局', '丁丁藥局', '佑全', '健康人生'] }
        ]},
        { id: 'big', name: '大筆刷', rules: [
          { id: 'ts-big', label: '指定百貨/Outlet/居家/服飾 3.3%', rate: 0.03, merchants: [
            '新光三越', 'skm pay', '遠東百貨', 'SOGO', '漢神巨蛋', '漢神百貨', '漢神洲際', '微風', '台北101', '遠東巨城',
            '南紡購物中心', '誠品', '京站', '三創', '夢時代', '統一時代', '中友百貨', 'LaLaport',
            'MITSUI OUTLET', '三井Outlet', '華泰名品城', 'SKM Park',
            'IKEA', '特力屋', 'HOLA', '宜得利', '瑪黑家居', 'UNIQLO', 'GU', 'ZARA', 'NET', 'lululemon'] }
        ]},
        { id: 'dine', name: '好饗刷', rules: [
          { id: 'ts-dine', label: '全台餐飲/外送/購票/飯店/KTV 3.3%', rate: 0.03, categories: ['dining', 'delivery'], regions: ['tw'],
            merchants: ['Uber Eats', 'foodpanda', '王品', '拓元', 'KKTIX', '年代售票', '寬宏', 'OPENTIX', 'FunNow',
              '晶華', '雲朗', '萬豪', '煙波', '老爺酒店', '福華', '漢來', '君悅', '洲際', '寒沐', '錢櫃', '好樂迪', 'ONCOR', 'sing!go', '享溫馨'] }
        ]},
        { id: 'online', name: '數趣刷', rules: [
          { id: 'ts-online', label: '網購/課程/遊戲影音/AI 3.3%', rate: 0.03, merchants: [
            '蝦皮', 'momo', '酷澎', 'Coupang', 'PChome', '淘寶', 'Amazon', '東森', '博客來', 'Richart Mart', 'PayEasy', 'iHerb', 'SHEIN',
            'Farfetch', 'Olive Young', '知識衛星', 'AmazingTalker', 'TutorABC', 'Hahow', 'PressPlay', 'MyCard', '遊戲橘子',
            'Steam', 'PlayStation', 'Nintendo', 'Netflix', 'Disney+', 'ChatGPT', 'OpenAI', 'Notion', 'Canva', 'Perplexity', 'Claude', 'Anthropic'] }
        ]},
        { id: 'travel', name: '玩旅刷', rules: [
          { id: 'ts-travel-os', label: '海外消費 3.3%', rate: 0.03, regions: ['jp', 'kr', 'th', 'os'] },
          { id: 'ts-travel', label: '航空/訂房/旅行社/海外交通 3.3%', rate: 0.03, merchants: [
            'Grab', 'Suica', 'ICOCA', 'PASMO', 'WOWPASS', 'AIRSIM',
            '中華航空', '華航', '長榮航空', '星宇航空', '台灣虎航', '國泰航空', '華信航空', '立榮航空', '樂桃', '阿聯酋航空', '亞洲航空', 'AirAsia',
            '酷航', '捷星', '新加坡航空', '日本航空', '越捷',
            'Klook', 'KKday', 'Agoda', 'Booking.com', 'Trip.com', 'Airbnb', 'Hotels.com', 'Expedia',
            '雄獅', '易遊網', '東南旅遊', '可樂旅遊', '長汎', '五福旅遊', '喜鴻', '易飛', '燦星', '加利利', '鳳凰旅行社', '山富', '行健'] }
        ]},
        { id: 'holiday', name: '假日刷', rules: [
          { id: 'ts-holiday', label: '國定例假日不限通路 2%', rate: 0.017, holiday: true, regions: ['tw'] }
        ]},
        { id: 'chill', name: 'Chill刷', validUntil: '2026-12-31', rules: [
          { id: 'ts-chill-10', label: 'Chill 指定店家 10%', rate: 0.097, merchants: [
            '詹記', '萬客什鍋', '海底撈', '屋馬', '茶六', '新村站著吃', '燒肉政宗', '碳佐麻里', '雞湯大叔', 'gonna共樂遊', 'BRUN不然', 'CAFE ACME',
            'The Antipodean', '貳樓', '樂子', 'Fake Sober', 'Draft Land', '臺虎', 'ABV', 'Bar TCRC', 'Bar Home', 'Phowa', 'MOONROCK',
            '50嵐', '得正', '八曜和茶', '五桐號', '龜記', 'UG TEA', '叮哥茶飲', 'CAFE!N', '%Arabica', 'COMPOSE COFFEE'] },
          { id: 'ts-chill-5', label: 'Chill 指定店家 5%', rate: 0.047, merchants: [
            '饗饗', 'NAGOMI', 'WEVERSE', 'K-MONSTAR', '微樂客', '五大唱片', '仙女樹', 'FANME', 'NOL', '巴哈姆特', 'BOOK WALKER', 'Animate',
            '樂天KOBO', 'Readmoo', 'Netflix', 'Disney+', '愛爾達', '好好生醫', 'POPCARE', '營養師輕食', 'VITABOX', 'MYPROTEIN', 'UrMart',
            'Anytime Fitness', '健身工廠', 'World Gym', 'Hypercore', 'KX PILATES', '虎鐵健身', '17FIT',
            'Adidas', 'New Balance', 'PUMA', 'Onitsuka Tiger', 'Nike', 'HOKA', 'Salomon', 'lululemon'] },
          { id: 'ts-chill-3', label: 'Chill 數位外掛 3.3%', rate: 0.03, merchants: [
            'Apple', 'Studio A', 'DJI', 'Insta360', 'GoPro', '蝦皮', '淘寶', '酷澎', 'Uber Eats'] }
        ]}
      ]
    },
    {
      id: 'fubon', name: '富邦 J 卡（娃娃卡）', bank: '富邦', updated: '2026-10-18',
      pointName: '現金回饋', pointValue: 1, base: { tw: 0.01, jp: 0.03, kr: 0.03, th: 0.03, overseas: 0.01 },
      notes: '基本回饋需綁定富邦自動扣繳或電子帳單，否則 0.5%。日韓泰加碼需登錄、單筆滿 NT$1,000、季上限 NT$1,000。',
      sources: ['https://rich01.com/fubon-j-card-review/'],
      rules: [
        { id: 'fb-jkt', label: '日韓泰實體加碼 +3%（需登錄、單筆滿千）', rate: 0.03, regions: ['jp', 'kr', 'th'], minSingle: 1000, cap: 1000, capPeriod: 'quarter' },
        { id: 'fb-ic', label: 'Suica/PASMO/ICOCA 儲值加碼（合計最高10%）', rate: 0.07, merchants: ['Suica', 'PASMO', 'ICOCA'], regions: ['jp'], group: 'ic' }
      ]
    },
    {
      id: 'sinopac-dawho', name: '永豐 DAWHO 大戶卡', bank: '永豐', updated: '2026-10-18',
      pointName: '現金回饋', pointValue: 1, base: { tw: 0.01, overseas: 0.02 }, validUntil: '2026-12-31',
      notes: '以「大戶」等級計算：當月平均資產需 ≥ 30 萬（或其他達標方式），並完成數位帳戶扣繳 + 電子帳單任務。大戶 Plus（≥100 萬）加碼為 4%、上限 1,000。',
      sources: ['https://kheresy.wordpress.com/2026/07/01/sinopac-credit-card-2026-2/'],
      rules: [
        { id: 'dw-bonus', label: '大戶等級加碼 +2.5%', rate: 0.025, cap: 400, capPeriod: 'cycle' }
      ]
    },
    {
      id: 'sinopac-sport', name: '永豐 SPORT 卡', bank: '永豐', updated: '2026-10-18',
      pointName: '豐點', pointValue: 1, base: { tw: 0.01, overseas: 0.01 }, validUntil: '2026-12-31',
      notes: '基本 1% 需電子帳單。運動加碼需 DACARD App 月累積 1 萬大卡或 Apple Watch 圓滿畫圈 10 次，並設定永豐/京城帳戶自動扣繳。豐點 100 點才能折抵。',
      sources: ['https://kheresy.wordpress.com/2026/07/01/sinopac-credit-card-2026-2/'],
      rules: [
        { id: 'sp-sport', label: '運動獎勵 +1%', rate: 0.01, cap: 50, capPeriod: 'cycle', group: 'sport' },
        { id: 'sp-pay', label: '指定感應支付 +3%', rate: 0.03, pay: ['nfc'], cap: 300, capPeriod: 'cycle', group: 'pay' }
      ]
    }
  ]
};
