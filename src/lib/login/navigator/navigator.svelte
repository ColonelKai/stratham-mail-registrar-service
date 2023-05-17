<script>
      import Login from "./login.svelte";
      import Navbutton from "./navbutton.svelte";
</script>

<div class="w-screen max-w-full
            flex flex-row
            bg-blue-600 shadow-sm
            text-white font-semibold
            p-2 gap-2
            ">

      <img class="h-10 p-2" src="/images/smrs.png" alt="SMRS Logo">

      <p class="p-2 mr-auto">
            STRATHAM MAIL & REGISTRAR SYSTEM
      </p>
      

      <Navbutton link="#" label="Home"/>
      <Navbutton link="#" label="View"/>
      <Navbutton link="#" label="Send"/>

      <!-- Separator -->
      <div class="p-2"></div>

      <Login />
</div>