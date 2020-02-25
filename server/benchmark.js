import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 1000,
  duration: "300s"
};

// READ
export default function() {
  const id = Math.round(Math.random() * 10000000);
  const res = http.get(`http://localhost:3002/api/v1/properties/${id}`);

  check(res, {
    "status was 200": res => res.status === 200,
    "transaction time OK": res => res.timings.duration < 2000
  });
  sleep(1);
}

// WRITE TEST
export default function() {
  let property = {
    price: 3487975,
    beds: 4,
    baths: 2.5,
    sqft: 1234,
    address: '123 fake st.',
    zip: 99999,
    city: 'San Francisco',
    state: 'CA',
    status: 'For Sale',
    tour_active: true,
    owner_id: Math.floor(Math.random() * 5000000),
    agent_id: `{${Math.floor(Math.random() * 5000000)},${Math.floor(
      Math.random() * 5000000
    )}}`
  };

  let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
  let res = http.post(
    "http://localhost:3002/api/v1/properties/new",
    JSON.stringify(property),
    { headers: headers }
  );
  check(res, {
    "status was 200": res => res.status === 200,
    "transaction time OK": res => res.timings.duration < 200
  });
  sleep(1);
}