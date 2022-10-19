<script>
    export let data;
    console.log(data);
    const { attributes } = data.session.data;

</script>

<h1>{attributes.name}</h1>
<p>{attributes.date}</p>
<p>{attributes.duration}</p>