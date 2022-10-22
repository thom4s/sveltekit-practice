<script>
    export let session = "";
    console.log(session);
    
</script>

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


<style>

    .item {
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px dotted;
    }
    
</style>