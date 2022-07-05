import https from 'k6/https';
import {sleep} from 'k6';

//Init 

export default function (){
    //acontecem as execuções dos VUs
    https.get('https://test.k6.io');
    sleep(1);
}
