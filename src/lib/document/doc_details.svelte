<script lang="ts">
    import type { Record } from "pocketbase";

    export let record: Record;

    let woo = "px-6 py-4" // probably a reall ybad idea, but it works, it works!
</script>


<table class="  w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto p-10 rounded
                ">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <th>Value</th>
        <th>Description</th>
    </thead>
    <tbody class="p-2">
        <tr class="bg-gray-800">
            <td class={woo}><b>Document Sender</b></td>
            <td class={woo}>{record?.expand?.sender?.username}</td> <!--These throw errors but i,dk how to fix them and they work on prod *shrug*-->
        </tr>

        <tr class="bg-gray-900">
            <td class={woo}><b>Document Organisation</b></td>
            <td class={woo}>
                {#if record?.sender_organisation == ""}
                    No Organisation
                {:else}
                    {record?.expand?.sender_organisation?.organisation_name}
                {/if}
            </td>
        </tr>

        <tr class="bg-gray-800">
            <td class={woo}><b>Receivers</b></td>
            <td class={woo}>
                <ul>
                {#each record?.expand?.receivers as ReceiverRecord} <!--So many errors, help! It still works...-->
                    <li>{ReceiverRecord?.username}
                {/each}
                </ul>   
            </td>
        </tr>

        <tr class="bg-gray-900">
            <td class={woo}><b>Signatories</b></td>
            <td class={woo}>
                <ul>
                {#each record?.expand?.signatories as SignerRecord} <!--So many errors, help! It still works...-->
                    <li>{SignerRecord?.username}
                {/each}
                </ul>
            </td>
        </tr>

        <tr class="bg-gray-800"> 
            <td class={woo}><b>Date Created</b></td>
            <td class={woo}>{record?.created}</td>
        </tr>

        <tr class="bg-gray-900"> 
            <td class={woo}><b>Date Created</b></td>
            <td class={woo}>{record?.updated}</td>
        </tr>

    </tbody>
</table>

<!--DOCUMENT RECEIVERS-->