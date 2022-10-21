
const api_url = `https://pactice-strapi-cms.herokuapp.com/api`


export const actions = {
    register: async ({request}) => {
        const formData = await request.formData();
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');

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