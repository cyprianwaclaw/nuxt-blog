<template>
  <NuxtLink :to="props?.link?.toLowerCase()"
    @mouseover="handleHover"
    @mouseout="handleHover"
    class="flex flex-row justify-between w-full"
    :style="{ paddingRight: paddingSize + 'px' }"
    >
      <p
        :style="{ fontSize: props.size + 'px', paddingLeft: paddingSize + 'px' }"
        class="cursory-pointer text-[16px] font-medium"
        :class="[
          isHovered ? 'text-[#141010]' : 'text-[#9b9b9b]',
          isHovered && props.name === 'Wyloguj się' ? 'text-red-600' : '',
        ]"
      >
        {{ props.name }}
      </p>
    <div v-if="props.notHover">
      <Icon v-if="isHovered" name="ph:arrow-up-right" :size="iconSize" />
      <Icon v-else name="ph:arrow-up-right" color="#C5C5C5" :size="iconSize" />
    </div>
    <div v-else>
      <Transition
        @before-enter="BeforeEnterModal"
        @enter="EnterModal"
        @leave="LeaveModal"
        :css="false"
      >
        <Icon v-if="isHovered" name="ph:arrow-up-right" :size="iconSize" />
      </Transition>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import gsap from "gsap";

gsap.config({
  nullTargetWarn: false,
});

const icon = ref();
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: false,
  },
  notHover: {
    type: Boolean,
    required: false,
  },
  size: {
    type: String,
    required: true,
  },
  iconSize: {
    type: String,
    required: true,
  },
  paddingSize: {
    type: String,
    required: true,
  },
});

const isHovered = ref(false);
const handleHover = () => {
  isHovered.value = !isHovered.value;
};

// const BeforeEnterModal = (el: any) => {
//   gsap.set(el, {
//     opsity: 0,
//     // display: "none",
//   });
// };
// const EnterModal = (el: any, done: any) => {
//   gsap.to(el, {
//     duration: 0.1,
//     // opacity: 1,
//     x: -30,
//   });
// };
// const LeaveModal = (el: any, done: any) => {
//   gsap.to(el, {
//     opasity: 0,
//     duration: 0.1,
//     x: 20,
//   });
//   gsap.set(el, {
//     delay: 0.1,
//     display: "none",
//   });
// };
</script>

<style scoped></style>
