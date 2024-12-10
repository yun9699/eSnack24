<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import { IProduct, IProductDetail } from "../../types/productTypes.ts";
import {useRoute, useRouter} from "vue-router";
import { getDetail } from "../../api/productAPI/productAPI.ts";
import useUserStore from "../../stores/useUserStore.ts";
import {addCartProduct} from "../../api/cartapi/cartapi.ts";
import CommonCartAddModalComponent from "../../common/components/CommonCartAddModalComponent.vue";
import {createOrder} from "../../api/orderapi/OrderAPI.ts";
import {useI18n} from "vue-i18n";
import {localeProduct} from "../../locales/localeProduct.ts";
import {localeAllergy} from "../../locales/localeAllergy.ts";

const { t } = useI18n()
const { localePtitle, localePcontent } = localeProduct()
const { localeAtitle } = localeAllergy()

const route = useRoute();
const router = useRouter();
const pno: number = Number(route.params.pno);
const user = useUserStore();

const uno = user.getUno;
const userano = user.getPersonalAllergies;

const isModalStatus = ref(false);  // 모달 상태 관리

const modalClose = () => {
  console.log("modal close")
  isModalStatus.value = false;
};

const modalOpen = () => {
  console.log("modal open")
  isModalStatus.value = true;
};



const initProduct: IProduct = {
  pfilename: 'sample fileName',
  ptitle_ko: 'Sample Product',
  pcontent_ko: 'Sample Content',
  price: 4000, // 기본 가격
  ano: []
};

const initProductDetail: IProductDetail = {
  product: initProduct,
  atitle_ko: [], // 알러지 정보 기본 값
  ano: []
};

const result = ref<number[]>([]); // 포함된 알레르기

const productRef = ref<{ productDetail: IProductDetail }>({
  productDetail: initProductDetail,
});

const hasAllergy = computed(() => {
  // productAllergies를 number[] 타입으로 선언하고, 배열인지 확인 후 처리
  const productAllergies: number[] = Array.isArray(productRef.value.productDetail.product.ano)
      ? productRef.value.productDetail.product.ano
      : [];

  // userano가 배열이라 가정하고, 필터링 및 some 메서드를 사용
  result.value = userano.filter((userAllergy) => productAllergies.includes(userAllergy));

  return userano.some((userAllergy) => productAllergies.includes(userAllergy));
});





const mappedProducts = computed(() => {
  return result.value.map((ano) => {
    const product = productRef.value.productDetail;

    // productAPI.ano와 result.value의 ano 값이 일치하면 매핑
    const index = product.product.ano.indexOf(ano);  // ano 값이 있는 인덱스 찾기

    if (index !== -1) {
      return {
        pno: pno,  // 현재 상품의 pno
        allergy: product.atitle_ko[index],  // 해당 인덱스의 atitle_ko
        ano: ano,  // 겹치는 알러지 ID
      };
    }
  }).filter(Boolean);
});

const handleClickAddCart = async () => {

  console.log("addCart");
  console.log(pno)

  const res = await addCartProduct(pno,1)

  modalOpen()
}

const orderClick = () => {

  const pnos: number[] = [];
  const ciqtys: number[] = [];

  pnos.push(pno);
  ciqtys.push(1);

  createOrder(pnos, ciqtys).then((ono) => {

    console.log(ono);
    router.push(`/order/create/${ono}`);
  })
}


onMounted(() => {
  getDetail(pno).then((data) => {
    productRef.value.productDetail.product = {
      ...productRef.value.productDetail.product,
      price: data.price,
      ptitle_ko: data.ptitle_ko,
      ptitle_en: data.ptitle_en,
      ptitle_ja: data.ptitle_ja,
      ptitle_zh: data.ptitle_zh,
      pcontent_ko: data.pcontent_ko,
      pcontent_en: data.pcontent_en,
      pcontent_ja: data.pcontent_ja,
      pcontent_zh: data.pcontent_zh,
      pfilename: data.pfilename,
      ano: [...data.ano]
    };
    productRef.value.productDetail = {
      ...productRef.value.productDetail,
      atitle_ko: data.atitle_ko,
      atitle_en: data.atitle_en,
      atitle_ja: data.atitle_ja,
      atitle_zh: data.atitle_zh
    };

    // 페이지가 로드된 후 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);
  });
});
</script>

<template>
  <div class="bg-gray-100 min-h-screen flex flex-col items-center">
    <!-- 제품 이미지 -->
    <div class="w-full h-[50vh] overflow-hidden bg-gray-200">
      <img
          :src="`https://esnack24-product-bucket.s3.ap-northeast-2.amazonaws.com/product/${productRef.productDetail.product.pfilename}`"
          alt="Product Image"
          class="w-full h-full object-cover"
          style="aspect-ratio: 16 / 9"
      />
    </div>

    <!-- 제품 정보 -->
    <div class="w-full max-w-4xl p-6 bg-white shadow-md rounded-lg -mt-16 relative z-10">
      <!-- 제품 이름 및 리뷰 버튼 -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-4xl sm:text-5xl font-extrabold text-gray-800 tracking-tight">
          {{ localePtitle(productRef.productDetail.product) }}
        </h1>
        <router-link :to="`/review/list/${pno}`">
          <span class="text-[#F9BB00] text-lg font-semibold hover:underline">
            {{ t('pDetail.review_check') }} ➤
          </span>
        </router-link>
      </div>

      <!-- 가격 -->
      <div>
        <p class="text-2xl sm:text-3xl font-bold text-left" :style="{ color: '#000000' }">
          ₩ {{ new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(productRef.productDetail.product.price).replace('₩', '') }}
        </p>
      </div>

      <!-- 알러지 정보 -->
      <div class="text-center mb-6 mt-2"> <!-- mt-2 추가 -->
        <div class="flex items-center whitespace-nowrap">
          <h2 class="text-lg font-bold text-gray-800 mb-0 mr-2">{{ t('pDetail.allergy_info') }} :</h2>
          <p class="text-base text-gray-700 mb-0 flex flex-wrap">
            <span v-if="productRef.productDetail.atitle_ko.length === 0" class="text-gray-500">{{ t('pDetail.none') }}</span>
            <span v-else>
            <span
                v-for="(allergy, index) in productRef.productDetail.atitle_ko"
                :key="index"
                :class="{
                'text-red-600 font-bold': mappedProducts.some((item) => item.ano === productRef.productDetail.product.ano[index]),
                'text-gray-800': !mappedProducts.some((item) => item.ano === productRef.productDetail.product.ano[index])
              }"
                class="inline-block"
            >
              {{ localeAtitle({
              ano: productRef.productDetail.product.ano[index],
              atitle_ko: allergy,
              atitle_en: productRef.productDetail.atitle_en?.[index],
              atitle_ja: productRef.productDetail.atitle_ja?.[index],
              atitle_zh: productRef.productDetail.atitle_zh?.[index]
            }) }}
              <span v-if="index < productRef.productDetail.atitle_ko.length - 1">, </span>
            </span>
          </span>
          </p>
        </div>



        <!-- 사용자 알러지 경고 -->
        <div v-if="hasAllergy" class="mt-4 p-4 rounded-lg bg-red-50 border border-red-200">
          <p class="text-red-600 font-medium text-center">
            ⚠️ {{ t('pDetail.warning') }}
          </p>
        </div>
      </div>

      <!-- 버튼 -->
      <div class="flex justify-center gap-4 mb-4">
        <!-- 장바구니 버튼 -->
        <button
            class="bg-white text-[#F9BB00] border-2 border-[#F9BB00] py-3 px-8 rounded-full text-lg font-medium hover:bg-[#FFF3CC] hover:border-[#e0a500] transition shadow-lg"
            @click="handleClickAddCart"
        >
          {{ t('pDetail.add_to_cart') }}
        </button>

        <!-- 구매 버튼 -->
        <button
            class="bg-[#F9BB00] text-white py-3 px-8 rounded-full text-lg font-medium hover:bg-[#e0a500] transition shadow-lg"
            @click="orderClick"
        >
          {{ t('pDetail.buy') }}
        </button>
      </div>
    </div>
  </div>
</template>
