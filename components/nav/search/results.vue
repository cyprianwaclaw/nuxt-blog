<template>
  <div class="flex w-full justify-between gap-[52px]">
    <div>
      <p class="text-[17px] font-medium mb-6">Artykuły</p>
      <div
        v-if="props.posts.length > 0"
        class="overflow-y-auto h-[370px] space-y-10 rounded-[10px]"
      >
        <div
          @click="goTo(post.link, 'post', state.isCloseSearch(), router)"
          v-for="(post, index) in props.posts"
          :key="index"
        >
          <div class="flex place-items-center w-full justify-between gap-[32px]">
            <div class="flex flex-col">
              <p
                class="md:text-[17px] leading-[21px] font-medium hover:text-gray-600 hover:underline cursor-pointer"
              >
                {{ sliceText(post.name, 70) }}
              </p>
              <p class="des mt-[3px] sm:flex hidden">
                {{ sliceText(post.description, 70) }}
              </p>
            </div>
            <img :src="post['hero-image']" class="post-image" />
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-[25px] font-semibold text-gray-300">Nie znaleziono artykułów</p>
      </div>
    </div>
    <div>
      <div class="flex flex-col w-[300px]">
        <div v-if="props.authors.length > 0" class="mb-5">
          <p class="text-[17px] font-medium mb-4">Autorzy</p>
          <div
            @click="goTo(author.link, 'author', state.isCloseSearch(), router)"
            v-for="(author, index) in props.authors"
            :key="index"
            class="flex place-items-center flex-nowrap mt-3 gap-[6px]"
          >
            <img
              v-if="author?.image"
              :src="author?.image"
              class="avatar"
              loading="lazy"
            />
            <Icon v-else name="carbon:user-avatar-filled" color="#BFCBEE" size="37" />
            <p class="cursor-pointer hover:text-gray-500">
              {{ author.name }}
            </p>
          </div>
        </div>
        <div v-if="props.categories.length > 0">
          <p class="text-[17px] font-medium mb-4 mt-[12px]">Kategorie</p>
          <div class="flex flex-wrap gap-x-3 gap-y-3 mt-[10px]">
            <p
              @click="goTo(category.link, 'category', state.isCloseSearch(), router)"
              v-for="(category, index) in props.categories"
              :key="index"
              class="button-category cursor-pointer"
            >
              {{ category.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { goTo, sliceText } from "@/functions";
import { useState } from "@/store/useState";
import { storeToRefs } from "pinia";
const state = useState();
const router = useRouter();

const { openSearch } = storeToRefs(state);

const props = defineProps({
  authors: {
    type: Array,
    reqired: true,
  },
  posts: {
    type: Array,
    reqired: true,
  },
  categories: {
    type: Array,
    reqired: true,
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.avatar {
  width: 32px;
  height: 32px;
  margin-left: 3px;
  border-radius: 50%;
  object-fit: cover;
}

.post-image {
  width: 112px;
  height: 112px;
  display: flex;
  border-radius: 10px;
}
</style>
