import { ref } from "vue";
import { fetchAllergyInfo } from "../../api/productAPI/productCameraAllegyAPI.ts";
import { compareUserAllergies } from "../../api/UserAPI/userAllergyAPI.ts";

export function useAllergyWarning(uno: number) {
    const allergyInfo = ref<Record<string, string>>({});
    const imageWarnings = ref<Record<string, string>>({});
    const isAllergyModalVisible = ref(false);
    const currentAllergyInfo = ref<string>("");
    const currentWarning = ref<string>("");
    const pnoInfo = ref<Record<string, string>>({});
    const imageNames = ref<Record<string, string>>({});

    const loadAllergyInfo = async (filename: string) => {
        if (allergyInfo.value[filename]) return;
        try {
            const { allergyTitles, pno, ptitle_ko } = await fetchAllergyInfo(filename);
            allergyInfo.value[filename] = allergyTitles.join(", ");
            pnoInfo.value[filename] = pno;
            imageNames.value[filename] = ptitle_ko;
            await checkAllergyWarnings(filename);
        } catch (error) {
            console.error(`알러지 정보 로드 실패: ${filename}`, error);
        }
    };

    const showAllergyModal = (filename: string) => {
        currentAllergyInfo.value = allergyInfo.value[filename] || "알러지 정보 없음";
        currentWarning.value = imageWarnings.value[filename] || "";
        isAllergyModalVisible.value = true;
    };

    const checkAllergyWarnings = async (filename: string) => {
        try {
            const { allergyTitles } = await fetchAllergyInfo(filename);
            const matchingAllergies = await compareUserAllergies(uno, allergyTitles);

            if (matchingAllergies.length > 0) {
                imageWarnings.value[filename] = `경고: ${matchingAllergies.join(", ")} 알러지 성분이 포함되어 있습니다.`;
            }
        } catch (error) {
            console.error("알러지 비교 실패", error);
        }
    };

    return {
        allergyInfo,
        imageWarnings,
        isAllergyModalVisible,
        currentAllergyInfo,
        currentWarning,
        loadAllergyInfo,
        checkAllergyWarnings,
        showAllergyModal,
        pnoInfo,
        imageNames,
    };
}
