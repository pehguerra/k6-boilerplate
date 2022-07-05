import http from 'k6/http';
import {sleep, check} from 'k6';

export const url = 'http://host.docker.internal:80';

export const options = {
    stages: [
        { duration: '5m', target: 10 }, // Ramp-up até 10 usuários
        { duration: '10m', target: 10 }, // mantém 10 usuários por 10 minutos
        { duration: '5m', target: 0 }, // ramp-down to 0 users
    ],
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