<script lang="ts">
    import { currentUser, pb } from "../../ret_pocketbase";
    import type { Record } from "pocketbase";
    import { error } from "@sveltejs/kit";
    import { PDFDocument, PDFPage } from 'pdf-lib'


    export let document: Record;
    export let notify: Function;

    async function onDownload() {
        const documentLocation = "http://127.0.0.1:9384/api/files/"+"posts"+"/"+document.id+"/"+document.document;
        const documentPdfBytes = await fetch(documentLocation).then(res => res.arrayBuffer());
        const documentDoc = await PDFDocument.load(documentPdfBytes);

        const templateLocation = "/documents/SMRS Download Template.pdf";
        const tempaltePdfBytes = await fetch(templateLocation).then(res => res.arrayBuffer());
        const templateDoc = await PDFDocument.load(tempaltePdfBytes);

        // FILL THE FORM YIPPPEEE
        const templateForm = templateDoc.getForm();

        const formValues = {
            "ID":document.id,
            "Sender":document.expand.sender.username,
            "Organisation":document.expand.sender_organisation.organisation_name,

            // turning the list of receivers into a stirng of their usernames yippeee
            "Receivers":document.expand.receivers.map((receiver: Record) => receiver.username).toString(),
            
            "Sent":document.created,
            "Last Updated":document.updated,

            // create a string denoting the time and user of signature and then turn that list of strings into a string kekw
            "Signatories":document.expand.signatories.map((signature: Record) => new String(signature.expand.signer.username + " at " + signature.signed_date)).map(String).join("\n"),

            "Link":window.location.href,
            "Time Generated":new Date().toJSON()
        }

        // loop through the didct we just created and get the text field with key and assign the value associated.
        Object.entries(formValues).forEach(([k,v]) => {
            templateForm.getTextField(k).setText(v);
        })

        // so it won't be tampered with *as easily*.
        templateForm.flatten();

        // CREATE NEW FORM, APPEND TWO FORMS WE NEED
        const finDoc = await PDFDocument.create();

        const newPages: PDFPage[] = [];
        (await finDoc.copyPages(templateDoc, [0])).forEach((page: PDFPage) => newPages.push(page));
        (await finDoc.copyPages(documentDoc, documentDoc.getPageIndices())).forEach((page: PDFPage) => newPages.push(page));

        newPages.forEach((page: PDFPage) => {
            finDoc.addPage(page)
        })

        const fileBits = await finDoc.saveAsBase64();

        const link = window.document.createElement('a');
        link.href = 'data:application/pdf;base64,' + fileBits;
        link.download = 'RSMS_Document.pdf';
        link.click();

    }
</script>


<button class="bg-blue-800 rounded text-white text-center p-2" on:click={onDownload}>
    Download Document
</button>