import assert from "node:assert/strict";
import test from "node:test";
import { calculateForecast, getMonthCount } from "../src/calculator.js";

test("calculates the supplied example correctly", () => {
  const result = calculateForecast({
    revenue: 10000,
    orderValue: 1000,
    leadRate: 40,
    prospectRate: 20,
    startDate: "2026-05-08",
    endDate: "2026-11-04",
  });

  assert.equal(result.customers, 10);
  assert.equal(result.leads, 25);
  assert.equal(result.prospects, 125);
  assert.equal(result.months, 6);
  assert.deepEqual(result.monthlyProspects, [21, 42, 63, 84, 105, 125]);
});

test("rounds partial people up and keeps response rates safe", () => {
  const result = calculateForecast({
    revenue: 999,
    orderValue: 500,
    leadRate: 0,
    prospectRate: 200,
    startDate: "2026-05-08",
    endDate: "2026-05-08",
  });

  assert.equal(result.customers, 2);
  assert.equal(result.leads, 200);
  assert.equal(result.prospects, 200);
  assert.equal(result.months, 1);
});

test("uses at least one month for invalid or same-day dates", () => {
  assert.equal(getMonthCount("2026-11-04", "2026-05-08"), 1);
  assert.equal(getMonthCount("2026-05-08", "2026-05-08"), 1);
});
