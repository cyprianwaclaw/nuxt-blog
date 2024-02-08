<template>
  <Transition
    @before-enter="BeforeEnterBg"
    @enter="EnterBg"
    @leave="LeaveBg"
    :css="false"
  >
    <div class="background" @click="isShow" v-if="show" />
  </Transition>
  <Transition @enter="EnterInput" @leave="LeaveInput" :css="false">
    <!-- <div
      class="shrink-1 z-[45] w-[900px] 2xl:mx-[150px] md:mx-[100px] lg:mx-[80px] lg:flex hidden relative"
      v-if="router.currentRoute.value.name !== 'post-dodaj-nowy'"
    > -->
     <div
      class="shrink-1 z-[45] relative w-full"
      v-if="router.currentRoute.value.name !== 'post-dodaj-nowy'"
    >
      <Icon
        name="ci:search-magnifying-glass"
        class="absolute z-50 top-[17px] left-[20px] text-[#9f9f9f]"
        size="26"
      />
      <input
        type="text"
        ref="test"
        class="search-input"
        @click="setShowTrue"
        placeholder="Jaki temat Cię interesuje"
      />
      <Transition
        @before-enter="BeforeEnterModal"
        @enter="EnterModal"
        @leave="LeaveModal"
        :css="false"
      >
        <div v-if="show" class="searching-open">
          {{ data }}
          twt sasa
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import gsap from "gsap";

const router = useRouter();

const show = ref(false);
const isShow = () => {
  show.value = !show.value;
};
const setShowTrue = () => {
  show.value = true;
};

const BeforeEnterModal = (el: any) => {
  gsap.set(el, {
    opcity: 0,
  });
};
const EnterModal = (el: any, done: any) => {
  gsap.from(el, {
    duration: 0.16,
    y: 20,
  });
};
const LeaveModal = (el: any, done: any) => {
  gsap.to(el, {
    duration: 0.3,
    opacity: 0,
  });
  gsap.set(el, {
    delay: 0.4,
    display: "none",
  });
};

const BeforeEnterBg = (el: any) => {
  gsap.set(el, {
    opacity: 0,
    duration: 0.16,
  });
};
const EnterBg = (el: any, done: any) => {
  gsap.to(el, {
    opacity: 1,
    duration: 0.6,
  });
};
const LeaveBg = (el: any, done: any) => {
  gsap.to(el, {
    opacity: 0,
    duration: 0.35,
  });
  gsap.set(el, {
    delay: 0.35,
    display: "none",
  });
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
  height: 61px;
  z-index: 45;
  background-color: #e9e9e9;
  width: 100%;
  padding-left: 61px;
  font-size: 17px;
  font-weight: 400;
  &::placeholder {
    color: #9f9f9f;
  }
}

.searching-open {
  background-color: rgb(255, 255, 255);
  border-radius: 12px !important;
  width: 100%;
  padding: 76px 24px 24px 24px;
  position: absolute;
  height: 300px;
  z-index: 40;
}

.background {
  background: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(2px);
  z-index: 40;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
