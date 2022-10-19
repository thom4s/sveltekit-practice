/** @type {import('./$types').PageServerLoad} */

export async function load() {
  
  const fetchExercices = async () => {
    const url = `http://localhost:1337/api/exercices`;
    const exercicesResponse = await fetch(url);

    const exercicesDatas = await exercicesResponse.json();
    return exercicesDatas;
  }
 
  return {
    exercices: fetchExercices()
  }

}