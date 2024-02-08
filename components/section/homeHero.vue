<template>
  <div class="flex-col md:hidden w-full">
    <!-- <pre>
  {{ posts}}
    </pre> -->

    {{ posts.image }}
    <p class="mb-3 text-[19px] font-medium mt-2">Ostatnio dodane artykuły</p>
    <div class="flex">
      <div v-for="(post, index) in posts" :key="index">
        <div class="w-[200px] h-[300px]" :style="`background-image: url(${post.image})`">
          <p>{{ post.title }}</p>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="lg:flex hidden flex-row gap-[64px] cursor-default"> -->
  <div class="md:flex hidden flex-row gap-[64px] cursor-default">
    <div class="w-full basis-7/12 flex-row shrink-1">
      <p class="mb-3 text-[19px] font-medium mt-2">Ostatnio dodane artykuły</p>
      <img :src="posts[0].image" class="hero-image h-[470px] flex shrink-1" />
      <div class="flex justify-between w-full place-item-center mt-[14px]">
        <div class="flex gap-[10px] place-items-center">
          <img
            v-if="posts[0].user?.image"
            :src="posts[0].user?.image"
            class="avatar"
            loading="lazy"
          />
          <Icon v-else name="carbon:user-avatar-filled" color="#BFCBEE" size="24" />

          <NuxtLink :to="`/autor/${posts[0].user?.link}`" class="flex">
            <p
              class="flex md:text-[14px] family hover:underline text-light text-[13px] md:mt-0"
            >
              {{ posts[0].user?.name }}
            </p>
          </NuxtLink>
        </div>
        <div class="flex place-items-center gap-[16px]">
          <Icon
            name="ph:chat-circle-dots"
            class="-mt-[2px] -mr-[10px]"
            color="#C5C5C5"
            size="22"
          />
          <p class="text-[15px] text-[#C5C5C5]">{{ posts[0].comments }}</p>
          <div class="dot" />
          <p class="text-[15px] text-[#C5C5C5]">{{ posts[0].date }}</p>
        </div>
      </div>
      <NuxtLink :to="`/post/${posts[0].link}`" class="flex">
        <h2 class="mt-[16px] mb-[5px] hover:text-gray-600 hover:underline">
          {{ sliceText(posts[0].title, 70) }}
        </h2>
      </NuxtLink>
      <p class="des">{{ sliceText(posts[0].description, 114) }}</p>
    </div>
    <div class="w-full basis-4/12 flex-row shrink-1">
      <div>
        <img :src="posts[1].image" class="hero-image h-[180px] flex shrink-1" />
        <div class="flex justify-between w-full place-item-center mt-[14px]">
          <div class="flex gap-[10px] place-items-center">
            <img
              v-if="posts[1].user?.image"
              :src="posts[1].user?.image"
              class="avatar"
              loading="lazy"
            />
            <Icon v-else name="carbon:user-avatar-filled" color="#BFCBEE" size="24" />

            <NuxtLink :to="`/autor/${posts[1].user?.link}`" class="flex">
              <p
                class="flex md:text-[14px] family hover:underline text-light text-[13px] md:mt-0"
              >
                {{ posts[0].user?.name }}
              </p>
            </NuxtLink>
          </div>
          <div class="flex place-items-center gap-[12px]">
            <Icon
              name="ph:chat-circle-dots"
              class="-mt-[2px] -mr-[5px]"
              color="#C5C5C5"
              size="19"
            />
            <p class="text-[14px] text-[#C5C5C5]">{{ posts[1].comments }}</p>
            <div class="dot" />
            <p class="text-[14px] text-[#C5C5C5]">{{ posts[1].date }}</p>
          </div>
        </div>
        <NuxtLink :to="`/post/${posts[1].link}`">
          <h3 class="mt-[14px] mb-[3px] hover:text-gray-600 hover:underline">
            {{ sliceText(posts[1].title, 70) }}
          </h3>
        </NuxtLink>
        <p class="des">{{ sliceText(posts[1].description, 114) }}</p>
      </div>
      <div class="mt-10">
        <img :src="posts[2].image" class="hero-image h-[180px] flex shrink-1" />
        <div class="flex justify-between w-full place-item-center mt-[14px]">
          <div class="flex gap-[10px] place-items-center">
            <img
              v-if="posts[2].user?.image"
              :src="posts[2].user?.image"
              class="avatar"
              loading="lazy"
            />
            <Icon v-else name="carbon:user-avatar-filled" color="#BFCBEE" size="24" />

            <NuxtLink :to="`/autor/${posts[2].user?.link}`" class="flex">
              <p
                class="flex md:text-[14px] family hover:underline text-light text-[13px] md:mt-0"
              >
                {{ posts[0].user?.name }}
              </p>
            </NuxtLink>
          </div>
          <div class="flex place-items-center gap-[12px]">
            <Icon
              name="ph:chat-circle-dots"
              class="-mt-[2px] -mr-[6px]"
              color="#C5C5C5"
              size="22"
            />
            <p class="text-[14px] text-[#C5C5C5]">{{ posts[2].comments }}</p>
            <div class="dot" />
            <p class="text-[14px] text-[#C5C5C5]">{{ posts[2].date }}</p>
          </div>
        </div>
        <NuxtLink :to="`/post/${posts[2].link}`">
          <h3 class="mt-[14px] mb-[3px] hover:text-gray-600 hover:underline">
            {{ sliceText(posts[2].title, 70) }}
          </h3>
        </NuxtLink>
        <p class="des">{{ sliceText(posts[2].description, 114) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { sliceText } from "@/functions";
const props = defineProps({
  posts: Object as () => any[],
});
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.hero-image {
  border-radius: 14px;
  object-fit: cover;
  width: 100%;
  border: 1px solid $border;
}
.avatar {
  width: 23px;
  height: 23px;
  border-radius: 50%;
  object-fit: cover;
}
.dot {
  width: 5px;
  height: 5px;
  background-color: $gray;
  border-radius: 50%;
}
</style>
