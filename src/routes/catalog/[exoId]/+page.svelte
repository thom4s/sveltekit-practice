<script>
    export let data;
    console.log(data);
    const { attributes } = data.exercice.data;

</script>

<h1>{attributes.name}</h1>
<p>{attributes.level}</p>
