<template>
  <div>
    <img v-if="post.image" :src="post.image" loading="lazy" class="image" />
    <div class="flex gap-[10px] place-items-center justify-between mt-[8px] mb-[12px]">
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
      <p
        class="flex md:text-[14px] family text-light text-[13px] md:mt-0  gray"
      >
        {{ post.date }}
      </p>
    </div>
    <NuxtLink :to="`/post/${post.link}`">
      <p
        class="text-[20px] font-medium leading-[28px] hover:text-gray-600 hover:underline"
      >
        {{ sliceText(post.title, 70) }}
      </p>
    </NuxtLink>
    <p class="des mt-[7px]">{{ sliceText(post.description, 114) }}</p>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
const axiosInstance = useNuxtApp().$axiosInstance;
const { $changeApi } = useNuxtApp();
import { sliceText } from "@/functions";
import axios from "axios";
import changeApi from "~/plugins/changeApi";

const props = defineProps({
  post: Object as () => any,
  logged: {
    type: Boolean,
    required: true,
  },
});

const save = ref(props.post.saved);

const changeSaved = async (id: number) => {
  if (props.logged) {
    if (save.value) {
      await axiosInstance.post($changeApi("/unsave"), { post_id: id });
    } else {
      await axiosInstance.post($changeApi("/save"), { post_id: id });
    }
    const postClass = `.post-saved-${id}`;
    const targetElement = document.querySelector(postClass);
    gsap.to(targetElement, {
      scale: 2.5,
      duration: 0.12,
      yoyo: true,
      repeat: 1,
    });
    save.value = !save.value;
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.image {
  border-radius: 14px;
  object-fit: cover;
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
.icon-unsaved {
  color: $gray;
  transition: 0.18s ease-in;
  &:hover {
    color: darken($gray, 20%);
  }
}
.icon-saved {
  color: #618cfb;
  transition: 0.18s ease-in;
  &:hover {
    color: darken(#618cfb, 16%);
  }
}
</style>
