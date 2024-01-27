<template>
  <div class="flex justify-between gap-10 place-items-center">
    <div class="flex flex-col w-full">
      <div class="flex justify-between mb-[12px]">
        <div class="flex gap-[10px] place-items-center">
          <img
            v-if="post.user?.image"
            :src="post.user?.image"
            class="avatar"
            loading="lazy"
          />
          <Icon v-else name="carbon:user-avatar-filled" color="#BFCBEE" size="24" />

          <NuxtLink :to="`/autor/${post.user?.link}`" class="flex">
            <p
              class="flex md:text-[14px] family hover:underline text-light text-[13px] md:mt-0"
            >
              {{ post.user?.name }}
            </p>
          </NuxtLink>
        </div>
        <div class="flex place-items-center gap-[14px]">
          <Icon
            name="ph:chat-circle-dots"
            class="-mt-[2px] -mr-[7px]"
            color="#C5C5C5"
            size="22"
          />
          <p class="text-[15px] text-[#C5C5C5]">{{ post.comments }}</p>
          <div class="dot" />
          <!-- <p class="text-[14px] text-[#C5C5C5]">{{ post.date }}</p> -->
          <Icon
            @click="changeSaved"
            :name="save ? 'ph:bookmark-simple-fill' : 'ph:bookmark-simple'"
            class=""
            :class="{ 'cursor-pointer': logged }"
            :color="save ? '#618CFB' : '#C5C5C5'"
            size="22"
          />
        </div>
      </div>
      <NuxtLink :to="`/post/${post.link}`">
        <p
          class="text-[22px] font-medium leading-[28px] hover:text-gray-600 hover:underline"
        >
          {{ sliceText(post.title, 70) }}
        </p>
      </NuxtLink>
      <p class="des mt-[7px]">{{ sliceText(post.description, 114) }}</p>
      <div class="flex gap-[12px] mt-[14px]">
        <NuxtLink class="button-category" :to="`/kategoria/${post.categories[0]?.link}`">
          {{ post.categories[0]?.name }}
        </NuxtLink>
        <NuxtLink class="button-category" :to="`/kategoria/${post.categories[1]?.link}`">
          {{ post.categories[1]?.name }}
        </NuxtLink>
      </div>
    </div>
    <img :src="post.image" class="image" alt="" />
  </div>
</template>

<script setup lang="ts">
// import gsap from 'gsap';
import { sliceText } from "@/functions";

const props = defineProps({
  post: Object as () => any,
  logged: {
    type: Boolean,
    required: true,
  },
});

const save = ref(props.post.saved);

// const savedIcon = ref(null);

const changeSaved = (id: number) => {
  if (props.logged) {
    console.log(save.value);
    // gsap.to(savedIcon.value, { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1 });
    save.value = !save.value;
    console.log(save.value);
  }
};
// onMounted(()=>{
//     // gsap.to(savedIcon.value, { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1 });
//     gsap.from(savedIcon.value, { x:400 });
    
// })
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.image {
  border-radius: 14px;
  object-fit: cover;
  width: 250px;
  height: 212px;
  border: 1px solid $border;
}

.avatar {
  width: 21px;
  height: 21px;
  border-radius: 50%;
  object-fit: cover;
}
.dot {
  width: 4px;
  height: 4px;
  background-color: $gray;
  border-radius: 50%;
}
</style>
