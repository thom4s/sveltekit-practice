import {invalid, redirect} from '@sveltejs/kit';

let exercices = [];
const api_url = `https://pactice-strapi-cms.herokuapp.com/api`

export const load = () => {

    const fetchExercices = async () => {
        const url = `${api_url}/exercices`;
        const exercicesResponse = await fetch(url);
    
        const exercicesDatas = await exercicesResponse.json();
        return exercicesDatas;
    }
     
    return {
        dbExercices: fetchExercices(),
        exercices
    }
    
}

export const actions = {

    addSession: async ({request}) => {

        const formData = await request.formData();
        const name = formData.get('name');
        const date = formData.get('date');
        const userID = formData.get('userID');
        const jwt = formData.get('jwt');

        // FOR REMOTE (STRAPI PROD) STORAGE

        const addSessionToStrapi = async () => {

            const url = `${api_url}/sessions`;
            
            const newSessionDatasForStrapi = {
                data: {
                    name,
                    date,
                    user: [userID],
                    exercices: [1, 2]
                }
            }
            console.log(JSON.stringify(newSessionDatasForStrapi));

            // request options
            const options = {
                method: 'POST',
                body: JSON.stringify(newSessionDatasForStrapi),
                headers: {
                    'Content-Type': 'application/json', 
                    Accept: 'application/json',
                    Authorization: `Bearer ${jwt}`,
                }
            }
            // send POST request
            const submission = await fetch(url, options);
            const submissionResponse = await submission.json();
            console.log( submissionResponse );

        }

        await addSessionToStrapi();

        return {
            success: true
        }
    },


    addExercice: async ({request}) => {

        const formData = await request.formData();
        const name = formData.get('name');
        const userID = formData.get('userID');
        const level = formData.get('level');
        const jwt = formData.get('jwt');

        if( name.length < 3 ) {
            return invalid(400, {
                error: true,
                message: "Name must be at least 3 chars",
                name,
                level,
            })
        }


        // FOR LOCAL STORAGE / DISPLAY
        // TODO: KEEPING ? ELSE ? 
        const id = crypto.randomUUID();

        const exercice = {
            id,
            name,
            level,
            user: 'thomas'
        }
        exercices.push(exercice);



        // FOR REMOTE (STRAPI PROD) STORAGE

        const addExercicesToStrapi = async () => {

            const url = `${api_url}/exercices`;
        
            
            const newExoForStrapi = {
                data: {
                    name,
                    level,
                    user: [userID]
                }
            }
            console.log(JSON.stringify(newExoForStrapi));

            // request options
            const options = {
                method: 'POST',
                body: JSON.stringify(newExoForStrapi),
                headers: {
                    'Content-Type': 'application/json', 
                    Accept: 'application/json',
                    Authorization: `Bearer ${jwt}`,
                }
            }
            // send POST request
            const submission = await fetch(url, options);
            const submissionResponse = await submission.json();
            console.log( submissionResponse );

        }

        await addExercicesToStrapi();

        return {
            success: true
        }
    },

    delete: async ({request}) => {
        const formData = await request.formData();
        const id = formData.get('exerciceID');
        const jwt = formData.get('jwt');

        // FOR REMOTE (STRAPI PROD) STORAGE

        const deleteExercicesFromStrapi = async () => {

            const url = `${api_url}/exercices/${id}`;

            // request options
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${jwt}`,
                }
            }
            // send POST request
            const submission = await fetch(url, options);
            const submissionResponse = await submission.json();

        }

        await deleteExercicesFromStrapi();

        return {
            success: true,
        }
    },

    remove: async ({request}) => {
        const formData = await request.formData();
        const id = formData.get('id');

        exercices = exercices.filter( exercice => exercice.id != id);

        return {
            success: true,
        }
    }
}