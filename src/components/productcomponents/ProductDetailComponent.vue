<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import { IProduct, IProductDetail } from "../../types/productTypes.ts";
import { useRoute } from "vue-router";
import { getDetail } from "../../api/product/ProductAPI.ts";
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

const hasAllergyresult = computed(() => {
  const productAllergies = productRef.value.productDetail.product.ano;
  return result.value = userano.filter((userAllergy) => productAllergies.includes(userAllergy))
});





onMounted(() => {
  console.log(uno)
  console.log(userano)
  console.log(hasAllergyresult.value)
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
  <div class="max-w-4xl mx-auto p-4 flex flex-col items-center gap-8">
    <!-- 제품 이미지 -->
    <div class="flex justify-center items-center w-full max-w-md mx-auto">
      <img
          :src="`http://10.10.10.128/product/${productRef.productDetail.product.pfilename}`"
          alt="Product Image"
          class="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-72 lg:h-72 object-cover rounded-lg shadow-lg"
      />
    </div>

    <!-- 제품 정보 -->
    <div class="text-center w-full max-w-md">
      <h1 class="text-2xl font-bold text-gray-800">
        {{ productRef.productDetail.product.ptitle_ko }}
      </h1>

      <!-- 가격 표시 -->
      <p class="text-lg text-gray-800 mt-2">
        가격:
        <span class="text-green-600">
          {{ new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(productRef.productDetail.product.price).replace('₩', '') }}원
        </span>
      </p>

      <!-- 알러지 정보 -->
      <p class="text-sm text-gray-800 mt-4">
        알러지 정보:
        <span class="text-red-600 font-bold">
          {{ productRef.productDetail.atitle_ko.length > 0 ? productRef.productDetail.atitle_ko.join(', ') : '없음' }}
        </span>
      </p>

      <!-- 사용자 알러지 경고 -->
      <div v-if="hasAllergy" class="mt-4 bg-red-100 text-red-600 p-4 rounded-lg shadow-lg">
        <p>⚠️ 주의: 이 제품은 사용자의 알러지 항목에 포함된 성분이 있습니다.</p>
      </div>


      <!-- 버튼 -->
      <div class="mt-6 flex justify-center gap-4">
        <button
            class="bg-red-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-red-600 transition"
        >
          Buy Now
        </button>
        <button
            class="bg-green-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-green-600 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Tailwind를 사용하므로 추가 스타일링은 필요 없습니다 */
</style>
