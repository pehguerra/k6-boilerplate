import http from 'k6/http';
import {sleep} from 'k6';

import getHome from './home.js';
import getProduct from './product.js';


export const options = {
    vus: 2,
    duration: '1m',
};

//VU
export default function (){
    getHome();
    sleep(1);
    getProduct();
}