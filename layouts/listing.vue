<template>
  <!-- <div>
    <NavHeader />
    <div
      class="lg:w-[1150px] md:mx-auto md:mx-6 mx-4 md:pt-[116px] md:mb-[42px] pb-[120px] pt-[45px]"
    > -->
      <div class="flex w-full gap-[100px]">
        <div class=" w-full ">
          <slot name="content" />
        </div>
        <div class="w-[300px] relative hidden lg:flex">
          <div class="sticky mt-8 top-10 w-[300px]">
            <slot name="sidebar" />
          </div>
        </div>
        <div class="is-show-element lg:hidden flex" @click="handleClick()">
          <Icon name="ph:dots-three-bold" size="38" color="D0D0D0" />
        </div>
        <div class="sidebar-mobile">
          <div
            class="flex place-items-center justify-end p-5 gap-[9px] text-[#B4B3B3]"
            @click="handleClick()"
          >
            <p>Zamknij</p>
            <Icon name="ph:x-light" size="23" />
          </div>
          <div class="px-6 -mt-5">
            <slot name="sidebar" />
          </div>
        </div>
        <div class="bg-sidebar-mobile" @click="handleClick()" />
      </div>
    <!-- </div>
    <NavBottom class="w-full px-10" />
  </div> -->
</template>

<script setup lang="ts">
import gsap from "gsap";

const show = ref(false);

const handleClick = () => {
  if (show.value === false) {
    gsap.to(".sidebar-mobile", {
      duration: 0.28,
      x: -300,
    });
    gsap.to(" .bg-sidebar-mobile", {
      duration: 0.26,
      opacity: 1,
      display: "flex",
    });

    show.value = !show.value;
  } else {
    gsap.to(".sidebar-mobile", {
      duration: 0.28,
      x: 0,
    });
    gsap.to(" .bg-sidebar-mobile", {
      duration: 0.26,
      opacity: 0,
      display: "none",
    });

    show.value = !show.value;
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.is-show-element {
  position: fixed;
  background: white;
  top: 65%;
  padding: 0px 6px 0px 12px;
  right: -30px;
  transform: translate(-50%, -50%);
  border-radius: 99px 0px 0px 99px;
  box-shadow: 0px 0px 9px 2px rgba(0, 0, 0, 0.16); /* Dodanie cienia */
}

.sidebar-mobile {
  background: white;
  position: fixed;
  height: 100%;
  top: 0px;
  right: -300px;
  z-index: 60;
  width: 300px;
}

.bg-sidebar-mobile {
  background: rgba(0, 0, 0, 0.56);
  backdrop-filter: blur(4px);
  position: fixed;
  z-index: 50;
  height: 100%;
  top: 0px;
  right: 0px;
  left: 0px;
  display: none;
  width: 100%;
}
</style>
