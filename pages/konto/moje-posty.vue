<template>
  <NavListing
    title="Moje artykuły"
    :count="newData.pagination.total"
    :array="titlesArray"
  />
  <div
    class="flex grid xl:grid-cols-3 sm:grid-cols-2 gap-[54px] gap-y-[54px] mt-[114px] md:mt-[170px]" v-if="newData?.posts.length > 0"
  >
    <CardSavedPost
      v-for="(posts, index) in newData.posts"
      :key="index"
      :post="posts"
      :logged="true"
    />
  </div>
     <div v-else class="mt-[114px] md:mt-[170px]">
        <p class="text-[32px] font-medium text-gray-300">Brak artykułów</p>
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

const titlesArray = ref([
  { name: "Opublikowane", param: null },
  { name: "Szkice", param: "szkice" },
]);

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
  $changeApi(`/user/posts?${formatQueryString(router.currentRoute.value.query)}`)
);
newData.value = response.data;

onBeforeRouteUpdate(async (to, from) => {
  window.scrollTo(0, 0);
  const response = await axiosInstance.get(
    $changeApi(`/user/posts?${formatQueryString(to.query)}`)
  );
  newData.value = response.data;
});
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
