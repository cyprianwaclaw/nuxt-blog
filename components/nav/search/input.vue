<template>
  <Transition @enter="EnterBg" @leave="LeaveBg" :css="false">
    <div class="background" @click="state.is0penCloseSearch()" v-if="openSearch" />
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
        @click="state.is0penCloseSearch()"
        placeholder="Jaki temat Cię interesuje"
      />
      <Transition @enter="EnterModal" @leave="LeaveModal" :css="false">
        <div v-if="openSearch" class="searching-open">
          <div v-if="!searchResults.results" class="relative flex flex-col">
            <NavSearchNonResults
              :posts="newData.recommended"
              :categories="newData.categories"
              :authors="newData.authors"
            />
          </div>

          <div v-else class="relative">
            <div v-if="loading">Loading...</div>
            <div v-else>
              <NavSearchResults
                :posts="searchResults.posts"
                :categories="searchResults.categories"
                :authors="searchResults.authors"
              />
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { useState } from "@/store/useState";
import { storeToRefs } from "pinia";
import { debounce, sliceText, goTo } from "@/functions";
const axiosInstance = useNuxtApp().$axiosInstance;
const { $changeApi } = useNuxtApp();
const router = useRouter();
const state = useState();

const { openSearch, searchQuery } = storeToRefs(state);
const newData = ref(null) as any;

const response = await axiosInstance.post($changeApi("/search-nav"));
newData.value = response.data;

const searchResults = ref([]);
const loading = ref(false);

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
.background {
  background: rgba(0, 0, 0, 0.42);
  backdrop-filter: blur(4px);
  z-index: 40;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
