<template>
  <div>
    <header></header>
    <div >
      <Nuxt/>
    </div>
    <footer></footer>
  </div>
</template>

<script>




export default {
  name: "main_layout",
  middleware: 'authenticated',

  data: ()=>({
    mousePosition: null,
  }),
  methods: {}
}
</script>


