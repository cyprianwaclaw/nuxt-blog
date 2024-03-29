<template>
  <ModalToast text="Dodano komentarz" :modalActive="isToast" type="success" />
  <ModalToast text="Zapisano komentarz" :modalActive="isToastSaved" type="success" />
  <ModalToast text="Usunięto komentarz" :modalActive="isToastError" type="error" />
  <div
    class="w-full bg-gray-200 mt-[220px] px-[84px] py-[64px] pb-[82px] rounded-[14px] cursor-default"
  >
    <h1 class="mb-12">Komentarze</h1>
    <div
      v-for="(comment, index) in arrayComments"
      :key="index"
      class="max-w-[600px] flex shrink-1 mt-6"
    >
      <div v-if="comment.showEditForm" class="w-full">
        <SectionCommentsAddNew
          :toEdit="textToUpdate"
          :user="props?.user"
          :postId="props.postId"
          @addNew="editItem"
          @cancel="cancelEdit"
        />
      </div>
      <div class="bg-white p-6 rounded-[11px] w-full" v-else>
        <div class="flex place-items-center justify-between">
          <div class="flex sm:gap-[8px] gap-[5px] place-items-center">
            <img
              v-if="comment?.user?.image"
              :src="comment?.user?.image"
              class="avatar"
              loading="lazy"
            />
            <Icon
              v-else
              name="carbon:user-avatar-filled"
              color="#BFCBEE"
              size=""
              class="text-[20px] ms:text-[21px] md:text-[22px]"
            />
            <NuxtLink :to="`/autor/${comment.user.link}`" class="flex">
              <p
                class="flex md:text-[13px] family hover:underline text-light text-[12px] text-[#989898] md:mt-0"
              >
                {{ comment.user.name }}
              </p>
            </NuxtLink>
          </div>
          <p
            class="flex md:text-[13px] family text-light text-[12px] text-[#989898] md:mt-0"
          >
            {{ comment.date }}
          </p>
        </div>

        <p class="mt-[10px] text-gray-700 text-[15px] mr-[100px]">{{ comment.text }}</p>
        <div v-if="comment.toEdit" class="flex gap-4 justify-end mt-5">
          <p @click="removeItem(comment.id, index)" class="error-color cursor-pointer">
            usuń
          </p>
          <p @click="editItemStart(comment.id, index)" class="cursor-pointer">edytuj</p>
        </div>
      </div>
    </div>
    <div v-if="loggedIn" class="w-[750px] mt-10">
      <SectionCommentsAddNew
        :user="props?.user"
        :postId="props.postId"
        @addNew="addComment"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuth } from "@/store/useAuth";
import { getDate } from "@/functions";
const axiosInstance = useNuxtApp().$axiosInstance;
const { $changeApi } = useNuxtApp();

const authState = useAuth();
const { loggedIn } = storeToRefs(authState);

const props = defineProps({
  allComponents: {
    type: Array,
    required: true,
  },
  user: {
    type: Object,
    required: false,
  },
  postId: {
    type: Number,
    required: true,
  },
});

const isToast = ref(false);
const toastShow = () => {
  setTimeout(() => {
    isToast.value = false;
  }, 1000);
  isToast.value = true;
};
const isToastError = ref(false);
const toastShowError = () => {
  setTimeout(() => {
    isToastError.value = false;
  }, 1000);
  isToastError.value = true;
};
const isToastSaved = ref(false);
const toastShowSaved = () => {
  setTimeout(() => {
     isToastSaved.value = false;
  }, 1000);
  isToastSaved.value = true;
};
const arrayComments = ref([]) as any;
arrayComments.value.push(
  ...props.allComponents.map((comment: any) => ({ ...comment, showEditForm: false }))
);

const addComment = async (value: any) => {
  toastShow();
  const response = await axiosInstance.post($changeApi("/new-comment"), {
    text: value.text,
    post_id: props.postId,
  });
  const newCommentId = response.data.newCommentId;
  const newComment = { ...value, showEditForm: false, id: newCommentId };
  arrayComments.value.push(newComment);
};

const removeItem = async (id: number, index: number) => {
  arrayComments.value.splice(index, 1);
  toastShowError();
  await axiosInstance.post($changeApi("/delete-comment"), {
    comment_id: id,
  });
};

const textToUpdate = ref("");
const commentItems = ref() as any;
const editedComment = ref() as any;

const editItemStart = async (id: number, index: number) => {
  commentItems.value = arrayComments.value.find((comment: any) => comment.id == id);
  textToUpdate.value = commentItems.value.text;
  commentItems.value.showEditForm = true;
};

const editItem = async (value: any) => {
  editedComment.value = value;
};

const cancelEdit = () => {
  commentItems.value.showEditForm = false;
};

watch(editedComment, async (newValue) => {
  await axiosInstance.post($changeApi("/update-comment"), {
    comment_id: commentItems.value.id,
    text: newValue.text,
  });
  commentItems.value.showEditForm = false;
  toastShowSaved();
  let changeText = arrayComments.value.find(
    (comment: any) => comment.id == commentItems.value.id
  );
  changeText.text = newValue.text;
});
</script>

<style scoped lang="scss">
@import "@/assets/style/variables.scss";

.bg-comments-list {
  width: 100%;
  padding: 5px;
}
.avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
}

@media screen and (max-width: 640px) {
  .avatar {
    width: 17px;
    height: 17px;
    border-radius: 50%;
    object-fit: cover;
  }
}
</style>
