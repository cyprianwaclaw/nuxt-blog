<template>
  <div class="flex place-items-content">
    <div class="flex p-2" @click="router.back()">
      <Icon name="tabler:chevron-left" size="27" class="flex text-[#b4b4b4]" />
    </div>
    <NavSearchInput />
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { storeToRefs } from "pinia";
import { useAuth } from "@/store/useAuth";

const router = useRouter();
const authState = useAuth();
const { loggedIn, image } = storeToRefs(authState);
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
</style>
