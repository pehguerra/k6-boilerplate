import http from 'k6/http';
import { sleep } from 'k6';

import getHome from './home.js';
import getProduct from './product.js';


export const options = {
    scenarios: {
        foco_no_total_de_iteracoes: {
            executor: 'shared-iterations',
            vus: 10,
            iterations: 200,
            maxDuration: '2m',
        },
        foco_nas_iteracoes_por_usuario: {
            executor: 'per-vu-iterations',
            vus: 200,
            iterations: 1,
            maxDuration: '2m',
        },
        usuarios_constantes_iteracoes_ilimitadas: {
            executor: 'constant-vus',
            vus: 10,
            duration: '2m',
        },
        carga_em_estagios: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '30s', target: 10 },
                { duration: '30s', target: 10 },
                { duration: '1m', target: 0 },
            ],
            gracefulRampDown: '0s',
        },
        requisicoes_constantes_por_segundo: {
            executor: 'constant-arrival-rate',
            rate: 5, // 200 RPS, since timeUnit is the default 1s
            duration: '1m',
            preAllocatedVUs: 2,
            maxVUs: 50,
        },
        requisicoes_em_estagios_por_segundo: {
            executor: 'ramping-arrival-rate',
            startRate: 0,
            timeUnit: '1s',
            preAllocatedVUs: 2,
            maxVUs: 50,
            stages: [
                { target: 10, duration: '30s' },
                { target: 20, duration: '30s' },
                { target: 0, duration: '30s' },
            ],
        },
        carga_customizavel_via_api:
        {
            executor: 'externally-controlled',
            vus: 10,
            maxVUs: 50,
            duration: '10m',
        }
    },
};

//VU
export default function () {
    getHome();
    sleep(1);
    getProduct();
}