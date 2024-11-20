<!-- QNARegisterComponent.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 폼 데이터
const formData = ref({
  uno: 27,  // 현재 로그인한 사용자 ID (나중에 store에서 가져올 예정)
  pno: null as number | null,  // 선택적 상품 번호
  qtitle: '',
  qcontent: '',
  qfilename: ''
})

// 파일 업로드 처리
const handleFileUpload = (event: any) => {
  const file = event.target.files[0]
  if (file) {
    formData.value.qfilename = file.name
  }
}

// 등록 처리
const handleSubmit = async () => {
  try {
    // API 호출
    // await registerQNA(formData.value)
    alert('문의가 등록되었습니다.')
    router.push('/cs/qna')
  } catch (error) {
    console.error('QNA 등록 실패:', error)
    alert('문의 등록에 실패했습니다.')
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <!-- 헤더 -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold">문의 등록</h2>
      <button
          @click="router.push('/cs/qna')"
          class="px-4 py-2 text-gray-600 hover:text-gray-800"
      >
        취소
      </button>
    </div>

    <!-- 등록 폼 -->
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- 상품 검색 (선택사항) -->
      <div>
        <label class="block mb-2">상품 선택 (선택사항)</label>
        <input
            type="text"
            placeholder="상품명을 검색하세요"
            class="w-full p-3 border rounded-lg"
        >
      </div>

      <!-- 제목 -->
      <div>
        <label class="block mb-2">제목</label>
        <input
            v-model="formData.qtitle"
            type="text"
            required
            class="w-full p-3 border rounded-lg"
        >
      </div>

      <!-- 내용 -->
      <div>
        <label class="block mb-2">내용</label>
        <textarea
            v-model="formData.qcontent"
            required
            rows="6"
            class="w-full p-3 border rounded-lg resize-none"
        ></textarea>
      </div>

      <!-- 파일 첨부 -->
      <div>
        <label class="block mb-2">파일 첨부</label>
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
          취소
        </button>
        <button
            type="submit"
            class="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
        >
          등록
        </button>
      </div>
    </form>
  </div>
</template>