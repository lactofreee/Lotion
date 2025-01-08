import { axiosInstance } from "../axiosInstance";

export const postNewDoc = async (
  parentUid: String,
  title: String,
  contents: String
) => {
  try {
    const { data } = await axiosInstance.post(
      `/document`,
      {
        parent_uid: parentUid,
        title,
        contents,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      }
    );
    console.log(data);
  } catch (error) {
    alert("새로운 문서를 생성하는데 실패했습니다.");
    console.error(error);
  }
};
