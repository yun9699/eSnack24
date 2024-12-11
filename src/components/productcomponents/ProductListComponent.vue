<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getFilterList, getList } from "../../api/productAPI/productAPI.ts";
import { IProduct } from "../../types/productTypes.ts";
import useUserStore from "../../stores/useUserStore.ts";
import {useI18n} from "vue-i18n";
import {localeProduct} from "../../locales/localeProduct.ts";
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

const { t } = useI18n()
const { localePtitle } = localeProduct()

const user = useUserStore();
const uno: number = user.getUno;
const userano: number = user.getPersonalAllergies;

const slides = [
  { text: "첫 번째 배너 텍스트입니다.", btnText: "앱 다운로드" },
  { text: "두 번째 배너 텍스트입니다.", btnText: "지금 확인하기" },
  { text: "세 번째 배너 텍스트입니다.", btnText: "혜택 보기" },
];

const serverData = ref<{ ProductList: IProduct[] }>({
  ProductList: [],
});

let pageNum: number = 1;
let endPageNum: number = 1;

// 제외 상태 관리
const isAllergyExcluded = ref(false);

// 알러지 제외 문구 관리
const allergyMessage = ref("");

const moreInfo = () => {
  if (pageNum < endPageNum) {
    pageNum++; // 페이지 번호 증가
    getList(pageNum).then((result) => {
      if (result && result.list) {
        const newItems = result.list.filter(
            (item) => !serverData.value.ProductList.some((existing) => existing.pno === item.pno)
        );
        serverData.value.ProductList = [
          ...serverData.value.ProductList,
          ...newItems,
        ];
      }
    })
  }
};

const FilterInfo = () => {
  if (pageNum < endPageNum) {
    console.log(pageNum)
    pageNum++; // 페이지 번호 증가
    getFilterList(pageNum).then((result) => {
      if (result && result.list) {
        const newItems = result.list.filter(
            (item) => !serverData.value.ProductList.some((existing) => existing.pno === item.pno)
        );
        serverData.value.ProductList = [
          ...serverData.value.ProductList,
          ...newItems,
        ];
      }
    })
  }
};

// "제외" 버튼 클릭 시 실행
const handleAllergyChange = () => {
  console.log(userano);

  // 제외 상태 활성화
  isAllergyExcluded.value = true;

  // 알러지 제외 문구 표시
  allergyMessage.value = "본인의 알러지가 제외된 상품입니다.";

  pageNum = 1;

  // 기존 데이터 초기화
  serverData.value.ProductList = [];

  // 필터링된 데이터 가져오기
  getFilterList(uno, pageNum).then((result) => {
    console.log(result);

    serverData.value.ProductList = result.list;
  });
};

// "전체" 버튼 클릭 시 실행
const handleAllergyReset = () => {
  console.log("전체 버튼 클릭");

  // 제외 상태 초기화
  isAllergyExcluded.value = false;

  // 알러지 제외 문구 제거
  allergyMessage.value = "";

  // 페이지 번호 초기화
  pageNum = 1;

  // 기존 데이터 초기화 후 첫 화면 데이터 가져오기
  serverData.value.ProductList = [];
  getList(pageNum).then((res) => {
    serverData.value.ProductList = res.list;
    endPageNum = res.endPage;
  });
};

// 컴포넌트 마운트 시 실행
onMounted(() => {
  getList(pageNum).then((res) => {
    serverData.value.ProductList = res.list;
    endPageNum = res.endPage;
  });
});



</script>

<template>
  <!-- Header Section -->
<!--  <header class="bg-yellow-500 p-4 flex justify-between items-center">-->
<!--    <div class="flex space-x-4">-->
<!--      <button class="px-4 py-2 bg-yellow-600 text-white rounded">{{ t('pList.event_product') }}</button>-->
<!--      <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded">{{ t('pList.differentiated_product') }}</button>-->
<!--      <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded">{{ t('pList.fresh_product') }}</button>-->
<!--    </div>-->
<!--  </header>-->

  <!-- Banner Section -->
<!--  <section class="p-4 bg-gray-100 text-center">-->
<!--    <p class="text-gray-600">{{ t('pList.header') }}</p>-->
<!--    <div class="bg-yellow-200 p-4 mt-2 rounded">-->
<!--      <button class="mt-4 px-6 py-2 bg-yellow-500 text-white rounded">{{ t('pList.app_download') }}</button>-->
<!--    </div>-->
<!--  </section>-->
  <section class="p-4 bg-gray-100 text-center">
    <Swiper
        spaceBetween="30"
        :slidesPerView="1"
        loop
        :autoplay="true"
        :effect="'slide'"
        class="rounded-lg overflow-hidden"
    >
    <SwiperSlide v-for="(slide, index) in slides" :key="index">
      <div class="bg-yellow-200 p-4 mt-2 rounded">
        <p class="text-gray-600">{{ slide.text }}</p>
        <button class="mt-4 px-6 py-2 bg-yellow-500 text-white rounded">
          {{ slide.btnText }}
        </button>
      </div>
    </SwiperSlide>
    </Swiper>
  </section>

  <!-- Allergy Exclusion Message -->
  <section v-if="allergyMessage" class="p-4 bg-red-100 text-center text-red-600 font-semibold">
    {{ allergyMessage }}
  </section>

  <!-- Search and Filter Section -->
  <section class="p-4">
    <div class="flex space-x-2 mb-4">
      <!-- "전체" 버튼 -->
      <button
          class="px-3 py-1 bg-yellow-500 text-white rounded"
          @click="handleAllergyReset"
      >
        {{ t('pList.all') }}
      </button>

      <!-- 기타 버튼 -->
      <button class="px-3 py-1 bg-gray-200 text-gray-700 rounded">1+1</button>
      <button class="px-3 py-1 bg-gray-200 text-gray-700 rounded">{{ t('pList.sale') }}</button>

      <!-- "제외" 버튼 -->
      <button
          v-if="uno>0"
          class="px-3 py-1"
          :class="isAllergyExcluded ? 'bg-red-500 text-white' : 'bg-red-300 text-gray-700'"
          @click="handleAllergyChange"
      >
        {{ t('pList.exclude') }}
      </button>
    </div>
    <select class="p-2 border rounded w-full">
      <option>최신순</option>
      <option>가격 낮은순</option>
      <option>가격 높은순</option>
    </select>
  </section>

  <!-- Product List Section -->
  <section class="p-4 grid grid-cols-2 gap-6">
    <div
        v-for="item in serverData.ProductList"
        :key="item.pno"
        class="border rounded-2xl p-4 text-center flex flex-col items-center"
    >
      <!-- NEW 및 1+1 표시 -->
      <div class="flex justify-between items-center w-full mb-3">
      <span class="text-gray-500 text-sm font-medium bg-gray-100 px-2 py-1 rounded-full">
        NEW
      </span>
        <span class="bg-yellow-500 text-white text-sm px-2 py-1 rounded-full">
        1+1
      </span>
      </div>

      <!-- 상품 이미지 -->
      <RouterLink :to="`/product/list/${item.pno}`" class="block">
        <div class="w-full h-40 flex items-center justify-center bg-white rounded-md">
          <img
              :src="`https://esnack24-product-bucket.s3.ap-northeast-2.amazonaws.com/product/s_${item.pfilename}`"
              :alt="item.ptitle_ko"
              class="max-h-full max-w-full object-contain"
          />
        </div>
      </RouterLink>

      <!-- 상품 제목 -->
      <p class="mt-4 text-gray-800 font-medium text-base h-10 flex items-center justify-center">
        {{ localePtitle(item) }}
      </p>

      <!-- 상품 가격 -->
      <p class="mt-2 text-orange-500 font-bold text-lg">{{ item.price }}₩</p>
    </div>
  </section>

  <div class="mt-10 m-10 text-center">
    <div v-if="isAllergyExcluded === false">
    <button
        @click="moreInfo()"
        v-if="pageNum < endPageNum"
        class="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
    >
      {{ t('pList.more') }}

    </button>
    </div>

    <div v-if="isAllergyExcluded === true">
      <button
          @click="FilterInfo()"
          v-if="pageNum < endPageNum"
          class="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        더보기 filter
      </button>
    </div>
  </div>
</template>