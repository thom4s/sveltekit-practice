<script>
    import Alert from '$lib/components/Alert.svelte';

    export let form;
    console.log(form);
</script>

<div class="wrapper">

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

</div>