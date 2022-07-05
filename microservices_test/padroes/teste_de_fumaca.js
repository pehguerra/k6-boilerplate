import http from 'k6/http';
import {sleep, check} from 'k6';

export const url = 'http://host.docker.internal:80';

export const options = {
    vus: 1,
    duration: '5m',
    thresholds: {
        http_req_duration: ['p(95) < 1000'],
        http_req_failed: ['rate<0.01'],
        checks: ['rate>0.99']
    },
};

//VU
export default function (){
    const response = http.get(url);
    check(response, {
        'is status 200' : (r) => r.status === 200,
    });
}