<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import router from "../../router/MainRouter.ts";

interface Review {
  uno: number
  pno: number
  rstar: number
  rcontent: string
  rimage?: string // 리뷰 이미지 (선택 사항)
}

const uno = ref(1) // 현재 사용자 ID (임시 값)
const pno = ref(2) // 현재 상품 번호 (임시 값)
const productTitle = ref('') // 상품명
const rating = ref(0) // 별점
const reviewText = ref('') // 리뷰 내용
const selectedImageFile = ref<File | null>(null) // 선택된 이미지 파일
const selectedImageBlob = ref<string | null>(null) // Blob URL로 이미지 미리보기
const submitting = ref(false) // 리뷰 등록 상태 표시

// 상품명 가져오기
const fetchProductTitle = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/product/detail/${pno.value}`)
    productTitle.value = response.data.ptitle_ko
  } catch (error) {
    console.error('상품명 불러오기 실패:', error)
    alert('상품 정보를 불러오는 중 오류가 발생했습니다.')
  }
}

// 이미지 파일 선택 처리
const handleImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    selectedImageFile.value = file
    selectedImageBlob.value = URL.createObjectURL(file) // Blob URL 생성
  }
}

// 이미지 업로드 처리
const uploadImage = async () => {
  if (!selectedImageFile.value) return null
  const formData = new FormData()
  formData.append('file', selectedImageFile.value)

  try {
    const response = await axios.post('http://localhost:8080/api/v1/review/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data.url // 업로드된 이미지 URL 반환
  } catch (error) {
    console.error('이미지 업로드 실패:', error)
    alert('이미지 업로드 중 오류가 발생했습니다.')
    return null
  }
}

// 리뷰 제출
const submitReview = async () => {
  if (rating.value <= 0 || !reviewText.value.trim()) {
    alert('별점을 선택하고 리뷰 내용을 입력해주세요.');
    return;
  }

  let imageUrl = null;
  if (selectedImageFile.value) {
    imageUrl = await uploadImage(); // 이미지 업로드 후 URL 가져오기
    console.log('업로드된 이미지 URL:', imageUrl); // URL 확인
  }

  const newReview: Review = {
    uno: uno.value,
    pno: pno.value,
    rstar: rating.value,
    rcontent: reviewText.value.trim(),
    rimage: imageUrl || null, // 업로드된 이미지 URL 전달
  };

  console.log('전송할 리뷰 데이터:', newReview); // 요청 데이터 확인

  try {
    submitting.value = true;
    const response = await axios.post('http://localhost:8080/api/v1/review/add', newReview);
    console.log('리뷰 등록 성공:', response.data);

    // 폼 초기화
    rating.value = 0;
    reviewText.value = '';
    selectedImageFile.value = null;
    selectedImageBlob.value = null;

    alert('리뷰가 성공적으로 등록되었습니다.');
    router.back(); // 뒤로가기
  } catch (error) {
    console.error('리뷰 등록 실패:', error);
    alert('리뷰 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
  } finally {
    submitting.value = false;
  }
};


// 뒤로가기
const goBack = () => {
  router.back()
}

// 컴포넌트가 로드될 때 상품명 가져오기
onMounted(() => {
  fetchProductTitle()
})
</script>

<template>
  <div class="p-4 border rounded-lg">
    <div class="flex items-center mb-4">
      <button class="p-2 border rounded-lg mr-2" @click="goBack">
        &lt;
      </button>
      <h2 class="text-lg font-semibold">후기 작성</h2>
    </div>

    <div class="mb-4">
      <p><strong>uno:</strong> {{ uno }}</p>
      <p><strong>상품 번호:</strong> {{ pno }}</p>
    </div>

    <div class="mb-4">
      <p>이미지 업로드 (선택)</p>
      <input type="file" @change="handleImageChange" class="w-full p-2 border rounded-lg" />
      <div v-if="selectedImageBlob" class="mt-2">
        <img :src="selectedImageBlob" alt="Uploaded image" class="w-32 h-32 object-cover border rounded-lg" />
      </div>
    </div>

    <div class="mb-4">
      <p>이 상품 어떠셨나요? (상품명: {{ productTitle }})</p>
      <div class="flex">
        <span
            v-for="star in 5"
            :key="star"
            @click="rating = star"
            class="cursor-pointer text-2xl"
        >
          {{ star <= rating ? '★' : '☆' }}
        </span>
      </div>
    </div>

    <div class="mb-4">
      <p>어떤 점이 좋았나요?</p>
      <textarea
          v-model="reviewText"
          rows="4"
          class="w-full p-2 border rounded-lg"
          placeholder="후기 입력(필수)"
      ></textarea>
    </div>

    <button
        :disabled="submitting"
        @click="submitReview"
        class="w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50"
    >
      {{ submitting ? '등록 중...' : '등록하기' }}
    </button>
  </div>
</template>
