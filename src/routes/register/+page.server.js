import {invalid, redirect} from '@sveltejs/kit';

const api_url = `https://pactice-strapi-cms.herokuapp.com/api`


export const actions = {
    register: async ({request}) => {
        const formData = await request.formData();
        const username = formData.get('username');
        const email = formData.get('email');
        const confirmedEmail = formData.get('confirmedEmail');
        const password = formData.get('password');

        if( email !== confirmedEmail ) {
            return invalid(400, {
                error: true,
                message: "email are not matching...",
            })
        }

        const registerUser = async () => {

            const url = `${api_url}/auth/local/register`;
        
            const userRegistrationDatas = {
                username,
                email,
                password
            }
            // request options
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(userRegistrationDatas),
            }
            // send POST request
            fetch(url, options)
                .then(res => res.json())
                .then(response => {
                    console.log( response )

                    // TODO: ADD ERRORS MESSAGES ON FRONT..
                    if( response.error) {
                        return {
                            msg: response.error.message

                        }
                    }
                
                    console.log('User profile', response.user);
                    console.log('User token', response.jwt);
                })
                .catch(error => console.error("error:", error));
        }

        await registerUser();

        return {
            success: true
        }
    }

}