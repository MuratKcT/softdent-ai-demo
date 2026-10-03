/* SoftDent — clinic data (source: softdent.com.pl, Oct 2026). Prices in PLN. */
window.SD = {
  clinic: {
    name: 'SoftDent',
    street: 'ul. Pruszkowska 29 lok. 3',
    city: '02-119 Warszawa',
    district: { pl: 'Ochota · Szczęśliwice', en: 'Ochota · Szczęśliwice, Warsaw' },
    phone: '+48 515 088 173',
    phoneHref: 'tel:+48515088173',
    phone2: '22 895 20 70',
    phone2Href: 'tel:+48228952070',
    email: 'softdent@wp.pl',
    since: 2005,
    hours: [
      { d: { pl: 'Poniedziałek – Piątek', en: 'Monday – Friday' }, h: '8:00 – 20:00', days: [1, 2, 3, 4, 5], open: 8, close: 20 },
      { d: { pl: 'Sobota', en: 'Saturday' }, h: '9:00 – 20:00', days: [6], open: 9, close: 20 },
      { d: { pl: 'Niedziela', en: 'Sunday' }, h: null, days: [0] }
    ],
    site: 'https://www.softdent.com.pl/',
    booking: 'https://www.softdent.com.pl/szybka-rezerwacja-wizyty-stomatologicznej-online.html',
    prices: 'https://www.softdent.com.pl/cennik.html',
    team: 'https://www.softdent.com.pl/zespol.html',
    map: 'https://www.google.com/maps/search/?api=1&query=SoftDent+Pruszkowska+29+Warszawa',
    mapEmbed: 'https://maps.google.com/maps?q=ul.+Pruszkowska+29,+02-119+Warszawa&z=16&output=embed',
    logo: 'https://www.softdent.com.pl/templates/web/images/logo.svg'
  },

  doctors: [
    { n: 'Maja Bonikowska', r: { pl: 'Endodoncja mikroskopowa · leczenie zachowawcze', en: 'Microscope endodontics · conservative dentistry' }, tags: ['endo', 'general'], langs: 'PL · EN' },
    { n: 'Małgorzata Karska', r: { pl: 'Estetyka · endodoncja · protetyka · periodontologia', en: 'Aesthetics · endodontics · prosthetics · periodontics' }, tags: ['general', 'aesthetic', 'endo', 'prosth', 'perio'] },
    { n: 'Klaudia Sadowa', r: { pl: 'Specjalista ortodonta', en: 'Orthodontist (specialist)' }, tags: ['ortho', 'kids'] },
    { n: 'Iryna Kocturk', r: { pl: 'Zachowawcza · endodoncja · protetyka · chirurgia', en: 'Conservative · endodontics · prosthetics · surgery' }, tags: ['general', 'endo', 'prosth', 'surgery'] },
    { n: 'Alina Kuzma', r: { pl: 'Stomatologia zachowawcza i estetyczna', en: 'Conservative & aesthetic dentistry' }, tags: ['general', 'aesthetic'] },
    { n: 'dr n. med. Aleksandra Skalbani', r: { pl: 'Dzieci i dorośli · ortodoncja · licówki i bonding', en: 'Children & adults · orthodontics · veneers & bonding' }, tags: ['kids', 'ortho', 'aesthetic', 'general'] },
    { n: 'Magdalena Nagrodzka', r: { pl: 'Zachowawcza · endodoncja · minimalna inwazyjność', en: 'Conservative · endodontics · minimally invasive' }, tags: ['general', 'endo'] },
    { n: 'Alina Yavtuchenko', r: { pl: 'Zachowawcza · endodoncja dorosłych', en: 'Conservative · adult endodontics' }, tags: ['general', 'endo'] },
    { n: 'Magda Szała', r: { pl: 'Zachowawcza · planowanie leczenia', en: 'Conservative · treatment planning' }, tags: ['general'] },
    { n: 'Anastasiya Shlakunova', r: { pl: 'Chirurgia stomatologiczna · implantologia', en: 'Oral surgery · implantology' }, tags: ['surgery', 'implant'] },
    { n: 'Agnieszka Nawrocka', r: { pl: 'Specjalista ortodonta', en: 'Orthodontist (specialist)' }, tags: ['ortho', 'kids'] }
  ],

  /* p = price, to = upper bound (ranges), from = "od" on the price list, u = unit */
  prices: [
    { k: 'cons', ic: '🦷', t: { pl: 'Stomatologia zachowawcza', en: 'Conservative dentistry' }, o: [
      { pl: 'Wypełnienie kompozytowe zęba stałego', en: 'Composite filling (permanent tooth)', p: 290, from: true, u: 'tooth' },
      { pl: 'Licówka kompozytowa', en: 'Composite veneer', p: 800, u: 'tooth' },
      { pl: 'Bonding', en: 'Bonding', p: 700, u: 'tooth' },
      { pl: 'Regeneracja szkliwa (wszystkie zęby)', en: 'Enamel regeneration (all teeth)', p: 400 }
    ]},
    { k: 'hyg', ic: '🪥', t: { pl: 'Higienizacja', en: 'Hygiene' }, o: [
      { pl: 'Pakiet higienizacyjny (skaling, piaskowanie, polerowanie, fluoryzacja)', en: 'Hygiene package (scaling, air-polishing, polishing, fluoride)', p: 350 },
      { pl: 'Pakiet higienizacyjny GBT', en: 'GBT hygiene package', p: 450 }
    ]},
    { k: 'kids', ic: '🧸', t: { pl: 'Stomatologia dziecięca', en: 'Paediatric dentistry' }, o: [
      { pl: 'Wizyta adaptacyjna', en: 'Adaptation visit', p: 150 },
      { pl: 'Wypełnienie zęba mlecznego', en: 'Milk-tooth filling', p: 260, u: 'tooth' },
      { pl: 'Małe wypełnienie w zębie stałym u dziecka', en: 'Small filling, child permanent tooth', p: 230, u: 'tooth' },
      { pl: 'Lakowanie bruzd (ząb stały)', en: 'Fissure sealing (permanent tooth)', p: 180, u: 'tooth' }
    ]},
    { k: 'ortho', ic: '😁', t: { pl: 'Ortodoncja', en: 'Orthodontics' }, o: [
      { pl: 'Konsultacja ortodontyczna', en: 'Orthodontic consultation', p: 200 },
      { pl: 'Aparat ruchomy', en: 'Removable appliance', p: 1050, from: true },
      { pl: 'Aparat stały', en: 'Fixed braces', p: 2500, from: true },
      { pl: 'Leczenie nakładkowe Invisalign', en: 'Invisalign aligner treatment', p: 16000 },
      { pl: 'Leczenie nakładkowe Clear Aligner', en: 'Clear Aligner treatment', p: 1300, from: true }
    ]},
    { k: 'endo', ic: '🔬', t: { pl: 'Leczenie kanałowe (mikroskop)', en: 'Root canal (microscope)' }, o: [
      { pl: 'Leczenie kanałowe – 1 kanał', en: 'Root canal – 1 canal', p: 900, from: true },
      { pl: 'Leczenie kanałowe – 2 kanały', en: 'Root canal – 2 canals', p: 1150, from: true },
      { pl: 'Leczenie kanałowe – 3 kanały', en: 'Root canal – 3 canals', p: 1500, from: true },
      { pl: 'Leczenie kanałowe – 4 i więcej kanałów', en: 'Root canal – 4+ canals', p: 1700, from: true },
      { pl: 'Powtórne leczenie kanałowe – 1 kanał', en: 'Root canal re-treatment – 1 canal', p: 1000, from: true },
      { pl: 'Powtórne leczenie kanałowe – 2 kanały', en: 'Root canal re-treatment – 2 canals', p: 1300, from: true },
      { pl: 'Powtórne leczenie kanałowe – 3 kanały', en: 'Root canal re-treatment – 3 canals', p: 1600, from: true },
      { pl: 'Powtórne leczenie kanałowe – 4+ kanałów', en: 'Root canal re-treatment – 4+ canals', p: 2000, from: true },
      { pl: 'Zamknięcie perforacji', en: 'Perforation repair', p: 300, from: true }
    ]},
    { k: 'prosth', ic: '👑', t: { pl: 'Protetyka', en: 'Prosthetics' }, o: [
      { pl: 'Korona pełnoceramiczna', en: 'All-ceramic crown', p: 2300, u: 'tooth' },
      { pl: 'Korona porcelanowa na stali', en: 'Porcelain-fused-to-metal crown', p: 1600, u: 'tooth' },
      { pl: 'Most na włóknie szklanym', en: 'Fibreglass bridge', p: 2100 },
      { pl: 'Inlay / Onlay kompozytowy', en: 'Composite inlay / onlay', p: 1500, u: 'tooth' },
      { pl: 'Proteza całkowita', en: 'Complete denture', p: 1800, from: true },
      { pl: 'Proteza częściowa', en: 'Partial denture', p: 1400, from: true },
      { pl: 'Naprawa lub dostawienie zęba w protezie', en: 'Denture repair / tooth addition', p: 250, from: true },
      { pl: 'Podścielenie protezy', en: 'Denture relining', p: 500 }
    ]},
    { k: 'surg', ic: '🩺', t: { pl: 'Chirurgia i implanty', en: 'Surgery & implants' }, o: [
      { pl: 'Usunięcie zęba mlecznego', en: 'Milk-tooth extraction', p: 250 },
      { pl: 'Usunięcie zęba jednokorzeniowego', en: 'Single-root extraction', p: 300, from: true },
      { pl: 'Usunięcie zęba wielokorzeniowego', en: 'Multi-root extraction', p: 600, from: true },
      { pl: 'Trudna ekstrakcja', en: 'Difficult extraction', p: 900, from: true },
      { pl: 'Dłutowanie zęba z szyciem', en: 'Surgical extraction with sutures', p: 900 },
      { pl: 'Resekcja wierzchołka (zęby 3-3)', en: 'Apicoectomy (teeth 3-3)', p: 600, to: 800 },
      { pl: 'Resekcja wierzchołka (zęby 4-6)', en: 'Apicoectomy (teeth 4-6)', p: 900, to: 1100 },
      { pl: 'Przeszczep tkanek z podniebienia', en: 'Palatal soft-tissue graft', p: 2000 },
      { pl: 'Implant (zależnie od systemu)', en: 'Implant (depending on system)', p: 3500, to: 4500, u: 'tooth' },
      { pl: 'Korona porcelanowa na implancie (na stali)', en: 'PFM crown on implant', p: 3500, u: 'tooth' },
      { pl: 'Korona pełnoceramiczna na implancie', en: 'All-ceramic crown on implant', p: 4000, u: 'tooth' }
    ]},
    { k: 'perio', ic: '🌿', t: { pl: 'Periodontologia', en: 'Periodontics' }, o: [
      { pl: 'Konsultacja periodontologiczna', en: 'Periodontal consultation', p: 200 },
      { pl: 'Kiretaż zamknięty', en: 'Closed curettage', p: 630, from: true },
      { pl: 'Kiretaż otwarty', en: 'Open curettage', p: 1200, from: true },
      { pl: 'Pokrycie recesji z przeszczepem dziąsła', en: 'Gum recession coverage with graft', p: 2000, from: true }
    ]},
    { k: 'white', ic: '✨', t: { pl: 'Wybielanie', en: 'Whitening' }, o: [
      { pl: 'Wybielanie w gabinecie', en: 'In-office whitening', p: 1400 },
      { pl: 'Wybielanie nakładkowe', en: 'Tray whitening (at home)', p: 1300 },
      { pl: 'Wybielanie martwego zęba (1 wizyta)', en: 'Non-vital tooth whitening (per visit)', p: 250 }
    ]}
  ]
};
