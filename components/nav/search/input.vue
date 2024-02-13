<template>
  <Transition @enter="EnterBg" @leave="LeaveBg" :css="false">
    <div class="background" @click="isShow" v-if="show" />
  </Transition>
  <Transition @enter="EnterInput" @leave="LeaveInput" :css="false">
    <div
      class="shrink-1 relative w-full"
      v-if="router.currentRoute.value.name !== 'post-dodaj-nowy'"
    >
      <Icon
        name="ci:search-magnifying-glass"
        class="absolute z-50 top-[17px] left-[20px] text-[#9f9f9f]"
        size="26"
      />
      <input
        type="text"
        ref="test"
        class="search-input"
        v-model="searchQuery"
        @input="handleInput"
        @click="setShowTrue"
        placeholder="Jaki temat Cię interesuje"
      />
      <Transition @enter="EnterModal" @leave="LeaveModal" :css="false">
        <div v-if="show" class="searching-open">
          <div v-if="searchResults.results ? false : true" class="relative flex flex-col">
            <!-- !gdy nie ma wyszukiwania -->
            <div class="flex justify-between">
              <div class="w-full flex-nowrap max-w-[300px] shrink-0">
                <p class="w-full text-[17px] font-medium mb-4">Popularni autorzy</p>
                <div
                  @click="goTo(author.link, 'author', isShow(), router)"
                  v-for="(author, index) in newData.authors"
                  :key="index"
                  class="flex place-items-center flex-nowrap mt-3 gap-[6px]"
                >
                  <img
                    v-if="author?.image"
                    :src="author?.image"
                    class="avatar"
                    loading="lazy"
                  />
                  <Icon
                    v-else
                    name="carbon:user-avatar-filled"
                    color="#BFCBEE"
                    size="37"
                  />
                  <p class="cursor-pointer hover:text-gray-500">
                    {{ author.name }}
                  </p>
                </div>
              </div>
              <div class="">
                <Swiper
                  :slidesPerView="1.24"
                  :spaceBetween="25"
                  @slideChange="handleSlideChange"
                >
                  <SwiperSlide
                    v-for="(recommended, index) in newData.recommended"
                    :key="index"
                  >
                    <img :src="recommended.image" class="post-image" />
                    <p
                      @click="goTo(recommended.link, 'post', isShow(), router)"
                      class="cursor-pointer"
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
                @click="goTo(category.link, 'category', isShow(), router)"
                v-for="(category, index) in newData.categories"
                :key="index"
                class="button-category cursor-pointer"
              >
                {{ category.name }}
              </p>
            </div>
          </div>

          <div v-else class="relative">
            <!-- !jest wyszukiwanie -->

            <div v-if="loading">Loading...</div>
            <div v-else>
              {{ searchResults.results }}
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { debounce, sliceText, goTo } from "@/functions";
const axiosInstance = useNuxtApp().$axiosInstance;
const { $changeApi } = useNuxtApp();
const router = useRouter();

const newData = ref(null) as any;
const response = await axiosInstance.post($changeApi("/search-nav"));
newData.value = response.data;

const searchQuery = ref("");
const searchResults = ref([]);
const loading = ref(false);

const showPrev = ref(false);
const showNext = ref(true);

const handleSlideChange = (swiper: any) => {
  showPrev.value = swiper.activeIndex > 0;
  showNext.value = swiper.activeIndex < newData.value.recommended.length - 1;
};

const fetchSearchResults = debounce(async () => {
  loading.value = true;
  try {
    const response = await axiosInstance.post($changeApi("/search-nav"), {
      query: searchQuery.value,
    });
    searchResults.value = response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
  } finally {
    loading.value = false;
  }
}, 300);

const handleInput = () => {
  fetchSearchResults();
};

watch(searchQuery, () => {
  fetchSearchResults();
});

const show = ref(false);
const isShow = () => {
  show.value = !show.value;
  showPrev.value = false;
  showNext.value = true;
};
const setShowTrue = () => {
  show.value = true;
};

const EnterModal = (el: any, done: any) => {
  gsap.from(el, {
    duration: 0.16,
    y: 20,
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

const EnterInput = (el: any, done: any) => {
  gsap.from(el, {
    opacity: 1,
    y: -100,
    duration: 0.44,
  });
};
const LeaveInput = (el: any, done: any) => {
  gsap.to(el, {
    y: -100,
    duration: 0.44,
  });
};
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.swiper {
  //width: 330px !important;
  position: absolute;
  right: 0;
  width: 60% !important;
  padding-right: 32px;
  overflow: hidden;
  overflow: clip;
  list-style: none;
  z-index: 1;
  display: block;
}

.search-input {
  border-radius: 8px;
  cursor: pointer;
  height: 61px;
  position: relative;
  z-index: 45 !important;
  background-color: #e9e9e9;
  width: 100%;
  padding-left: 61px;
  font-size: 17px;
  font-weight: 400;
  &::placeholder {
    color: #9f9f9f;
  }
}

.searching-open {
  background-color: rgb(255, 255, 255);
  border-radius: 12px !important;
  width: 100%;
  height: 534px;
  padding: 92px 0px 32px 32px;
  position: absolute;
  top: 0;
  z-index: 40;
}

.post-image {
  width: 100%;
  height: 210px;
  display: flex;
  border-radius: 10px;
}
.background {
  background: rgba(0, 0, 0, 0.42);
  //  background: rgba(0, 0, 0, 0.50);
  backdrop-filter: blur(4px);
  z-index: 40;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.avatar {
  width: 32px;
  height: 32px;
  margin-left: 3px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
