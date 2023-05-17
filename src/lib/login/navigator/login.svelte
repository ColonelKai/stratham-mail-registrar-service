<script lang="ts">
  import { currentUser, pb } from "../../ret_pocketbase";
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

{#if $currentUser}
  <p class="p-2 rounded-lg
            text-white
            bg-blue-700 hover:bg-slate-400">
    Signed in as {pb.authStore.model?.username}
  </p>

{:else}
  <button class=" p-2 rounded-lg
                  text-white
                  bg-blue-700 hover:bg-slate-400"
  
  type="button" on:click={login}>Login / Register</button>
{/if}

