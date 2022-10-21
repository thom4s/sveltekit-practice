<script>
    import { enhance, applyAction } from '$app/forms';
    import SessionExercicesList from '$lib/components/SessionExercicesList.svelte';
    import Alert from '$lib/components/Alert.svelte';

    export let data;
    const { dbExercices } = data;

    export let form;
    console.log(form);
</script>

<div class="wrapper">

    <div class="row mb-sm">
        <h1>Ma session personnalisée</h1>
    </div>

    <form 
        method="POST" 
        action="?/add" 
        use:enhance={ ({form}) => {
                // Before form submission to server     

                return async ({result, update}) => {
                    // After form submission to server
                    if( result.type === 'success') {
                        form.reset();
                    }
                    if( result.type === 'invalid') {
                        await applyAction(result);
                    }

                    update();
                }
            }
        }
    >
        <p>
            <input type="text" placeholder="nom de l'exo ?" name="name" value="{form?.name ?? ''}">
        </p>
        <p>
            <input type="number" placeholder="difficulté ?" name="level" value="{form?.level ?? ''}">
        </p>
        <p>
            <button class="btn">Ajouter un exo à la session personnalisée</button>
            {#if form?.error }
                <Alert message={form?.message} />
            {/if}
        </p>
    </form>


    <h2>Mes exercices à moi (modifiable et effaçable par moi)</h2>

    <SessionExercicesList exercices="{data?.exercices}" />


    <h2>Le catalogue d'exercices (pas modifiable ni effaçable)</h2>

    <ul>
        {#each dbExercices.data as ex}
            
            <li>
                {ex.attributes.name} - {ex.attributes.level}
                <a href="/catalog/{ex.id}" data-sveltekit-prefetch>Read more</a>
            </li>

        {/each}
    </ul> 



</div>