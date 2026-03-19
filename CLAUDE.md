# DressCode — Контекст проекта

## Что за проект
Сайт для **DressCode** — крупнейшей сети ателье по ремонту одежды в Мурино, Ленинградская область.
- Один лендинг на всю сеть (один файл `index.html`)
- Язык: **только русский**
- Целевая аудитория: **женщины** — сайт должен быть лёгким, воздушным, не тяжёлым
- Бронирование: **только звонки**, онлайн-записи нет

## Живой сайт
- **GitHub Pages:** https://skachkov13kirill-hub.github.io/dresscode-murino/
- **GitHub репо:** https://github.com/skachkov13kirill-hub/dresscode-murino
- Аккаунт GitHub: `skachkov13kirill-hub`

## Структура файлов
```
index.html          — главный файл, весь сайт
css/style.css       — все стили
js/main.js          — весь JS (12 модулей)
images/
  logo.png          — логотип (тёмно-синий фон, золотая корона, розовая надпись)
  favicon.svg       — фавиконка (буква D, navy+gold)
  interior/         — interior-1.jpg … interior-23.jpg (фото ателье Девяткино)
  before-after/     — ba-1.png … ba-27.jpg (фото до/после)
robots.txt
sitemap.xml
CLAUDE.md           — этот файл
```

## Цветовая палитра
```css
--navy:        #4A6FA5;   /* светлый slate blue */
--navy-dark:   #365A8C;
--gold:        #C5A55A;   /* основной акцент */
--gold-light:  #D4B978;
--bg:          #FDFCF8;   /* тёплый белый */
--bg-light:    #F2EBE0;   /* тёплый крем */
--text:        #2D3748;
--text-muted:  #64748B;
```
- Тяжёлые тёмные секции (`#1B2A4A`): equipment-section, cta-block, footer — **не менять**
- Логотип: всегда в тёмно-синей таблетке (`background: #1B2A4A`) — так видно оригинальные цвета

## Шрифты
- **Cormorant Garamond** — заголовки H1/H2
- **Oswald** — все числа и цифры (trust bar, цены, нумерация карточек)
- **Montserrat** — UI, кнопки, метки
- **Inter** — основной текст

## Филиалы (11 штук, все в Мурино, м. Девяткино)
| Адрес | Телефон | Часы |
|-------|---------|------|
| Екатерининская, 8 к1 | +7 993 968-23-07 | 11–22 |
| Екатерининская, 17 | +7 993 073-07-23 | 11–20 |
| Воронцовский б-р, 20 к1 | +7 966 930-74-73 | 12–20 |
| Воронцовский б-р, 8 | +7 995 911-68-95 | 10–20 |
| Воронцовский б-р, 22 | +7 995 234-68-95 | 10–20 |
| Петровский б-р, 14 к5 | +7 995 625-68-95 | 10–20 |
| б-р Менделеева, 16 | +7 981 909-68-85 | 10–20 |
| Охтинская аллея, 16 | +7 911 220-46-20 | 10–20 |
| Арсенальная, 6 | +7 995 233-68-95 | 10–20 |
| Графская, 4 | +7 995 236-68-95 | 10–20 |
| Графская, 11 | +7 952 289-67-02 | 11–20 |

## Ключевые факты
- Основана: **2017**
- Выполнено заказов: **71 658**
- Рейтинг: **4.9 в Яндексе**
- Слоган: «Крупнейшая сеть ателье Ленинградской области»

## Структура сайта (секции по порядку)
1. **Header** — фиксированный, прозрачный → navy при скролле. Кнопка "Позвонить" открывает dropdown со всеми 11 филиалами
2. **Hero** — фото интерьера на фоне, H1 с ключевым запросом
3. **Trust Bar** — 4 счётчика: 11 филиалов / 71658 заказов / с 2017 / №1 сеть
4. **Brands Strip** — Janome, Jack, Brother, Juki, Singer
5. **Services** — 8 карточек услуг
6. **Why** (`section--why`) — 5 карточек "Нам доверяют вещи", светлый фон, белые карточки
7. **Gallery** — только фото до/после с фильтрами + lightbox
8. **Equipment** (`equipment-section`) — тёмно-синяя секция, горизонтальная лента фото интерьера
9. **Pricing** — 6 категорий цен. Кнопка "Уточнить стоимость у мастера" → тот же dropdown
10. **Testimonials** — 6 отзывов
11. **Branches** — 11 карточек филиалов с телефонами и ссылками на Яндекс.Карты
12. **FAQ** — 5 вопросов, native `<details>`
13. **CTA Block** — тёмная секция, кнопка "Позвонить сейчас" → тот же dropdown
14. **Footer** — логотип, навигация, режим работы
15. **Mobile Sticky Bar** — кнопка "Позвонить" → dropdown, кнопка "Филиалы" → якорь

## Кнопка "Позвонить" — как работает
Везде (header, sticky bar, pricing, CTA) открывает один `#callPanel` — список всех 11 филиалов с tel: ссылками. На мобильном — bottom sheet с backdrop. ID кнопок: `callTrigger`, `mobileCallBtn`, `ctaCallBtn`, `pricingCallBtn`.

## JS модули (js/main.js)
1. Scroll reveal (IntersectionObserver)
2. Header shrink/transparent on scroll
3. Mobile burger menu
4. Smooth scroll
5. Animated counters (Oswald, easeOut, ru-RU locale)
6. Gallery filter
7. Gallery lightbox
8. Testimonials carousel
9. FAQ accordion
10. Active nav link
11. Lazy Yandex map
12. Call dropdown / bottom sheet

## Правила разработки
- **Только звонки** — никаких форм онлайн-записи
- **Яндекс**, не Google — карты, рейтинги, метрика
- **Все цены "от"** — точная стоимость у мастера
- Логотип менять нельзя — только фон вокруг него
- Мобильный sticky bar всегда внизу на телефоне
- `git push` после каждого изменения → автодеплой на GitHub Pages

## SEO
- Canonical: `https://skachkov13kirill-hub.github.io/dresscode-murino/`
- Schema.org: ClothingStore, aggregateRating 4.9, areaServed Мурино
- sitemap.xml и robots.txt есть
- H1 содержит "Ремонт одежды в Мурино"
