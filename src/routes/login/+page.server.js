import {invalid, redirect} from '@sveltejs/kit';
import { userName, userToken } from '$lib/stores.js';


const api_url = `https://pactice-strapi-cms.herokuapp.com/api`;

export const actions = {
    login: async ({request}) => {
        const formData = await request.formData();
        const username = formData.get('username');
        const password = formData.get('password');

        const loginUser = async () => {

            const url = `${api_url}/auth/local`;
        
            const userRegistrationDatas = {
                identifier: username,
                password
            }

            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(userRegistrationDatas),
            }

            return fetch(url, options)
                .then(res => res.json())
                .then(response => {
                    console.log('there is a response...');
                    console.log( response )
                    
                    if( response.error ) {
                        return {
                            error: true,
                            name: response.error.name,
                            message: response.error.message
                        }
                    }

                    const {user, jwt } = response;

                    return {
                        error: false,
                        user,
                        jwt,
                        message: "you are log in !"
                    }

                })
                .catch(error => {
                    console.log('error');

                    return {
                        error,
                        message: "Something's wrong here"
                    }
                });

        }


        return {
            data: await loginUser(),
            message: "hey"
        }
        
    },

    logout: async ({request}) => {
        
    }

}