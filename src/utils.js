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

export const shareToKakaotalk = (groupId) => {
  const key = import.meta.env.VITE_KAKAO_JS_KEY;
  if (window.Kakao) {
    const kakao = window.Kakao;

    if (!kakao.isInitialized()) {
      kakao.init(key);
    }

    kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "PrayU",
        description: "PrayU와 함께 기도해요!",
        imageUrl: "이미지 주소",
        link: {
          mobileWebUrl: `${import.meta.env.VITE_BASE_URL}/group/${groupId}`,
          webUrl: `${import.meta.env.VITE_BASE_URL}/group/${groupId}`,
        },
      },
    });
  }
};
