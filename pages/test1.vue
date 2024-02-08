<template>
  <div>
    <div>
      <button @click="send">send</button>
    </div>
    <div
      ref="titleElement"
      contenteditable
      @focus="setActive('title')"
      @blur="setInactive"
    >
      {{ title }}
    </div>
    <draggable
      v-model="postDetails"
      :animation="300"
      @start="drag = true"
      @end="drag = false"
    >
      <template #item="{ element: details }">
        <div>
          <p
            @click="setActive(details.id)"
            @blur="setInactive(details.id)"
            @input="updateDetailsText(details, $event)"
            :contenteditable="isActive(details.id)"
          >
            {{ details.text }}
          </p>
        </div>
      </template>
    </draggable>
    {{ click }}
    <div @click="isClicked()"  class="mt-10 test" :class="[click ? 'click' : 'not-click']">
      <p>test</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
// import { ref } from 'vue';
const title = ref("My title");
const postDetails = ref([
  { id: 1, text: "Pierwszy akapit" },
  { id: 2, text: "Drugi akapit" },
]);
const activeElement = ref(null) as any;
let drag = false;

function setActive(id: number | "title") {
  activeElement.value = id;
}

function setInactive(id: number | "title") {
  activeElement.value = null;
}

function updateDetailsText(details: any, event: any) {
  details.text = event.target.innerText;
}

function send() {
  console.log(postDetails.value);
}

function addNew() {
  postDetails.value.push({ id: postDetails.value.length + 1, text: "" });
}

function isActive(id: number) {
  return activeElement.value === id;
}
const click = ref(false);
const isClicked = () => {
  click.value = !click.value;
};



</script>

<style scoped>
.click {
  border: 1px solid red;
}
</style>
