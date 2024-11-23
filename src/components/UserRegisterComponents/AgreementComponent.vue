<script setup lang="ts">
import { inject, onMounted, Ref, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const isAgree = inject<Ref<boolean>>("isAgree")
const terms = ref(null)
const { locale } = useI18n()

const readAgreementDoc = async (locale: string) => {
  try {
    const module = await import(`../../locales/json/agreement/agreement_${locale}.json`)
    terms.value = module.default
  } catch (e) {
    console.error(`Failed to load agreement for locale ${locale}:`, e)
    if (locale !== 'ko') {
      await readAgreementDoc('ko')
    }
  }
}

watch(() => locale.value, async (newLocale) => {
  await readAgreementDoc(newLocale)
})

onMounted(async () => {
  await readAgreementDoc(locale.value)
})
</script>

<template>
  <div v-if="terms" class="p-6">
    <div class="max-h-[400px] overflow-y-auto">
      <div v-for="(section, index) in terms.terms" :key="index" class="mb-6">
        <div class="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">
            {{ section.description_Section1 }}
          </h2>
          <p class="text-gray-700">{{ section.details }}</p>
          <div v-if="Array.isArray(section.details)" class="mt-4">
            <ul class="list-disc pl-5 space-y-2">
              <li v-for="(detail, idx) in section.details" :key="idx" class="text-gray-700">
                {{ detail }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="flex justify-center items-center h-screen">
    <p class="text-lg font-medium text-gray-600">{{ terms?.ui?.common?.loading || '로딩 중...' }}</p>
  </div>

  <!-- 체크박스 -->
  <div class="mt-4 flex items-center justify-end">
    <label for="agreement-checkbox" class="text-gray-700">
      {{ terms?.ui?.agreement?.confirm_message }}
    </label>
    <input
        id="agreement-checkbox"
        type="checkbox"
        v-model="isAgree"
        class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-5 ml-2"
    />
  </div>
</template>