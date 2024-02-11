<template>
  <Transition
    @before-enter="BeforeEnterBg"
    @enter="EnterBg"
    @leave="LeaveBg"
    :css="false"
  >
    <div class="background" @click="isShow" v-if="show" />
  </Transition>
  <div
    class="relative flex shrink-1 hover:cursor-pointer"
    @click="isShow"
    :class="{ 'z-50': show }"
  >
    <img v-if="props.image" :src="props.image" class="avatar" loading="lazy" />
    <Icon v-else name="carbon:user-avatar-filled" color="#BFCBEE" size="62" />
    <Transition
      @enter="EnterModal"
      @leave="LeaveModal"
      :css="false"
    >
      <div v-if="show" class="space-y-[9px] open-modal">
        <ButtonLink
          v-for="(link, index) in links"
          :key="index"
          :name="link.name"
          :link="link.link"
          size="17"
          iconSize="22"
          paddingSize="30"
          :notHover="false"
        />
        <ButtonLink
          class="hover:text-red-500"
          name="Wyloguj się"
          size="17"
          paddingSize="30"
          iconSize="22"
          :notHover="false"
          @click="authState.logout"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { CSSRulePlugin } from 'gsap/dist/CSSRulePlugin';
import { useAuth } from "@/store/useAuth";
const authState = useAuth();

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
});

const links = [
  {
    name: "Profil",
    link: "/konto/profil",
  },
  {
    name: "Zapisane artykuły",
    link: "/konto/zapisane-posty",
  },
  {
    name: "Moje artykuły",
    link: "/konto/moje-posty",
  },
  {
    name: "Ustawienia",
    link: "/konto/ustawienia",
  },
];

const show = ref(false);
const isShow = () => {
  show.value = !show.value;
};
const setShowTrue = () => {
  show.value = true;
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
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.open-modal {
  background-color: rgb(255, 255, 255);
  border-radius: 12px !important;
  width: 240px;
  padding: 30px 0px 30px 0px;
  margin-left: -194px;
  top: 64px;
  position: absolute;
  z-index: 30;
}

.background {
  background: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(2px);
  z-index: 50;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.avatar {
  width: 49px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
