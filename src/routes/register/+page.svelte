<script>
    import { enhance, applyAction } from '$app/forms';
    import Alert from '$lib/components/Alert.svelte';

    export let data;
    export let form;
    console.log('form:', form);
    console.log('data:', data);
</script>



{#if form?.data }
    <Alert message={form?.data.message} details={form?.data.details?.errors} />
{/if}


<div class="">

    <div class="row mb-sm">
        <h1>Register</h1>
    </div>

    <form method="POST" action="?/register" 
        use:enhance={ ({form}) => {
            // Before form submission to server     

            return async ({result, update}) => {
                // After form submission to server
                if( result.type === 'success') {
                    form.reset();
                }
                if( result.type === 'invalid') {
                    await applyAction(result);
                }

                update();
            }
        }
    }>
        <p>
            <input type="text" placeholder="username" name="username" value="{form?.data.username ?? ''}">
        </p>
        <p>
            <input type="email" placeholder="email" name="email" value="{form?.data.email ?? ''}">
        </p>
        <p>
            <input type="email" placeholder="confirmer votre email" name="confirmedEmail" value="">
        </p>
        <p>
            <input type="password" placeholder="mdp" name="password" value="{form?.password ?? ''}">
        </p>
        <p>
            <button class="btn">I'd like to register (please)</button>
        </p>
    </form>

</div>