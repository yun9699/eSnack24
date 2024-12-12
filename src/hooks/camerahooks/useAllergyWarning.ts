import { ref } from "vue";
import { fetchAllergyInfo } from "../../api/productAPI/productCameraAllegyAPI.ts";
import { compareUserAllergies } from "../../api/UserAPI/userAllergyAPI.ts";
import { localeProduct } from "../../locales/localeProduct.ts";
import { useI18n } from "vue-i18n";

export function useAllergyWarning(uno: number) {
    const { localePtitle } = localeProduct();


    const allergyInfo = ref<Record<string, string>>({});
    const imageWarnings = ref<Record<string, string[]>>({}); // string[]로 타입 명시
    const isAllergyModalVisible = ref(false);
    const currentAllergyInfo = ref<string>("");
    const currentWarning = ref<string[]>([]); // 초기값을 빈 배열로 설정

    const pnoInfo = ref<Record<string, number>>({});
    const imageNames = ref<Record<string, string>>({});

    const { locale } = useI18n();

    const loadAllergyInfo = async (filename: string) => {
        if (allergyInfo.value[filename]) return;

        try {
            const { allergyTitles, pno, product } = await fetchAllergyInfo(filename);

            const translatedAllergies = allergyTitles[locale.value] || allergyTitles.ko; // 언어별 데이터 선택
            allergyInfo.value[filename] = translatedAllergies.join(", ");
            pnoInfo.value[filename] = pno;
            imageNames.value[filename] = localePtitle(product);

            await checkAllergyWarnings(filename, allergyTitles);
        } catch (error) {
            console.error(`알러지 정보 로드 실패: ${filename}`, error);
        }
    };

    const showAllergyModal = (filename: string) => {
        currentAllergyInfo.value = allergyInfo.value[filename]
        currentWarning.value = imageWarnings.value[filename] || []; // 배열로 바로 설정
        isAllergyModalVisible.value = true;
    };

    const checkAllergyWarnings = async (
        filename: string,
        allergyTitles: Record<string, string[]>
    ) => {
        try {
            const language = locale.value; // 현재 언어
            const allergiesToCompare = allergyTitles[language] || allergyTitles.ko;

            if (!Array.isArray(allergiesToCompare) || allergiesToCompare.length === 0) {
                console.warn(`No allergies found for language: ${language}`);
                imageWarnings.value[filename] = []; // 경고 없음으로 빈 배열 저장
                return;
            }

            const matchingAllergies = await compareUserAllergies(uno, allergyTitles, language);
            imageWarnings.value[filename] = matchingAllergies || [];
        } catch (error) {
            console.error(`알러지 비교 실패: ${filename}`, error);
            imageWarnings.value[filename] = []; // 비교 실패 시 빈 배열 저장
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
