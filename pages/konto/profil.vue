<template>
  <ModalNotification
    :modalActive="isModalActive"
    :width="600"
    :height="400"
    @close="handleModalClose"
  >
    <InputImage />
  </ModalNotification>
  <div class="flex flex-col max-w-[750px]">
    <div class="mb-4 relative">
      <img
        v-if="newData?.user?.image"
        :src="newData?.user?.image"
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
      <div
        @click="handleModalClose()"
        class="absolute bottom-[0px] left-[52px] bg-slate-200 p-[5px] mx-auto flex place-content-center rounded-full cursor-pointer"
      >
        <Icon name="ph:camera-fill" class="" size="16" />
      </div>
    </div>
    <NavListing
      :title="newData?.user.name"
      :count="newData?.user.postsCount"
      :array="titlesArray"
      />
    <div
      v-if="router.currentRoute?.value?.query?.title === 'about'"
      class="mt-[86px] md:mt-[100px] w-full"
    >
      <p class="text-[21px] md:text-[24px] font-medium">O mnie</p>
      <p class="text-gray-400 mb-7">
        Opisz siebie w kilku słowach i podziel się swoją historią
      </p>
      <Form
        @submit="onSubmit"
        :validation-schema="schema"
        v-slot="{ meta, values }"
        :initial-values="initialValues"
      >
        <div class="flex flex-col gap-[16px] mb-7">
          <InputTextArea
            name="about_user"
            placeholder="E-mail"
            type="text"
            mode="aggressive"
            :hasError="!meta.valid"
          />
          <div class="justify-end w-full flex mt-4">
            <button
              class="button-primary"
              :class="{
                'button-primary-disabled':
                  !meta.valid || values.about_user === meta.initialValues.about_user,
              }"
              :disabled="
                !meta.valid || values.about_user === meta.initialValues.about_user
              "
            >
              Zapisz zmiany
            </button>
          </div>
        </div>
      </Form>
    </div>
    <div v-else class="mt-[100px] md:mt-[117px]">
      <div class="gap-[72px] md:gap-[121px] flex flex-col" v-if="newData?.posts.length > 0">
        <CardList
          v-for="(posts, index) in newData?.posts"
          :key="index"
          :post="posts"
          :logged="loggedIn"
        />
      </div>
      <div v-else>
                <p class="text-[32px] font-medium text-gray-300">Brak artykułów</p>
      </div>
      <SectionPagination
        :last_page="newData.pagination.last_page"
        :current_page="newData.pagination.current_page"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuth } from "@/store/useAuth";
import * as yup from "yup";
import { Form, Field, useForm, ErrorMessage, useField } from "vee-validate";
import { formatQueryString, handleInputTextArea, modes } from "@/functions";
const axiosInstance = useNuxtApp().$axiosInstance;
const { $changeApi } = useNuxtApp();
const router = useRouter();

definePageMeta({
  middleware: "auth",
});

const newData = ref(null) as any;

const authState = useAuth();
const { loggedIn, image } = storeToRefs(authState);

const titlesArray = ref([
  { name: "Najnowsze artykóły", param: null, data: "null" },
  { name: "Najpopularniejsze artykóły", param: "popular", data: "null" },
  { name: "O mnie", param: "about", data: "null" },
]);

const isModalActive = ref(false);
const handleModalClose = () => {
  isModalActive.value = !isModalActive.value;
};

const response = await axiosInstance.get(
  $changeApi(`/user/profile?${formatQueryString(router.currentRoute.value.query)}`)
);
newData.value = response.data;

onBeforeRouteUpdate(async (to, from) => {
  window.scrollTo(0, 0);
  const response = await axiosInstance.get(
    $changeApi(`/user/profile?${formatQueryString(to.query)}`)
  );
  newData.value = response.data;
});

const maxLetter = ref(500);

const schema = yup.object({
  about_user: yup
    .string()
    .min(5, "Quiz nie może być dłuższy niż 99 minut")
    .max(200, "Quiz nie może być dłuższy niż 99 minut"),
});

const onSubmit = async (values: any) => {
  await axiosInstance.post($changeApi("/user/details"), {
    about_user: values.about_user,
  });
};

const initialValues = {
  about_user: newData.value?.about_user ? newData.value?.about_user : '',
};
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
.title-input::-webkit-resizer {
  display: none;
}
.title-input {
  width: 100%;
  border: 2px solid $border;
  line-height: 26px;
  padding: 14px 16px;
  border-radius: 10px;
}
.title-input:focus {
  border: 2px solid $primary;
  overflow: auto;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
</style>
