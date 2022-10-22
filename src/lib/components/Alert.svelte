<script>
    export let message = '';
    export let details = '';
</script>


<p>
    {message}<br>
    {#each details as detail}
        {#if detail.message !== message }
            <span>{detail.message}</span><br>
        {/if}
    {/each}
</p>



<style>
    p {
        background-color: red;
        color: white;
        padding: 20px;
        border-radius: 10px;
    }
</style>