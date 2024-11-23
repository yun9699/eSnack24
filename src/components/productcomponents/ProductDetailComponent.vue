<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import { IProduct, IProductDetail } from "../../types/productTypes.ts";
import { useRoute } from "vue-router";
import { getDetail } from "../../api/product/productAPI.ts";
import useUserStore from "../../stores/useUserStore.ts";

const route = useRoute();
const pno: number = Number(route.params.pno);
const user = useUserStore();

const uno = user.getUno;
const userano = user.personalAllergies.anos



const initProduct: IProduct = {
  pfilename: 'sample fileName',
  ptitle_ko: 'Sample Product',
  price: 4000, // 기본 가격
  ano: 'no allergy'
};

const initProductDetail: IProductDetail = {
  product: initProduct,
  atitle_ko: [], // 알러지 정보 기본 값
  ano: []
};

const result = ref([]); // 포함된 알레르기

const productRef = ref<{ productDetail: IProductDetail }>({
  productDetail: initProductDetail,
});

const hasAllergy = computed(() => {
  const productAllergies = productRef.value.productDetail.product.ano;
  result.value = userano.filter((userAllergy) => productAllergies.includes(userAllergy))

  return userano.some((userAllergy) => productAllergies.includes(userAllergy));
});





const mappedProducts = computed(() => {
  return result.value.map((ano) => {
    const product = productRef.value.productDetail;

    // product.ano와 result.value의 ano 값이 일치하면 매핑
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







onMounted(() => {
  console.log(uno)
  console.log(userano)


  getDetail(pno).then((data) => {


    productRef.value.productDetail.product.price = data.price;
    productRef.value.productDetail.atitle_ko = data.atitle_ko || [];
    productRef.value.productDetail.product.ptitle_ko = data.ptitle_ko;
    productRef.value.productDetail.product.pfilename = data.pfilename;
    productRef.value.productDetail.product.ano = [...data.ano];

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
          :src="`http://10.10.10.128/product/${productRef.productDetail.product.pfilename}`"
          alt="Product Image"
          class="w-48 h-48 sm:w-60 sm:h-60 lg:w-80 lg:h-80 object-cover rounded-lg border-2 border-gray-200 shadow-md"
      />
    </div>

    <!-- 제품 정보 -->
    <div class="text-center w-full max-w-xl space-y-6">
      <!-- 제품 이름 -->
      <h1 class="text-3xl font-extrabold text-gray-800 tracking-tight">
        {{ productRef.productDetail.product.ptitle_ko }}
      </h1>

      <!-- 가격 표시 -->
      <p class="text-xl font-semibold text-gray-700">
        가격:
        <span class="text-green-600">
          {{ new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(productRef.productDetail.product.price).replace('₩', '') }}원
        </span>
      </p>

      <!-- 알러지 정보 -->
      <div>
        <h2 class="text-lg font-bold text-gray-800 mb-2">알러지 정보:</h2>
        <p class="text-base text-gray-700">
          <span v-if="productRef.productDetail.atitle_ko.length === 0" class="text-gray-500">없음</span>
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
          ⚠️ 주의: 이 제품은 사용자의 알러지 항목에 포함된 성분이 있습니다.
        </p>
      </div>
    </div>

    <!-- 버튼 -->
    <div class="w-full max-w-lg flex justify-center gap-4 mt-4">
      <button
          class="w-full bg-red-500 text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-red-600 transition shadow-md"
          @click="buttonAllergy"
      >
        Buy Now
      </button>
      <button
          class="w-full bg-green-500 text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-green-600 transition shadow-md"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Tailwind로 주요 스타일을 다룰 수 있도록 설정 */
</style>


<style scoped>
/* Tailwind를 사용하므로 추가 스타일링은 필요 없습니다 */
</style>
