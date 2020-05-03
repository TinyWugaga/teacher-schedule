import deepmerge from 'deepmerge';

// =============================================================================
// = Initialization
// =============================================================================

let storage = {
  available: [],
  booked: [],
};

const req = require.context('./seeds/', true, /\.(json)$/i);

req.keys().forEach((key) => {
  storage = deepmerge(storage, req(key));
})

// =============================================================================
// = Methods
// =============================================================================

export function fetch(query = {}) {
  let startAt = query.started_at;
  startAt = startAt ? new Date(startAt) : new Date;

  let endAt = getLastDayOfWeek(startAt);
  endAt = endAt.setDate(endAt.getDate() + 1);

  return new Promise((resolve, reject) => {
    console.log(reject);
    let { available, booked } = storage;

    available = available.filter((period) => isPeriodInRange(period, startAt, endAt));
    booked = booked.filter((period) => isPeriodInRange(period, startAt, endAt));

    setTimeout(() => resolve({ available, booked }), 200);
  });
}

function getLastDayOfWeek(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);
}

function isPeriodInRange(period, startAt, endAt) {
  let periodStart = new Date(period.start);
  let periodEnd = new Date(period.end);

  if (periodStart < startAt) return false;
  if (periodEnd > endAt) return false;

  return true;
}

// =============================================================================
// = Export
// =============================================================================

export default {
  fetch,
}