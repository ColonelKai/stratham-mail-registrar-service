<script lang="ts">
  import { currentUser, pb } from "./ret_pocketbase";
  let username: string;
  let password: string;
  async function login() {
    const authData = await pb.collection('users').authWithOAuth2({ provider: 'discord' });
    console.log(pb.authStore.isValid);
    console.log(pb.authStore.token);
  }


</script>

{#if $currentUser}
  <p>
    Signed in as {pb.authStore.token}
  </p>
{:else}
  <button type="button" on:click={login}>Login / Register</button>
{/if}
