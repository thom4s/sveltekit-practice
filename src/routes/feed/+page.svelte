<script>
  import { attr } from 'svelte/internal';

    /** @type {import('./$types').PageData} */  
    export let data;
    console.log(data);
    const { sessions, exercices } = data;
    
</script>
  

<main>

    <h1>Feed</h1>

    <h2>Last Sessions</h2>

    <ul>
    {#each sessions.data as session}
        
        <li>
            {session.attributes.name}
            <a href="/feed/{session.id}" data-sveltekit-prefetch>Read more</a>
        </li>

    {/each}
    </ul> 


    <h2>Exercices Catalog</h2>

    <ul>
    {#each exercices.data as ex}
        
        <li>
            {ex.attributes.name}
            <a href="/catalog/{ex.id}" data-sveltekit-prefetch>Read more</a>
        </li>

    {/each}
    </ul> 


</main>
