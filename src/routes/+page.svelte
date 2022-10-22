<script>
    import SessionItem from '$lib/components/SessionItem.svelte';


    /** @type {import('./$types').PageData} */  
    export let data;
    console.log('data:',data);
    const { everyoneSessions } = data;
    console.log('everyoneSessions:',everyoneSessions);

</script>
  

<main>

    <header>
        <h1>Welcome</h1>
        <p>____</p>
        <h2>Last Sessions of everyone</h2>
    </header>


    <div class="grid">
        {#each everyoneSessions.data as session}
            
            <SessionItem session={session} />

        {/each}
    </div> 


</main>


