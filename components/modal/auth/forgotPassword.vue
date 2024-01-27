<template>
  <!-- <div class="w-[300px] absolute  top-1/2 transform  -translate-y-1/2 right-10"> -->
  <div class="w-[300px] mx-auto my-auto cursor-default">
    <h2 class="mb-[28px]">Przypomnij hasło</h2>
    <p
      v-if="errorValue?.errors?.notExist ? true : false"
      class="text-red-500 text-[14px] mb-4 -mt-5"
    >
      {{ errorValue?.errors?.notExist[0] }}
    </p>
    <Form @submit="login" @click="auth.nullError()">
      <div class="flex flex-col gap-[16px] mb-7">
        <InputBase
          name="email"
          placeholder="E-mail"
          type="text"
          :hasError="errorValue?.errors?.email ? errorValue?.errors?.email[0] : errorValue?.errors?.notExist ? 'notShow' : false"
        />
        <div class="relative">
          <Icon
            :name="iconType"
            @click="changeType(loginType)"
            class="absolute z-50 top-[16px] right-[24px] text-[#b7b6b6] hover:text-[#878787] hover:duration-150 cursor-pointer"
            size="23"
          />
          <InputBase
            name="password"
            placeholder="Password"
            :type="loginType"
            :hasError="
              errorValue?.errors?.password ? errorValue?.errors?.password[0] : errorValue?.errors?.notExist ? 'notShow' : false
            "
          />
        </div>
        <!-- <div class="flex justify-end -mt-1">
          <p class="font-base text-[13px] text-open" @click="$emit('componentForgot')">
            Nie pamiętam hasła
          </p>
        </div> -->
      </div>
      <!-- <p
        v-if="errorValue?.errors?.notExist ? true : false"
        class="text-red-500 text-[13px] mb-2"
      >
        {{ errorValue?.errors?.notExist[0] }}
      </p> -->
      <ButtonLoading isLoading="false" :loading="isLoadingButton" text="Zaloguj się" />
    </Form>
      <div class="flex gap-[6px] justify-center mt-8">
      <p class="font-base text-[14px] cursor-default text-black">Masz już konto?</p>
      <p class="font-medium text-[14px] text-open" @click="$emit('componentLogin')">
        Zaloguj się
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Yup from "yup";
import { Form } from "vee-validate";
import { useAuth } from "@/store/useAuth";

const auth = useAuth();

const { isLoadingButton, errorValue } = storeToRefs(auth);

const error = errorValue as any;
const loginType = ref<string>("password");
const iconType = ref<string>("ph:eye");

const changeType = (typeName: string) => {
  if (typeName == "password") {
    loginType.value = 'text';
    iconType.value = 'ph:eye-slash'
  } else {
    loginType.value = 'password';
    iconType.value = 'ph:eye' 
  }
};
const login = (values: any) => {
  auth.login(values.email, values.password);
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
