interface MenuItem {
  uid: string;
  parent_uid: string;
  child_uid: [];
  title: string;
  content: string;
}

interface TreeNode extends MenuItem {
  children: TreeNode[];
}