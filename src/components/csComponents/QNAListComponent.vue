<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { getQNAList, getQNAOne } from "../../api/csAPI/qnaAPI.ts"

// 상태 관리
const openQna = ref<number | null>(null)
const qnas = ref<any[]>([])
const qnaDetail = ref<any>(null)
const currentPage = ref(1)
const pageSize = ref(10)
const searchKeyword = ref('')

// 검색어로 필터링된 QNA 목록
const filteredQnas = computed(() => {
  return qnas.value.filter(qna => {
    const matchesSearch = searchKeyword.value === '' ||
        qna.qtitle.toLowerCase().includes(searchKeyword.value.toLowerCase())
    return matchesSearch
  })
})

// QNA 목록 조회
// TODO: uno는 실제 로그인한 사용자의 ID로 변경해야 함 (임시적으로 구현)
const fetchQNAs = async () => {
  try {
    const response = await getQNAList(5, currentPage.value, pageSize.value)
    qnas.value = response.list
  } catch (error) {
    console.error('QNA 목록 조회 실패:', error)
  }
}

// QNA 상세 조회
const toggleQna = async (qno: number) => {
  try {
    if (openQna.value === qno) {
      openQna.value = null
      qnaDetail.value = null
    } else {
      const response = await getQNAOne(qno)
      qnaDetail.value = response
      openQna.value = qno
    }
  } catch (error) {
    console.error('QNA 상세 조회 실패:', error)
  }
}

// 날짜 포맷팅 함수
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ko-KR')
}

// 컴포넌트 마운트시 QNA 목록 조회
onMounted(() => {
  fetchQNAs()
})
</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <!-- FAQ/QNA 탭 -->
    <div class="flex gap-4 mb-6">
      <button
          class="px-8 py-2 rounded-full text-lg font-medium border border-gray-300 text-gray-600"
          @click="$router.push('/cs/faq')"
      >
        FAQ
      </button>
      <button
          class="px-8 py-2 rounded-full text-lg font-medium bg-red-500 text-white"
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

    <!-- 내 문의내역 헤더와 등록 버튼 -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">내 문의내역</h2>
      <button
          @click="$router.push('/cs/qna/register')"
          class="px-6 py-2 bg-red-500 text-white rounded-full"
      >
        문의등록
      </button>
    </div>

    <!-- QNA 아코디언 리스트 -->
    <div class="space-y-4">
      <div
          v-for="qna in filteredQnas"
          :key="qna.qno"
          class="border-b border-gray-200"
      >
        <button
            class="w-full flex items-center py-4 hover:text-red-500 transition-colors"
            @click="toggleQna(qna.qno)"
        >
          <div class="flex items-start gap-3 flex-1">
            <span class="px-2 py-1 text-sm rounded-full"
                  :class="qna.qstatus ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'">
              {{ qna.qstatus ? '답변완료' : '답변대기' }}
            </span>
            <span class="text-left">{{ qna.qtitle }}</span>
          </div>
          <Icon
              :icon="openQna === qna.qno ? 'mdi:chevron-up' : 'mdi:chevron-down'"
              class="text-xl transition-transform shrink-0"
          />
        </button>
        <div
            v-if="openQna === qna.qno"
            class="pb-4 text-gray-600 bg-gray-50 p-4 rounded-lg"
        >
          <!-- 상품명과 상태 -->
          <div class="flex justify-between items-center mb-4">
            <div v-if="qnaDetail?.ptitle_ko" class="text-sm">
              상품명: {{ qnaDetail.ptitle_ko }}
            </div>
            <!-- 답변이 없을 때만 수정/삭제 버튼 표시 -->
            <div v-if="!qnaDetail?.qanswer" class="flex gap-2">
              <button class="px-4 py-1 text-sm border border-red-500 text-red-500 rounded-full hover:bg-red-50">
                수정
              </button>
              <button class="px-4 py-1 text-sm border border-gray-300 text-gray-600 rounded-full hover:bg-gray-50">
                삭제
              </button>
            </div>
          </div>

          <!-- 문의 내용 -->
          <div class="mb-4 font-bold">{{ qnaDetail?.qcontent }}</div>

          <!-- 첨부 파일 -->
          <div v-if="qnaDetail?.qfilename" class="mb-4 text-sm">
            첨부파일: {{ qnaDetail.qfilename }}
          </div>

          <!-- 등록일 -->
          <div class="text-sm text-gray-500">
            등록일: {{ formatDate(qnaDetail?.qregdate) }}
          </div>

          <!-- 답변 내용 -->
          <div v-if="qnaDetail?.qanswer" class="mt-4 p-4 bg-white rounded">
            <div class="font-bold mb-2">답변</div>
            <div class="mb-2">{{ qnaDetail.qanswer }}</div>
            <div class="text-sm text-gray-500">
              답변일: {{ formatDate(qnaDetail?.qmoddate) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 데이터가 없을 경우 -->
    <div
        v-if="filteredQnas.length === 0"
        class="text-center py-8 text-gray-500"
    >
      문의 내역이 없습니다.
    </div>
  </div>
</template>