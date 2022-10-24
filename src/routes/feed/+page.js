/** @type {import('./$types').PageLoad} */
import { userName, userToken } from '$lib/stores.js';
import {api_url} from '$lib/stores';

console.log(userName);

export async function load({ fetch, setHeaders }) {


    const fetchSessions = async () => {

      const url = `${api_url}/sessions?populate=exercices`;
      
      const sessionsResponse = await fetch(url);
      setHeaders({
        'cache-control': sessionsResponse.headers.get('cache-control'),
      });

      const sessionsDatas = await sessionsResponse.json();
      return sessionsDatas;
      
    }
   
    return {
      sessions: fetchSessions(),
    }

}