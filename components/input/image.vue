<template>
  <div>
    <!-- <img :src="image" alt="" class="w-[20px]" /> -->
    <!-- {{ cropedImage }}   -->
    <!-- {{ props}} -->
  <!-- {{ test.image }} -->
  <!-- {{ img }} -->
    <!-- <img :src="cropedImage" alt="" class="w-[20px]" /> -->
<!-- {{ newData }} -->
    <button class="button" @click="cropImage({ coordinates, canvas })">Crop image</button>

    <Cropper v-if="!isLoading " class="h-[430px]" ref="cropper" :src="img " />
  </div>
</template>

<script setup lang="ts">
// import { storeToRefs } from "pinia";
// import { useAuth } from "@/store/useAuth";
import "vue-advanced-cropper/dist/style.css";
import { Cropper } from "vue-advanced-cropper";
// const test = useCookie('auth') as any
// const authState = useAuth();
// const { image } = storeToRefs(authState);

// const props = defineProps({
//   image: {
//     type: String,
//     required: true,
//   },
// });

// const img1 = image ? image : null
const axiosInstance = useNuxtApp().$axiosInstance;
const { $changeApi } = useNuxtApp();
const newData = ref(null) as any;
const isLoading = ref(true)

onMounted(async()=>{
  const response = await axiosInstance.get(
    $changeApi('/user')
  );
  newData.value = response.data;
  setTimeout(()=>{
isLoading.value = false;
  }, 1000)
})

// const img = ref(null) as any
// onMounted(()=>{
//   setTimeout(()=>{
//     img.value = test.value.image
//   }, 200)
// })
const img =
  "https://images.unsplash.com/photo-1600984575359-310ae7b6bdf2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

let file = ref(null);
const cropedImage = ref(null) as any;
const cropper = ref(Cropper) as any;

const cropImage = () => {
  const data = cropper.value.getResult();
  console.log(data);
  console.log(data.coordinates, data.canvas);
  cropedImage.value = data.canvas.toDataURL();
};

// const isOpenMobile = ref(false);
// const isOpenDesktop = ref(false);

// const isModal = () => {
//   if (window.screen.width <= 900) {
//     isOpenMobile.value = true;
//   } else {
//     isOpenDesktop.value = true;
//   }
// };

// const isModalClose = () => {
//   if (window.screen.width <= 900) {
//     isOpenMobile.value = false;

//   } else {
//     isOpenDesktop.value = false;
//   }
// };

// const propsImage = ref(props.image)

// watch(props,(newValue)=>{
//   if(newValue.test==='brak'){
//     removeImage()
//   }
// })

// const croppedFile = ref<File | null>(null);
// const croppedImageNew = ref<any | null>(null);

// const handleCroppedFile = (file: File) => {
//   croppedFile.value = file;
//   emit("imageFile", file)
// };
// const handleCroppedImageData = (croppedImage: any) => {
//   croppedImageNew.value = croppedImage;
// };

// const changeImage = () => {
//   croppedFile.value = null;
//   croppedImageNew.value = null;
//   console.log('zmieniono')
//   isModal()
// }

// const removeImage = () => {
//   croppedFile.value = null;
//   emit("imageFile", null)
//   croppedImageNew.value = null;
// }
</script>

<style scoped lang="scss">
@import "@/assets/style/_variables.scss";

.cropper-wrapper {
  overflow: hidden;
  position: relative;
  height: 400px;
  background: black;
}
.cropper-background {
  background: none;
}
.image-background {
  position: absolute;
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  left: -10px;
  top: -10px;
  background-size: cover;
  background-position: 50%;
  filter: blur(5px);
}

.image-retangle {
  display: flex;
  flex-direction: column;
  padding: 35px 35px;
  background: #f7f7f7;
  border: 2px dashed #9f9f9f;
  border-radius: 16px;
  margin-bottom: 0px;
}

input[type="file"]::file-selector-button {
  display: hidden;
}
input[type="file"] {
  border: none;
  display: flex;
  justify-content: center;
}
.image-retangle h1 {
  text-align: center;
  margin-top: -6px;
  font-weight: 600;
  color: #9c9c9c;
}
.image-retangle p {
  text-align: center;
  margin-top: 2px;
  font-weight: 400;
  font-size: 14px;
  color: #9c9c9c;
  margin-bottom: 12px;
}
.white-retangle-image {
  background-color: white;
  border-radius: 24px;
  padding: 24px;
}
.quest-text {
  font-size: 16px;
  margin-left: 28px;
  margin-top: 6px;
  margin-bottom: 6px;
  font-weight: 600;
}
.margin {
  margin-top: 36px;
}
.vl {
  border-left: 1px solid #e0e0e0 !important;
  margin-top: 3px;
  margin-bottom: 3px;
}

.edit-quest {
  font-size: 13px;
  font-weight: 500;
  text-align: end;
  padding: 12px 25px 5px 12px;
}

textarea {
  outline: none;
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  overflow: hidden;
  min-height: 30px;
  max-height: 100px;
  border-color: white;
}
textarea::placeholder {
  font-size: 16px;
}
textarea:focus::placeholder {
  font-size: 0px;
}

input {
  outline: none;
  font-size: 16px;
  width: 100%;
  overflow: hidden;
  min-height: 30px;
  padding: 0px;
  max-height: 100px;
  font-weight: 500;
  border-color: white;
}
input::placeholder {
  font-size: 16px;
}
input:focus::placeholder {
  font-size: 0px;
}

.default-file-input {
  opacity: 0;
}

input[type="radio"] {
  border-radius: 50%;
  width: 24px;
  height: 3px;
  margin-right: 14px;
  position: relative;
}

.imagehidden {
  display: none;
}

.after-upload {
  border: 1px solid $border;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  height: 240px;
  width: 100%;
}
</style>
