<template>
  <div class="flex flex-col max-w-[750px]" @click="errorAPINull">
    <NavListing title="Ustawienia konta" :array="titlesArray" />
    <!-- dla moje dane -->
    <div class="flex flex-col max-w-[540px]">
      <div
        v-if="router.currentRoute?.value?.query?.title == null"
        class="mt-[86px] md:mt-[100px] w-full"
      >
        <Form
          @submit="onSubmit"
          :validation-schema="schema"
          v-slot="{ meta, values, errors }"
          :initial-values="initialValues"
        >
          <div class="flex flex-col gap-[16px]">
            <p class="text-gray-500 -mb-[12px] text-[14px]">Imię i nazwisko</p>
            <InputBase
              name="name"
              placeholder="Twoje imię i nazwisko"
              type="text"
              :hasError="errors?.name"
            />
            <p class="text-gray-500 -mb-[12px] text-[14px] mt-5">Adres e-mail</p>
            <InputBase
              name="email"
              placeholder="Twój e-mail"
              type="text"
              :hasError="errors?.email"
            />
            <div class="w-full flex mt-7 flex justify-end">
              <div class="w-[150px]">
                <ButtonLoading
                  :disable="
                    !meta.valid ||
                    (values.name === initialValues.name &&
                      values.email === initialValues.email)
                  "
                  isLoading="false"
                  :loading="isLoadingButton"
                  text="Zapisz zmiany"
                />
              </div>
            </div>
          </div>
        </Form>
      </div>
      <!-- dla bezpieczenstwo -->
      <div
        v-if="router.currentRoute?.value?.query?.title === 'security'"
        class="mt-[86px] md:mt-[100px] w-full"
      >
        <p class="text-[21px] md:text-[24px] font-medium">Edycja hasła</p>
        <p class="text-gray-400 mb-7">Zmień swoje hasło do konta</p>
        <Form
          @submit="onSubmitSecurity"
          :validation-schema="schemaSecurity"
          v-slot="{ meta, values, errors }"
        >
          <div class="flex flex-col gap-[16px]">
            <p class="text-gray-500 -mb-[12px] text-[14px]">Aktualne hasło</p>
            <div class="relative">
              <Icon
                :name="iconTypeOldPassword"
                @click="changeType('oldPassword')"
                class="absolute z-50 top-[16px] right-[24px] text-[#b7b6b6] hover:text-[#878787] hover:duration-150 cursor-pointer"
                size="23"
              />
              <InputBase
                name="oldPassword"
                placeholder="*************"
                :type="loginTypeOldPassword"
                :hasError="errors?.oldPassword || errorAPIChangePassword?.error"
              />
            </div>
            <p class="text-gray-500 -mb-[12px] text-[14px] mt-5">Nowe hasło</p>
            <div class="relative">
              <Icon
                :name="iconTypeNewPassword"
                @click="changeType('newPassword')"
                class="absolute z-50 top-[16px] right-[24px] text-[#b7b6b6] hover:text-[#878787] hover:duration-150 cursor-pointer"
                size="23"
              />
              <InputBase
                name="newPassword"
                placeholder="*************"
                :type="loginTypeNewPassword"
                :hasError="errors?.newPassword"
              />
            </div>
            <p class="text-gray-500 -mb-[12px] text-[14px] mt-34">Powtórz hasło</p>
            <div class="relative">
              <Icon
                :name="iconTypeConfirmPassword"
                @click="changeType('confirmPassword')"
                class="absolute z-50 top-[16px] right-[24px] text-[#b7b6b6] hover:text-[#878787] hover:duration-150 cursor-pointer"
                size="23"
              />
              <InputBase
                name="confirmPassword"
                placeholder="*************"
                :type="loginTypeConfirmPassword"
                :hasError="errors?.confirmPassword"
              />
            </div>
            <div class="w-full flex mt-7 flex justify-end">
              <div class="w-[150px]">
                <ButtonLoading
                  :disable="
                    !meta.valid ||
                    !values.oldPassword ||
                    values.oldPassword.length === 0 ||
                    !values.newPassword ||
                    values.newPassword.length === 0 ||
                    !values.confirmPassword ||
                    values.confirmPassword.length === 0
                  "
                  isLoading="false"
                  :loading="isLoadingButtonSecurity"
                  text="Zapisz zmiany"
                />
              </div>
            </div>
          </div>
        </Form>
      </div>
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

const loginTypeOldPassword = ref<string>("password");
const loginTypeNewPassword = ref<string>("password");
const loginTypeConfirmPassword = ref<string>("password");

const iconTypeOldPassword = ref<string>("ph:eye");
const iconTypeNewPassword = ref<string>("ph:eye");
const iconTypeConfirmPassword = ref<string>("ph:eye");

const changeType = (typeName: string) => {
  if (typeName === "oldPassword") {
    loginTypeOldPassword.value =
      loginTypeOldPassword.value === "password" ? "text" : "password";
    iconTypeOldPassword.value =
      loginTypeOldPassword.value === "password" ? "ph:eye" : "ph:eye-slash";
  } else if (typeName === "newPassword") {
    loginTypeNewPassword.value =
      loginTypeNewPassword.value === "password" ? "text" : "password";
    iconTypeNewPassword.value =
      loginTypeNewPassword.value === "password" ? "ph:eye" : "ph:eye-slash";
  } else if (typeName === "confirmPassword") {
    loginTypeConfirmPassword.value =
      loginTypeConfirmPassword.value === "password" ? "text" : "password";
    iconTypeConfirmPassword.value =
      loginTypeConfirmPassword.value === "password" ? "ph:eye" : "ph:eye-slash";
  }
};

const newData = ref(null) as any;

const isLoadingButton = ref(false);
const isLoadingButtonSecurity = ref(false);

const titlesArray = ref([
  { name: "Moje dane" },
  { name: "Bezpieczeństwo", param: "security" },
]);

const response = await axiosInstance.get($changeApi("/user"));
newData.value = response.data;

const maxLetter = ref(500);

const schema = yup.object({
  name: yup.string().test("valid-name", "Nieprawidłowe imię", (value) => {
    if (!value) return true;
    const nameRegex = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+\s[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+$/;
    return nameRegex.test(value);
  }),
  email: yup.string().test("valid-email", "Nieprawidłowy adres e-mail", (value) => {
    if (!value || value === "") return true;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(value);
  }),
});

const schemaSecurity = yup.object({
  newPassword: yup
    .string()
    .test("valid-password", "Nieprawidłowe hasło", (value) => {
      if (!value || value === "") return true;
      if (!/[a-z]/.test(value)) {
        throw new yup.ValidationError(
          "Hasło musi zawierać co najmniej jedną małą literę.",
          null,
          "newPassword"
        );
      }
      if (!/[A-Z]/.test(value)) {
        throw new yup.ValidationError(
          "Hasło musi zawierać co najmniej jedną dużą literę.",
          null,
          "newPassword"
        );
      }
      if (!/\d/.test(value)) {
        throw new yup.ValidationError(
          "Hasło musi zawierać co najmniej jedną cyfrę.",
          null,
          "newPassword"
        );
      }
      if (!/[ @$\\!%*?&()#<>^\-_=+;:"/'|[\]{}]/.test(value)) {
        throw new yup.ValidationError(
          "Hasło musi zawierać co najmniej jeden znak specjalny.",
          null,
          "newPassword"
        );
      }

      return true;
    })
    .max(20, "Hasło nie może mieć więcej niż 20 znaków"),

  confirmPassword: yup.string().oneOf([yup.ref("newPassword")], "Hasła nie zgadzają się"),
});

const onSubmit = async (values: any) => {
  isLoadingButton.value = true;
  await axiosInstance.post($changeApi("/user/change"), {
    name: values.name,
    email: values.email,
  });
  const response = await axiosInstance.get($changeApi("/user"));
  newData.value = response.data;
  initialValues.value = {
    name: newData.value.name,
    email: newData.value.email,
  };
  setTimeout(() => {
    isLoadingButton.value = false;
  }, 800);
  initialValues.value = {
    name: newData.value.name,
    email: newData.value.email,
  };
};

const errorAPIChangePassword = ref(null) as any;

const onSubmitSecurity = async (values: any) => {
  isLoadingButtonSecurity.value = true;
  await new Promise((resolve) => setTimeout(resolve, 600));
  try {
    await axiosInstance.post($changeApi("/change-password"), {
      newPassword: values.newPassword,
      oldPassword: values.oldPassword,
      confirmPassword: values.confirmPassword,
    });
  } catch (error: any) {
    errorAPIChangePassword.value = error.response.data;
  }
  // Password1234!
  isLoadingButtonSecurity.value = false;
};

const errorAPINull = () => {
  errorAPIChangePassword.value = null;
};

const initialValues = ref({});
initialValues.value = {
  name: newData.value.name,
  email: newData.value.email,
};
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
</style>
