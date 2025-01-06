export const BASE_URL = "http://localhost:80";

export interface TrashDocument {
  id: number;
  title: string;
  sub_docs: string[];
}

export const fetchTrashList = async (): Promise<TrashDocument[]> => {
  try {
    const response = await fetch(`${BASE_URL}/document`);
    if (!response.ok) throw new Error(`HTTP 에러: ${response.status}`);
    const documents: Document[] = await response.json();

    return documents
      .filter((doc) => !doc.is_activate)
      .map((doc) => ({
        id: doc.uid,
        title: doc.title,
        sub_docs: [], // 경로 정보는 일단 빈 배열로
      }));
  } catch (error) {
    console.error("휴지통 리스트 불러오기 에러", error);
    throw error;
  }
};

export const deleteDocument = async (uid: number): Promise<any> => {
  try {
    const response = await fetch(`/src/api/trashList.json`);
    if (!response.ok) {
      throw new Error(`HTTP 에러: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("document 삭제 실패:", error);
    throw error;
  }
};

export const fetchDocument = async (uid: string): Promise<Document> => {
  try {
    const response = await fetch(`${BASE_URL}/document/${uid}`);
    if (!response.ok) {
      throw new Error(`HTTP 에러: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("문서 불러오기 실패:", error);
    throw error;
  }
};
