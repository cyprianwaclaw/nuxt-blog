<template>
  <Transition
    @before-enter="BeforeEnterBg"
    @enter="EnterBg"
    @leave="LeaveBg"
    :css="false"
  >
    <div class="blur-background" v-if="props.modalActive" />
  </Transition>
  <Transition
    @before-enter="BeforeEnterModal"
    @enter="EnterModal"
    @leave="LeaveModal"
    :css="false"
  >
    <div class="modal h-[600px] max-w-[900px]" v-if="props.modalActive">
      <Icon
        name="carbon:close"
        size="31"
        class="flex absolute top-6 right-6 justify-end text-[#b7b6b6] hover:text-[#878787] hover:duration-150 cursor-pointer"
        @click="$emit('close')"
      />
      <div class="flex gap-[64px]">
        <div class="min-w-[250px] h-[200px] bg-gray-400"></div>
        <div class="w-full">
          <p class="font-medium text-[16px] mb-2">Napisz zajawkę artukułu</p>
          <!-- class="add-new-input" -->
          <textarea
            class="add-new-input"
            type="text"
            v-model="description"
            placeholder="Miejsce za zajawkę..."
            @input="handleInputTextArea"
            wrap="soft"
            rows="5"
            :maxlength="maxLetterDes"
          />
          <p class="font-medium text-[16px] mb-[1px] mt-[43px]">Kategorię</p>
          <InputMultiSelect
            :suggestions="suggestions"
            @update-select="handleSelectedCategories"
          />
          <div class="w-full justify-end flex mt-[120px] gap-[21px]">
            <button class="button-ghost" @click="handleModal">Zapisz jako szkic</button>
            <button class="button-primary" @click="handleModal">Opublikuj artykuł</button>
          </div>
          <!-- <p class="text-slate-200 text-[18px] mb-[10px]">Opowiedz o artykule</p>
        <textarea
          class="add-new-input"
          type="text"
          v-model="description"
          placeholder="Miejsce za zajawkę..."
          @input="handleInputTextArea"
          wrap="soft"
          rows="4"
          :maxlength="maxLetterDes"
        />
        <p class="text-[18px] text-slate-200 mb-[7px] mt-[21px]">Kategoria</p>
        <InputMultiSelect
          :suggestions="suggestions"
          @update-select="handleSelectedCategories"
        /> -->
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { useAuth } from "@/store/useAuth";
import { handleInputTextArea } from "@/functions";
const auth = useAuth();

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  text: {
    type: String,
    required: false,
  },
  modalActive: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close", "confirmButton"]);

const EnterModal = (el: any, done: any) => {
  gsap.from(el, {
    duration: 0.24,
    y: 24,
  });
};
const LeaveModal = (el: any, done: any) => {
  gsap.to(el, {
    duration: 0.4,
    opacity: 0,
  });
  gsap.set(el, {
    delay: 0.5,
    display: "none",
  });
};

const BeforeEnterBg = (el: any) => {
  gsap.set(el, {
    opacity: 0,
  });
};
const EnterBg = (el: any, done: any) => {
  gsap.to(el, {
    opacity: 1,
    duration: 0.6,
  });
};
const LeaveBg = (el: any, done: any) => {
  gsap.to(el, {
    opacity: 0,
    duration: 0.4,
  });
  gsap.set(el, {
    delay: 0.4,
    display: "none",
  });
};

const maxLetterDes = ref(300);
const description = ref();
const suggestions = ref([
  { id: 1, name: "Technologia" },
  { id: 2, name: "Programowanie" },
  { id: 3, name: "Projekty DIY" },
  { id: 4, name: "Recenzje sprzętu" },
  { id: 5, name: "Poradniki" },
  { id: 6, name: "Rozwój osobisty" },
  { id: 7, name: "Podróże" },
  { id: 8, name: "Kulinaria" },
  { id: 9, name: "Sztuka i kultura" },
  { id: 10, name: "Zdrowie i fitness" },
  { id: 11, name: "Marketing internetowy" },
  { id: 12, name: "Finanse osobiste" },
  { id: 13, name: "Nauka języków obcych" },
  { id: 14, name: "Recenzje książek" },
  { id: 15, name: "Film i telewizja" },
  { id: 16, name: "Gry komputerowe" },
  { id: 17, name: "Motoryzacja" },
  { id: 18, name: "Moda i uroda" },
  { id: 19, name: "Życie rodziny" },
]);
const getOptionNameById = (id: number) => {
  const selectedOption = suggestions.value.find((option: any) => option.id === id) as any;
  return selectedOption ? selectedOption.name : "";
};
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.add-new-input {
  display: flex;
  font-size: 16px;
  width: 100%;
  border: 2px solid $input-border;
  height: 138px;
  overflow: hidden;
  border-radius: 10px;
  padding: 9px 16px;
  font-weight: 400;
  transition: border-color 0.3s ease;

  &:focus {
    border: 2px solid $primary;
  }
}
</style>
