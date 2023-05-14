<script lang="ts">
  import { currentUser, pb } from "../ret_pocketbase";
  let username: string;
  let password: string;
  async function login() {
    const authData = await pb.collection('users').authWithOAuth2({ provider: 'discord' });
    console.log(pb.authStore.isValid);
    console.log(pb.authStore.token);
  }
  function logout() {
    pb.authStore.clear();
    
  }


</script>
<div class="mx-auto bg-blue-500 rounded-xs shadow border p-2 flex-wrap	">
{#if $currentUser}
  <p class="text-right">
    Signed in as {pb.authStore.model?.username}
  </p>
  <p class="text-right">
    <button on:click={logout}>Sign Out</button>
  </p>
{:else}
<div class="text-right">
  <button type="button" on:click={login}>Login / Register</button>
  <p>Our Login System uses Discord oAuth2</p>
</div>
{/if}
</div>
