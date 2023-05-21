<script lang="ts">
    import { error } from "@sveltejs/kit";
    import { currentUser, pb } from "../../ret_pocketbase";
    import type { Record } from "pocketbase";

    export let document: Record;
    export let notify: Function;

    async function sign() {
        let userId = pb.authStore.model?.id;

        if(userId === undefined) {
            notify("You have to be signed in to do this.")
            return
        }

        if(document?.receivers.includes(userId) || document?.sender == userId) {
            // we gotta get signature users raah
            let signatories: string[] = [];
            document?.expand?.signatories.forEach(function (signature: Record) {signatories.push(signature.signer);})

            if(signatories.includes(userId!)) {
                // ruh roh! You already signed!
                notify("You have already signed this document.")
                return
            }
            
            // sign! yipee!
            const newSignatureData = {
                "signer":userId,
                "signed_date":new Date().toJSON()
            }

            let newSignature = await pb.collection("signatures").create(newSignatureData);

            let signatureIds: string[] = []; 
            document?.expand?.signatories.forEach(function (signature: Record) {signatureIds.push(signature.id);})
            signatureIds.push(newSignature.id)
            
            const updatedPostData = {
                signatories:signatureIds
            }

            const record = await pb.collection('posts').update(document.id, updatedPostData);

            notify("Successfully Signed.")

        }
    } 

</script>

<button class="bg-blue-800 rounded text-white text-center p-2" on:click={sign}>
    Sign Document
</button>