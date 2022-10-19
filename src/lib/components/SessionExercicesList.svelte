<script>
    import { enhance } from '$app/forms';
    export let exercices;
</script>

    {#each exercices as exo }
        <div class="exo_item">
            <p>
                <span>nom: {exo.name}</span> | 
                <span>level: {exo.level}</span> | 
            </p>

            <form method="POST" action="?/remove" use:enhance>
                <input type="hidden" hidden name="id" value="{exo.id}">
                <button class="btn">Remove from session</button>
            </form>
        </div>
    {/each}


<style>
    .exo_item {
        border-bottom: 1px solid lightgray;
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .btn {
        font-size: 10px;
    }
</style>