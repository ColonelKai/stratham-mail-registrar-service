<script lang="ts">
  import type { documents } from "./+page";
  import { PdfViewer } from "svelte-pdf-simple";

  import { pb, currentUser } from "../../lib/pocketbase";
  import { env } from "$env/dynamic/public";
  import { onMount } from "svelte";
  import { PUBLIC_POCKETBASE_URL } from "$env/static/public";

  export let data: documents;

  let record: {
    collectionId: string;
    collectionName: string;
    created: string;
    description: string;
    id: string;
    pdf: string;
    sig_reciever: string;
    sig_sender: string;
    updated: string;
  }[] = [];
  let pdfurl: String = "";

  const getRecord = async () => {
    if (currentUser !== null) {
      record = await pb.collection("verified").getOne(data.name);
      console.log(record);
      pdfurl =
        "${env.PUBLIC_POCKETBASE_URL}/api/files/${record.collectionId}/${record.id}/${record.sig_sender}";
    }
  };

  onMount(() => {
    getRecord();
  });
</script>

<h1>{data.name}</h1>

{#if record !== undefined}
  <p>{record.description}</p>
  <img
    src={`${env.PUBLIC_POCKETBASE_URL}/api/files/${record.collectionId}/${record.id}/${record.pdf_png}`}
    alt="pdf"
  />
  <img
    src={`${env.PUBLIC_POCKETBASE_URL}/api/files/${record.collectionId}/${record.id}/${record.sig_sender}`}
    alt="signature"
  />
  <img
    src={`${env.PUBLIC_POCKETBASE_URL}/api/files/${record.collectionId}/${record.id}/${record.sig_reciever}`}
    alt="signature"
  />
  <a
    href={`${env.PUBLIC_POCKETBASE_URL}/api/files/${record.collectionId}/${record.id}/${record.pdf}`}
  >
    Download PDF
  </a>
{/if}
