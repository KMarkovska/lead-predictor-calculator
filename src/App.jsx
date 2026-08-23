import { useMemo, useState } from "react";
import {
  FaCalendarAlt,
  FaChartBar,
  FaDollarSign,
  FaFolder,
  FaFunnelDollar,
  FaTrophy,
  FaUser,
} from "react-icons/fa";

const clampRate = (rate) => Math.min(100, Math.max(1, Number(rate) || 1));
const wholePeople = (value) => Math.max(0, Math.ceil(value));

function getMonthCount(start, end) {
  const startDate = new Date(`${start}T00:00:00`);
  const endDate = new Date(`${end}T00:00:00`);
  const days = Math.max(0, (endDate - startDate) / 86_400_000);
  return Math.max(1, Math.ceil(days / 30.44));
}

function formatPercent(value) {
  return `${Number.isFinite(value) ? value.toFixed(2) : "0.00"}%`;
}

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

  const forecast = useMemo(() => {
    const customers = wholePeople(Number(revenue) / Math.max(1, Number(orderValue)));
    const leads = wholePeople((customers * 100) / clampRate(leadRate));
    const prospects = wholePeople((leads * 100) / clampRate(prospectRate));
    const months = getMonthCount(startDate, endDate);
    const monthlyProspects = Array.from({ length: months }, (_, index) => wholePeople((prospects * (index + 1)) / months));
    const maxProspects = Math.max(prospects, 1);

    return {
      customers,
      leads,
      prospects,
      months,
      monthlyProspects,
      maxProspects,
      leadsPercent: (leads / maxProspects) * 100,
      customersPercent: (customers / maxProspects) * 100,
    };
  }, [endDate, leadRate, orderValue, prospectRate, revenue, startDate]);

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#calculator" aria-label="LeadPredictor home">
          <span className="brand__mark"><FaFunnelDollar aria-hidden="true" /></span>
          <span>LeadPredictor</span>
        </a>

        <section className="settings-card" aria-labelledby="settings-title">
          <h1 id="settings-title" className="sr-only">Campaign calculator settings</h1>
          <Field label="Language">
            <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label="Language">
              <option value="en">English</option>
              <option value="bg">Bulgarian</option>
            </select>
          </Field>
          <Field label="Currency">
            <select value={currency} onChange={(event) => setCurrency(event.target.value)} aria-label="Currency">
              <option value="usd">$ US Dollar</option>
              <option value="eur">€ Euro</option>
              <option value="bgn">лв Bulgarian lev</option>
            </select>
          </Field>
          <Field label="Campaign Start">
            <span className="input-with-icon"><input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} /><FaCalendarAlt aria-hidden="true" /></span>
          </Field>
          <Field label="Campaign End">
            <span className="input-with-icon"><input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} /><FaCalendarAlt aria-hidden="true" /></span>
          </Field>
          <Field label="Total Revenue">
            <span className="money-input"><FaDollarSign aria-hidden="true" /><input type="number" value={revenue} onChange={(event) => setRevenue(event.target.value)} min="0" /></span>
          </Field>
          <Field label="Avg. Order Value">
            <span className="money-input"><FaDollarSign aria-hidden="true" /><input type="number" value={orderValue} onChange={(event) => setOrderValue(event.target.value)} min="1" /></span>
          </Field>
        </section>
      </aside>

      <section className="dashboard" id="calculator" aria-label="Lead prediction dashboard">
        <section className="chart-card" aria-labelledby="forecast-title">
          <div className="chart-panel">
            <div className="chart-panel__title-row">
              <div>
                <p className="eyebrow">Campaign forecast</p>
                <h2 id="forecast-title">Outreach needed by month</h2>
              </div>
              <span className="chart-note"><FaChartBar aria-hidden="true" /> {forecast.months} month plan</span>
            </div>
            <div className="bar-chart" role="img" aria-label={`Prospects rise to ${forecast.prospects} people over ${forecast.months} months`}>
              <span className="axis-title">Month</span>
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
              <div className="chart-scale" aria-hidden="true"><span>0 people</span><span>{wholePeople(forecast.prospects / 3)} people</span><span>{wholePeople((forecast.prospects * 2) / 3)} people</span><span>{forecast.prospects} people</span></div>
            </div>
          </div>
          <div className="result-stack">
            <ResultCard icon={FaFolder} label="Prospects" value={forecast.prospects} percentage="100%" tone="prospects" />
            <ResultCard icon={FaUser} label="Leads" value={forecast.leads} percentage={formatPercent(forecast.leadsPercent)} tone="leads" />
            <ResultCard icon={FaTrophy} label="Customers" value={forecast.customers} percentage={formatPercent(forecast.customersPercent)} tone="customers" />
          </div>
        </section>

        <section className="rates-card" aria-labelledby="rates-title">
          <div className="rates-card__heading">
            <div>
              <p className="eyebrow">Conversion assumptions</p>
              <h2 id="rates-title">Response rates</h2>
            </div>
            <span className="rates-card__hint">Adjust the sliders to recalculate</span>
          </div>
          <label className="range-field">
            <span>Lead Response Rate</span>
            <input type="range" min="1" max="100" value={leadRate} onChange={(event) => setLeadRate(event.target.value)} />
            <output>{formatPercent(leadRate)}</output>
          </label>
          <label className="range-field">
            <span>Prospect Response Rate</span>
            <input type="range" min="1" max="100" value={prospectRate} onChange={(event) => setProspectRate(event.target.value)} />
            <output>{formatPercent(prospectRate)}</output>
          </label>
        </section>
      </section>
    </main>
  );
}
