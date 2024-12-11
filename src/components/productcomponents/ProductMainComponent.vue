<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { getmainList } from "../../api/productAPI/productAPI.ts"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n";
import { IProduct, localeProduct } from "../../locales/localeProduct"
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import 'swiper/swiper-bundle.css';
import { getFAQList } from "../../api/csAPI/faqAPI.ts";

const { t } = useI18n()
const { localePtitle } = localeProduct()

const router = useRouter()

// 상품 리스트 및 페이지 인덱스 관리
const ProductPopularList = ref<IProduct[]>([])

const slides = [
  { text: "1", imageURL: "/public/MainSWiper1.jpg" },
  { text: "2", imageURL: "/public/MainSwiper2.png" },
  { text: "3", imageURL: "/public/MainSwiper3.jpg" },
  { text: "4", imageURL: "/public/MainSwiper7.png" },
  { text: "5", imageURL: "/public/MainSwiper8.jpg" },
];

const faqList = ref([])

// 상품 데이터를 불러오는 함수
const loadProductList = async (page) => {
  const data = await getmainList(page)
  ProductPopularList.value = data.list
  console.log(ProductPopularList.value)
}

const loadFaqList = async (page, size, fcategory) => {
  const faqData = await getFAQList(page, size, fcategory)
  faqList.value = faqData.list
  console.log(faqData.value)
}

const handleClickDetail = (pno) => {
  console.log(pno)
  router.push(`/product/list/${pno}`)
}


onMounted(() => {
  loadProductList(1)
  loadFaqList(1, 3, "product")
})

const handleClikeMove = () => {
  router.push('/product/list')
}
</script>

<template>
  <section class="p-4 bg-white text-center">
    <Swiper
        :modules="[Autoplay, Pagination, EffectFade]"
        :slides-per-view="1"
        :space-between="0"
        :loop="true"
        :autoplay="{ delay: 6000, disableOnInteraction: false }"
        effect="slide"
        class="rounded-lg overflow-hidden"
    >
      <SwiperSlide v-for="slide in slides" :key="slide.text">
        <div class="relative">
          <img :src="slide.imageURL" alt="배너 이미지" class="w-full h-auto object-cover rounded-lg" />
        </div>
      </SwiperSlide>
    </Swiper>
  </section>

  <div class="container mx-auto px-4 py-8">
    <!-- 제목과 더보기 버튼을 같은 선상에 배치 -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-xl font-bold">{{ t('pMain.popular') }}</h1>
      <button
          @click="handleClikeMove"
          class="flex items-center bg-white text-[#F9BB00] font-semibold py-1.5 px-3 rounded-lg shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F9BB00] border border-[#F9BB00]"
      >
        {{ t('pMain.moreinfo') }}
        <span class="ml-2 bg-white rounded-full w-6 h-6 flex items-center justify-center text-[#F9BB00] font-bold">
          +
        </span>
      </button>
    </div>

    <!-- 상품 스와이프 부분 유지 -->
    <Swiper
        :modules="[Autoplay, Pagination, EffectFade]"
        :slides-per-view="2"
        :space-between="10"
        :loop="true"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        effect="slide"
        class="rounded-lg overflow-hidden"
    >
      <SwiperSlide v-for="product in ProductPopularList" :key="product.pno">
        <div class="border rounded-lg p-4 bg-white shadow-sm">
          <div class="relative">
            <div class="flex items-center justify-center">
              <img
                  :src="`https://esnack24-product-bucket.s3.ap-northeast-2.amazonaws.com/product/s_${product.pfilename}`"
                  :alt="product.ptitle_ko"
                  class="w-full h-32 object-contain"
                  @click="handleClickDetail(product.pno)"
              />
            </div>
            <div class="text-left mt-2">
              <h3 class="mt-4 text-gray-800 font-medium text-base h-10 flex items-center justify-center">{{ localePtitle(product) }}</h3>
              <p class="mt-2 text-orange-500 font-bold text-lg justify-center flex items-center">{{ product.price }}₩</p>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>

    <!-- FAQ 섹션 -->
    <div class="flex justify-between items-center mb-4 mt-8">
      <h2 class="text-xl font-bold">FAQ</h2>
    </div>
    <div class="bg-white rounded-lg">
      <div class="divide-y">
        <div v-for="faq in faqList" class="hover:bg-gray-50">
          <div class="flex justify-between items-center p-4">
            <router-link to="/cs/faq">
              <span class="text-base">{{ faq.ftitle }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
/* 슬라이드 애니메이션 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>