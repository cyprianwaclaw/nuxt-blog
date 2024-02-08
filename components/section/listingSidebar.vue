<template>
    <div class="w-[300px]">
        <!-- <pre>
            {{ props.data }}
        </pre> -->
   <!-- <div class="pl-[64px] relative md:flex hidden"> -->

      <div class="sticky mt-8 top-8">
        <div class="w-full gap-20 border-own">
          <div class="flex flex-col">
            <img
              v-if="props.data.user?.image"
              :src="props.data.user?.image"
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
              {{ props.data.user.name }}
            </p>
            <p class="text-gray-500 leading-[25px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore e
            </p>
          </div>
        </div>
        <div class="border-own">
          <p class="w-full text-[17px] font-medium mb-6">Ulubione kategorie</p>
          <div class="flex flex-wrap gap-x-3 gap-y-3">
            <NuxtLink
              v-for="(category, index) in props.data.uniqueCategories"
              :key="index"
              class="button-category"
              :to="`/kategoria/${category.link}`"
            >
              {{ category.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
    <!-- </div> -->
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    data:{
        type: Array,
        required: true,
    }
})
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
</style>