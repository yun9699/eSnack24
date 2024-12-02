<script setup lang="ts">
import { inject } from "vue"
import { useI18n } from 'vue-i18n'
import { IAddress } from "../../types/userRegisterTypes.ts"

const { t } = useI18n()
const address: IAddress = inject("address")

// 숫자만 입력되도록 처리
const handlePhoneInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  input.value = input.value.replace(/\D/g, "")
  address.phonenumber = input.value
}

const handleZipcodeInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  input.value = input.value.replace(/\D/g, "")
  address.zipcode = input.value
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-2xl font-semibold text-center mb-6">{{ t('userAddress.title') }}</h2>
    <div class="space-y-4">
      <!-- country 입력 -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <label for="country" class="w-full sm:w-1/3 text-lg font-medium">{{ t('userAddress.country.label') }}</label>
        <input
            type="text"
            id="country"
            :placeholder="t('userAddress.country.placeholder')"
            class="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            v-model="address.country"
        />
      </div>

      <!-- state 입력 -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <label for="state" class="w-full sm:w-1/3 text-lg font-medium">{{ t('userAddress.state.label') }}</label>
        <input
            type="text"
            id="state"
            :placeholder="t('userAddress.state.placeholder')"
            class="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            v-model="address.state"
        />
      </div>

      <!-- city 입력 -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <label for="city" class="w-full sm:w-1/3 text-lg font-medium">{{ t('userAddress.city.label') }}</label>
        <input
            type="text"
            id="city"
            :placeholder="t('userAddress.city.placeholder')"
            class="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            v-model="address.city"
        />
      </div>

      <!-- address line_1 입력 -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <label for="address_line1" class="w-full sm:w-1/3 text-lg font-medium">{{ t('userAddress.address_line1.label') }}</label>
        <input
            type="text"
            id="address_line1"
            :placeholder="t('userAddress.address_line1.placeholder')"
            class="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            v-model="address.address_line1"
        />
      </div>

      <!-- address line_2 입력 -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <label for="address_line2" class="w-full sm:w-1/3 text-lg font-medium">{{ t('userAddress.address_line2.label') }}</label>
        <input
            type="text"
            id="address_line2"
            :placeholder="t('userAddress.address_line2.placeholder')"
            class="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            v-model="address.address_line2"
        />
      </div>

      <!-- zipCode 입력 -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <label for="zipcode" class="w-full sm:w-1/3 text-lg font-medium">{{ t('userAddress.zipcode.label') }}</label>
        <input
            type="text"
            id="zipcode"
            :placeholder="t('userAddress.zipcode.placeholder')"
            class="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            :value="address.zipcode"
            @input="handleZipcodeInput"
        />
      </div>

      <!-- phoneNumber 입력 -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <label for="phonenumber" class="w-full sm:w-1/3 text-lg font-medium">{{ t('userAddress.phone.label') }}</label>
        <input
            type="text"
            id="phonenumber"
            :placeholder="t('userAddress.phone.placeholder')"
            class="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            :value="address.phonenumber"
            @input="handlePhoneInput"
        />
      </div>

      <!-- 체크박스 -->
      <div class="flex items-center space-x-3 mt-4">
        <input
            type="checkbox"
            id="default-address"
            class="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
            v-model="address.is_primary"
        />
        <label for="default-address" class="text-lg font-medium text-gray-700">
          {{ t('userAddress.check_primary') }}
        </label>
      </div>
    </div>
  </div>
</template>