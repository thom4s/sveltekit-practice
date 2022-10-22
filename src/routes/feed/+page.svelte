<script>
    import SessionItem from '$lib/components/SessionItem.svelte';
    /** @type {import('./$types').PageData} */  
    export let data;
    const { sessions } = data;
    
</script>
  

<main>

    <header>
        <h1>My Sessions</h1>
    </header>


    <div class="grid">
        {#each sessions.data as session}
            
            <SessionItem session={session} />

        {/each}
    </div> 


</main>

