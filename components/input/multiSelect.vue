<template>
  <div class="flex flex-col gap-3">
    <div v-if="isFocused" @click="hideSuggestions" class="absolute inset-0" />
    <div v-if="selectedOptions.length > 0" class="z-10 flex gap-[44px]">
      <div v-if="selectedOptions.length > 0" class="z-10 flex mt-1">
        <div class="flex flex-wrap gap-x-3 gap-y-3">
          <div
            v-for="selectedId in selectedOptions"
            :key="selectedId"
            class="flex place-items-center gap-[8px] button-category"
          >
            <!-- <p> -->
            {{ getOptionNameById(selectedId) }}
            <!-- </p> -->
            <Icon
              name="carbon:close"
              size="23"
              class="hover:cursor-pointer"
              @click="removeSelectedOption(selectedId)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="relative mt-2">
      <Icon
        name="ph:caret-down"
        size="24"
         :class="{ 'rotate-180': isFocused }"
        class="hover:cursor-pointer z-[50] absolute right-[16px] top-[11px] text-[#b4b4b4]"
        @click="hideSuggestions"
        />
      <div @click="showSuggestions()">
        <input
          :class="{ 'category-input': !isFocused, 'not-hovered': isFocused }"
          v-model="searchQuery"
          placeholder="Wyszukaj kategorie"
          @input="updateSuggestions"
        />
      </div>
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
            <p
              class="pl-[13px] text-[16px] font-medium text-[#9b9b9b] hover:text-[#141010]"
            >
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

const selectedOptions = ref([]);

const maxSelect = ref<number>(4);

const filteredSuggestions = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return props.suggestions.filter((suggestion: any) =>
    suggestion.name.toLowerCase().includes(query)
  );
});

const updateSuggestions = () => {
  // Tutaj możesz dodać dodatkową logikę, jeśli to konieczne
  // Na przykład, pobieranie sugestii z serwera
};

const showSuggestions = () => {
  isFocused.value = true;
};

const hideSuggestions = () => {
  isFocused.value = false;
  searchQuery.value = "";
  emit("update-select", selectedOptions.value);
};

const getOptionNameById = (id: number) => {
  const selectedOption = props.suggestions.find((option: any) => option.id === id) as any;
  return selectedOption ? selectedOption.name : "";
};

const removeSelectedOption = (id: number) => {
  selectedOptions.value = selectedOptions.value.filter((optionId) => optionId !== id);
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

.category-input {
  cursor: pointer;
  padding: 8px 16px;
  font-size: 18px;
  z-index: 10;
  width: 100%;
  border-radius: 10px;
  border: 2px solid $input-border;
  position: absolute;
  font-weight: 400;

  &::placeholder {
    color: #b4b4b4;
    transition: color 0.2s ease;
  }
  &:hover {
    &::placeholder {
      color: rgb(78, 78, 78);
    }
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
    content: '';
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
  background: white;
  border: 2px solid $input-border;
  border-radius: 10px;
  width: 100%;
  top: 0px;
  padding: 45px 2px 2px 17px;
  z-index: 1;
}

input[type="checkbox"] {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #4caf50;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  position: relative;
}

input[type="checkbox"]:checked {
  background-color: #4caf50;
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

.scrollbar-track {
  margin: 0px 6px 13px 0px;
  scrollbar-color: #4caf50 #e0e0e0; /* Kolor paska i tła przewijania */
}

/* Dodatkowe dostosowania paska przewijania w zależności od przeglądarki */
.scrollbar-track::-webkit-scrollbar {
  width: 5px;
  border-radius: 99px;
}

.scrollbar-track::-webkit-scrollbar-thumb {
  background-color: #4caf50;
  border-radius: 99px;
}

.scrollbar-track::-webkit-scrollbar-thumb {
  background-color: #4caf50;
  border-radius: 99px;
}

.scrollbar-track::-webkit-scrollbar-track {
  background-color: #e0e0e0;
  border-radius: 99px;
}
</style>
