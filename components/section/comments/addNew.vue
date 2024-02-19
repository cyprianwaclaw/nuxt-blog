<template>
  <div class="bg-white p-6 rounded-[11px] w-full">
    <div class="flex place-items-center justify-between mb-3">
      <div class="flex sm:gap-[8px] gap-[5px] place-items-center">
        <img
          v-if="props?.user?.image"
          :src="props?.user?.image"
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
        <NuxtLink :to="`/autor/${props?.user?.link}`" class="flex">
          <p
            class="flex md:text-[13px] family hover:underline text-light text-[12px] text-[#989898] md:mt-0"
          >
            {{ props?.user?.name }}
          </p>
        </NuxtLink>
      </div>
    </div>
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ meta, values }"
      :initial-values="initialValues"
    >
      <div class="flex flex-col gap-[16px]">
        <InputTextArea
          id="myInput"
          name="text"
          placeholder="Dodaj komentarz..."
          type="text"
          :hasError="!meta.valid"
        />
        <div class="justify-end w-full flex mt-2">
          
          <p v-if="props.toEdit" @click="$emit('cancel')" class="button-ghost mr-4 cursor-pointer">Anuluj</p>
          <div class="w-[175px]">
            <ButtonLoading
              isLoading="false"
              :disable="
                !meta.valid || (values.text?.length ? values.text?.length : 0) < 5
              "
              :loading="isLoading"
              :text="textButton()"
            />
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup";
import { getDate } from "@/functions";
import { Form } from "vee-validate";
const axiosInstance = useNuxtApp().$axiosInstance;
const { $changeApi } = useNuxtApp();
const emit = defineEmits(["addNew", "cancel"]);

const router = useRouter();

const isLoading = ref(false);
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  postId: {
    type: Number,
    required: true,
  },
  toEdit: {
    type: String,
    required: false,
  },
});

const userData = ref(null) as any;
const maxLetter = ref(114);

const schema = yup.object({
  text: yup.string().max(114, "Komentarz nie może mieć więcej niż 114 znaków"),
});

const onSubmit = async (values: any, formActions: any) => {
  isLoading.value = true;
  setTimeout(() => {
    let newComment = {
      date: getDate(),
      text: values.text,
      relaction: null,
      toEdit: true,
      user: props.user,
    };

    emit("addNew", newComment);
    isLoading.value = false;
    formActions.resetForm();
  }, 600);
};

const initialValues = {
  text: props.toEdit ? props.toEdit : "",
};
const textButton = ()=>{
  return props.toEdit ? "Zapisz zmiany": "Dodaj komentarz"
}
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
}

@media screen and (max-width: 640px) {
  .avatar {
    width: 17px;
    height: 17px;
    border-radius: 50%;
    object-fit: cover;
  }
}
</style>
