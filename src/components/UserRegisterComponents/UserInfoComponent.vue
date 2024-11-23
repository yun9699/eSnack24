<script setup lang="ts">
import { inject, ref } from "vue"
import { useI18n } from 'vue-i18n'
import { IUserInfo } from "../../types/userRegisterTypes.ts"

const { t } = useI18n()
const userInfo: IUserInfo = inject("userInfo")

// 숫자만 입력되도록 처리
const handlePhoneInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  input.value = input.value.replace(/\D/g, "")
  userInfo.ucallnumber = input.value
}

// 오늘 날짜를 YYYY-MM-DD 형식으로 가져오기
const today = new Date().toISOString().split('T')[0]

</script>

<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-2xl font-semibold text-center mb-6">{{ t('userInfo.title') }}</h2>

    <div class="space-y-4">
      <!-- 이름 입력 -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <label for="name" class="w-full sm:w-1/3 text-lg font-medium">{{ t('userInfo.name.label') }}</label>
        <input
            type="text"
            id="name"
            :placeholder="t('userInfo.name.placeholder')"
            class="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            v-model="userInfo.username"
        />
      </div>

      <!-- 휴대폰 번호 입력 -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <label for="phone" class="w-full sm:w-1/3 text-lg font-medium">{{ t('userInfo.phone.label') }}</label>
        <input
            type="tel"
            id="phone"
            :placeholder="t('userInfo.phone.placeholder')"
            class="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            :value="userInfo.ucallnumber"
            @input="handlePhoneInput"
        />
      </div>

      <!-- 성별 선택 -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <label for="gender" class="w-full sm:w-1/3 text-lg font-medium">{{ t('userInfo.gender.label') }}</label>
        <select
            id="gender"
            class="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            v-model="userInfo.gender"
        >
          <option value="">{{ t('userInfo.gender.placeholder') }}</option>
          <option value="male">{{ t('userInfo.gender.options.male') }}</option>
          <option value="female">{{ t('userInfo.gender.options.female') }}</option>
          <option value="other">{{ t('userInfo.gender.options.other') }}</option>
        </select>
      </div>

      <!-- 생일 입력 -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <label for="birthday" class="w-full sm:w-1/3 text-lg font-medium">{{ t('userInfo.birthday.label') }}</label>
        <input
            type="date"
            id="birthday"
            :max="today"
            class="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            v-model="userInfo.birth"
        />
      </div>
    </div>
  </div>
</template>