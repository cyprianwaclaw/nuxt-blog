<!-- <template>

    <div
    class="md:hidden  py-2.5  border-t border-gray-200 fixed left-0 bottom-0 z-20 grid grid-cols-4 w-full  bg-white justify-items-center"
    >
    <div
    class="grid justify-center w-full"
    v-for="(single, index) in MobileBottomNav"
    :key="index"
    >
      <NuxtLink
      :to="single.link"
      class="text-center mobile"
      :class="{ 'mobile-active': isActive(single.link) }"
      >
      <Icon
      :name="isActive(single.link) ? single.icon_active : single.icon"
      size="23"
      />
      {{ single.name }}
    </NuxtLink>
  </div>
</div>

<div class="hidden grid-cols-4 cursor-default md:grid">
  <div class="flex flex-col">
    <p class="text-[28px] font-medium">Nuxt3 Blog</p>
    <div class="flex flex-col mt-[21px] gap-[8px] cursor-pointer">
      <div class="flex place-items-center gap-[8px]">
        <Icon name="ph:facebook-logo" size="28" />
        <p class="text-[17px]">Facebook</p>
      </div>
      <div class="flex place-items-center gap-[8px] cursor-pointer">
        <Icon name="ph:instagram-logo" size="28" />
        <p class="text-[17px]">Instagram</p>
      </div>
      <div class="flex place-items-center gap-[8px] cursor-pointer">
        <Icon name="ph:youtube-logo" size="28" />
        <p class="text-[17px]">You Tube</p>
      </div>
    </div>
  </div>
  <div class="flex flex-col mr-[50px]">
    <h5 class="mb-[10px]">Blog</h5>
    <LinkHover
    v-for="(link, index) in Blog"
    :key="index"
        class="mt-[5px] cursor-pointer"
        :name="link.name"
        :link="link.link"
        size="17"
        iconSize="22"
        :notHover="false"
      />
    </div>
    <div class="flex flex-col mr-[50px]">
      <h5 class="mb-[10px]">Moje konto</h5>
      <LinkHover
        v-for="(link, index) in Account"
        :key="index"
        class="mt-[5px] cursor-pointer"
        :name="link.name"
        :link="link.link"
        size="17"
        iconSize="22"
        :notHover="false"
      />
    </div>
    <div class="flex flex-col w-full h-full bg-[#F8F8F8]"></div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const Blog = [
  { name: "Najpopularniejszi twórcy", link: "/popularni" },
  { name: "Przeglądaj tematy", link: "/temat" },
  { name: "Polityka prywatności", link: "/polityka" },
  { name: "Regulamin", link: "/polityka" },
];
const Account = [
  { name: "Profil", link: "/konto" },
  { name: "Zapisane artykuły", link: "/konto" },
  { name: "Moje artykuły", link: "/konto" },
  { name: "Dodaj nowy artykuł", link: "/post/nowy" },
];

const MobileBottomNav = [
  { name: "Główna", link: "/", icon_active: "ph:house-duotone", icon: "ph:house-light" },
  {
    name: "Artykuły",
    link: "/post/nowy",
    icon_active: "ph:newspaper-duotone",
    icon: "ph:newspaper-light",
  },
  {
    name: "Zapisane",
    link: "/post/nowy",
    icon_active: "ph:bookmarks-duotone",
    icon: "ph:bookmarks-light",
  },
  {
    name: "Konto",
    link: "/post/nowy",
    icon_active: "ph:user-circle-duotone",
    icon: "ph:user-circle-light",
  },
];
const isActive = (link: string) => {
  return router.currentRoute.value.path === link;
};
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.title {
  font-size: 15px;
  font-family: $family;
  font-weight: 300;
}
.title:hover {
  font-size: 15px;
  font-family: $family;
  font-weight: 400;
  cursor: pointer;
}

.mobile {
  color: rgb(172, 172, 172);
 // color: $gray;
  font-family: Jost;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.45px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  line-height: 1.7;
}

.mobile-active {
  color: #5d9dd9;
  font-weight: 500;

}
</style> -->
<template>
  <div class="py-7 flex justify-between family bg-gray-300 h-[400px]">
    <!-- <NuxtLink to="/">
      <p class="text-[38px] font-semibold">LOGO</p>
    </NuxtLink>
    <div class="flex place-items-center gap-7">
      <NuxtLink to="/logowanie">
          <p class="text-[18px]">Logowanie</p>
      </NuxtLink>
      <NuxtLink to="/rejestracja" class="">
            <button class="primary-button">
                <p class="text-[18px]">Rejestracja</p>
            </button>
      </NuxtLink>
    </div> -->
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
// const test = router.currentRoute.value.name;
</script>

<style scoped>
.active {
  color: #2bb069;
}
</style>
