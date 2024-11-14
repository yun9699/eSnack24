
<script setup lang="ts">
import {PropType, ref} from 'vue';

  const isFirstModalOpen = ref(true);
  const isSecondModalOpen = ref(false);

  // 부모에서 전달받을 props 정의
  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true,
    },
    msg: {
      type: String,
      required: true,
    },
    fn: {
      type: Function as PropType<() => void>,
      required: true
    }
  });

  const emit = defineEmits();

  // 확인 버튼 클릭 시 실행할 함수
  const confirmAction = () => {

    props.fn();
    isFirstModalOpen.value = false;
    isSecondModalOpen.value = true;
  };

  // 취소 버튼 클릭 시 실행할 함수
  const cancelAction = () => {

    isFirstModalOpen.value = false;  // 첫 번째 모달 숨기기
    emit('closeModal', false)
  };


  const closeModals = () => {

    isSecondModalOpen.value = false;
    isFirstModalOpen.value = false;
    emit('closeModal', false)
  };
</script>

<template>
  <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">

    <!-- 첫 번째 모달: 수정하시겠습니까? -->
    <div v-if="isFirstModalOpen" class="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-auto transition-transform transform-gpu">
      <p class="text-center text-gray-800 text-lg font-semibold mb-4">{{ msg }}하시겠습니까?</p>
      <div class="flex justify-center space-x-4 mt-6">
        <button
            class="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200 focus:outline-none focus:ring focus:ring-gray-300"
            @click="cancelAction"
        >
          취소
        </button>
        <button
            class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring focus:ring-blue-500"
            @click="confirmAction"
        >
          확인
        </button>
      </div>
    </div>

    <!-- 두 번째 모달: 수정되었습니다 -->
    <div v-if="isSecondModalOpen" class="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-auto transition-transform transform-gpu">
      <p class="text-center text-green-600 text-lg font-semibold mb-4">{{msg}}되었습니다!</p>
      <div class="flex justify-center">
        <button
            class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 focus:outline-none focus:ring focus:ring-green-500"
            @click="closeModals"
        >
          확인
        </button>
      </div>
    </div>
  </div>
</template>
