<template>
  <div class="flex justify-start mt-20" v-if="props.last_page != 1">
    <button v-if="props.current_page != 1" @click="changePage(1)" class="mr-2">
      <Icon name="ph:caret-double-left" size="26" class="-mt-1" />
    </button>
    <div v-for="(page, index) in pageNumbers(props.last_page, props.current_page)" :key="index">
      <p
        class="text-center cursor-pointer text-[18px] text-gray-400 hover:text-black py-[4px] px-[11px]"
        @click="changePage(page)"
        :class="{ active: page == props.current_page }"
      >
        {{ page }}
      </p>
    </div>
    <button v-if="props.current_page != props.last_page" @click="changePage(props.last_page)" class="ml-2">
      <Icon name="ph:caret-double-right" size="26" class="-mt-1" />
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  last_page: {
    type: Number,
  },
  current_page: {
    type: Number,
  },
});

const router = useRouter();

const pageNumbers = (lastPage: number, currentPage: number) => {
  const pages = [];
  const pagesPerPage = 4;
  const half = Math.floor(pagesPerPage / 2);

  let startPage = currentPage - half;
  let endPage = currentPage + half;

  if (startPage < 1) {
    startPage = 1;
    endPage = pagesPerPage;
  }

  if (endPage > lastPage) {
    endPage = lastPage;
    startPage = lastPage - pagesPerPage + 1;
    if (startPage < 1) {
      startPage = 1;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
};

const changePage = (pageNumber: number) => {
  const addParams = () => {
    return { ...router.currentRoute.value.query, page: pageNumber };
  };
  router.push({ query: addParams() });
};

</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.active {
  color: white;
  background-color: #618cfb;
  border-radius: 4px;
  margin-right: 7px;
  margin-left: 7px;
}
</style>
