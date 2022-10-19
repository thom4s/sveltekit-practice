export const load = ({fetch, params}) => {
    console.log(params);

    const fetchSession = async (id) => {
        const url = `http://localhost:1337/api/exercices/${id}`;
        const exoResponse = await fetch(url);
        const exoDatas = await exoResponse.json();
        return exoDatas;
    }

    return {
        exercice: fetchSession(params.exoId)
    }

}