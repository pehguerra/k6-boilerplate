import http from 'k6/http';
import {sleep, check} from 'k6';

//init
export const url = 'http://host.docker.internal:80';

//VU
export default function (){
    const response = http.get(url);
    check(response, {
        'is in home?' : (r) => r.request.url === 'http://host.docker.internal:80',
    });
}