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
        const level = formData.get('level');

        if( name.length < 3 ) {
            return invalid(400, {
                error: true,
                message: "Name must be at least 3 chars",
                name,
                level,
            })
        }

        const id = crypto.randomUUID();

        const exercice = {
            id,
            name,
            level,
        }
        exercices.push(exercice);

        const addExercices = async () => {

            const url = `${api_url}/exercices`;
        
            const newExoForStrapi = {
                data: {
                    name,
                    level,
                }
            }
            // request options
            const options = {
                method: 'POST',
                body: JSON.stringify(newExoForStrapi),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            // send POST request
            fetch(url, options)
                .then(res => res.json())
                .then(res => console.log('res:', res))
        }

        await addExercices();

        return {
            success: true
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