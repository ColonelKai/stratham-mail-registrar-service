<script lang="ts">
    import { error } from "@sveltejs/kit";
    import { currentUser, pb } from "../../ret_pocketbase";
    import type { Record } from "pocketbase";

    export let document: Record;
    export let notify: Function;

    function onCopy() {
        navigator.clipboard.writeText(window.location.href);
        notify("Copied Link to Clipboard")
    }
</script>

<button class="bg-blue-800 rounded text-white text-center p-2" on:click={onCopy}>
    Copy Link
</button>