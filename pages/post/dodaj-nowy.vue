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
        class="content-page w-[800px] px-[52px] py-[64px] bg-white border-transparent rounded-[12px] mt-[68px]"
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

          <div
            ref="titleElement"
            contenteditable
            spellcheck="true"
            @keydown.enter="validate"
          >
            {{ title }}
          </div>

          <div class="add-hero">dsd</div>
          <!-- <pre>
            {{ postDetails }}
          </pre> -->
          <!-- <draggable v-model="meals" tag="ul"  :animation="300">
            <template #item="{ element: meal }">
              <li>{{ meal }}</li>
            </template>
          </draggable> -->
          <!-- @start="drag = true"
          @end="drag = false" -->
          <!-- <draggable
            :list="postDetails"
            ghost-class="ghost"
            move="true"
            @start="dragging = true"
           
            @end="dragging = false"
          >
          <div class="list-group-item" v-for="element in list" :key="element.name" :item="element">
           <template #item="{ element }">
              {{ element.name }}
            </template>
            </div>
          </draggable> -->
          <pre>
            {{ postDetails }}
          </pre>
          <draggable
            v-model="postDetails"
            :animation="300"
            @start="dragStart"
            @end="dragEnd"
          >
            <template #item="{ element, index }">
              <div class="draggable-item">
                <p
                  ref="editableParagraph"
                  contenteditable="true"
                  @input="handleInput(index)"
                  >
                  <!-- v-model="element.text" -->
                  {{ element.text }}
                </p>
                <button @click="removePost(index)">Usuń</button>
              </div>
            </template>
          </draggable>
          <button @click="addPost">Dodaj nowy element</button>

          <draggable
            v-model="postDetails"
            :animation="300"
            @start="drag = true"
            @end="drag = false"
          >
            <template #item="{ element: detail }">
              <div>
                <!-- <div v-if="detail.name == 'h2'"> -->
                <p class="handle">a</p>
                <p ref="editableParagraph" @click="handleClick" contenteditable="true">
                  {{ detail.text }}
                </p>
                <!-- </div> -->
                <!-- 
                <div v-if="detail.name == 'p'">
                  {{ detail.name }}
                </div> -->
                <!-- {{ post.name }} -->
              </div>
            </template>
          </draggable>
          <div class="content" v-for="(detail, index) in postDetails" :key="index">
            <!-- {{ detail }} -->
            <!-- <div v-if="detail.name == 'h2'">
              <textarea
                type="text"
                class="title-input"
                v-model="detail.text"
                placeholder="Tytuł artykułu..."
                @input="handleInputTextArea"
                wrap="soft"
                rows="1"
                :maxlength="maxLetter"
              />
            </div>
            <div v-if="detail.name == 'p'">
              <textarea
                type="text"
                class="title-input"
                v-model="detail.text"
                placeholder="Tytuł artykułu..."
                @input="handleInputTextArea"
                wrap="soft"
                rows="1"
                :maxlength="maxLetter"
              />
            </div>
            <div v-if="detail.name == 'image'">
              <div class="w-full h-[300px] bg-slate-100">e</div>
            </div> -->
          </div>
        </div>
      </div>
      <div @click="isShow()" class="is-show-element">
        <Icon
          name="tabler:chevron-left"
          size="27"
          :class="{ 'rotate-180': show }"
          class="text-[#b4b4b4]"
        />
        <!-- class="hover:cursor-pointer z-[50] absolute right-[16px] top-[11px] text-[#b4b4b4]" -->
      </div>
      <div class="sidebar-elemnent-menu">
        <!-- <div class="flex mx-auto gap-6 w-full justify-center">
          <button class="button-primary">Zapisz jako szkic</button>
          <button class="button-primary">Opublikuj</button>
        </div> -->
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
        <p class="text-[19px] text-slate-200 mb-[21px]">Dodaj elementy</p>
        <!-- <div
          class="grid grid-cols-2 gap-5 h-[270px] overflow-y-scroll scrollbar-track pr-3"
        > -->
        <div class="grid grid-cols-2 gap-5 h-[270px]">
          <!-- v-for="(single, index) in fieldsArray"
        :key="index" -->
          <div
            v-for="(single, index) in fieldsArray"
            :key="index"
            class="item"
            @click="selectAddItem(single.action)"
          >
            <!-- {{ single.icon }} -->
            <Icon :name="single.icon" color="#BFCBEE" size="38" />
            <p class="text-[#BFCBEE] mt-[3px] text-[15px] font-medium">
              {{ single.title }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import draggable from "vuedraggable";
import { handleInputTextArea } from "@/functions";

const title = ref("My title");
const titleElement = ref(null) as any;

function validate(event: Event) {
  (event.target as HTMLInputElement).blur();
  title.value = titleElement.value.innerText.trim();
  console.log(title.value)
}

// defineExpose({ titleElement });

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
    console.log("Plik do wysłania:", file);
  } else {
    // Logika, gdy użytkownik usunie obraz
    console.log("Obraz został usunięty");
  }
};

const handleCroppedFile = (file: File) => {
  // Obsługa pliku (np. wysłanie na serwer)
  console.log("Plik do wysłania:", file);
};

const handleCroppedImageData = (croppedImage: any) => {
  // Obsługa danych obrazu (możesz je np. przesłać do komponentu nadrzędnego)
  console.log("Dane obrazu:", croppedImage);
};

const closeModal = () => {
  // Obsługa zamknięcia modala (jeśli potrzebne)
  console.log("Modal zamknięty");
};

const show = ref(true);
const isShow = () => {
  if (show.value === true) {
    // is-show-element
    gsap.to(".sidebar-elemnent-menu", {
      duration: 0.36,
      x: 400,
    });
    gsap.to(".is-show-element", {
      duration: 0.36,
      x: 400,
    });
    gsap.to(".content-page", {
      // delay: 0.2,
      duration: 0.6,
      x: 100,
    });

    show.value = !show.value;
  } else {
    gsap.to(".content-page", {
      // delay: 0.24,
      duration: 0.6,
      x: 0,
    });
    gsap.to(".sidebar-elemnent-menu", {
      // delay: 0.4,
      duration: 0.36,
      x: 0,
    });
    gsap.to(".is-show-element", {
      duration: 0.36,
      x: 0,
    });
    show.value = !show.value;
  }
};

const maxLetter = ref(50);

const fieldsArray = ref([
  { title: "Nagłówek", action: "h2", icon: "ph:image-light" },
  { title: "Tekst", action: "p", icon: "ph:image-light" },
  { title: "Lista", action: "image", icon: "ph:image-light" },
  { title: "Zdjęcie", action: "Heading", icon: "ph:image-light" },
  { title: "Osadz link", action: "Heading", icon: "ph:image-light" },
  { title: "HTML", action: "Heading", icon: "ph:image-light" },
  // { title: "Heading", name: "Heading", icon: "ph:image-light" },
  // { title: "Heading", name: "Heading", icon: "ph:image-light" },
]);

const postDetails = ref([]) as any;

const selectAddItem = (action: any) => {
  if (action === "h2") {
    postDetails.value.push({
      id: postDetails.value.length + 1,
      text: "",
      name: "h2",
    });
  }
  if (action === "p") {
    postDetails.value.push({
      id: postDetails.value.length + 1,
      text: "",
      name: postDetails.value.length + 1,
    });
  }
  if (action === "image") {
    postDetails.value.push({
      text: "",
      name: "image",
    });
  }
};

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

// const postDetails = ref([
//   { id: 1, text: 'Pierwszy akapit' },
//   { id: 2, text: 'Drugi akapit' },
// ]);

const dragStart = () => {
  // Kod do obsługi rozpoczęcia przeciągania
  console.log("Rozpoczęto przeciąganie");
};

const dragEnd = () => {
  // Kod do obsługi zakończenia przeciągania
  console.log("Zakończono przeciąganie");
};

const handleInput = (index) => {
  // Kod do obsługi zmiany tekstu w edytowalnym elemencie
  console.log("Nowy tekst:", postDetails.value[index].text);
};

const removePost = (index) => {
  // Kod do usuwania elementu z tablicy
  postDetails.value.splice(index, 1);
};

const addPost = () => {
  // Dodanie nowego elementu do tablicy
  const newId = postDetails.value.length + 1;
  postDetails.value.push({ id: newId, text: "" });
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
.is-show-element {
  position: fixed;
  top: 50%;
  background-color: $gray;
  padding: 16px 7px 16px 5px;
  right: 375px;
  transform: translate(-50%, -50%);
  background: #3d484d;
  border-radius: 12px 0px 0px 12px;
  &:hover {
    cursor: pointer;
    background: #4d5f66;
  }
}

.sidebar-elemnent-menu {
  // background-color: rgb(60, 109, 209);
  background: #434f55;
  padding: 121px 34px 41px 34px;
  //border-left: 2px solid $border;
  position: fixed;
  height: 100%;
  top: 0px;
  right: 0px;
  width: 400px;
}

.add-new-input {
  background-color: #23343c;
  width: 100%;
  resize: none;
  border-radius: 12px;
  padding: 18px 28px 28px 28px;
  font-size: 18px;
  color: #dfdada;
  line-height: 28px;
  letter-spacing: 0.42px;

  &::placeholder {
    color: #a5a5a5;
    letter-spacing: 0.42px;
  }
}
.item {
  background-color: #23343c;
  border-radius: 10px;
  width: 100%;
  height: 100px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
  cursor: pointer;
  &:hover {
    background-color: lighten(#23343c, 2%);
  }
}
</style>
