import http from 'k6/http';
import {sleep} from 'k6';

//init
export const url = 'http://host.docker.internal:80';

export const options = {
    vus: 10,
    duration: '30s',
    thresholds: {
        http_req_duration: ['p(95) < 1000'],
        http_req_failed: ['rate<0.01'],
    },
};

//VU
export default function (){
    http.get(url);
    sleep(1);
}