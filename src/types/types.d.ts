
interface Document {
  uid: number;
  parent_uid: string;
  child_uid: string[];
  title: string;
  content: string;
  created_at: string;
  modified_at: string;
  is_activate: boolean;
}