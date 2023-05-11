<script lang="ts">
  import { currentUser, pb } from "./pocketbase";
  let username: string;
  let password: string;
  let email: string; 
  async function login() {
    await pb.collection("users").authWithPassword(username, password);
  }
  async function signUp() {

    try {
      const data = {
        username,
        password,
        passwordConfirm: password,
        email 
      }

      const createdUser = await pb.collection('users').create(data);
    }
    catch {
        // handle error
    }

  }
  function signOut() {
    pb.authStore.clear();
  }
</script>

{#if $currentUser}
  <p>
    Signed in as {$currentUser.username}
    <button on:click={signOut}>Sign Out</button>
  </p>
{:else}

  <form>
    <input
      placeholder = "Username"
      type="text"
      bind:value={username}
    />

    <input
      placeholder = "Password"
      type="password"
      bind:value={password}
    />

    <button on:click={login}>Login</button>
  </form>


{/if}
