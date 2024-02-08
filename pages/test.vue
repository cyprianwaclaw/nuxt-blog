<template>
  <!-- <div> -->
    <div id="gjs">
        bhjbhjbh
      <h1>Hello World Component!</h1>
    </div>
    <div id="blocks">njbjubjbj</div>
  <!-- </div> -->
</template>

<script setup>
// import { useHead } from '@nuxt/core';
import draggable from "vuedraggable";
useHead(() => {
  scripts: [
    { src: "https://unpkg.com/grapesjs" },
  ];
  link: [
    { rel: "stylesheet", href: "https://unpkg.com/grapesjs/dist/css/grapes.min.css" },
  ];
});
onMounted(() => {
  const editor = grapesjs.init({
    // Indicate where to init the editor. You can also pass an HTMLElement
    container: "#gjs",
    // Get the content for the canvas directly from the element
    // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
    fromElement: true,
    // Size of the editor
    width: "auto",
    // Disable the storage manager for the moment
    storageManager: false,
    // Avoid any default panel
    panels: { defaults: [] },
    blockManager: {
      appendTo: "#blocks",
      blocks: [
        {
          id: "section", // id is mandatory
          label: "<b>Section</b>", // You can use HTML/SVG inside labels
          attributes: { class: "gjs-block-section" },
          content: `<section>
          <h1>This is a simple title</h1>
          <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
        </section>`,
        },
        {
          id: "text",
          label: "Text",
          content: '<div data-gjs-type="text">Insert your text here</div>',
        },
        {
          id: "image",
          label: "Image",
          // Select the component once it's dropped
          select: true,
          // You can pass components as a JSON instead of a simple HTML string,
          // in this case we also use a defined component type `image`
          content: { type: "image" },
          // This triggers `active` event on dropped components and the `image`
          // reacts by opening the AssetManager
          activate: true,
        },
      ],
    },
  });
});

// const handleInput = (index) => {
//   // Obsługa zmiany tekstu w edytowalnym elemencie
//   console.log("Nowy tekst:", postDetails.value[index].text);
// };

// const removePost = (index) => {
//   // Usunięcie elementu z tablicy
//   postDetails.value.splice(index, 1);
// };

// const addPost = () => {
//   // Dodanie nowego elementu do tablicy
//   const newId = postDetails.value.length + 1;
//   postDetails.value.push({ id: newId, text: "" });
// };
</script>

<style scoped>
.draggable-item {
  border: 1px solid #ccc;
  padding: 8px;
  margin-bottom: 8px;
}

/* Reset some default styling */
.gjs-cv-canvas {
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
