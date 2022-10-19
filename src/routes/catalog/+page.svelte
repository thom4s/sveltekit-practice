<script>
    /** @type {import('./$types').PageData} */  
    export let data;
    const { exercices } = data;
    console.log(exercices);

</script>
  

<main>

    <h1>Catalog</h1>

    <ul>
        {#each exercices.data as ex}
            
            <li>
                {ex.attributes.name} - {ex.attributes.level}
                <a href="/catalog/{ex.id}" data-sveltekit-prefetch>Read more</a>
            </li>

        {/each}
    </ul> 


</main>
