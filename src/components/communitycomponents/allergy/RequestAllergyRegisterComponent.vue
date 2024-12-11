<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {registerRequestAllergy} from "../../../api/commnunityAPI/requestAllergyAPI.ts";
import {IRequestAllergy} from "../../../types/commnunityTypes.ts";
import {useI18n} from "vue-i18n";

const { t } = useI18n();
const catitle = ref("");
const caallergy = ref("");
const submitting = ref(false);
const router = useRouter();
const route = useRoute();


const submitRequestAllergy = async () => {
  if (!catitle.value.trim() || !caallergy.value.trim()) {
    return;
  }

  const newAllergy: IRequestAllergy = {
    catitle: catitle.value.trim(),
    caallergy: caallergy.value.trim()
  };

  try {
    submitting.value = true;
    await registerRequestAllergy(newAllergy);

    // 폼 초기화
    catitle.value = "";
    caallergy.value = "";

    await router.push(`/request/allergy/list`);
  } catch (error) {
    console.log(error.message);
  } finally {
    submitting.value = false;
  }
};

onMounted(() => {
  submitRequestAllergy();
});
</script>


<template>
  <div class="p-4 border rounded-lg">
    <div class="flex items-center mb-4">
      <h2 class="text-lg font-semibold">{{ t('allergyReport.allergyReportHeader') }}</h2>
    </div>

    <div class="mb-4">
      <textarea
          v-model="catitle"
          rows="4"
          class="w-full p-2 border rounded-lg"
          :placeholder="t('allergyReport.placeholders.allergyReportTitle')"
      ></textarea>
    </div>

    <div class="mb-4">
      <textarea
          v-model="caallergy"
          rows="4"
          class="w-full p-2 border rounded-lg"
          :placeholder="t('allergyReport.placeholders.allergyReportContent')"
      ></textarea>
    </div>

    <button
        :disabled="submitting"
        @click="submitRequestAllergy"
        class="w-full py-2 bg-gradient-to-r from-red-400 to-red-300 text-white rounded-lg hover:bg-gray-300 disabled:opacity-50"
    >
      {{ submitting ? t('allergyReport.buttons.submitAllergyReport.loading') : t('allergyReport.buttons.submitAllergyReport.default') }}
    </button>
  </div>
</template>
