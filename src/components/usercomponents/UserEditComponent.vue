<script setup lang="ts">
  import {onMounted, ref} from "vue";
  import {IReadUser} from "../../types/userTypes.ts";
  import {editUser, readUser} from "../../api/UserAPI/userAPI.ts";
  import CommonCheckModalComponent from "../../common/components/CommonCheckModalComponent.vue";
  import {IUserAllergy} from "../../types/userRegisterTypes.ts";
  import {getAllergyListKo} from "../../api/AllergyAPI/allergyAPI.ts";
  import useUserStore from "../../stores/useUserStore.ts";
  import {editUserAllergies} from "../../api/UserAPI/userAllergyAPI.ts";
  import { localeAllergy } from "../../locales/localeAllergy.ts";
  import {useI18n} from "vue-i18n";

  const { t } = useI18n();
  const { localeAtitle } = localeAllergy()

  const init: IReadUser = {
    username: '',
    ubirth: '',
    ucallnumber: '',
    ugender: ''
  }

  const user = ref<IReadUser>(init);
  const isCheckModalOpen = ref<boolean>(false)
  const allergyList = ref<IUserAllergy[]>([]);
  const selectedAnos = ref<number[]>([]);
  const isAllergyOpen = ref<boolean>(false);

  const userStore = useUserStore();



  // 알레르기 항목 선택/해제 토글 함수
  const toggleSelection = (ano: number) => {
    const index = selectedAnos.value.indexOf(ano)
    if (index > -1) {
      // 이미 선택된 항목이면 제거
      selectedAnos.value.splice(index, 1)
      console.log(`알레르기 항목 ${ano} 선택 해제됨`)
    } else {
      // 선택되지 않은 항목이면 추가
      selectedAnos.value.push(ano)
      console.log(`알레르기 항목 ${ano} 선택됨`)
    }
    // 현재 선택된 전체 알레르기 목록 출력
    console.log('현재 선택된 알레르기:', selectedAnos.value)
  }

  const handleClickEdit = () => {

    isCheckModalOpen.value = true
    userStore.setUserName(user.value.username);

  }

  const editFn = () => {

    editUserAllergies(selectedAnos.value);
    editUser(user.value);
  }

  onMounted(() => {

    readUser().then((data) => {

      user.value = data;
      console.log(user.value);

      const fullDate = user.value.ubirth;
      const formattedDate = ref(fullDate.split("T")[0]);
      user.value.ubirth = formattedDate.value;
    })

    getAllergyListKo().then((data) => {

      allergyList.value = data;

      selectedAnos.value = userStore.getPersonalAllergies;

      console.log(selectedAnos.value)
      console.log(allergyList.value);
    })
  })

</script>

<template>
  <CommonCheckModalComponent
      v-if="isCheckModalOpen"
      :msg="t('edit_user.confirm_message')"
      :is-open="isCheckModalOpen"
      :fn="editFn"
      @closeModal="isCheckModalOpen = false"
  />

  <div class="w-full max-w-md mx-auto p-4">
    <!-- Profile Image and Name -->
    <div class="flex flex-col items-center mb-6">
      <div class="w-24 h-24 bg-gray-200 rounded-full mb-2">
        <div class="w-full h-full flex items-center justify-center text-gray-400">
          <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
      <h2 class="text-xl font-medium text-gray-900">{{ user.username }}</h2>
    </div>

    <!-- Personal Info Section -->
    <div class="mb-6 space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('edit_user.name_label') }}</label>
        <input
            v-model="user.username"
            type="text"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            :placeholder="t('edit_user.name_placeholder')"
        >
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('edit_user.gender_label') }}</label>
        <select
            v-model="user.ugender"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="male">{{ t('edit_user.male') }}</option>
          <option value="female">{{ t('edit_user.female') }}</option>
          <option value="other">{{ t('edit_user.etc') }}</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('edit_user.birth_label') }}</label>
        <input
            v-model="user.ubirth"
            type="date"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('edit_user.phone_label') }}</label>
        <input
            v-model="user.ucallnumber"
            type="tel"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            :placeholder="t('edit_user.phone_placeholder')"
        >
      </div>
    </div>

    <!-- Allergy Information Section -->
    <div class="mb-6">
      <div class="bg-white rounded-lg shadow-sm">
        <button
            class="w-full flex items-center p-4 hover:bg-gray-50"
            @click="isAllergyOpen = !isAllergyOpen"
        >
          <div class="flex items-center flex-1">
            <div class="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full mr-3">
              <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 class="text-base font-medium text-gray-900">알레르기 변경</h3>
              <p class="text-sm text-gray-500">본인의 알레르기 정보를 변경해주세요.</p>
            </div>
          </div>
          <svg
              class="w-5 h-5 text-gray-400 transform transition-transform duration-200"
              :class="{ 'rotate-90': isAllergyOpen }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div v-if="isAllergyOpen" class="p-4 border-t">
          <div class="grid grid-cols-2 gap-3">
            <button
                v-for="item in allergyList"
                :key="item.ano"
                @click="toggleSelection(item.ano)"
                class="p-3 rounded-lg text-sm font-medium transition-colors duration-200"
                :class="selectedAnos.includes(item.ano)
                ? 'bg-gradient-to-r from-[#F9BB00] to-[#FFD666] text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'"
            >
              {{ localeAtitle(item) }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <button
        @click="handleClickEdit"
        class="w-full py-3 bg-[#F9BB00] text-white font-medium rounded-lg hover:bg-[#E5AB00] transition-colors"

    >
      {{ t('edit_user.save_button') }}
    </button>
  </div>
</template>


