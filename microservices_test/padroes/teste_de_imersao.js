import http from 'k6/http';
import { sleep } from 'k6';

export const url = 'http://host.docker.internal:80';

export const options = {
    stages: [
        { duration: '2m', target: 14 }, // ramp up até 14 usuários
        { duration: '10m', target: 14 }, // mantém 14 usuários por 10 minutos
        { duration: '2m', target: 0 }, // ramp-down (opcional)
    ],
};

//VU
export default function () {
    http.get(url);
    sleep(1);
}