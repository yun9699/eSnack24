<script setup lang="ts">
import {onMounted, ref} from 'vue';

const product = ref({
  image: 'https://example.com/product-image.jpg', // Example product image URL
  name: 'Sample Product',
  price: 299.99,
  allergyInfo: 'Contains nuts and dairy.',
});

onMounted(async () => {

})
</script>



<template>
  <div class="max-w-4xl mx-auto p-4 flex flex-col items-center gap-8">
    <div class="w-full max-w-md">
      <img :src="product.image" alt="Product Image" class="w-full h-auto rounded-lg shadow-lg" />
    </div>
    <div class="text-center w-full max-w-md">
      <h1 class="text-2xl font-bold text-gray-800">{{ product.name }}</h1>
      <p class="text-lg text-green-600 mt-2">${{ product.price.toFixed(2) }}</p>
      <p class="text-sm text-gray-600 mt-2">Allergy Information: {{ product.allergyInfo }}</p>
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
