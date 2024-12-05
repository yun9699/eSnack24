<script setup lang="ts">
  import {onMounted, ref} from "vue";
  import {IReadUser} from "../../types/userTypes.ts";
  import {editUser, readUser} from "../../api/UserAPI/userAPI.ts";
  import CommonCheckModalComponent from "../../common/components/CommonCheckModalComponent.vue";
  import {IUserAllergy} from "../../types/userRegisterTypes.ts";
  import {getAllergyListKo} from "../../api/AllergyAPI/allergyAPI.ts";
  import useUserStore from "../../stores/useUserStore.ts";
  import {editUserAllergies} from "../../api/UserAPI/userAllergyAPI.ts";

  const init = {
    username: '',
    ubirth: '',
    ucallnumber: '',
    ugender: ''
  }

  const user = ref<IReadUser>(init);
  const isCheckModalOpen = ref<boolean>(false)
  const allergyList = ref<IUserAllergy[]>([]);
  const selectedAnos = ref<number[]>([]);

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
  }

  const editFn = () => {

    editUserAllergies(selectedAnos.value);
    editUser(user.value);
  }

  onMounted(() => {

    readUser().then((data) => {

      user.value = data;

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
      msg="등록"
      :is-open="isCheckModalOpen"
      :fn="editFn"
      @closeModal="isCheckModalOpen = false"
  />

  <div class="flex flex-col items-center min-h-screen bg-gray-100 py-8 px-4">
    <!-- 사용자 정보 수정 카드 -->
    <div class="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 mb-6">
      <!-- 타이틀 -->
      <h1 class="text-3xl font-semibold text-gray-800 text-center mb-8">
        사용자 정보 수정
      </h1>

      <!-- 이름 입력 -->
      <div class="mb-6">
        <label for="name" class="block text-sm font-medium text-gray-600 mb-2">
          이름
        </label>
        <input
            id="name"
            v-model="user.username"
            type="text"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="이름을 입력하세요"
        />
      </div>

      <!-- 성별 선택 -->
      <div class="mb-6">
        <label for="gender" class="block text-sm font-medium text-gray-600 mb-2">
          성별
        </label>
        <select
            id="gender"
            v-model="user.ugender"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        >
          <option value="male">남성</option>
          <option value="female">여성</option>
          <option value="other">기타</option>
        </select>
      </div>

      <!-- 생일 입력 -->
      <div class="mb-6">
        <label for="birthDate" class="block text-sm font-medium text-gray-600 mb-2">
          생일
        </label>
        <input
            id="birthDate"
            v-model="user.ubirth"
            type="date"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        />
      </div>

      <!-- 전화번호 입력 -->
      <div class="mb-6">
        <label for="phone" class="block text-sm font-medium text-gray-600 mb-2">
          전화번호
        </label>
        <input
            id="phone"
            v-model="user.ucallnumber"
            type="tel"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="010-1234-5678"
        />
      </div>
    </div>

    <!-- 알레르기 정보 수정 카드 -->
    <div class="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 mb-6">
      <!-- 타이틀 -->
      <h2 class="text-2xl font-semibold text-gray-800 text-center mb-6">
        알레르기 정보 수정
      </h2>

      <!-- 알레르기 목록 그리드 -->
      <ul class="grid grid-cols-2 gap-4">
        <li v-for="item in allergyList" :key="item.ano" class="flex justify-center">
          <!-- 알레르기 선택 버튼 -->
          <button
              class="w-36 h-12 rounded-lg shadow-sm font-medium transition-colors duration-200"
              :class="{
            'bg-gradient-to-r from-red-400 to-pink-500 text-white': selectedAnos.includes(item.ano),
            'bg-gray-200 text-gray-700': !selectedAnos.includes(item.ano)
          }"
              @click="toggleSelection(item.ano)"
          >
            {{ item.atitle_ko }}
          </button>
        </li>
      </ul>
    </div>

    <!-- 저장 버튼 -->
    <button
        @click="handleClickEdit"
        class="w-full max-w-lg py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-200"
    >
      저장하기
    </button>
  </div>


</template>
