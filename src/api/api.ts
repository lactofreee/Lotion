// api.ts
export interface TrashDocument {
  id: number;
  title: string;
  sub_docs: string[];
}

export const fetchTrashList = async (): Promise<TrashDocument[]> => {
  try {
    const response = await fetch(`/src/api/trashList.json`);
    if (!response.ok) {
      throw new Error(`HTTP 에러: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('휴지통 리스트 불러오기 에러', error);
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
    console.error('document 삭제 실패:', error);
    throw error;
  }
};