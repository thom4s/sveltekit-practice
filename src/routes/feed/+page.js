/** @type {import('./$types').PageLoad} */

export async function load({ fetch, setHeaders }) {

    const api_url = `https://pactice-strapi-cms.herokuapp.com/api`

    const fetchSessions = async () => {
      const url = `${api_url}/sessions`;
      const sessionsResponse = await fetch(url);
      setHeaders({
        'cache-control': sessionsResponse.headers.get('cache-control'),
      });
      const sessionsDatas = await sessionsResponse.json();
      return sessionsDatas;
    }
   

    const fetchExercices = async () => {
      const url = `${api_url}/exercices`;
      const exercicesResponse = await fetch(url);

      const exercicesDatas = await exercicesResponse.json();
      return exercicesDatas;
    }

   
    return {
      sessions: fetchSessions(),
      exercices: fetchExercices()
    }

}