/** @type {import('./$types').PageLoad} */

import {api_url} from '$lib/stores';

export async function load({ fetch, setHeaders }) {


    const fetchSessions = async () => {
      const url = `${api_url}/sessions?populate=exercices`;
      const sessionsResponse = await fetch(url);
      setHeaders({
        'cache-control': sessionsResponse.headers.get('cache-control'),
      });
      const sessionsDatas = await sessionsResponse.json();

      console.log(sessionsDatas);

      return sessionsDatas;
    }
   
    return {
      sessions: fetchSessions(),
    }

}