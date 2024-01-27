<template>
  <div class="flex w-full cursor-default gap-[52px]">
    <div class="flex flex-col basis-8/12">
      <NavListing
        :title="newData.category.name"
        :count="newData.category.postsCount"
        :array="titlesArray"
        :posts="newData.posts"
      />
      <div class="gap-[121px] flex flex-col mt-[130px]">
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
    </div>

    <div class="basis-4/12 pl-[64px] relative">
      <div class="sticky mt-8 top-8">
        <div class="w-full gap-20 border-own">
          <p class="w-full text-[17px] font-medium mb-6">Najpopularniejszi autorzy</p>
          <div class="flex flex-wrap w-full">
            <NuxtLink
              v-for="(user, index) in newData.usersInCategory"
              :key="index"
              :to="`/autor/${user?.link}`"
              class="-mr-5"
            >
              <img v-if="user?.image" :src="user?.image" class="avatar" loading="lazy" />
              <Icon
                v-else
                name="carbon:user-avatar-filled"
                color="#BFCBEE"
                class="-mt-1"
                size="59"
              />
            </NuxtLink>
          </div>
        </div>
        <div class="border-own">
          <p class="w-full text-[17px] font-medium mb-6">Powiązane kategorie</p>
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
    </div>
  </div>
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
    `/data/category/${router.currentRoute.value.params.link}?${formatQueryString(
      router.currentRoute.value.query
    )}`
  )
);
newData.value = response.data;

onBeforeRouteUpdate(async (to, from) => {
   window.scrollTo(0, 0)
  const response = await axiosInstance.get(
    $changeApi(
      `/data/category/${router.currentRoute.value.params.link}?${formatQueryString(
        to.query
      )}`
    )
  );
  newData.value = response.data;
});
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.avatar {
  width: 50px;
  height: 50px;
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
