import {
  FaCalendarAlt,
  FaChartBar,
  FaDollarSign,
  FaFolder,
  FaFunnelDollar,
  FaTrophy,
  FaUser,
} from "react-icons/fa";

const monthlyProspects = [22, 42, 63, 82, 103, 125];

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
            <select defaultValue="en" aria-label="Language">
              <option value="en">English</option>
              <option value="bg">Bulgarian</option>
            </select>
          </Field>
          <Field label="Currency">
            <select defaultValue="usd" aria-label="Currency">
              <option value="usd">$ US Dollar</option>
              <option value="eur">€ Euro</option>
              <option value="bgn">лв Bulgarian lev</option>
            </select>
          </Field>
          <Field label="Campaign Start">
            <span className="input-with-icon"><input type="date" defaultValue="2026-05-08" /><FaCalendarAlt aria-hidden="true" /></span>
          </Field>
          <Field label="Campaign End">
            <span className="input-with-icon"><input type="date" defaultValue="2026-11-04" /><FaCalendarAlt aria-hidden="true" /></span>
          </Field>
          <Field label="Total Revenue">
            <span className="money-input"><FaDollarSign aria-hidden="true" /><input type="number" defaultValue="10000" min="0" /></span>
          </Field>
          <Field label="Avg. Order Value">
            <span className="money-input"><FaDollarSign aria-hidden="true" /><input type="number" defaultValue="1000" min="1" /></span>
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
              <span className="chart-note"><FaChartBar aria-hidden="true" /> Six month plan</span>
            </div>
            <div className="bar-chart" role="img" aria-label="Prospects rise from 22 people in month one to 125 people in month six">
              <span className="axis-title">Month</span>
              <div className="chart-grid" />
              <div className="chart-bars">
                {monthlyProspects.map((amount, index) => (
                  <div className="bar-row" key={amount}>
                    <span className="bar-row__label">{index + 1}</span>
                    <span className="bar-row__bar" style={{ width: `${amount / 1.25}%` }}>
                      <span className="bar-row__highlight" />
                    </span>
                    <span className="bar-row__value">{amount}</span>
                  </div>
                ))}
              </div>
              <div className="chart-scale" aria-hidden="true"><span>0 people</span><span>40 people</span><span>80 people</span><span>120 people</span></div>
            </div>
          </div>
          <div className="result-stack">
            <ResultCard icon={FaFolder} label="Prospects" value="125" percentage="100%" tone="prospects" />
            <ResultCard icon={FaUser} label="Leads" value="25" percentage="20%" tone="leads" />
            <ResultCard icon={FaTrophy} label="Customers" value="10" percentage="8%" tone="customers" />
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
            <input type="range" min="1" max="100" defaultValue="40" />
            <output>40.00%</output>
          </label>
          <label className="range-field">
            <span>Prospect Response Rate</span>
            <input type="range" min="1" max="100" defaultValue="20" />
            <output>20.00%</output>
          </label>
        </section>
      </section>
    </main>
  );
}
