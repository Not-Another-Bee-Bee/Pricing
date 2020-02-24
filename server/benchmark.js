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
    "status was 200": r => r.status === 200,
    "transaction time OK": r => r.timings.duration < 2000
  });
  sleep(1);
}

$ k6 run benchmark.js

          /\      |‾‾|  /‾‾/  /‾/
     /\  /  \     |  |_/  /  / /
    /  \/    \    |      |  /  ‾‾\
   /          \   |  |‾\  \ | (_) |
  / __________ \  |__|  \__\ \___/ .io

  execution: local
     output: -
     script: benchmark.js

    duration: 5m0s, iterations: -
         vus: 1000, max: 1000

    done [==========================================================] 5m0s / 5m0s

    ✗ status was 200
     ↳  99% — ✓ 219554 / ✗ 48
    ✗ transaction time OK
     ↳  98% — ✓ 215497 / ✗ 4105

    checks.....................: 99.05% ✓ 434955 ✗ 4153
    data_received..............: 97 MB  324 kB/s
    data_sent..................: 23 MB  77 kB/s
    http_req_blocked...........: avg=480.96µs min=0s med=4µs      max=1.33s   p(90)=9µs      p(95)=13µs
    http_req_connecting........: avg=471.88µs min=0s med=0s       max=1.26s   p(90)=0s       p(95)=0s
    http_req_duration..........: avg=362.95ms min=0s med=177.03ms max=5.43s   p(90)=812.31ms p(95)=1.38s
    http_req_receiving.........: avg=61.37µs  min=0s med=51µs     max=12.05ms p(90)=86µs     p(95)=110µs
    http_req_sending...........: avg=29.12µs  min=0s med=14µs     max=34.74ms p(90)=29µs     p(95)=39µs
    http_req_tls_handshaking...: avg=0s       min=0s med=0s       max=0s      p(90)=0s       p(95)=0s
    http_req_waiting...........: avg=362.86ms min=0s med=176.95ms max=5.43s   p(90)=812.22ms p(95)=1.38s
    http_reqs..................: 219554 731.846106/s
    iteration_duration.........: avg=1.36s    min=1s med=1.17s    max=6.43s   p(90)=1.8s     p(95)=2.37s
    iterations.................: 219228 730.759441/s
    vus........................: 1000   min=1000 max=1000
    vus_max....................: 1000   min=1000 max=1000

