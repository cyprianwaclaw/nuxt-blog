<template>
  <div class="relative flex flex-col w-full">
    <textarea
      v-on="handlers"
      :value="value"
      :type="type"
      :placeholder="placeholder"
      :label="label"
      @focus="inputFocus"
      @blur="inputBlur"
      :class="props.hasError ? 'isError' : null"
    />
    <Transition name="fade">
      <p v-if="props?.hasError" class="text-red-500 text-[13px] bg-white mt-1">
        {{ errorMessage }}
      </p>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { modes } from "@/functions";
const color = ref("#9B9B9B") as any;

const props = defineProps({
  name: {
    type: String,
  },
  error: {
    type: Boolean || null,
  },
  type: {
    type: String,
  },
  icon: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  hasError: {
    type: String,
  },
  label: {
    type: String,
  },
  mode: {
    type: String,
    default: "aggressive",
  },
});

const { meta, value, errorMessage, handleChange, handleBlur } = useField(
  props.name as any,
  null as any,
  {
    validateOnValueUpdate: false,
  }
);
const handlers = computed(() => {
  const on: Record<string, any> = {
    blur: handleBlur,
    input: [(e: any) => handleChange(e, false)],
  };

  const isError = (err: boolean, color: string) => {
    if (!err) {
      return "red";
    } else {
      return color;
    }
  };

  const triggers = modes[props.mode]({
    errorMessage,
    meta,
  });

  triggers.forEach((t: any) => {
    if (Array.isArray(on[t])) {
      on[t].push(handleChange);
    } else {
      on[t] = handleChange;
    }
  });

  return on;
});
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.isError {
  border: 2px solid $color-error;
  transition: border 0.3s ease;
}
.isError:focus {
  border: 2px solid $color-error;
  transition: border 0.3s ease-in, transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
.text {
  font-size: 15px;
  color: red;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(0px);
  opacity: 0;
}
textarea::-webkit-resizer {
  display: none;
}
textarea {
  width: 100%;
  border: 2px solid $border;
  line-height: 26px;
  padding: 14px 16px;
  border-radius: 10px;
  transition: border 0.3s ease;
}
textarea:focus {
  border: 2px solid $primary;
  overflow: auto;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  transition: border 0.3s ease-in, transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  box-shadow: none;
}
</style>
