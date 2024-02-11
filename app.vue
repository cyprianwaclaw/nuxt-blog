<template>
  <!-- {{ router.currentRoute}} -->
  <NuxtLayout name="page">
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
// const router = useRouter()
// const currentPageName = router.currentRoute.value

// onBeforeRouteUpdate(async (to, from) => {
// console.log(to)
// })
// watch(router,(newValue)=> {
//   console.log(newValue)
// })
const layout = 'page'
</script>
<style scoped lang="scss"></style>
