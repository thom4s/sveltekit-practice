export const load = ({fetch, params}) => {
    console.log(params);

    const api_url = `https://pactice-strapi-cms.herokuapp.com/api`

    const fetchSession = async (id) => {
        const url = `${api_url}/api/exercices/${id}`;
        const exoResponse = await fetch(url);
        const exoDatas = await exoResponse.json();
        return exoDatas;
    }

    return {
        exercice: fetchSession(params.exoId)
    }

}