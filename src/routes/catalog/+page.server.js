/** @type {import('./$types').PageServerLoad} */

export async function load() {

  const api_url = `https://pactice-strapi-cms.herokuapp.com/api`;

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