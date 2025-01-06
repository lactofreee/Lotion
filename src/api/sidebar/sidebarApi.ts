import { axiosInstance } from "../../api/axiosInstance";

export const getMenuList = async () => {
  try {
    const { data } = await axiosInstance.get(`/document`);
    return data;
  } catch (error) {
    alert("문서 목록을 불러오는데 실패했습니다. 다시 시도해주세요.");
    // 404 페이지로 이동
    console.error(error);
  }
};
