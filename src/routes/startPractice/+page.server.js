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

    add: async ({request}) => {

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

        const addExercices = async () => {

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

        await addExercices();

        return {
            success: true
        }
    },

    delete: async ({request}) => {
        const formData = await request.formData();
        const id = formData.get('exerciceID');
        const jwt = formData.get('jwt');

        // FOR REMOTE (STRAPI PROD) STORAGE

        const deleteExercices = async () => {

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

        await deleteExercices();

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