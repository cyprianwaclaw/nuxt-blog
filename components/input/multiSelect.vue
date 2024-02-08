<template>
  <div class="flex flex-col gap-3">
    <div v-if="isFocused" @click="hideSuggestions" class="absolute inset-0" />
    <!-- <div v-if="selectedOptions.length > 0" class="z-10 flex gap-[44px]">
      <div v-if="selectedOptions.length > 0" class="z-10 flex mt-1 w-full">
        <div class="flex flex-wrap gap-x-3 gap-y-3">
        <div class="flex gap-x-3 gap-y-3 overflow-auto overflow-x-scroll whitespace-nowrap scrollbar-hide">
          <div
            v-for="selectedId in selectedOptions"
            :key="selectedId"
            class="flex place-items-center gap-[8px] button-category"
          >
            <p>
            {{ getOptionNameById(selectedId) }}
            </p>
            <Icon
              name="carbon:close"
              size="23"
              class="hover:cursor-pointer"
              @click="removeSelectedOption(selectedId)"
            />
          </div>
        </div>
      </div>
    </div> -->
    <div class="relative mt-2">
      <!-- <div class="flex  w-full" @click="showSuggestions()">
        <div v-if="selectedOptions.length > 0" class="z-10 flex mt-1 w-full">
          <div
            v-for="selectedId in selectedOptions"
            :key="selectedId"
            class="absolute z-[30] flex w-full flex-wrap "
          >
            <p class="text-white">
              {{ getOptionNameById(selectedId) }}
            </p>
          </div>
        </div> -->
      <!-- </div> -->
      <!-- <Icon
        name="ph:caret-down"
        size="24"
        :class="{ 'rotate-180': isFocused }"
        class="hover:cursor-pointer z-[50] absolute right-[21px] top-[19px] text-[#a5a5a5]"
        @click="hideSuggestions"
      /> -->
      <!-- <div @click="showSuggestions()"> -->
      <!-- {{ selectedOptions[0]}} -->
      <!-- {{ selectedOptions[0] }} -->

      <!-- :class="{ 'category-input': !isFocused, 'not-hovered': isFocused }" -->
      <div
        class="flex flex-wrap  py-4 px-5 border-[2px]  border-[#E6E8EA]"
        :class="[isFocused ? 'rounded-t-[12px]' : 'rounded-[12px]']"
        @click="showSuggestions()"
      >
        <!-- <div
          v-if="selectedOptions.length > 0"
          class="z-[30] gap-x-3 gap-y-3 flex flex-wrap"
        > -->
        <div
          v-for="selectedId in selectedOptions"
          :key="selectedId"
          class="relative z-[30] px-[10px] py-[3px] bg-slate-300 rounded-[5px] mx-[7px] my-[6px]"
        >
          <div
            class="flex flex-wrap text-white text-[13px] place-items-center gap-1 font-thing"
          >
            <p>
              {{ getOptionNameById(selectedId) }}
            </p>
            <Icon
              name="carbon:close"
              size="17"
              class="hover:cursor-pointer"
              @click="removeSelectedOption(selectedId)"
            />
          </div>
          <!-- </div> -->
        </div>
        <!-- <div class="flex flex-wrap">
          <p class="text-white">R fgdf gf grfgfrg gg</p>
        </div>
        <div class="flex flex-wrap">
          <p class="text-white">R fgdf gf grfgfrg gg</p>
        </div>
        <div class="flex flex-wrap">
          <p class="text-white">R fgdf gf gg</p>
        </div> -->
        <!-- <div class="flex flex-wrap">
          <p class="text-white">R fgdf gf grfgfrg gg</p>
        </div> -->
        <!-- <div class="flex flex-wrap">
          <p class="text-white">R fgdf gf grfgfrg gg</p>
        </div> -->
        <div class="flex flex-wrap" @click="showSuggestions()">
          <!-- <p class="text-white">R fgd Projekty</p> -->

          <input
            class="category-input flex-wrap flex"
            v-model="searchQuery"
            :placeholder="placeholder"
            @input="updateSuggestions"
          />
        </div>
      </div>
      <!-- </div> -->
      <div v-if="isFocused" class="opened-input">
        <div
          v-if="filteredSuggestions.length > 0"
          class="h-[190px] overflow-y-scroll scrollbar-track"
        >
          <label
            v-for="suggestion in filteredSuggestions"
            :key="suggestion.id"
            class="flex w-full py-[9px] hover:cursor-pointer"
          >
            <input
              type="checkbox"
              :id="suggestion.id"
              v-model="selectedOptions"
              :value="suggestion.id"
              @change="handleCheckboxChange(suggestion.id)"
            />
            <p class="pl-[13px] text-[16px] font-medium text-[#9b9b9b] hover:text-white">
              <!-- :class="{ 'pb-[28px]': suggestion.id === filteredSuggestions.length }" -->
              {{ suggestion.name }}
            </p>
          </label>
        </div>

        <p
          v-if="filteredSuggestions.length == 0"
          class="text-center text-[18px] font-medium text-[#9b9b9b] mt-7 pb-8"
        >
          Brak wyników
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const searchQuery = ref("");

const props = defineProps({
  suggestions: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits();
// const suggestions = props.sugg8stions as any
const isFocused = ref(false);

const selectedOptions = ref([]) as any;

const maxSelect = ref<number>(4);
const placeholder = ref("Wyszukaj kategorię...") as any;
const filteredSuggestions = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return props.suggestions.filter((suggestion: any) =>
    suggestion.name.toLowerCase().includes(query)
  );
});

watch(selectedOptions, (newValue) => {
  // console.log(newValue)
  if (newValue.length > 0) {
    // console.log(newValue)
    placeholder.value = " ";
  } else {
    placeholder.value = "Wyszukaj kategorię...";
  }
});

const updateSuggestions = () => {
  // Tutaj możesz dodać dodatkową logikę, jeśli to konieczne
  // Na przykład, pobieranie sugestii z serwera
};

const showSuggestions = () => {
  isFocused.value = true;
  //focus input
  placeholder.value = "Wyszukaj kategorię...";
};

const hideSuggestions = () => {
  isFocused.value = false;
  searchQuery.value = "";
  if (selectedOptions.value.length > 0) {
    placeholder.value = "";
  }
  emit("update-select", selectedOptions.value);
};

const getOptionNameById = (id: number) => {
  const selectedOption = props.suggestions.find((option: any) => option.id === id) as any;
  return selectedOption ? selectedOption.name : "";
};

const removeSelectedOption = (id: number) => {
  selectedOptions.value = selectedOptions.value.filter((optionId:any) => optionId !== id);
  emit("update-select", selectedOptions.value);

};

const handleCheckboxChange = (id: number) => {
  // Sprawdź, czy liczba wybranych opcji nie przekracza 4
  if (selectedOptions.value.length > maxSelect.value) {
    // Jeśli przekracza, usuń ostatnią opcję (najstarszą)
    selectedOptions.value.pop();
  }
  emit("update-select", selectedOptions.value);
};
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.block {
  display: flex;
  flex-wrap: wrap;
}

.category-input {
  //background-color: #23343c;
  // width: 100%;
  // position: relative;
  resize: none;
  padding: 5px 0px 1px 7px;
  font-size: 17px;
  color: #dfdada;
  line-height: 28px;
  letter-spacing: 0.42px;
  z-index: 10;

  &::placeholder {
    color: #a5a5a5;
    letter-spacing: 0.42px;
  }
}
.not-hovered {
  cursor: pointer;
  padding: 8px 16px;
  font-size: 18px;
  z-index: 10;
  width: 100%;
  border-radius: 10px;
  border: 2px solid $input-border;
  position: absolute;
  font-weight: 400;
  border-bottom: none;

  &::placeholder {
    color: #b4b4b4 !important;
    transition: color 0.3s ease;
  }

  &:after {
    content: "";
    display: block;
    width: 100%;
    height: 2px;
    background-color: $input-border;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
.opened-input {
  position: absolute;
  //background-color: #23343c;
  border-radius: 0px 0px 10px 10px;
  width: 100%;
  //top: px;
  color: #dfdada;
  padding: 0px 4px 1px 31px;
  z-index: 1;
}

input[type="checkbox"] {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #4896c0;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  position: relative;
}

input[type="checkbox"]:checked {
  background-color: #4896c0;
}

input[type="checkbox"]::before {
  content: "";
  position: absolute;
  width: 10px;
  height: 5px;
  border: 2px solid #fff;
  border-top: none;
  border-right: none;
  transform: rotate(-45deg);
  top: 5px;
  left: 5px;
  opacity: 0;
}

input[type="checkbox"]:checked::before {
  opacity: 1;
}
</style>
