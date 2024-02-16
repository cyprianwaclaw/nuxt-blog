<template>
  <Transition
    @before-enter="BeforeEnterBg"
    @enter="EnterBg"
    @leave="LeaveBg"
    :css="false"
  >
    <div class="blur-background" @click="emitClick" v-if="props.modalActive" />
  </Transition>
  <Transition
    @before-enter="BeforeEnterModal"
    @enter="EnterModal"
    @leave="LeaveModal"
    :css="false"
  >
    <div class="modal" v-if="props.modalActive">
      <Icon
        name="carbon:close"
        size="31"
        class="flex absolute top-6 right-6 justify-end text-[#b7b6b6] hover:text-[#878787] hover:duration-150 cursor-pointer"
        @click="emitClick"
      />
      <div class="grid h-full grid-cols-2 place-items-center">
        <div
          class="bg-[#E9ECF2] w-full h-full place-items-center flex justify-center border-transparent rounded-[12px]"
        >
          <img src="@/assets/file/login-hero.png" />
        </div>
        <div class="relative">
          <Transition mode="out-in">
            <div
              class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 right-1/1"
              v-if="router.currentRoute.value.query?.p == 'register'"
            >
              <ModalAuthRegister @componentLogin="changeData('login')" />
            </div>
          </Transition>
          <Transition mode="out-in">
            <div
              class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 right-1/1"
              v-if="
                router.currentRoute.value.query?.p == 'login' ||
                router.currentRoute.value.query?.p == null
              "
            >
              <ModalAuthLogin
                @componentRegister="changeData('register')"
                @componentPassword="changeData('password')"
              />
            </div>
          </Transition>
          <Transition mode="out-in">
            <div
              class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 right-1/1"
              v-if="router.currentRoute.value.query?.p == 'password'"
            >
              <ModalAuthForgotPassword @componentLogin="changeData('login')" @close="$emit('close')" />
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { useAuth } from "@/store/useAuth";

const auth = useAuth();
const router = useRouter();
const { loggedIn } = storeToRefs(auth);
const props = defineProps({
  modalActive: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const emitClick = () => {
  emit("close");
  auth.nullError();
};

const changeData = (param: string) => {
  auth.nullError();
  const routeParams = { ...router.currentRoute.value.query };
  const addNewQuery = () => {
    return {
      ...routeParams,
      p: param,
    };
  };
  router.push({ query: addNewQuery() });
};

const BeforeEnterModal = (el: any) => {
  gsap.set(el, {
    opcity: 0,
  });
};
const EnterModal = (el: any, done: any) => {
  gsap.from(el, {
    duration: 0.24,
    y: 24,
  });
};
const LeaveModal = (el: any, done: any) => {
  gsap.to(el, {
    duration: 0.4,
    opacity: 0,
  });
  gsap.set(el, {
    delay: 0.5,
    display: "none",
  });
};

const BeforeEnterBg = (el: any) => {
  gsap.set(el, {
    opacity: 0,
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
    duration: 0.5,
  });
  gsap.set(el, {
    delay: 0.5,
    display: "none",
  });
};
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.modal {
  max-width: 900px;
  height: 600px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
