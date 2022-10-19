/** @type {import('./$types').PageLoad} */

export async function load({ fetch, setHeaders }) {

  
    const fetchSessions = async () => {
      const url = `http://localhost:1337/api/sessions`;
      const sessionsResponse = await fetch(url);
      setHeaders({
        'cache-control': sessionsResponse.headers.get('cache-control'),
      });
      const sessionsDatas = await sessionsResponse.json();
      return sessionsDatas;
    }
   

    const fetchExercices = async () => {
      const url = `http://localhost:1337/api/exercices`;
      const exercicesResponse = await fetch(url);

      const exercicesDatas = await exercicesResponse.json();
      return exercicesDatas;
    }

   
    return {
      sessions: fetchSessions(),
      exercices: fetchExercices()
    }

}