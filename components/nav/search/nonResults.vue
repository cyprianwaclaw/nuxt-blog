<template>
  <div>
    <div class="flex justify-between">
      <div class="w-full flex-nowrap max-w-[300px] shrink-0">
        <p class="w-full text-[17px] font-medium mb-4">Popularni autorzy</p>
        <div
          @click="goTo(author.link, 'author', state.is0penCloseSearch(), router)"
          v-for="(author, index) in props.authors"
          :key="index"
          class="flex place-items-center flex-nowrap mt-3 gap-[6px]"
        >
          <img v-if="author?.image" :src="author?.image" class="avatar" loading="lazy" />
          <Icon v-else name="carbon:user-avatar-filled" color="#BFCBEE" size="37" />
          <p class="cursor-pointer hover:text-gray-500">
            {{ author.name }}
          </p>
        </div>
      </div>
      <div class="">
        <Swiper :slidesPerView="1.24" :spaceBetween="25" @slideChange="handleSlideChange">
          <SwiperSlide v-for="(recommended, index) in props.posts" :key="index">
            <img :src="recommended.image" class="post-image" />
            <p
              @click="goTo(recommended.link, 'post', state.is0penCloseSearch(), router)"
              class="cursor-pointer hover:text-gray-600 hover:underline mt-2"
            >
              {{ sliceText(recommended.title, 70) }}
            </p>
          </SwiperSlide>
          <div class="flex w-full justify-end mt-5">
            <SwiperControls :showPrev="showPrev" :showNext="showNext" />
          </div>
        </Swiper>
      </div>
    </div>

    <div class="flex flex-wrap gap-x-3 gap-y-3 mt-[108px]">
      <p
        @click="goTo(category.link, 'category', state.is0penCloseSearch(), router)"
        v-for="(category, index) in props.categories"
        :key="index"
        class="button-category cursor-pointer"
      >
        {{ category.name }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { goTo, sliceText } from "@/functions";
import {useState} from "@/store/useState"
import {storeToRefs} from 'pinia'
const state = useState()
const router = useRouter();

const { openSearch } = storeToRefs(state)

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

const showPrev = ref(false);
const showNext = ref(true);

const handleSlideChange = (swiper: any) => {
  showPrev.value = swiper.activeIndex > 0;
  showNext.value = swiper.activeIndex < Number(props?.posts?.length) - 1;
};
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.swiper {
  position: absolute;
  cursor: grab;
  right: 0;
  width: 60% !important;
  padding-right: 32px;
  overflow: hidden;
  overflow: clip;
  list-style: none;
  z-index: 1;
  display: block;
}
.post-image {
  width: 100%;
  height: 210px;
  display: flex;
  border-radius: 10px;
}
.avatar {
  width: 32px;
  height: 32px;
  margin-left: 3px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
