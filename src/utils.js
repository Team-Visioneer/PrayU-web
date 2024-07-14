export const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

export const formatDateString = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

export const shareToKakaotalk = () => {
  const key = import.meta.env.VITE_KAKAO_KEY;
  // kakao sdk script 를 window.Kakao로 접근
  if (window.Kakao) {
    const kakao = window.Kakao;

    // 중복 initialization 방지
    // 카카오에서 제공하는 javascript key를 이용하여 initialize
    if (!kakao.isInitialized()) {
      kakao.init("8cec546a8802b8b706beb1ffb28b0c8a");
    }

    kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "PrayU",
        description: "PrayU와 함께 기도해요!",
        imageUrl: "이미지 주소", // 온보딩 이미지 삽입
        link: {
          mobileWebUrl: import.meta.env.VITE_BASE_URL,
          webUrl: import.meta.env.VITE_BASE_URL,
        },
      },
    });
  }
};
