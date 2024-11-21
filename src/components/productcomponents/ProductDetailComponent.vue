<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {IProduct, IProductDetail} from "../../types/productTypes.ts";
import {useRoute} from "vue-router";
import {getDetail} from "../../api/product/ProductAPI.ts";

const route = useRoute();

const pno: number = Number(route.params.pno);

const initProduct: IProduct = {

  pfilename: 'https://example.com/product-image.jpg', // Example product image URL
  ptitle_ko: 'Sample Product',
  price: 299.99,
}

const initProductDetail: IProductDetail = {
  product: initProduct,
  allergyInfo: 'Contains nuts and dairy.'
}

const productRef = ref<{ productDetail: IProductDetail }>({
  productDetail: initProductDetail// 올바른 속성 이름 사용
});


onMounted( () => {

  getDetail(pno).then((data) => {

    console.log(data);

    productRef.value.productDetail.product.price = data.price;
    productRef.value.productDetail.allergyInfo = data.allergyInfo;
    productRef.value.productDetail.product.ptitle_ko = data.ptitle_ko;
    productRef.value.productDetail.product.pfilename = data.pfilename;
  })
})
</script>


<template>
  <div class="max-w-4xl mx-auto p-4 flex flex-col items-center gap-8">
    <div class="w-full max-w-md">
      <img :src="`http://10.10.10.128/product/${productRef.productDetail.product.pfilename}`" alt="Product Image" class="w-full h-auto rounded-lg shadow-lg" />
    </div>
    <div class="text-center w-full max-w-md">
      <h1 class="text-2xl font-bold text-gray-800">{{ productRef.productDetail.product.ptitle_ko }}</h1>
      <p class="text-lg text-green-600 mt-2">{{ productRef.productDetail.product.price.toFixed(2) }}</p>
      <p class="text-sm text-gray-600 mt-2">Allergy Information: {{ productRef.productDetail.allergyInfo }}</p>
      <div class="mt-6 flex justify-center gap-4">
        <button class="bg-red-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-red-600 transition">
          Buy Now
        </button>
        <button class="bg-green-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-green-600 transition">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* No additional styling needed as Tailwind handles responsiveness */
</style>
