import http from 'k6/http';
import {sleep} from 'k6';

//Init 
export const options = {
   stages: [
    {duration: '30s', target:10},
    {duration: '30s', target:20}, //ramp up
    {duration: '30s', target:10}, //ramp down
   ],
};

export default function (){
    //acontecem as execuções dos VUs
    http.get('https://test.k6.io');
    sleep(1);
}
