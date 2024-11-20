<script setup lang="ts">

  import {inject} from "vue";

  const userInfo: any = inject("userInfo")

  // 숫자만 입력되도록 처리
  const handlePhoneInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, ""); // 숫자만 남김
    userInfo.ucallnumber = input.value; // userInfo와 동기화
  };

</script>

<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-2xl font-semibold text-center mb-6">User Information</h2>

    <div class="space-y-4">
      <!-- 이름 입력 -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <label for="name" class="w-full sm:w-1/3 text-lg font-medium">Name</label>
        <input
            type="text"
            id="name"
            placeholder="Enter your name"
            class="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            v-model="userInfo.username"
        />
      </div>

      <!-- 휴대폰 번호 입력 -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <label for="phone" class="w-full sm:w-1/3 text-lg font-medium">Phone</label>
        <input
            type="tel"
            id="phone"
            placeholder="Enter your phone number"
            class="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            :value="userInfo.ucallnumber"
            @input="handlePhoneInput"
        />
      </div>

      <!-- 성별 선택 -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <label for="gender" class="w-full sm:w-1/3 text-lg font-medium">Gender</label>
        <select
            id="gender"
            class="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            v-model="userInfo.gender"
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <!-- 생일 입력 -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <label for="birthday" class="w-full sm:w-1/3 text-lg font-medium">Birthday</label>
        <input
            type="date"
            id="birthday"
            class="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            v-model="userInfo.birth"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
