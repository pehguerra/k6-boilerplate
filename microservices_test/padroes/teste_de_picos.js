import http from 'k6/http';
import { sleep } from 'k6';

export const url = 'http://host.docker.internal:80';

export const options = {
    stages: [
        { duration: '10s', target: 3 }, //Abaixo da carga normal
        { duration: '1m', target: 3 },
        { duration: '10s', target: 14 }, // pico para 1400 usuários
        { duration: '3m', target: 14 }, // mantém os 14 usuários por 3 minutos
        { duration: '10s', target: 3 }, // ramp-down. Recuperação.
        { duration: '3m', target: 3 },
        { duration: '10s', target: 0 },
    ],
};

//VU
export default function () {
    http.get(url);
    sleep(1);
}