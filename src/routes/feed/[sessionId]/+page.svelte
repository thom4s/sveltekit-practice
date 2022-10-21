<script>
    export let data;
    console.log(data);
    const { attributes } = data.session.data;

</script>

<header>
    <h1>{attributes.name}</h1>
    <p>date : {attributes.date}</p>
    <p>durée : {attributes.duration}</p>
</header>

<div class="flex">
    <p>exerices faits : </p>
    <ul>
        {#each attributes.exercices.data as sessionExercice}
            <li>{sessionExercice.attributes.name} - level {sessionExercice.attributes.level}</li>
        {/each}
    </ul>
</div>