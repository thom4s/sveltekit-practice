<script>
  import { attr } from 'svelte/internal';

    /** @type {import('./$types').PageData} */  
    export let data;
    console.log(data);
    const { sessions } = data;
    
</script>
  

<main>

    <header>
        <h1>Feed</h1>
        <p>Welcome to your feeeeed</p>
        <p>____</p>
        <h2>Last Sessions</h2>
    </header>


    <div class="grid">
    {#each sessions.data as session}
        
        <div class="item">
            <h3>{session.attributes.name}</h3>
            <div class="flex">
                <p>exerices faits : </p>
                <ul>
                    {#each session.attributes.exercices.data as sessionExercice}
                        <li>{sessionExercice.attributes.name}</li>
                    {/each}
                </ul>
            </div>

            <a href="/feed/{session.id}" data-sveltekit-prefetch>Read more</a>
        </div>

    {/each}
    </div> 


</main>


<style>

    header {
        border-bottom: 1px solid gray;
        padding-bottom: 40px;
        margin-bottom: 40px;
    }

    h2 {
        margin: 0;
    }
    .item {
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px dotted;
    }
    
</style>