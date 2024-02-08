<template>
  <NuxtLayout name="listing">
    <template #content>
      <NavListing
        :title="newData.user.name"
        :count="newData.user.postsCount"
        :array="titlesArray"
        :posts="newData.posts"
      />
      <div class="gap-[72px] md:gap-[121px] flex flex-col mt-[114px] md:mt-[170px]  w-full">
        <CardList
          v-for="(posts, index) in newData?.posts"
          :key="index"
          :post="posts"
          :logged="loggedIn"
        />
      </div>
      <SectionPagination
        :last_page="newData.pagination.last_page"
        :current_page="newData.pagination.current_page"
      />
    </template>
    <template #sidebar>
      <div class="w-full gap-20 border-own">
        <div class="flex flex-col">
          <img
            v-if="newData.user?.image"
            :src="newData.user?.image"
            class="avatar"
            loading="lazy"
          />
          <Icon
            v-else
            name="carbon:user-avatar-filled"
            color="#BFCBEE"
            class="-mb-[6px]"
            size="81"
          />
          <p class="mt-5 text-[19px] font-semibold mb-[4px]">
            {{ newData.user.name }}
          </p>
          <p class="text-gray-500 leading-[25px]">
            max 100-114 liter z api Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Sed do eiusmod tempor incididunt ut labore e
          </p>
        </div>
      </div>
      <div class="mt-[46px]">
        <p class="w-full text-[17px] font-medium mb-6">Ulubione kategorie</p>
        <div class="flex flex-wrap gap-x-3 gap-y-3">
          <NuxtLink
            v-for="(category, index) in newData.uniqueCategories"
            :key="index"
            class="button-category"
            :to="`/kategoria/${category.link}`"
          >
            {{ category.name }}
          </NuxtLink>
        </div>
      </div>
    </template>
  </NuxtLayout>

  <!-- <div class="flex columns-2 cursor-default gap-[12px]"> -->
  <!-- <div class="flex cursor-default gap-[12px]"> -->

  <!-- <SectionHomeHero :posts="data?.hero" /> -->
  <!-- <div class="flex flex-col lg:basis-8/12 w-full"> -->

  <!-- <div class="flex flex-col w-full"> -->
  <!-- <div class="w-full">
      <NavListing
        :title="newData.user.name"
        :count="newData.user.postsCount"
        :array="titlesArray"
        :posts="newData.posts"
      />
      <div class="gap-[121px] flex flex-col mt-[130px] w-full">
        <CardList
          v-for="(posts, index) in newData?.posts"
          :key="index"
          :post="posts"
          :logged="loggedIn"
        />
      </div>
      <SectionPagination
        :last_page="newData.pagination.last_page"
        :current_page="newData.pagination.current_page"
      />
    </div> -->
  <!-- <div class=""> -->

  <!-- <div class="basis-4/12" > -->
  <!-- <div class="basis-4/12 pl-[64px] relative md:flex hidden"> -->
  <!-- <SectionListingSidebar :data="newData" /> -->
  <!-- </div> -->
  <!-- <SectionListingSidebar :data="newData" /> -->
  <!-- </div> -->
  <!-- <div class="basis-4/12 pl-[64px] relative md:flex hidden">
      <div class="sticky mt-8 top-8">
        <div class="w-full gap-20 border-own">
          <div class="flex flex-col">
            <img
              v-if="newData.user?.image"
              :src="newData.user?.image"
              class="avatar"
              loading="lazy"
            />
            <Icon
              v-else
              name="carbon:user-avatar-filled"
              color="#BFCBEE"
              class="-mb-[6px]"
              size="81"
            />
            <p class="mt-5 text-[19px] font-semibold mb-[4px]">
              {{ newData.user.name }}
            </p>
            <p class="text-gray-500 leading-[25px]">
              max 100-114 liter z api
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore e
            </p>
          </div>
        </div>
        <div class="border-own">
          <p class="w-full text-[17px] font-medium mb-6">Ulubione kategorie</p>
          <div class="flex flex-wrap gap-x-3 gap-y-3">
            <NuxtLink
              v-for="(category, index) in newData.uniqueCategories"
              :key="index"
              class="button-category"
              :to="`/kategoria/${category.link}`"
            >
              {{ category.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div> -->
  <!-- </div> -->
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuth } from "@/store/useAuth";
import { formatQueryString } from "@/functions";
const axiosInstance = useNuxtApp().$axiosInstance;
const { $changeApi } = useNuxtApp();
const router = useRouter();

const newData = ref(null) as any;

const authState = useAuth();
const { loggedIn } = storeToRefs(authState);

const titlesArray = ref([
  { name: "Najnowsze artykóły", param: null, data: "null" },
  { name: "Najpopularniejsze artykóły", param: "popular", data: "null" },
  // { name: "O autorze", param: "test-3", data: "null" },
]);
const response = await axiosInstance.get(
  $changeApi(
    `/data/user/${router.currentRoute.value.params.link}?${formatQueryString(
      router.currentRoute.value.query
    )}`
  )
);
newData.value = response.data;

onBeforeRouteUpdate(async (to, from) => {
  window.scrollTo(0, 0);
  const response = await axiosInstance.get(
    $changeApi(
      `/data/user/${router.currentRoute.value.params.link}?${formatQueryString(to.query)}`
    )
  );
  newData.value = response.data;
});
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.avatar {
  width: 72px;
  height: 72px;
  margin: 0px 4px;
  border-radius: 50%;
  object-fit: cover;
}
.border-own {
  border-bottom: 2px solid $border;
  padding-bottom: 46px;
  padding-top: 46px;
}
</style>
