<template>
  <div class="flex w-full place-items-center gap-[24px]">
    <h1 class="">{{ capitalizeFirstLetter(props.title) }}</h1>
    <div class="dot" />
    <p class="text-[#C5C5C5] font-medium text-[20px]">{{ props.count }}</p>
  </div>
  <div class="relative mt-14">
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
      page:1
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

.dot {
  width: 6px;
  height: 6px;
  background-color: $gray;
  border-radius: 50%;
}
</style>
