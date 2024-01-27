<template>
  <!-- <ModalNotification
    :title="'Your Modal Title'"
    :modalActive="isModalActive"
    :clickBackground="true"
    :width="600"
    :height="400"
    @close="handleModalClose"
  />
  <button @click="handleModalClose()">click</button> -->
  <!-- <Icon
            name="ph:chat-circle-dots"
            class="-mt-[2px] -mr-[7px]"
            color="#C5C5C5"
            size="22"
            ref="savedIcon"
          /> -->
  <!-- <svg
    class="tets-test"
    width="73"
    viewBox="0 0 256 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      ref="savedIconPath"
      d="M128 26C107.826 26 88.1057 31.9822 71.3319 43.1901C54.5581 54.398 41.4845 70.3282 33.7643 88.9663C26.0442 107.604 24.0243 128.113 27.9599 147.899C31.8956 167.685 41.6102 185.86 55.8752 200.125C70.1401 214.39 88.3148 224.104 108.101 228.04C127.887 231.976 148.396 229.956 167.034 222.236C185.672 214.516 201.602 201.442 212.81 184.668C224.018 167.894 230 148.174 230 128C229.968 100.958 219.212 75.032 200.09 55.9102C180.968 36.7884 155.042 26.0318 128 26ZM128 218C110.2 218 92.7991 212.722 77.9987 202.832C63.1983 192.943 51.6628 178.887 44.8509 162.442C38.039 145.996 36.2567 127.9 39.7294 110.442C43.202 92.9836 51.7737 76.9471 64.3604 64.3604C76.9472 51.7737 92.9836 43.202 110.442 39.7293C127.9 36.2567 145.996 38.039 162.442 44.8508C178.887 51.6627 192.943 63.1983 202.832 77.9987C212.722 92.7991 218 110.2 218 128C217.974 151.861 208.483 174.738 191.61 191.61C174.738 208.483 151.861 217.974 128 218ZM122 136V80C122 78.4087 122.632 76.8826 123.757 75.7574C124.883 74.6321 126.409 74 128 74C129.591 74 131.117 74.6321 132.243 75.7574C133.368 76.8826 134 78.4087 134 80V136C134 137.591 133.368 139.117 132.243 140.243C131.117 141.368 129.591 142 128 142C126.409 142 124.883 141.368 123.757 140.243C122.632 139.117 122 137.591 122 136ZM138 172C138 173.978 137.414 175.911 136.315 177.556C135.216 179.2 133.654 180.482 131.827 181.239C130 181.996 127.989 182.194 126.049 181.808C124.109 181.422 122.327 180.47 120.929 179.071C119.53 177.673 118.578 175.891 118.192 173.951C117.806 172.011 118.004 170 118.761 168.173C119.518 166.346 120.8 164.784 122.444 163.685C124.089 162.586 126.022 162 128 162C130.652 162 133.196 163.054 135.071 164.929C136.946 166.804 138 169.348 138 172Z"
      fill="#E1A817"
    />
  </svg>
  <p ref="savedIcon" @click="handleSvgClick()">dsdsd</p> -->
  <SectionHomeHero :posts="data?.hero" />
  <div class="mt-[180px]">
    <p class="md:text-[18px] md:font-normal gray text-[14px] font-light b-[2px]">
      NOWOŚCI & AUTORZY
    </p>
    <h1>Artykuły wybrane dla Ciebie</h1>
    <div class="gap-[121px] flex flex-col w-[750px] mt-[86px]">
      <CardList
        v-for="(populars, index) in data.recommended"
        :key="index"
        :post="populars"
        :logged="loggedIn"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import gsap from "gsap";
import { storeToRefs } from "pinia";
import { useAuth } from "@/store/useAuth";
const axiosInstance = useNuxtApp().$axiosInstance;
const { $changeApi } = useNuxtApp();

const authState = useAuth();
const { loggedIn } = storeToRefs(authState);

const { data } = await axiosInstance.get($changeApi("/data/home"));

// const isModalActive = ref(false);
// const handleModalClose = () => {
//   isModalActive.value = !isModalActive.value;
// };
const savedIcon = ref(null);

// onMounted(() => {
//   // gsap.to(savedIcon.value, { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1 });
//   gsap.from(savedIcon.value, { x: 400 });
// });

// const handleSvgClick = (el: any) => {
//   // gsap.to(el, { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1 });
//   // gsap.to(savedIcon.value, { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1 });

//   gsap.to(".tets-test", { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1 });
// };
</script>
<style scoped lang="scss">
$one: red;

.test1 {
  color: $one;
}
</style>
