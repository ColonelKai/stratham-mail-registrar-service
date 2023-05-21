<script lang="ts">
    import Sign from "./doc_actions/sign.svelte";

    import { currentUser, pb } from "../ret_pocketbase";
    import type { Record } from "pocketbase";
    import { error } from "@sveltejs/kit";

    export let document: Record;

    function notify(string: String) {
        console.log(string)
    }


</script>

<div class="flex flex-col p-5 space-y-4">

    <Sign document={document} notify={notify} />

    <button class="bg-blue-800 rounded text-white text-center p-2">
        Download Document
    </button>

    <button class="bg-blue-800 rounded text-white text-center p-2">
        Copy Link
    </button>
</div>