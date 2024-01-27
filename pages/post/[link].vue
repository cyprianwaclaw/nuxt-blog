<template>
  <div class="flex w-full cursor-default gap-[52px]">
    <div class="w-full basis-8/12">
      <div class="flex gap-3 place-items-center">
        <p class="text-[15px] font-medium text-[#BDBDBD]">{{ newData.date }}</p>
        <NuxtLink
          v-for="(category, index) in newData.categories"
          :key="index"
          class="flex gap-3 place-items-center"
          :to="`/kategoria/${category.link}`"
        >
          <div class="dot" />
          <p class="text-[15px] font-medium text-[#BDBDBD] hover:text-[#141010]">
            {{ category.name }}
          </p>
        </NuxtLink>
      </div>
      <h2 class="mt-3 mb-8">
        {{ newData.title }}
      </h2>
      <div
        class="flex justify-between w-full border-t border-b border-[#EDEDED]] place-items-center py-[15px] px-[24px]"
      >
        <div>Udostępnij post</div>
        <div class="flex place-items-center gap-[21px]">
          <Icon
            name="ph:chat-circle-dots"
            class="-mt-[2px] -mr-[12px]"
            color="#C5C5C5"
            size="24"
          />
          <p class="text-[17px] text-[#C5C5C5]">{{ newData.commentsCount }}</p>
          <Icon
            @click="changeSaved"
            :name="newData.saved ? 'ph:bookmark-simple-fill' : 'ph:bookmark-simple'"
            class=""
            :class="{ 'cursor-pointer': logged }"
            :color="newData.saved ? '#618CFB' : '#C5C5C5'"
            size="24"
          />
        </div>
      </div>
      <img :src="newData.image" class="hero-image" alt="" />
      <!-- content post -->
      <div class="mt-[180px]">
        <div class="" v-for="(data, index) in newData.postDetails" :key="index">
          <p :class="data.class_name" class="my-14">
            {{ data.text }}
          </p>
          <img v-if="data.image" :src="data.image" class="my-14 text-image" alt="" />
          <!-- {{ data }} -->
          <!-- {{ data.class_name }} -->
        </div>
      </div>
      <!-- komentarze -->
      <div></div>
      <!-- polecane -->
      <div></div>
    </div>
    <div class="basis-4/12 pl-[64px] relative">
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
            <NuxtLink
              :to="`/autor/${newData.user.link}`"
              class="mt-5 text-[19px] font-semibold mb-[4px] hover:underline"
            >
              <p>{{ newData.user.name }}</p>
            </NuxtLink>
            <p class="text-gray-500 leading-[25px]">
              <!-- max 100-114 liter z api -->
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore e
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
  </div>
  <div class="w-full bg-slate-300 h-[500px] mt-[220px] rounded-[14px]">dsds</div>
  <div class="mt-[220px]">
    <p class="md:text-[18px] md:font-normal gray text-[14px] font-light mb-[2px]">
      ZOBACZ WIĘCEJ OD AUTORA
    </p>
    <h1>Więcej od {{ newData.user.name }}</h1>
    <div class="gap-[121px] flex flex-col w-[750px] mt-[86px]">
      <CardList
        v-for="(populars, index) in newData.otherUserPosts"
        :key="index"
        :post="populars"
        :logged="loggedIn"
      />
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

const response = await axiosInstance.get(
  $changeApi(
    `/post/${router.currentRoute.value.params.link}?${formatQueryString(
      router.currentRoute.value.query
    )}`
  )
);
newData.value = response.data;

onBeforeRouteUpdate(async (to, from) => {
  window.scrollTo(0, 0);
  const response = await axiosInstance.get(
    $changeApi(
      `/post/${router.currentRoute.value.params.link}?${formatQueryString(to.query)}`
    )
  );
  newData.value = response.data;
});

const changeSaved = (id: number) => {
  //   if (loggedIn) {
  newData.value.saved = !newData.value.saved;
  console.log(newData);
  //   }
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
.hero-image {
  margin-top: 44px;
  width: 100%;
  height: 480px;
  border-radius: 12px;
  object-fit: cover;
}

.border-own {
  border-bottom: 2px solid $border;
  padding-bottom: 46px;
  padding-top: 46px;
}
.dot {
  width: 4px;
  height: 4px;
  background-color: $gray;
  border-radius: 50%;
}

.title {
  font-family: $family;
  font-size: 36px;
  font-style: normal;
  font-weight: 500;
  line-height: auto;
}
.list {
  letter-spacing: 0.32px;
  font-family: $family;
  font-size: 18px;
  font-weight: 500;
}
.paragraph {
  letter-spacing: 0.32px;
  //color:
  font-family: $family;
  font-size: 18px;
}
.text-image {
  width: 80%;
  height: 480px;
  border-radius: 12px;
  object-fit: cover;
}
</style>
