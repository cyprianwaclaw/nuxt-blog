<template>
  <div class="flex shrink-1 max-w-[750px] justify-between sm:gap-10 gap-[24px] place-items-center">
    <div class="flex flex-col">
      <div class="flex justify-between md:mb-[12px] mb-[6px]">
        <div class="flex sm:gap-[10px] gap-[5px] place-items-center">
          <img
            v-if="post.user?.image"
            :src="post.user?.image"
            class="avatar"
            loading="lazy"
          />
          <Icon
            v-else
            name="carbon:user-avatar-filled"
            color="#BFCBEE"
            size=""
            class="text-[20px] ms:text-[21px] md:text-[22px]"
          />
          <NuxtLink :to="`/autor/${post.user?.link}`" class="flex">
            <p
              class="flex md:text-[14px] family hover:underline text-light text-[12px] text-[#989898] md:mt-0"
            >
              {{ post.user?.name }}
            </p>
          </NuxtLink>
        </div>
        <div class="sm:flex hidden place-items-center gap-[14px] cursor-default">
          <Icon
            name="ph:chat-circle-dots"
            class="-mt-[2px] -mr-[7px]"
            color="#C5C5C5"
            size="22"
          />
          <p class="text-[15px] text-[#C5C5C5]">{{ post.comments }}</p>
          <div class="dot" />
          <Icon
            @click="changeSaved(post.id)"
            :name="save ? 'ph:bookmark-simple-fill' : 'ph:bookmark-simple'"
            :class="[
              logged ? 'cursor-pointer icon-unsaved' : 'not-login',
              [`post-saved-${post.id}`],
              save ? 'icon-saved' : 'not-login',
            ]"
            size="22"
          />
        </div>
        <div class="flex sm:hidden">
          <Icon
            @click="changeSaved(post.id)"
            :name="save ? 'ph:bookmark-simple-fill' : 'ph:bookmark-simple'"
            :class="[
              logged ? 'cursor-pointer icon-unsaved' : 'not-login',
              [`post-saved-${post.id}`],
              save ? 'icon-saved' : 'not-login',
            ]"
            size="20"
          />
        </div>
      </div>
      <NuxtLink :to="`/post/${post.link}`">
        <p
          class="md:text-[22px] text-[17px] md:leading-[28px] leading-[20px] font-medium hover:text-gray-600 hover:underline"
        >
          {{ sliceText(post.title, 70) }}
        </p>
      </NuxtLink>
      <p class="des mt-[7px] sm:flex hidden">{{ sliceText(post.description, 114) }}</p>
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
  width: 250px;
  height: 212px;
  border: 1px solid $border;
}

.avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
}

@media screen and (max-width: 640px) {
  .image {
    border-radius: 10px;
    object-fit: cover;
    width: 108px;
    height: 108px;
    border: 1px solid $border;
  }

  .avatar {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    object-fit: cover;
  }
}

.dot {
  width: 4px;
  height: 4px;
  background-color: $gray;
  border-radius: 50%;
}
.not-login {
  color: $gray;
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
