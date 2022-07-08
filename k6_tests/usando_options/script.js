import http from 'k6/http';
import {sleep} from 'k6';

//Init 
export const options = {
    vus: 10,
    duration: '30s',
};

export default function (){
    //acontecem as execuções dos VUs
    http.get('https://test.k6.io');
    sleep(1);
}
