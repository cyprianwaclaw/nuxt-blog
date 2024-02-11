<template>
  <div>
    <NavListing title="Moje artykuły" :array="titlesArray" />
    <div>

    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: "auth",
});

const titlesArray = ref([
  { name: "Moje dane" },
    // { name: "Moje dane", param: null },
  { name: "Bezpieczenstwo", param: "security" },
]);
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
</style>
