# LeadPredictor Calculator

Интерактивен калкулатор за планиране на outreach кампания. Приложението пресъздава предоставената референция: тъмен dashboard с настройки на кампанията, прогнозна графика и три основни резултата.

<img width="1887" height="932" alt="image" src="https://github.com/user-attachments/assets/9ddf360c-4b82-4984-84a4-f25f72bf8c31" />

Отвори проекта в Netlify: https://lead-predictor-calculator-kmarkovska.netlify.app/

## Какво изчислява

- **Клиенти** = Целеви оборот / Средна стойност на поръчка
- **Потенциални клиенти (leads)** = Клиенти × 100 / Процент отговор от потенциални клиенти
- **Контакти (prospects)** = Потенциални клиенти × 100 / Процент отговор от контакти

Резултатите се закръгляват нагоре, защото част от човек не може да бъде цел на кампания. Графиката разпределя нужните контакти между избраните начална и крайна дата.

## Функционалности

- Моментално преизчисляване при промяна на оборот, средна стойност на поръчка и двата процента.
- Избор на валута и превод на интерфейса на български/английски.
- Адаптивен изглед за телефон, таблет и настолен екран.
- Автоматични тестове за примерните формули и гранични случаи.

## Стартиране локално

```bash
npm install
npm run dev
```

Проверки преди публикуване:

```bash
npm test
npm run build
npm run test:sites
```

## Технологии

React, Vite, Font Awesome icons чрез `react-icons`.

----------------------------------------------------------------------------------------------------------------
# LeadPredictor Calculator

An interactive calculator for forecasting the required number of customers, leads, and prospects based on a revenue target, average order value, and response rates.

Open the live Netlify project: https://lead-predictor-calculator-kmarkovska.netlify.app/

## Formulas

Customers = Revenue / Average Order Value

Leads = Customers × 100 / Lead Response Rate

Prospects = Leads × 100 / Prospect Response Rate

## Features

Automatic recalculation when values change

English and Bulgarian language options

Currency selection

Six-month forecast chart

Interactive response-rate sliders

## Technologies

The project is built with React and Vite.
