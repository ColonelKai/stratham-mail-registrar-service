<script lang="ts">
    export let label: string;
    export let link : string;
</script>

<a 
href={link}
class=" p-2 rounded-lg
        text-white
        bg-blue-700 hover:bg-slate-400">
{label}
</a>