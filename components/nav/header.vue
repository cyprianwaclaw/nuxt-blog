<template>
  <ModalAuth :modalActive="isOpen" @close="isAuth" />
  <div class="flex justify-between w-full lg:px-8 lg:py-6 md:px-5 md:py-5 sm:py-4 px-4 py-3 place-items-center border sm:border-none">
    <NuxtLink to="/" class="flex shrink-0">
      <p class="md:text-[32px] text-[24px] font-medium">Nuxt Blog</p>
    </NuxtLink>
    <div class="lg:flex w-[900px] hidden 2xl:mx-[150px] md:mx-[100px] lg:mx-[80px]">
      <NavSearchInput />
    </div>
    <div class="flex shrink-0 lg:flex hidden">
      <!-- is loggin user -->
      <div v-if="loggedIn ? true : false" class="flex place-items-center gap-[44px]">
        <Transition @enter="EnterInput" @leave="LeaveInput" :css="false">
          <div v-if="router.currentRoute.value.name !== 'post-dodaj-nowy'">
            <NuxtLink to="/post/dodaj-nowy" class="button-primary">
              Nowy artykuł
            </NuxtLink>
          </div>
        </Transition>
        <NavImageHero :image="image" />
      </div>
      <div v-else class="flex gap-8">
        <h3 @click="isAuth" class="cursor-pointer">Logowanie</h3>
      </div>
    </div>
    <div
      class="sm:flex hidden lg:hidden w-[600px] ml-[40px] place-items-center gap-[34px]"
    >
      <NavSearchInput />
      <div class="flex shrink-0">
        <NavImageHero :image="image" />
      </div>
    </div>
    <div class="flex sm:hidden place-items-center">
      <NuxtLink to="/search">
        <Icon name="ph:magnifying-glass" color="C2C2C2" class="" size="28" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { storeToRefs } from "pinia";
import { useAuth } from "@/store/useAuth";

const router = useRouter();
const authState = useAuth();
const { loggedIn, image } = storeToRefs(authState);

const isOpen = ref(false);
const isAuth = () => {
  isOpen.value = !isOpen.value;
};

const EnterInput = (el: any, done: any) => {
  gsap.from(el, {
    opacity: 1,
    y: -100,
    duration: 0.44,
  });
};
const LeaveInput = (el: any, done: any) => {
  gsap.to(el, {
    y: -100,
    duration: 0.44,
  });
};
</script>
<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.search-input {
  border-radius: 8px;
  cursor: pointer;
  height: 51px;
  z-index: 200;
  background-color: #e9e9e9;
  width: 100%;
  padding: 12px 18px;
  font-size: 17px;
  font-weight: 400;

  &::placeholder {
    color: #9f9f9f;
  }
}

.modal {
  background-color: rgb(255, 255, 255);
  border-radius: 12px !important;
  z-index: 100;
}
</style>
