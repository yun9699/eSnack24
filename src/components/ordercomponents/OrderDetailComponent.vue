<script setup lang="ts">

</script>

<template>
  <div class="min-h-screen bg-gray-100 py-6 px-4">
    <!-- 페이지 제목 -->
    <div class="max-w-3xl mx-auto mb-6">
      <h1 class="text-2xl font-bold text-gray-800 text-center">주문 상세</h1>
    </div>

    <!-- 주문 목록 -->
    <div class="max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <ul class="divide-y divide-gray-200">
        <!-- 리스트 아이템 -->
        <li
            v-for="item in 3"
            :key="item"
            class="flex items-center justify-between p-4 hover:bg-gray-50"
        >
          <!-- 제품 이미지 -->
          <img
              src="https://via.placeholder.com/80"
              alt="제품 이미지"
              class="w-20 h-20 object-cover rounded-md shadow-sm"
          />
          <!-- 제품 정보 -->
          <div class="flex-1 ml-4">
            <h2 class="text-lg font-semibold text-gray-800">제품 이름</h2>
            <p class="text-sm text-gray-500">수량: 2개</p>
          </div>
          <!-- 제품 금액 -->
          <div class="text-right">
            <p class="text-lg font-bold text-gray-800">₩20,000</p>
          </div>
        </li>
      </ul>
    </div>

    <!-- 총 금액 -->
    <div class="max-w-3xl mx-auto mt-6 bg-white shadow-lg rounded-lg p-4">
      <div class="flex justify-between items-center">
        <span class="text-lg font-semibold text-gray-600">총 금액</span>
        <span class="text-xl font-bold text-gray-800">₩60,000</span>
      </div>
    </div>

    <!-- 버튼 섹션 -->
    <div class="max-w-3xl mx-auto mt-6">
      <button
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-200"
      >
        홈으로 돌아가기
      </button>
    </div>
  </div>
</template>