/** @type {import('./$types').PageServerLoad} */
import {api_url} from '$lib/stores';

export async function load() {

  const fetchExercices = async () => {
    const url = `${api_url}/exercices`;
    const exercicesResponse = await fetch(url);

    const exercicesDatas = await exercicesResponse.json();
    return exercicesDatas;
  }
 
  return {
    exercices: fetchExercices()
  }

}