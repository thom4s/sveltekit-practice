import { invalid, redirect } from '@sveltejs/kit';

const api_url = `https://pactice-strapi-cms.herokuapp.com/api`;

export const actions = {
    register: async ({request}) => {
        
        // GET DATAS FROM FORM
        const formData = await request.formData();
        const username = formData.get('username');
        const email = formData.get('email');
        const confirmedEmail = formData.get('confirmedEmail');
        const password = formData.get('password');


        // MY VALIDATIONS
        if( email !== confirmedEmail ) {
            return {
                data: {
                    error: true,
                    message: "email are not matching...",
                    username, 
                    email
                }
            }
        }


        // REGISTER FUNC
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
            return fetch(url, options)
                .then(res => res.json())
                .then(response => {
                    console.log('response:', response )
                    console.log('response.error:', response.error )

                    // There is an error
                    if( response.error) {
                        return {
                            error: true,
                            name: response.error.name,
                            message: response.error.message,
                            details: response.error.details,
                            username, 
                            email
                        }
                    }

                    console.log('everything allright')
                    // evrything's alright
                    return {
                        error: false,
                        message: response.message,
                        username, 
                        email
                    }
                
                    // console.log('User profile', response.user);
                    // console.log('User token', response.jwt);
                })
                .catch(error => {
                    console.error("error:", error.json());

                    return {
                        error,
                        message: "Something's wrong here"
                    }
                });
        }

        // RETURN WHAT FORM RETURN
        return {
            data: await registerUser(),
            message: "hey"
        }
    }

}