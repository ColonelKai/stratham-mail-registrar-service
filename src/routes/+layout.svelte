<script>
  import Login from "../lib/login/login.svelte";
  import Navigator from "../lib/login/navigator.svelte";
  import MainPage from "../lib/index.svelte"
  import "../app.css";
</script>
<div class=" flex flex-row mx-auto bg-blue-400 rounded-xs shadow border p-5">
  <div class="flex-auto">
    <Navigator />
  </div>
  <div class="flex-auto">
    <Login />
  </div>
  
</div>

<MainPage />


<slot />
