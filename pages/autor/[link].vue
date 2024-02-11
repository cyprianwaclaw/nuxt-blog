<template>
  <NuxtLayout name="listing">
    <template #content>
      <NavListing
        :title="newData.user.name"
        :count="newData.user.postsCount"
        :array="titlesArray"
        />
        <!-- :posts="newData.posts" -->
      <div
        class="gap-[72px] md:gap-[121px] flex flex-col mt-[114px] md:mt-[170px] w-full"
      >
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
          <!-- <p class="text-gray-500 leading-[25px]">
             {{ newData.user?.about_user }}
          </p> -->
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
  <!-- <div class="w-full flex gap-[100px]">
    <div class="">
      <NavListing
        :title="newData.user.name"
        :count="newData.user.postsCount"
        :array="titlesArray"
      />
      <div
        class="gap-[72px] md:gap-[121px] flex flex-col mt-[114px] md:mt-[170px] w-full"
      >
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
    SIDEBAR
    <SectionSidebar /> -->
    <!-- <div class="w-[300px] relative hidden lg:flex">
      <div class="sticky mt-8 top-10">
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
            <div class="w-[300px] relative hidden lg:flex"> -->
    <!-- <div class="sticky mt-8 top-10">
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
          </div> -->
    <!-- </div> -->
    <!-- </div> -->
    <!-- </div>
      </div>
    </div>
    <div class="bg-sidebar-mobile" @click="handleClick()" /> -->
  <!-- </div> -->
</template>

<script setup lang="ts">
import gsap from "gsap";
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
