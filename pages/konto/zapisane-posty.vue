<template>
  <Transition
    @before-enter="BeforeEnterBg"
    @enter="EnterBg"
    @leave="LeaveBg"
    :css="false"
  >
    <div class="background" @click="isShow" v-if="show" />
  </Transition>
  <div class="relative flex justify-between place-items-end">
    <div class="flex w-full place-items-center gap-[24px]">
      <h1 class="text-[27px] xl:text-[52px] sm:text-[32px] md:text-[42px]">
        Zapisane artykuły
      </h1>
      <div class="dot" />
      <p class="text-[#C5C5C5] font-medium text-[20px]">{{ newData.pagination.total }}</p>
    </div>
    <!-- <div @click="isShow" :class="{ 'z-50': show }">
      <p class="text-[18px] primary font-medium hover:cursor-pointer mr-[20px]">Sortowanie</p>
    </div> -->
    <Transition
      @before-enter="BeforeEnterModal"
      @enter="EnterModal"
      @leave="LeaveModal"
      :css="false"
    >
      <div v-if="show" class="space-y-[9px] open-modal">
        <div
          class="bg-white -top-[12px] w-[170px] -mt-[65px] -ml-[100px] py-2 rounded-t-[12px]"
        >
          <p class="text-[18px] primary font-medium hover:cursor-pointer text-center">
            Sortowanie
          </p>
        </div>
        <p>Ilość na stronie</p>
        <input type="range" min="5" max="30" step="1" v-model="perPage" />
        <input v-model="perPage" />
        <div v-for="(single, index) in filterArray" :key="index">
          <label :for="'checkbox-' + index">
            <input
              type="checkbox"
              @change="handleChnage(index, single.selected)"
              v-model="single.selected"
              :id="'checkbox-' + index"
            />
            {{ single.name }}
          </label>
        </div>
        <!-- <div>Picked: {{ picked }}</div>

        <input type="radio" id="one" value="One" v-model="picked" />
        <label for="one">One</label>

        <input type="radio" id="two" value="Two" v-model="picked" />
        <label for="two">Two</label>-->
      </div>
    </Transition>
  </div>

  <div class="flex grid xl:grid-cols-3 sm:grid-cols-2 gap-[54px] gap-y-[54px] mt-[32px] md:mt-[68px] xl:mt-[82px]">
    <CardSavedPost
      v-for="(posts, index) in newData.posts"
      :key="index"
      :post="posts"
      :logged="true"
    />
  </div>
  <SectionPagination
    :last_page="newData.pagination.last_page"
    :current_page="newData.pagination.current_page"
  />
</template>

<script setup lang="ts">
import gsap from "gsap";
import { formatQueryString } from "@/functions";
const axiosInstance = useNuxtApp().$axiosInstance;
const { $changeApi } = useNuxtApp();
const router = useRouter();

definePageMeta({
  middleware: "auth",
});

const picked = ref("One");

const newData = ref(null) as any;

const perPage = ref(15) as any;
const filterArray = ref([
  {
    name: "Od najnowszych",
    selected: false,
  },
  {
    name: "Od najstarszych",
    selected: false,
  },
]);

const handleChnage = (index: number, selected: boolean) => {
  filterArray.value.forEach((filter, i) => {
    if (i !== index) {
      filter.selected = false;
    }
  });
};

const show = ref(false);
const isShow = () => {
  show.value = !show.value;
};

const response = await axiosInstance.get(
  $changeApi(`/user/saved-posts?${formatQueryString(router.currentRoute.value.query)}`)
);
newData.value = response.data;

onBeforeRouteUpdate(async (to, from) => {
  window.scrollTo(0, 0);
  const response = await axiosInstance.get(
    $changeApi(`/user/saved-posts?${formatQueryString(to.query)}`)
  );
  newData.value = response.data;
});

const BeforeEnterModal = (el: any) => {
  gsap.set(el, {
    opcity: 0,
  });
};
const EnterModal = (el: any, done: any) => {
  gsap.from(el, {
    duration: 0.16,
    // y: 20,
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
  //right:0px;
  right: -194px;
  top: 64px;
  position: absolute;
  z-index: 50;
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

.dot {
  width: 6px;
  height: 6px;
  background-color: $gray;
  border-radius: 50%;
}
</style>
