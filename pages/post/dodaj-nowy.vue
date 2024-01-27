<template>
  <div>
    <ModalNotification
      type="warning"
      title="Czy na pewno chcesz opuścić stronę?"
      text="Twoje niezapisane dane zostaną utracone."
      confirm="Tak, opuszczam"
      :height="320"
      :modalActive="isModalActive"
      @confirmButton="handleConfirmButton"
      @close="handleModalClose"
    />

    <div class="flex cursor-default gap-[64px]">
      <div
        class="w-[800px] px-[52px] py-[64px] bg-white border-transparent rounded-[12px]"
      >
      <div class="w-[630px]">
        <div class="flex gap-3 place-items-center mb-[17px] text-[#676767]">
          <p class="text-[15px] font-medium">{{ formattedDate }}</p>
          <div
            v-for="selectedId in selectedCategoriesIds"
            :key="selectedId"
            class="flex gap-3 place-items-center"
          >
            <div class="dot" />
            <p class="text-[15px] font-medium">
              {{ getOptionNameById(selectedId) }}
            </p>
          </div>
        </div>
        <textarea
          type="text"
          class="title-input"
          v-model="test"
          placeholder="Tytuł artykułu..."
          @input="handleInputTextArea"
          wrap="soft"
          rows="1"
          :maxlength="maxLetter"
        />
        <div class="add-hero">dsd</div>
        <div>
         
          <p class="text-center">Zacznij pisac nowy fascynujacy artykuł</p>
          <div class="flex justify-center w-full gap-7">
            <div
              class="bg-[#daddeb] p-4 w-[70px] h-[70px] flex items-center justify-center rounded-full"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.3125 4.6875H4.6875C4.19022 4.6875 3.71331 4.88504 3.36167 5.23667C3.01004 5.58831 2.8125 6.06522 2.8125 6.5625V23.4375C2.8125 23.9348 3.01004 24.4117 3.36167 24.7633C3.71331 25.115 4.19022 25.3125 4.6875 25.3125H25.3125C25.8098 25.3125 26.2867 25.115 26.6383 24.7633C26.99 24.4117 27.1875 23.9348 27.1875 23.4375V6.5625C27.1875 6.06522 26.99 5.58831 26.6383 5.23667C26.2867 4.88504 25.8098 4.6875 25.3125 4.6875ZM25.3125 6.5625V18.6035L22.2574 15.5496C22.0833 15.3755 21.8766 15.2373 21.6491 15.143C21.4216 15.0488 21.1777 15.0003 20.9314 15.0003C20.6852 15.0003 20.4413 15.0488 20.2138 15.143C19.9863 15.2373 19.7796 15.3755 19.6055 15.5496L17.2617 17.8934L12.1055 12.7371C11.7539 12.3857 11.2771 12.1884 10.7801 12.1884C10.283 12.1884 9.80628 12.3857 9.45469 12.7371L4.6875 17.5043V6.5625H25.3125ZM4.6875 20.1562L10.7812 14.0625L20.1562 23.4375H4.6875V20.1562ZM25.3125 23.4375H22.8082L18.5895 19.2188L20.9332 16.875L25.3125 21.2555V23.4375ZM16.875 11.7188C16.875 11.4406 16.9575 11.1687 17.112 10.9375C17.2665 10.7062 17.4861 10.526 17.7431 10.4195C18.0001 10.3131 18.2828 10.2853 18.5556 10.3395C18.8284 10.3938 19.079 10.5277 19.2756 10.7244C19.4723 10.921 19.6062 11.1716 19.6605 11.4444C19.7147 11.7172 19.6869 11.9999 19.5805 12.2569C19.474 12.5139 19.2938 12.7335 19.0625 12.888C18.8313 13.0425 18.5594 13.125 18.2812 13.125C17.9083 13.125 17.5506 12.9768 17.2869 12.7131C17.0232 12.4494 16.875 12.0917 16.875 11.7188Z"
                  fill="#D99BFF"
                />
              </svg>
            </div>
            <div
              class="bg-[#daddeb] p-4 w-[70px] h-[70px] flex items-center justify-center rounded-full"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.3125 4.6875H4.6875C4.19022 4.6875 3.71331 4.88504 3.36167 5.23667C3.01004 5.58831 2.8125 6.06522 2.8125 6.5625V23.4375C2.8125 23.9348 3.01004 24.4117 3.36167 24.7633C3.71331 25.115 4.19022 25.3125 4.6875 25.3125H25.3125C25.8098 25.3125 26.2867 25.115 26.6383 24.7633C26.99 24.4117 27.1875 23.9348 27.1875 23.4375V6.5625C27.1875 6.06522 26.99 5.58831 26.6383 5.23667C26.2867 4.88504 25.8098 4.6875 25.3125 4.6875ZM25.3125 6.5625V18.6035L22.2574 15.5496C22.0833 15.3755 21.8766 15.2373 21.6491 15.143C21.4216 15.0488 21.1777 15.0003 20.9314 15.0003C20.6852 15.0003 20.4413 15.0488 20.2138 15.143C19.9863 15.2373 19.7796 15.3755 19.6055 15.5496L17.2617 17.8934L12.1055 12.7371C11.7539 12.3857 11.2771 12.1884 10.7801 12.1884C10.283 12.1884 9.80628 12.3857 9.45469 12.7371L4.6875 17.5043V6.5625H25.3125ZM4.6875 20.1562L10.7812 14.0625L20.1562 23.4375H4.6875V20.1562ZM25.3125 23.4375H22.8082L18.5895 19.2188L20.9332 16.875L25.3125 21.2555V23.4375ZM16.875 11.7188C16.875 11.4406 16.9575 11.1687 17.112 10.9375C17.2665 10.7062 17.4861 10.526 17.7431 10.4195C18.0001 10.3131 18.2828 10.2853 18.5556 10.3395C18.8284 10.3938 19.079 10.5277 19.2756 10.7244C19.4723 10.921 19.6062 11.1716 19.6605 11.4444C19.7147 11.7172 19.6869 11.9999 19.5805 12.2569C19.474 12.5139 19.2938 12.7335 19.0625 12.888C18.8313 13.0425 18.5594 13.125 18.2812 13.125C17.9083 13.125 17.5506 12.9768 17.2869 12.7131C17.0232 12.4494 16.875 12.0917 16.875 11.7188Z"
                  fill="#D99BFF"
                />
              </svg>
            </div>
            <div
              class="bg-[#daddeb] p-4 w-[70px] h-[70px] flex items-center justify-center rounded-full"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.3125 4.6875H4.6875C4.19022 4.6875 3.71331 4.88504 3.36167 5.23667C3.01004 5.58831 2.8125 6.06522 2.8125 6.5625V23.4375C2.8125 23.9348 3.01004 24.4117 3.36167 24.7633C3.71331 25.115 4.19022 25.3125 4.6875 25.3125H25.3125C25.8098 25.3125 26.2867 25.115 26.6383 24.7633C26.99 24.4117 27.1875 23.9348 27.1875 23.4375V6.5625C27.1875 6.06522 26.99 5.58831 26.6383 5.23667C26.2867 4.88504 25.8098 4.6875 25.3125 4.6875ZM25.3125 6.5625V18.6035L22.2574 15.5496C22.0833 15.3755 21.8766 15.2373 21.6491 15.143C21.4216 15.0488 21.1777 15.0003 20.9314 15.0003C20.6852 15.0003 20.4413 15.0488 20.2138 15.143C19.9863 15.2373 19.7796 15.3755 19.6055 15.5496L17.2617 17.8934L12.1055 12.7371C11.7539 12.3857 11.2771 12.1884 10.7801 12.1884C10.283 12.1884 9.80628 12.3857 9.45469 12.7371L4.6875 17.5043V6.5625H25.3125ZM4.6875 20.1562L10.7812 14.0625L20.1562 23.4375H4.6875V20.1562ZM25.3125 23.4375H22.8082L18.5895 19.2188L20.9332 16.875L25.3125 21.2555V23.4375ZM16.875 11.7188C16.875 11.4406 16.9575 11.1687 17.112 10.9375C17.2665 10.7062 17.4861 10.526 17.7431 10.4195C18.0001 10.3131 18.2828 10.2853 18.5556 10.3395C18.8284 10.3938 19.079 10.5277 19.2756 10.7244C19.4723 10.921 19.6062 11.1716 19.6605 11.4444C19.7147 11.7172 19.6869 11.9999 19.5805 12.2569C19.474 12.5139 19.2938 12.7335 19.0625 12.888C18.8313 13.0425 18.5594 13.125 18.2812 13.125C17.9083 13.125 17.5506 12.9768 17.2869 12.7131C17.0232 12.4494 16.875 12.0917 16.875 11.7188Z"
                  fill="#D99BFF"
                />
              </svg>
            </div>
            <div
              class="bg-[#daddeb] p-4 w-[70px] h-[70px] flex items-center justify-center rounded-full"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.3125 4.6875H4.6875C4.19022 4.6875 3.71331 4.88504 3.36167 5.23667C3.01004 5.58831 2.8125 6.06522 2.8125 6.5625V23.4375C2.8125 23.9348 3.01004 24.4117 3.36167 24.7633C3.71331 25.115 4.19022 25.3125 4.6875 25.3125H25.3125C25.8098 25.3125 26.2867 25.115 26.6383 24.7633C26.99 24.4117 27.1875 23.9348 27.1875 23.4375V6.5625C27.1875 6.06522 26.99 5.58831 26.6383 5.23667C26.2867 4.88504 25.8098 4.6875 25.3125 4.6875ZM25.3125 6.5625V18.6035L22.2574 15.5496C22.0833 15.3755 21.8766 15.2373 21.6491 15.143C21.4216 15.0488 21.1777 15.0003 20.9314 15.0003C20.6852 15.0003 20.4413 15.0488 20.2138 15.143C19.9863 15.2373 19.7796 15.3755 19.6055 15.5496L17.2617 17.8934L12.1055 12.7371C11.7539 12.3857 11.2771 12.1884 10.7801 12.1884C10.283 12.1884 9.80628 12.3857 9.45469 12.7371L4.6875 17.5043V6.5625H25.3125ZM4.6875 20.1562L10.7812 14.0625L20.1562 23.4375H4.6875V20.1562ZM25.3125 23.4375H22.8082L18.5895 19.2188L20.9332 16.875L25.3125 21.2555V23.4375ZM16.875 11.7188C16.875 11.4406 16.9575 11.1687 17.112 10.9375C17.2665 10.7062 17.4861 10.526 17.7431 10.4195C18.0001 10.3131 18.2828 10.2853 18.5556 10.3395C18.8284 10.3938 19.079 10.5277 19.2756 10.7244C19.4723 10.921 19.6062 11.1716 19.6605 11.4444C19.7147 11.7172 19.6869 11.9999 19.5805 12.2569C19.474 12.5139 19.2938 12.7335 19.0625 12.888C18.8313 13.0425 18.5594 13.125 18.2812 13.125C17.9083 13.125 17.5506 12.9768 17.2869 12.7131C17.0232 12.4494 16.875 12.0917 16.875 11.7188Z"
                  fill="#D99BFF"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
      
      <div class="w-[350px] bg-white border-transparent rounded-[12px] h-[400px]">
        <div class="mt-8 top-8 px-[34px]">
          <p class="w-full text-[18px] font-medium pb-[12px]">Wybierz kategorie</p>
          <InputMultiSelect
            :suggestions="suggestions"
            @update-select="handleSelectedCategories"
          />
        </div>
        <div class="mt-20 top-8 px-[34px]">
          <p class="w-full text-[18px] font-medium pb-[12px]">Dodaj zawartośc</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { handleInputTextArea } from "@/functions";
const isModalActive = ref(false);
const confirmation = ref(false);
const router = useRouter();
const toPage = ref();

const test = ref();

definePageMeta({
  middleware: "auth",
});


const handleImageFile = (file: File | null) => {
  if (file) {
    // Obsługa pliku (np. wysłanie na serwer)
    console.log('Plik do wysłania:', file);
  } else {
    // Logika, gdy użytkownik usunie obraz
    console.log('Obraz został usunięty');
  }
};


const handleCroppedFile = (file: File) => {
  // Obsługa pliku (np. wysłanie na serwer)
  console.log('Plik do wysłania:', file);
};

const handleCroppedImageData = (croppedImage: any) => {
  // Obsługa danych obrazu (możesz je np. przesłać do komponentu nadrzędnego)
  console.log('Dane obrazu:', croppedImage);
};

const closeModal = () => {
  // Obsługa zamknięcia modala (jeśli potrzebne)
  console.log('Modal zamknięty');
};


const maxLetter = ref(50);

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

const currentDate = new Date();
const day = String(currentDate.getDate()).padStart(2, "0");
const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Dodajemy 1, ponieważ miesiące są indeksowane od 0
const year = currentDate.getFullYear();

const formattedDate = `${day}.${month}.${year}`;

const handleModalClose = () => {
  isModalActive.value = false;
};

const handleConfirmButton = () => {
  confirmation.value = true;
  router.push(toPage.value);
};

onBeforeRouteLeave((to, from, next) => {
  if (to.name) {
    toPage.value = to.fullPath;
    isModalActive.value = true;
  }
  if (confirmation.value) {
    isModalActive.value = false;
    setTimeout(() => {
      next();
    }, 300);
  }
});

const selectedCategoriesIds = ref();
const handleSelectedCategories = (selected: any) => {
  console.log("Wybrane kategorie:", selected);
  selectedCategoriesIds.value = selected;
  // Tutaj możesz obsłużyć wybrane kategorie, na przykład zaktualizować stan danych w komponencie nadrzędnym
};

const getOptionNameById = (id: number) => {
  const selectedOption = suggestions.value.find((option: any) => option.id === id) as any;
  return selectedOption ? selectedOption.name : "";
};
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";
.dot {
  width: 4px;
  height: 4px;
  background-color: #676767;
  border-radius: 50%;
}
.title-input {
  cursor: pointer;
  background-color: white;
  width: 600px;
  font-size: 44px;
  font-weight: 500;
  &::placeholder {
    color: #00000028;
    //font-size: 36px;
    //  font-weight: 500;
  }
}
textarea::-webkit-resizer {
  background-color: white;
}
textarea {
  width: 730px;
  line-height: 50px;
}
textarea:focus {
  border: none;
  overflow: auto;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
.add-hero {
  margin-top: 28px;
  border-radius: 12px;
  border: 4px dashed #5447e6;
  background: #f8f9ff;
  width: 100%;
  height: 400px;
  flex-shrink: 1;
}
</style>
