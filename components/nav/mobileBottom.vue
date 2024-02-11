<template>
  <div
    class="flex md:hidden bg-slate-200 fixed  w-full bottom-0 justify-between px-[28px] h-[55px] place-items-center"
  >
    <div v-for="(nav, index) in iconArray" :key="index">
      <NuxtLink :to="nav.link" class="text-gray-500" activeClass="icon-active">
        <Icon :name="nav.icon" size="38" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">

const iconArray = ref([
  { icon: "ph:user-circle-duotone", link: "/" },
  { icon: "ph:user-circle-duotone", link: "/post/dodaj-nowy" },
  // { icon: "ph:user-circle-duotone", link: "/konto" },
  { icon: "ph:user-circle-duotone", link: "/konto/zapisane-posty" },
])

</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.icon-active {
  color: $primary;
}
</style>
