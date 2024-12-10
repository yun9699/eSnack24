<script setup lang="ts">
import {onMounted, ref} from 'vue'
import { useRouter } from 'vue-router'
import { registerQNA } from "../../api/csAPI/qnaAPI.ts"
import { getToken } from "../../api/fcmAPI/fcmAPI.ts";
import useUserStore from "../../stores/useUserStore.ts";
import axios from 'axios'
import {useI18n} from "vue-i18n";

const { t } = useI18n()
const router = useRouter()

// 폼 데이터
const formData = ref({
  uno: '',  // 현재 로그인한 사용자 ID (나중에 store에서 가져올 예정)
  pno: '',  // 선택적 상품 번호
  qtitle: '',
  qcontent: '',
  qfilename: ''
})

const fcmData = ref({
  token: []
})

const user = useUserStore();

const uno = ref<number>(user.getUno);

// 파일 업로드 처리
const handleFileUpload = (event: any) => {
  const file = event.target.files[0]
  if (file) {
    formData.value.qfilename = file.name
  }
}

// 등록 처리
const handleSubmit = async () => {

    // QNA 등록 API 호출
    await registerQNA(formData.value);

    // FCM 토큰 가져오기
    const res = await getToken();  // 비동기 호출로 토큰 가져오기
    console.log(res);  // 응답 확인

    if (res) {
      fcmData.value.token = res;  // 토큰 배열 할당
      console.log(fcmData.value.token);

    } else {
      console.error("FCM 토큰이 없습니다.");
      return;  // 토큰이 없으면 종료
    }

    router.push('/cs/qna');

  // FCM 메시지 전송
  const response = await axios.post(
      "https://esnack24admin.store/admin/api/v1/fcm/send",
      {
        token: fcmData.value.token,  // 배열 형태로 전달된 토큰
        title: "새로운 QNA가 등록되었습니다.",
        body: "QNA 내용을 확인해주세요.",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
  );

  if (!response.ok) {
    throw new Error('FCM 메시지 전송 실패');
  }
  console.log('FCM 메시지 전송 성공');

  // QNA 등록 후 화면 이동
}

onMounted(() => {
  formData.value.uno = uno.value;
})

</script>
<template>
  <div class="max-w-4xl mx-auto p-4">
    <!-- 헤더 -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold">{{ t('QNARegister.register_inquiry') }}</h2>
      <button
          @click="router.push('/cs/qna')"
          class="px-4 py-2 text-gray-600 hover:text-gray-800"
      >
        {{ t('QNARegister.cancel') }}
      </button>
    </div>

    <!-- 등록 폼 -->

    <!-- 제목 -->
    <div>
      <label class="block mb-2">{{ t('QNARegister.title') }}</label>
      <input
          v-model="formData.qtitle"
          type="text"
          required
          class="w-full p-3 border rounded-lg"
      >
    </div>

    <!-- 내용 -->
    <div>
      <label class="block mb-2">{{ t('QNARegister.content') }}</label>
      <textarea
          v-model="formData.qcontent"
          required
          rows="6"
          class="w-full p-3 border rounded-lg resize-none"
      ></textarea>
    </div>

    <!-- 파일 첨부 -->
    <div>
      <label class="block mb-2">{{ t('QNARegister.attachment') }}</label>
      <input
          type="file"
          @change="handleFileUpload"
          class="w-full p-2"
      >
    </div>

    <!-- 버튼 -->
    <div class="flex justify-end gap-3">
      <button
          type="button"
          @click="router.push('/cs/qna')"
          class="px-6 py-2 border rounded-full hover:bg-gray-100"
      >
        {{ t('QNARegister.cancel') }}
      </button>
      <button
          @click="handleSubmit"
          type="submit"
          class="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
      >
        {{ t('QNARegister.submit') }}
      </button>
    </div>
  </div>
</template>