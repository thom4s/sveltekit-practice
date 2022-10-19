export const load = ({fetch, params}) => {
    console.log(params);

    const fetchSession = async (id) => {
        const url = `http://localhost:1337/api/sessions/${id}`;
        const sessionResponse = await fetch(url);
        const sessionDatas = await sessionResponse.json();
        return sessionDatas;
    }

    return {
        session: fetchSession(params.sessionId)
    }

}