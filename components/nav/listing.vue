<template>
  <div class="flex place-items-center lg:gap-[24px] md:gap-[25px] gap-[12px]">
    <h1 class="text-[27px] xl:text-[52px] sm:text-[32px] md:text-[42px]">
      {{ capitalizeFirstLetter(props.title) }}
    </h1>
    <div class="dot" />
    <p class="text-[#C5C5C5] font-medium md:text-[20px] text-[12px]">{{ props.count }}</p>
  </div>
  <div class="relative md:mt-14 mt-4">
    <div class="flex border-b-[2px] h-2 absolute top-[41px] w-full" />
    <div
      class="absolute left-0 flex w-full gap-4 py-4 pr-20 overflow-auto overflow-x-scroll whitespace-nowrap scrollbar-hide"
    >
      <p
        v-for="(title, index) in props.array"
        :key="index"
        @click="changeData(title.param)"
        class="text-[15px] font-medium text-[#BDBDBD] px-[14px] hover:cursor-pointer hover:text-[#141010] flex whitespace-nowrap"
        :class="{ 'active-class': router.currentRoute.value.query?.title == title.param }"
      >
        {{ title.name }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const props = defineProps({
  array: Object as () => any[],
  title: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const changeData = (param: string, value: string) => {
  const routeParams = { ...router.currentRoute.value.query };
  const addNewQuery = () => {
    return {
      ...routeParams,
      title: param,
      page: 1,
    };
  };
  router.push({ query: addNewQuery() });
};
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.active-class {
  color: #5d9dd9;
  border-bottom: 2px solid #5d9dd9;
  padding-bottom: 8px;
  margin-bottom: -2px;
}
@media screen and (max-width: 640px) {
  .dot {
    width: 4px;
    height: 4px;
    background-color: $gray;
    border-radius: 50%;
  }
}
@media screen and (min-width: 640px) {
  .dot {
    width: 6px;
    height: 6px;
    background-color: $gray;
    border-radius: 50%;
  }
}
</style>
