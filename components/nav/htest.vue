<template>
      <ModalPostDetails
      type="warning"
      title="Czy na pewno chcesz opuścić stronę?"
      text="Twoje niezapisane dane zostaną utracone."
      confirm="Tak, opuszczam"
      :height="320"
      :modalActive="isModalActive"
      @close="handleModal"
      />
      <!-- @confirmButton="handleConfirmButton" -->
  <div
    class="shadow-custom fixed z-20 flex justify-between w-full px-8 py-4 place-items-center bg-white"
  >
    <NuxtLink to="/" class="flex shrink-0">
      <p class="text-[32px] font-medium">Nuxt Blog</p>
    </NuxtLink>
    <NavSearchInput />
    <div class="flex shrink-0">
      <!-- is loggin user -->
      <div v-if="loggedIn ? true : false" class="flex place-items-center gap-[44px]">
        <Transition @enter="EnterInput" @leave="LeaveInput" :css="false">
          <div v-if="router.currentRoute.value.name !== 'post-dodaj-nowy'">
            <NuxtLink to="/post/dodaj-nowy" class="button-primary">
              Nowy artykuł
            </NuxtLink>
          </div>
        </Transition>
        <!-- <button class="button-primary">Zapisz jako szkic</button>
        <button class="button-primary">Opublikuj</button> -->
        <!-- <p @click="handleModal">dalej</p> -->
        <div class="flex gap-[21px]">
            <button class="button-ghost" @click="handleModal">Zapisz jako szkic</button>
            <button class="button-primary" @click="handleModal">Przejdz dalej</button>
        </div>
            <NavImageHero :image="image" />
      </div>
      <div v-else class="flex gap-8">
        <h3 @click="isAuth" class="cursor-pointer">Logowanie</h3>
      </div>
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

const isModalActive = ref(false);

const handleModal = () => {
  isModalActive.value =! isModalActive.value
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
    color: #9f9f9f; /* Kolor dla tekstu placeholdera */
  }
}

.modal {
  background-color: rgb(255, 255, 255);
  border-radius: 12px !important;
  z-index: 100;
}
.shadow-custom {
  box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.07);
}
</style>
