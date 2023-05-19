<script lang="ts">
    import { goto } from "$app/navigation";

    let searchID: string;

    function pressed() {
        goto("/view?id="+searchID)
    }

</script>


<div class="flex flex-col items-center justify-center bg-blue-400 mt-10 p-10">
    <label for="large-input" class="block mb-2 text-xl font-medium text-white text-center ">Search Document</label>
    <p class="text-white p-2">Please enter any document ID</p>
    <input type="text" id="large-input" bind:value={searchID}
    class="block w-2/5 p-4 t rounded
bg-blue-600 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
    <button class="rounded w-1/12 bg-blue-600 text-white m-5" on:click = {pressed}>
        Submit
    </button>
</div>