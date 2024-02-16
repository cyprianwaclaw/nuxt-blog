<template>
  <div class="w-[300px]">
    <div v-if="success" class="w-[300px] cursor-default">
      <h2 class="mb-[14px]">{{ success }}</h2>
      <p class="text-gray-400 leading-[24px] mb-[32px]">
        Twoje hasło zostało pomyślnie zmienione, teraz możesz zalogować się do swojego
        konta przy użyciu nowego hasła.
      </p>
      <div class="flex flex-col gap-4">
        <ButtonLoading
          :disable="false"
          @click="loginToAccount"
          isLoading="false"
          :loading="loadingLogin"
          text="Przejdz do konta"
        />
        <button class="button-ghost" @click="$emit('componentLogin')">Zaloguj się</button>
      </div>
    </div>
    <div v-else class="w-[300px] mx-auto my-auto cursor-default">
      <h2 class="mb-[28px]">Przypomnij hasło</h2>
      <Form
        @submit="changePassword"
        @click="nullError"
        :validation-schema="schema"
        v-slot="{ meta, values, errors }"
      >
        <div class="flex flex-col gap-[16px] mb-7">
          <InputBase
            name="email"
            placeholder="E-mail"
            type="text"
            :hasError="errors?.email || error"
          />
          <div class="relative">
            <Icon
              :name="iconTypePassword"
              @click="changeType('password')"
              class="absolute z-50 top-[16px] right-[24px] text-[#b7b6b6] hover:text-[#878787] hover:duration-150 cursor-pointer"
              size="23"
            />
            <InputBase
              name="password"
              placeholder="Nowe hasło"
              :type="typePassword"
              :hasError="errors?.password"
            />
          </div>
          <div class="relative">
            <Icon
              :name="iconTypeConfirmPassword"
              @click="changeType('confirmPassword')"
              class="absolute z-50 top-[16px] right-[24px] text-[#b7b6b6] hover:text-[#878787] hover:duration-150 cursor-pointer"
              size="23"
            />
            <InputBase
              name="confirmPassword"
              placeholder="Potwierdz hasło"
              :type="typeConfirmPassword"
              :hasError="errors?.confirmPassword"
            />
          </div>
        </div>
        <ButtonLoading
          :disable="
            !meta.valid ||
            error ||
            !values.password ||
            values.password.length === 0 ||
            !values.confirmPassword ||
            values.confirmPassword.length === 0
          "
          isLoading="false"
          :loading="loading"
          text="Zmień hasło"
        />
      </Form>
      <div class="flex gap-[6px] justify-center mt-8">
        <p class="font-base text-[14px] cursor-default text-black">Masz już konto?</p>
        <p class="font-medium text-[14px] text-open" @click="$emit('componentLogin')">
          Zaloguj się
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Yup from "yup";
import { useAuth } from "@/store/useAuth";
import * as yup from "yup";
import { Form, Field, useForm, ErrorMessage, useField } from "vee-validate";
const axiosInstance = useNuxtApp().$axiosInstance;
const auth = useAuth();
const emit = defineEmits(["close"]);

const loading = ref(false);
const loadingLogin = ref(false);

const error = ref("") as any;
const success = ref("") as any;
const loginData = ref("") as any;

const typePassword = ref<string>("password");
const typeConfirmPassword = ref<string>("password");

const iconTypePassword = ref<string>("ph:eye");
const iconTypeConfirmPassword = ref<string>("ph:eye");

const changeType = (typeName: string) => {
  if (typeName === "password") {
    typePassword.value = typePassword.value === "password" ? "text" : "password";
    iconTypePassword.value =
      typePassword.value === "password" ? "ph:eye" : "ph:eye-slash";
  } else {
    typeConfirmPassword.value =
      typeConfirmPassword.value === "password" ? "text" : "password";
    iconTypeConfirmPassword.value =
      typeConfirmPassword.value === "password" ? "ph:eye" : "ph:eye-slash";
  }
};

const schema = yup.object({
  email: yup.string().test("valid-email", "Nieprawidłowy adres e-mail", (value) => {
    if (!value || value === "") return true;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(value);
  }),
  password: yup
    .string()
    .test("valid-password", "Nieprawidłowe hasło", (value) => {
      if (!value || value === "") return true;
      if (!/[a-z]/.test(value)) {
        throw new yup.ValidationError(
          "Hasło musi zawierać co najmniej jedną małą literę.",
          null,
          "password"
        );
      }
      if (!/[A-Z]/.test(value)) {
        throw new yup.ValidationError(
          "Hasło musi zawierać co najmniej jedną dużą literę.",
          null,
          "password"
        );
      }
      if (!/\d/.test(value)) {
        throw new yup.ValidationError(
          "Hasło musi zawierać co najmniej jedną cyfrę.",
          null,
          "password"
        );
      }
      if (!/[ @$\\!%*?&()#<>^\-_=+;:"/'|[\]{}]/.test(value)) {
        throw new yup.ValidationError(
          "Hasło musi zawierać co najmniej jeden znak specjalny.",
          null,
          "password"
        );
      }

      return true;
    })
    .max(20, "Hasło nie może mieć więcej niż 20 znaków"),

  confirmPassword: yup.string().oneOf([yup.ref("password")], "Hasła nie są identyczne"),
});

const changePassword = async (values: any) => {
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 600));
  try {
    const response = await axiosInstance.post("/auth/forgot-password", {
      email: values.email,
      newPassword: values.password,
      confirmPassword: values.confirmPassword,
    });
    success.value = response.data.message;
    loginData.value = values;
  } catch (e: any) {
    console.error(e.response.data);
    error.value = e.response.data.error;
  }
  loading.value = false;
};

const nullError = () => {
  error.value = "";
};

const loginToAccount = async () => {
  loadingLogin.value = true;
  await new Promise((resolve) => setTimeout(resolve, 600));
  auth.login(loginData.value.email, loginData.value.password);
  emit("close");
  loadingLogin.value = false;
};
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.text-open {
  color: $text-black;
}
.text-open:hover {
  color: $text-gray;
  cursor: pointer;
}
</style>
