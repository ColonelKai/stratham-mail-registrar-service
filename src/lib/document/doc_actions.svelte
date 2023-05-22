<script lang="ts">
    import Sign from "./doc_actions/sign.svelte";

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

    <button class="bg-blue-800 rounded text-white text-center p-2">
        Download Document
    </button>

    <button class="bg-blue-800 rounded text-white text-center p-2">
        Copy Link
    </button>
</div>