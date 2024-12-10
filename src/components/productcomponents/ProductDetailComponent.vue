<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import { IProduct, IProductDetail } from "../../types/productTypes.ts";
import {useRoute, useRouter} from "vue-router";
import { getDetail } from "../../api/productAPI/productAPI.ts";
import useUserStore from "../../stores/useUserStore.ts";
import {addCartProduct} from "../../api/cartapi/cartapi.ts";
import CommonCartAddModalComponent from "../../common/components/CommonCartAddModalComponent.vue";
import {createOrder, viewOrder} from "../../api/orderapi/OrderAPI.ts";
import {useI18n} from "vue-i18n";
import {localeProduct} from "../../locales/localeProduct.ts";

const { t } = useI18n()
const { localePtitle, localePcontent } = localeProduct()

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
  console.log("uno:", uno)
  console.log("userano:", userano)
  console.log("pno:", pno)

  getDetail(pno).then((data) => {


    productRef.value.productDetail.product.price = data.price;
    productRef.value.productDetail.atitle_ko = data.atitle_ko || [];
    productRef.value.productDetail.product.ptitle_ko = data.ptitle_ko;
    productRef.value.productDetail.product.pfilename = data.pfilename;
    productRef.value.productDetail.product.ano = [...data.ano];
    productRef.value.productDetail.product.pcontent_ko = data.pcontent_ko;

    console.log("----------------------data")
    console.log(data);
  });
});
</script>

<template>
  <div class="max-w-5xl mx-auto p-6 flex flex-col items-center gap-10 bg-white shadow-lg rounded-lg">
    <!-- 제품 이미지 -->
    <div class="flex justify-center items-center w-full max-w-md mx-auto">
      <img
          :src="`https://esnack24-product-bucket.s3.ap-northeast-2.amazonaws.com/product/${productRef.productDetail.product.pfilename}`"
          alt="Product Image"
          class="w-48 h-48 sm:w-60 sm:h-60 lg:w-80 lg:h-80 object-cover rounded-lg border-2 border-gray-200 shadow-md"
      />
    </div>

    <!-- 제품 정보 -->
    <div class="text-center w-full max-w-xl space-y-6">
      <!-- 제품 이름 -->
      <h1 class="text-3xl font-extrabold text-gray-800 tracking-tight">
        {{ localePtitle(productRef.productDetail.product) }}
      </h1>

      <!-- 가격과 리뷰확인 버튼을 같은 선상에 배치 -->
      <div class="flex justify-between w-full mt-2">
        <!-- 가격을 완전 중앙에 배치 -->
        <div class="flex-1 text-center">
          <div class="text-xl font-semibold text-gray-700">
            {{ t('pDetail.price') }} :
            <span class="text-green-600">
              {{ new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(productRef.productDetail.product.price).replace('₩', '') }} ₩
            </span>
          </div>
        </div>

        <!-- 리뷰 확인 버튼 (오른쪽에 붙임) -->
        <router-link :to="`/review/list/${pno}`">
          <button class="bg-blue-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-600 transition">
            {{ t('pDetail.review_check') }}
          </button>
        </router-link>
      </div>

      <!-- 알러지 정보 -->
      <div>
        <h2 class="text-lg font-bold text-gray-800 mb-2">{{ t('pDetail.allergy_info') }} :</h2>
        <p class="text-base text-gray-700">
          <span v-if="productRef.productDetail.atitle_ko.length === 0" class="text-gray-500">{{ t('pDetail.none') }}</span>
          <span v-else>
            <span
                v-for="(allergy, index) in productRef.productDetail.atitle_ko"
                :key="index"
                :class="mappedProducts.some((item) => item.ano === productRef.productDetail.product.ano[index]) ? 'text-red-600 font-bold' : 'text-gray-800'"
            >
              {{ allergy }}<span v-if="index < productRef.productDetail.atitle_ko.length - 1">, </span>
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

    <!-- 제품 컨텐츠 영역 스타일링 -->
    <div class="w-full bg-white p-6 rounded-xl shadow-lg mt-6 border border-gray-100">
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">{{ t('pDetail.product_description') }}</h2>
      <p class="text-lg text-gray-700 leading-relaxed break-words">
        {{ localePcontent(productRef.productDetail.product) }}
      </p>
    </div>

    <!-- 버튼 -->
    <div class="w-full max-w-lg flex justify-between gap-4 mt-4">
      <button
          class="w-full lg:w-auto bg-red-500 text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-red-600 transition shadow-md"
          @click="orderClick"
      >
        {{ t('pDetail.buy') }}
      </button>
      <button
          class="w-full lg:w-auto bg-green-500 text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-green-600 transition shadow-md"
          @click="handleClickAddCart"
      >
        {{ t('pDetail.add_to_cart') }}
      </button>
    </div>
    <CommonCartAddModalComponent
        v-if="isModalStatus"
        :isModalStatus="isModalStatus"
        :modalClose="modalClose"
    />
  </div>
</template>

<style scoped>
/* Tailwind로 주요 스타일을 다룰 수 있도록 설정 */
</style>


<style scoped>
/* Tailwind를 사용하므로 추가 스타일링은 필요 없습니다 */
</style>
