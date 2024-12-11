<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// Props 정의
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

// Emits 정의
const emit = defineEmits(["update:visible"]);

// 모달 닫기 함수
const closeModal = () => {
  emit("update:visible", false);
};
</script>

<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" @click="closeModal">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-3xl max-h-[80%] overflow-y-auto relative" @click.stop>
      <slot></slot>
      <div class="flex justify-end mt-4">
        <button class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-500 transition" @click="closeModal">
          {{ t('modal.closeButton') }}
        </button>
      </div>
    </div>
  </div>
</template>

