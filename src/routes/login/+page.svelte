<script>
    import Alert from '$lib/components/Alert.svelte';
    import {invalid, redirect} from '@sveltejs/kit';

    import { userName, userToken, userID } from '$lib/stores.js';
    export let form;

    // console.log('userName:', $userName);
    // console.log('userToken:', $userToken);

    if( form !== null ) {
        console.log('form.data:',form.data);
        if( !form.data.error) {
            userName.update( () => form.data.user.username) ;
            userID.update( () => form.data.user.id) ;
            userToken.update( () => form.data.jwt) ;

            //TODO: How to redirect ?
            setTimeout( ()=> {
                redirect(307, '/login');
            }, 3000)

        }
    }

    console.log('form:',form);

</script>


{#if form?.data }
    <Alert message={form?.data.message} />
{/if}


<div class="wrapper">

    {#if $userToken === "xxxxxx" }
    <div class="row mb-sm">
        <h1>Login</h1>
    </div>

    <form method="POST" action="?/login">
        <p>
            <input type="text" placeholder="username" name="username" value="">
        </p>
        <p>
            <input type="password" placeholder="mdp" name="password" value="">
        </p>
        <p>
            <button class="btn">I'd like to login (please)</button>
        </p>
    </form>



    {:else}

        <h1>You are already login</h1>

        <a href="/startPractice">Commencer une nouvelle session</a>

        <h2>Mes sessions à moi</h2>

        <h2>Mes exercices à moi</h2>

    {/if}

</div>