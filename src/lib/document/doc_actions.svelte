<script lang="ts">
    import Sign from "./doc_actions/sign.svelte";
    import Share from "./doc_actions/share.svelte";
    import Download from "./doc_actions/download.svelte";

    import { currentUser, pb } from "../ret_pocketbase";
    import type { Record } from "pocketbase";
    import { error } from "@sveltejs/kit";

    export let document: Record;
    
    let notification: string | null = null;

    function notify(string: string | null) {
        notification = string;
    }


</script>

<div class="flex flex-col p-5 space-y-4">

    {#if notification != null}
        <div class="bg-red-600 border-red-900 rounded text-white text-center font-bold p-5 animate-fadeIn anima">
            {notification}
        </div>
    {/if}

    <Sign document={document} notify={notify} />

    <Download document={document} notify={notify} />

    <Share document={document} notify={notify} />
</div>