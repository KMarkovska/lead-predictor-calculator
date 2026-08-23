import { useMemo, useState } from "react";
import { calculateForecast, formatPercent, wholePeople } from "./calculator.js";
import {
  FaCalendarAlt,
  FaChartBar,
  FaFolder,
  FaFunnelDollar,
  FaTrophy,
  FaUser,
} from "react-icons/fa";

const currencySymbols = { usd: "$", eur: "€", bgn: "лв" };

const copy = {
  en: {
    language: "Language", currency: "Currency", start: "Campaign Start", end: "Campaign End", revenue: "Total Revenue", orderValue: "Avg. Order Value",
    settings: "Campaign calculator settings", forecast: "Campaign forecast", outreach: "Outreach needed by month", monthPlan: "month plan", responseAssumptions: "Conversion assumptions",
    responseRates: "Response rates", adjust: "Adjust the sliders to recalculate", leadRate: "Lead Response Rate", prospectRate: "Prospect Response Rate",
    prospects: "Prospects", leads: "Leads", customers: "Customers", month: "Month", people: "people", sixMonthPlan: "Six month plan",
  },
  bg: {
    language: "Език", currency: "Валута", start: "Начало на кампанията", end: "Край на кампанията", revenue: "Целеви оборот", orderValue: "Средна стойност на поръчка",
    settings: "Настройки на калкулатора", forecast: "Прогноза за кампанията", outreach: "Необходими контакти по месеци", monthPlan: "месечен план", responseAssumptions: "Допускания за конверсия",
    responseRates: "Проценти на отговор", adjust: "Преместете плъзгачите за ново изчисление", leadRate: "Отговор от потенциални клиенти", prospectRate: "Отговор от контакти",
    prospects: "Контакти", leads: "Потенциални клиенти", customers: "Клиенти", month: "Месец", people: "контакта", sixMonthPlan: "Шестмесечен план",
  },
};

function ResultCard({ icon: Icon, label, value, percentage, tone }) {
  return (
    <article className="result-card">
      <div className="result-card__heading">
        <span className={`icon-tile icon-tile--${tone}`}><Icon aria-hidden="true" /></span>
        <span>{label}</span>
        <strong>{percentage}</strong>
      </div>
      <output className="result-card__value">{value}</output>
      <div className="progress-track" aria-hidden="true">
        <span className={`progress-track__fill progress-track__fill--${tone}`} style={{ width: percentage }} />
      </div>
    </article>
  );
}

function Field({ label, children }) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      {children}
    </label>
  );
}

export function App() {
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("usd");
  const [startDate, setStartDate] = useState("2026-05-08");
  const [endDate, setEndDate] = useState("2026-11-04");
  const [revenue, setRevenue] = useState(10000);
  const [orderValue, setOrderValue] = useState(1000);
  const [leadRate, setLeadRate] = useState(40);
  const [prospectRate, setProspectRate] = useState(20);
  const text = copy[language];

  const forecast = useMemo(
    () => calculateForecast({ revenue, orderValue, leadRate, prospectRate, startDate, endDate }),
    [endDate, leadRate, orderValue, prospectRate, revenue, startDate],
  );

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#calculator" aria-label="LeadPredictor home">
          <span className="brand__mark"><FaFunnelDollar aria-hidden="true" /></span>
          <span>LeadPredictor</span>
        </a>

        <section className="settings-card" aria-labelledby="settings-title">
          <h1 id="settings-title" className="sr-only">{text.settings}</h1>
          <Field label={text.language}>
            <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label="Language">
              <option value="en">English</option>
              <option value="bg">Български</option>
            </select>
          </Field>
          <Field label={text.currency}>
            <select value={currency} onChange={(event) => setCurrency(event.target.value)} aria-label="Currency">
              <option value="usd">$ US Dollar</option>
              <option value="eur">€ Euro</option>
              <option value="bgn">лв Bulgarian lev</option>
            </select>
          </Field>
          <Field label={text.start}>
            <span className="input-with-icon"><input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} /><FaCalendarAlt aria-hidden="true" /></span>
          </Field>
          <Field label={text.end}>
            <span className="input-with-icon"><input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} /><FaCalendarAlt aria-hidden="true" /></span>
          </Field>
          <Field label={text.revenue}>
            <span className="money-input"><span className="money-prefix" aria-hidden="true">{currencySymbols[currency]}</span><input type="number" value={revenue} onChange={(event) => setRevenue(event.target.value)} min="0" /></span>
          </Field>
          <Field label={text.orderValue}>
            <span className="money-input"><span className="money-prefix" aria-hidden="true">{currencySymbols[currency]}</span><input type="number" value={orderValue} onChange={(event) => setOrderValue(event.target.value)} min="1" /></span>
          </Field>
        </section>
      </aside>

      <section className="dashboard" id="calculator" aria-label="Lead prediction dashboard">
        <section className="chart-card" aria-labelledby="forecast-title">
          <div className="chart-panel">
            <div className="chart-panel__title-row">
              <div>
                <p className="eyebrow">{text.forecast}</p>
                <h2 id="forecast-title">{text.outreach}</h2>
              </div>
              <span className="chart-note"><FaChartBar aria-hidden="true" /> {forecast.months} {text.monthPlan}</span>
            </div>
            <div className="bar-chart" role="img" aria-label={`${text.prospects} rise to ${forecast.prospects} ${text.people} over ${forecast.months} months`}>
              <span className="axis-title">{text.month}</span>
              <div className="chart-grid" />
              <div className="chart-bars">
                {forecast.monthlyProspects.map((amount, index) => (
                  <div className="bar-row" key={`${amount}-${index}`}>
                    <span className="bar-row__label">{index + 1}</span>
                    <span className="bar-row__bar" style={{ width: `${(amount / forecast.maxProspects) * 100}%` }}>
                      <span className="bar-row__highlight" />
                    </span>
                    <span className="bar-row__value">{amount}</span>
                  </div>
                ))}
              </div>
              <div className="chart-scale" aria-hidden="true"><span>0 {text.people}</span><span>{wholePeople(forecast.prospects / 3)} {text.people}</span><span>{wholePeople((forecast.prospects * 2) / 3)} {text.people}</span><span>{forecast.prospects} {text.people}</span></div>
            </div>
          </div>
          <div className="result-stack">
            <ResultCard icon={FaFolder} label={text.prospects} value={forecast.prospects} percentage="100%" tone="prospects" />
            <ResultCard icon={FaUser} label={text.leads} value={forecast.leads} percentage={formatPercent(forecast.leadsPercent)} tone="leads" />
            <ResultCard icon={FaTrophy} label={text.customers} value={forecast.customers} percentage={formatPercent(forecast.customersPercent)} tone="customers" />
          </div>
        </section>

        <section className="rates-card" aria-labelledby="rates-title">
          <div className="rates-card__heading">
            <div>
              <p className="eyebrow">{text.responseAssumptions}</p>
              <h2 id="rates-title">{text.responseRates}</h2>
            </div>
            <span className="rates-card__hint">{text.adjust}</span>
          </div>
          <label className="range-field">
            <span>{text.leadRate}</span>
            <input type="range" min="1" max="100" value={leadRate} onChange={(event) => setLeadRate(event.target.value)} />
            <output>{formatPercent(leadRate)}</output>
          </label>
          <label className="range-field">
            <span>{text.prospectRate}</span>
            <input type="range" min="1" max="100" value={prospectRate} onChange={(event) => setProspectRate(event.target.value)} />
            <output>{formatPercent(prospectRate)}</output>
          </label>
        </section>
      </section>
    </main>
  );
}
