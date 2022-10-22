<script>
    import Alert from '$lib/components/Alert.svelte';

    export let data;
    export let form;
    console.log(form);
</script>

<div class="">

    <div class="row mb-sm">
        <h1>Register</h1>
    </div>

    <form method="POST" action="?/register" >
        <p>
            <input type="text" placeholder="username" name="username" value="{form?.username ?? ''}">
        </p>
        <p>
            <input type="email" placeholder="email" name="email" value="{form?.email ?? ''}">
        </p>
        <p>
            <input type="email" placeholder="confirmer votre email" name="confirmedEmail" value="{form?.confirmedEmail ?? ''}">
        </p>
        <p>
            <input type="password" placeholder="mdp" name="password" value="{form?.password ?? ''}">
        </p>
        <p>
            <button class="btn">I'd like to register (please)</button>
        </p>
    </form>

            {#if form?.data }
                <Alert message={form?.data.message} />
            {/if}


</div>