import {invalid, redirect} from '@sveltejs/kit';
import {api_url} from '$lib/stores';

let exercices = [];
let exercicesIDs = [];

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

            const urlForSession = `${api_url}/sessions?populate=%2A`;
            
            const newSessionDatasForStrapi = {
                data: {
                    name,
                    date,
                    relations: {
                        user: userID
                    },
                    exercices: exercicesIDs
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
            const submission = await fetch(urlForSession, options);
            const submissionResponse = await submission.json();
            console.log( submissionResponse );
            exercices = []
            exercicesIDs = []
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
            users_permissions_user: userID
        }
        exercices.push(exercice);



        // FOR REMOTE (STRAPI PROD) STORAGE

        const addExercicesToStrapi = async () => {

            const urlForExo = `${api_url}/exercices?populate=%2A`;
        
            const newExoForStrapi = {
                data: {
                    name,
                    level,
                    relations: {
                        user: userID
                    },
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
            const submission = await fetch(urlForExo, options);
            const submissionResponse = await submission.json();
            console.log( submissionResponse );
            exercicesIDs.push( submissionResponse.data.id);
            console.log(exercicesIDs);

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

            const urlForExo = `${api_url}/exercices/${id}`;
            console.log(jwt);

            // request options
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${jwt}`,
                }
            }
            // send POST request
            const submission = await fetch(urlForExo, options);
            const submissionResponse = await submission.json();
            console.log(submissionResponse);
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
        exercicesIDs = exercicesIDs.filter( value => value != id);

        console.log(exercicesIDs);

        return {
            success: true,
        }
    }
}