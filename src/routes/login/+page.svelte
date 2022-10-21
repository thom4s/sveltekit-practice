<script>
    import Alert from '$lib/components/Alert.svelte';
    import {invalid, redirect} from '@sveltejs/kit';

    import { userName, userToken, logout } from '$lib/stores.js';
    export let form;

    console.log('userName:', $userName);
    console.log('userToken:', $userToken);

    if( form !== null ) {
        console.log('form.data:',form.data);
        if( !form.data.error) {
            userName.update( () => form.data.user.username) ;
            userToken.update( () => form.data.jwt) ;

            //TODO: How to redirect ?
            setTimeout( ()=> {
                redirect(307, '/login');
            }, 3000)

        }
    }

    console.log('form:',form);



</script>


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

            {#if form?.data }
                <Alert message={form?.data.message} />
            {/if}

    {:else}

        <h1>You are already login</h1>

        <form on:submit={logout}>
            <p>
                <button class="btn">I'd like to log out (please)</button>
            </p>
        </form>

    {/if}

</div>