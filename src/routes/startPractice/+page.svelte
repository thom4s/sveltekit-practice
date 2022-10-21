<script>
    import { enhance, applyAction } from '$app/forms';
    import SessionExercicesList from '$lib/components/SessionExercicesList.svelte';
    import Alert from '$lib/components/Alert.svelte';

    import { userName, userID, userToken } from '$lib/stores.js';
    // console.log('userName:', $userName);
    // console.log('userToken:', $userToken);

    export let data;
    const { dbExercices } = data;

    export let form;
    //console.log(form);



</script>

<div class="">

    <div class="row mb-sm">
        <h1>Ma session personnalisée</h1>
    </div>

    {#if $userToken === "xxxxxx" }

        <h2>Vous devez être connecté pour commencer...</h2>
        <a href="/login">go to login</a>   


    {:else}
        <h3>Paramètres de la Session</h3>

        <div class="row">
            <div class="col3">

                <form 
                    method="POST" 
                    action="?/addSession" 
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
                        <input type="text" value="Session du jour" name="name">
                    </p>
                    <p>
                        <input type="date" value="2022/10/21" name="date">
                    </p>
                    <p>
                        <input type="hidden" hidden name="jwt" value="{$userToken}">
                        <input type="hidden" hidden name="userID" value="{$userID}">

                        <button class="btn">Ajouter / Programmer la Session !</button>
                        {#if form?.error }
                            <Alert message={form?.message} />
                        {/if}
                    </p>
                </form>
            </div>

            <div class="col3">
                les exo de la session : 

                <SessionExercicesList exercices="{data?.exercices}" />

            </div>

        </div>
<hr>

        <h3>Ajouter un exercice à la main</h3>

        <form 
        method="POST" 
        action="?/addExercice" 
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
                <input type="hidden" hidden name="jwt" value="{$userToken}">
                <input type="hidden" hidden name="userID" value="{$userID}">
            </p>
            <p>
                <button class="btn">Ajouter un exo à la session personnalisée</button>
                {#if form?.error }
                    <Alert message={form?.message} />
                {/if}
            </p>
        </form>



        <h3>Choisir dans le catalogue d'exercices (pas modifiable ni effaçable)</h3>

        <ul>
            {#each dbExercices.data as ex}
                
                <li>
                    {ex.attributes.name} - {ex.attributes.level}
                    <a href="/catalog/{ex.id}" data-sveltekit-prefetch>Read more</a>
                    <form method="POST" action="?/delete">
                        <input type="hidden" hidden name="exerciceID" value="{ex.id}">
                        <input type="hidden" hidden name="jwt" value="{$userToken}">
                        <button >delete</button>
                    </form>
                    <a href="/catalog/{ex.id}" data-sveltekit-prefetch>Read more</a>
                </li>

            {/each}
        </ul> 

    {/if}


</div>