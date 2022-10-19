export const load = ({fetch, params}) => {
    console.log(params);

    const api_url = `https://pactice-strapi-cms.herokuapp.com/api`

    const fetchSession = async (id) => {
        const url = `${api_url}/sessions/${id}`;
        const sessionResponse = await fetch(url);
        const sessionDatas = await sessionResponse.json();
        return sessionDatas;
    }

    return {
        session: fetchSession(params.sessionId)
    }

}