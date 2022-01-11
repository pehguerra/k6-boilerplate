import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
    stages: [
        // ramp-up from 1 to 15 VUs in 10s
        { duration: '15s', target: 10 },

        // stay at rest on 15 VUs for 15s
        { duration: '25s', target: 25 },

        // ramp-down from 15 to 0 VUs in 10s
        { duration: '10s', target: 0 }
    ],
    thresholds: {
        // throws error if more than 90% of the requests takes more than 2 seconds to be completed
        http_req_duration: [
            {
                threshold: 'p(90) < 15000',
                abortOnFail: true,
                delayAbortEval: 100
            }
        ]
    }
}

export default function() {
    const response = http.get('http://conexaoqa.herokuapp.com/api/profile')
    check(response, { "status is 200": (r) => r.status === 200 })
    sleep(.300)
}