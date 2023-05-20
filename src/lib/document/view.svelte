<script lang="ts">
    import doc_details from "./doc_details.svelte"
    import type { Record } from "pocketbase";
    import { pb } from "../ret_pocketbase";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import DocDetails from "./doc_details.svelte";

    let id: string;
    let record: Record;

    let signatories: Record[] = [];


	onMount(async () => {
        // if no id, send back to search page
        if(!$page.url.searchParams.has("id")) {
            goto("/search")
            return
        } 
        else {
            id = $page.url.searchParams.get("id")!; // its alright, we already checked!
        }

        record = await pb.collection('posts').getOne(id, {
            expand: 'sender,sender_organisation,receivers,signatories,document',
        });

        // we have to reload all signatures to reveal their signer reecord.... there is a way to 
        // simply recursively load the expansions of expanded records but idk how.
        record?.expand?.signatories.forEach(async function (record: Record) {
            signatories.push(await pb.collection('signatures').getOne(record?.id, {
                expand: 'signer'
            }));
        });

        console.log(signatories)
        console.log(record)
    });
</script>

{#if record?.sender == null}
    <div class="w-full text-center p-10 bg-blue-700 text-white">
        Invalid Document ID
    </div>
{:else if !record?.public}
    <div class="w-full text-center p-10 bg-blue-700 text-white">
        This Document is Private
    </div>
{:else}
    <div id="top_div" class="   w-screen justify-center
                                flex flex-row">
        
        <div id="left_column" 
        class=" flex flex-col p-10 w-3/5 m-10 pt-5
                bg-blue-700 rounded">
            <p class="text-white font-bold text-lg">Document Details</p> <hr class="pb-10">

            <DocDetails record={record} signatories={signatories} />

            <p class="text-white font-bold text-lg pt-10">Document</p> <hr class="pb-10 ">

            <div class="min-h-screen flex flex-col">
                <iframe class=" aspect-auto	 m-5 flex-grow"
                src={"http://127.0.0.1:9384/api/files/"+"posts"+"/"+id+"/"+record?.document} title="description"></iframe>
            </div>

        </div>

        <div id="right_column" 
        class=" flex flex-col p-10 w-1/5 m-10 pt-5
                bg-blue-700 rounded">
            <p class="text-white font-bold text-lg">Actions</p> <hr class="pb-10">
        </div>

    </div>
{/if}