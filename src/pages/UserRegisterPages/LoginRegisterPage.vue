<script setup lang="ts">
import {ref, defineAsyncComponent, provide, onMounted} from 'vue';
import {getAllergyListKo} from "../../api/AllergyAPI/allergyAPI.ts";
import {registerPersonalAllergy, registerUser} from "../../api/UserAPI/userRegisterAPI.ts";

// Lazy load each component
const AgreementComponent = defineAsyncComponent(() => import('../../components/UserRegisterComponents/AgreementComponent.vue'));
const UserInfoComponent = defineAsyncComponent(() => import('../../components/UserRegisterComponents/UserInfoComponent.vue'));
const UserAllergySetComponent = defineAsyncComponent(() => import('../../components/UserRegisterComponents/UserAllergySetComponent.vue'));
const CommonCheckModalComponent = defineAsyncComponent(() => import('../../common/components/CommonCheckModalComponent.vue'))

// 현재 컴포넌트 인덱스를 상태로 관리
const currentStep = ref(0);
const allergyList = ref([]);
const selectedAnos = ref<number[]>([]);
const isCheckModalOpen = ref(false);

const userInfo = ref({
  username: '',
  callnumber: '',
  gender: '',
  address: '',
  birth: ''
});

const registerFn = () => {

  registerUser(userInfo.value);
  registerPersonalAllergy(selectedAnos.value);
}

// 다음 컴포넌트로 이동하는 함수
const nextStep = () => {

  if (currentStep.value < 2) {
    currentStep.value++;
  }
  console.log(userInfo)
};

// 이전 컴포넌트로 이동하는 함수
const prevStep = () => {

  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

const completeRegister = () => {

  isCheckModalOpen.value = true;
}

const closeModal = () => {

  isCheckModalOpen.value = false;
}

onMounted(async () => {

  allergyList.value = await getAllergyListKo();
});

provide("userInfo", userInfo);
provide("allergyList", allergyList);
provide("selectedAnos", selectedAnos);
</script>

<template>

  <CommonCheckModalComponent
      v-if="isCheckModalOpen == true "
      msg="등록"
      :is-open="isCheckModalOpen"
      :fn="registerFn"
      @closeModal="closeModal"
  />

  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
      <h2 class="text-2xl font-semibold text-center mb-4">Login Register Page</h2>

      <!-- 단계에 따라 컴포넌트를 조건부 렌더링 -->
      <AgreementComponent v-if="currentStep === 0" />
      <UserInfoComponent v-if="currentStep === 1" />
      <UserAllergySetComponent v-if="currentStep === 2" />


      <div class="flex justify-between mt-6">
        <!-- 이전 버튼 (첫 번째 컴포넌트에서는 비활성화) -->
        <button
            v-if="currentStep > 1"
            @click="prevStep"
            class="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300"
        >
          이전
        </button>

        <!-- 다음 버튼 (마지막 컴포넌트에서는 비활성화) -->
        <button
            v-if="currentStep < 3 && currentStep != 2"
            @click="nextStep"
            class="ml-auto px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          다음
        </button>

        <button
            v-if="currentStep === 2"
            @click="completeRegister"
            class="ml-auto px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          가입
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 추가적인 스타일을 원하시면 여기에 작성할 수 있습니다 */
</style>
