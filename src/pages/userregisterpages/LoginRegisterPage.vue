<script setup lang="ts">
import {ref, defineAsyncComponent, provide, onMounted} from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocaleStore } from '../../stores/useLocaleStore'
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import {getAllergyListKo} from "../../api/AllergyAPI/allergyAPI.ts"
import {registerAddress, registerPersonalAllergy, registerUser} from "../../api/UserAPI/userRegisterAPI.ts"
import {useRouter} from "vue-router"
import {IAddress, IUserInfo} from "../../types/userRegisterTypes.ts"

// Lazy load components
const AgreementComponent = defineAsyncComponent(() => import('../../components/UserRegisterComponents/AgreementComponent.vue'))
const UserInfoComponent = defineAsyncComponent(() => import('../../components/UserRegisterComponents/UserInfoComponent.vue'))
const UserAllergySetComponent = defineAsyncComponent(() => import('../../components/UserRegisterComponents/UserAllergySetComponent.vue'))
const CommonCheckModalComponent = defineAsyncComponent(() => import('../../common/components/CommonCheckModalComponent.vue'))
const RegisterAddressComponent = defineAsyncComponent(() => import('../../components/UserRegisterComponents/RegisterAddressComponent.vue'))

const router = useRouter()

// i18n 및 locale 설정
const { t, locale } = useI18n()
const localeStore = useLocaleStore()
const { currentLang } = storeToRefs(localeStore)

// 드롭다운 상태 관리
const isLangMenuOpen = ref(false)

// 언어 목록
const languages = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  zh: '简体中文'
}

// 언어 변경 함수
const changeLang = async (code: string) => {
  await localeStore.setLanguage(code)
  isLangMenuOpen.value = false
}

const currentStep = ref<number>(0)
const allergyList = ref<string[]>([])
const selectedAnos = ref<number[]>([])
const isCheckModalOpen = ref<boolean>(false)
const isAgree = ref<boolean>(false)

const initAddress: IAddress = {
  country: '',
  address_line1: '',
  address_line2: '',
  zipcode: '',
  is_primary: '',
  uno: '',
  state: '',
  city: '',
  phonenumber: ''
}

const initUserInfo: IUserInfo = {
  username: '',
  ucallnumber: '',
  gender: '',
  birth: ''
}

const address = ref<{addressData: IAddress}>({
  addressData: initAddress
})

const userInfo = ref<{userInfoData: IUserInfo}>({
  userInfoData: initUserInfo,
})

const registerFn = () => {
  registerUser(userInfo.value.userInfoData)
  registerPersonalAllergy(selectedAnos.value)
  registerAddress(address.value.addressData)
}

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const completeRegister = () => {
  isCheckModalOpen.value = true
}

const closeModal = () => {
  isCheckModalOpen.value = false
  router.push('/productAPI/list')
}

onMounted(async () => {
  allergyList.value = await getAllergyListKo()
})

provide("userInfo", userInfo.value.userInfoData)
provide("allergyList", allergyList)
provide("selectedAnos", selectedAnos)
provide("address", address.value.addressData)
provide("isAgree", isAgree)
</script>

<template>
  <CommonCheckModalComponent
      v-if="isCheckModalOpen"
      msg="등록"
      :is-open="isCheckModalOpen"
      :fn="registerFn"
      @closeModal="closeModal"
  />

  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
      <h2 class="text-2xl font-semibold text-center mb-4">{{ t('login.register_title') }}</h2>

      <!-- 언어 선택 드롭다운 -->
      <div class="flex justify-end mb-4">
        <div class="relative">
          <button
              @click="isLangMenuOpen = !isLangMenuOpen"
              class="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm"
          >
            <Icon icon="fluent-mdl2:locale-language" />
            <span>{{ languages[locale] }}</span>
          </button>

          <div
              v-if="isLangMenuOpen"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20"
          >
            <div class="py-1">
              <button
                  v-for="(name, code) in languages"
                  :key="code"
                  @click="changeLang(code)"
                  class="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
              >
                <Icon
                    v-if="locale === code"
                    icon="mdi:check"
                    class="text-green-500"
                />
                <span v-else class="w-6"></span>
                {{ name }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 단계별 컴포넌트 -->
      <AgreementComponent v-if="currentStep === 0" />
      <UserInfoComponent v-if="currentStep === 1" />
      <RegisterAddressComponent v-if="currentStep === 2" />
      <UserAllergySetComponent v-if="currentStep === 3" />

      <div class="flex justify-between mt-6">
        <button
            v-if="currentStep > 0"
            @click="prevStep"
            class="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300"
        >
          {{ t('common.prev') }}
        </button>

        <button
            v-if="currentStep < 3"
            @click="nextStep"
            :class="[
              'ml-auto px-4 py-2 text-white rounded focus:outline-none focus:ring focus:ring-blue-300',
               isAgree ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed opacity-50'
            ]"
            :disabled="!isAgree"
        >
          {{ t('common.next') }}
        </button>

        <button
            v-if="currentStep === 3"
            @click="completeRegister"
            class="ml-auto px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          {{ t('common.register') }}
        </button>
      </div>
    </div>
  </div>
</template>