export const clampRate = (rate) => Math.min(100, Math.max(1, Number(rate) || 1));
export const wholePeople = (value) => Math.max(0, Math.ceil(value));

export function getMonthCount(start, end) {
  const startDate = new Date(`${start}T00:00:00`);
  const endDate = new Date(`${end}T00:00:00`);
  const days = Math.max(0, (endDate - startDate) / 86_400_000);
  return Math.max(1, Math.ceil(days / 30.44));
}

export function calculateForecast({ revenue, orderValue, leadRate, prospectRate, startDate, endDate }) {
  const customers = wholePeople(Number(revenue) / Math.max(1, Number(orderValue)));
  const leads = wholePeople((customers * 100) / clampRate(leadRate));
  const prospects = wholePeople((leads * 100) / clampRate(prospectRate));
  const months = getMonthCount(startDate, endDate);
  const monthlyProspects = Array.from(
    { length: months },
    (_, index) => wholePeople((prospects * (index + 1)) / months),
  );
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
}

export function formatPercent(value) {
  return `${Number.isFinite(value) ? value.toFixed(2) : "0.00"}%`;
}
