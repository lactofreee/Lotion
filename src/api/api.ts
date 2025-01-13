import { axiosInstance } from './axiosInstance';

export interface TrashDocument {
 id: number;
 title: string;
 sub_docs: string[];
}

export const fetchTrashList = async (): Promise<TrashDocument[]> => {
 try {
   const { data: documents } = await axiosInstance.get('/document');
   return documents
     .filter((doc: Document) => !doc.is_activate)
     .map((doc: Document) => ({
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
   const { data } = await axiosInstance.put(`/document/del/${uid}`, {
      is_activate: false,
   });
   return data;
 } catch (error) {
   console.error("document 삭제 실패:", error);
   throw error;
 }
};

export const fetchDocument = async (uid: string): Promise<Document> => {
 try {
   const { data } = await axiosInstance.get(`/document/${uid}`);
   return data;
 } catch (error) {
   console.error("문서 불러오기 실패:", error);
   throw error;
 }
};