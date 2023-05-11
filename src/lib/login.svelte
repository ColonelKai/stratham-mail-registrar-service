<script lang="ts">
  import { currentUser, pb } from "./pocketbase";
  let accselection_login: boolean;
  let username: string;
  let password: string;
  let email: string; 
  async function login() {
    await pb.collection("users").authWithPassword(username, password);
  }
  async function register() {

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
        // TODO handle error
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

  <!--LOGIN / REGISTER SELECTOR-->
  <form>
    <input type="radio" id="register" name="accselection" value={false} bind:group={accselection_login}>
    <label for="register">Register</label><br>
    <input type="radio" id="login" name="accselection" value={true} bind:group={accselection_login}>
    <label for="login">Login</label><br>
  </form>
  {#if accselection_login}
  <!--LOGIN-->
  <form>
    <input
      placeholder = "Username"
      type="text"
      bind:value={username}
      required
    />
    <input
      placeholder = "Password"
      type="password"
      bind:value={password}
      required
    />
    <button on:click={login}>Login</button>
  </form>
  {:else}
  <!--REGISTER-->
  <form>
    <input
      placeholder = "Email"
      type="email"
      bind:value={email}
      required
    />  
    <input
      placeholder = "Username"
      type="text"
      bind:value={username}
      required
    />
    <input
      placeholder = "Password"
      type="password"
      bind:value={password}
      required
    />
    <button on:click={register}>Register</button>
  </form>
  {/if}

{/if}
