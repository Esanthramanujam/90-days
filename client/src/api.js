async function request(method, url, body) {
  const res = await fetch(url, {
    method,
    credentials: 'include',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return data;
}

export const api = {
  me: () => request('GET', '/api/me'),
  signup: (b) => request('POST', '/api/auth/signup', b),
  login: (b) => request('POST', '/api/auth/login', b),
  logout: () => request('POST', '/api/auth/logout'),
  updateMe: (b) => request('PATCH', '/api/me', b),
  checkins: () => request('GET', '/api/checkins'),
  saveCheckin: (day, b) => request('PUT', `/api/checkins/${day}`, b),
  metrics: () => request('GET', '/api/metrics'),
  addMetric: (b) => request('POST', '/api/metrics', b),
  deleteMetric: (id) => request('DELETE', `/api/metrics/${id}`),
};
