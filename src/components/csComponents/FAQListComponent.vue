<!-- FAQListComponent.vue -->
<template>
  <div class="max-w-4xl mx-auto p-4">
    <!-- FAQ/QNA 탭 -->
    <div class="flex gap-4 mb-6">
      <button
          class="px-8 py-2 rounded-full text-lg font-medium bg-red-500 text-white"
      >
        FAQ
      </button>
      <button
          class="px-8 py-2 rounded-full text-lg font-medium border border-gray-300 text-gray-600"
          @click="$router.push('/cs/qna')"
      >
        QNA
      </button>
    </div>

    <!-- 검색창 -->
    <div class="relative mb-8">
      <input
          type="text"
          v-model="searchKeyword"
          placeholder="검색하기"
          class="w-full p-3 pl-12 border border-gray-300 rounded-full"
      >
      <Icon
          icon="material-symbols:search"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"
      />
    </div>

    <!-- 자주묻는 질문 헤더 -->
    <h2 class="text-2xl font-bold mb-4">자주묻는 질문</h2>

    <!-- 카테고리 버튼들 -->
    <div class="flex gap-3 mb-6 flex-wrap">
      <button
          v-for="category in categories"
          :key="category.value"
          :class="[
          'px-6 py-2 rounded-full font-medium transition-colors',
          selectedCategory === category.value
            ? 'bg-red-500 text-white'
            : 'border border-gray-300 text-gray-600 hover:border-red-500'
        ]"
          @click="handleCategoryChange(category.value)"
      >
        {{ category.label }}
      </button>
    </div>

    <!-- FAQ 아코디언 리스트 -->
    <div class="space-y-4">
      <div
          v-for="faq in filteredFaqs"
          :key="faq.fno"
          class="border-b border-gray-200"
      >
        <button
            class="w-full flex justify-between items-center py-4 hover:text-red-500 transition-colors"
            @click="toggleFaq(faq.fno)"
        >
          <span class="text-left">{{ faq.ftitle }}</span>
          <Icon
              :icon="openFaq === faq.fno ? 'mdi:chevron-up' : 'mdi:chevron-down'"
              class="text-xl transition-transform"
          />
        </button>
        <div
            v-if="openFaq === faq.fno"
            class="pb-4 text-gray-600 bg-gray-50 p-4 rounded-lg"
        >
          {{ faqDetail?.fcontent }}
        </div>
      </div>
    </div>

    <!-- 데이터가 없을 경우 -->
    <div
        v-if="filteredFaqs.length === 0"
        class="text-center py-8 text-gray-500"
    >
      검색 결과가 없습니다.
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { getFAQList, getFAQOne } from "../../api/csAPI/faqAPI.ts"

// 카테고리 정의
const categories = [
  { label: '주문', value: 'ORDER' },
  { label: '결제', value: 'PAYMENT' },
  { label: '상품', value: 'PRODUCT' },
  { label: '기타', value: 'ETC' }
]

// 상태 관리
const selectedCategory = ref('ORDER')
const openFaq = ref<number | null>(null)
const faqs = ref<any[]>([])
const faqDetail = ref<any>(null)
const currentPage = ref(1)
const pageSize = ref(10)
const searchKeyword = ref('')

// 검색어와 카테고리로 필터링된 FAQ 목록
const filteredFaqs = computed(() => {
  return faqs.value.filter(faq => {
    const matchesSearch = searchKeyword.value === '' ||
        faq.ftitle.toLowerCase().includes(searchKeyword.value.toLowerCase())
    return matchesSearch
  })
})

// FAQ 목록 조회
const fetchFAQs = async () => {
  try {
    const response = await getFAQList(currentPage.value, pageSize.value, selectedCategory.value)
    faqs.value = response.list
  } catch (error) {
    console.error('FAQ 목록 조회 실패:', error)
  }
}

// FAQ 상세 조회
const toggleFaq = async (fno: number) => {
  try {
    if (openFaq.value === fno) {
      openFaq.value = null
      faqDetail.value = null
    } else {
      const response = await getFAQOne(fno)
      faqDetail.value = response
      openFaq.value = fno
    }
  } catch (error) {
    console.error('FAQ 상세 조회 실패:', error)
  }
}

// 카테고리 변경 처리
const handleCategoryChange = (category: string) => {
  selectedCategory.value = category
  currentPage.value = 1
  openFaq.value = null
  faqDetail.value = null
  fetchFAQs()
}

// 컴포넌트 마운트시 FAQ 목록 조회
onMounted(() => {
  fetchFAQs()
})
</script>