export const buildMenuTree = (data: MenuItem[]): TreeNode[] => {
  const nodes: Record<string, TreeNode> = {};
  const tree: TreeNode[] = [];

  data.forEach((item) => {
    nodes[item.uid] = { ...item, children: [] };
  });

  data.forEach((item) => {
    if (item.parent_uid === "root") {
      tree.push(nodes[item.uid]);
    } else if (nodes[item.parent_uid]) {
      nodes[item.parent_uid].children.push(nodes[item.uid]);
    }
  });

  return tree;
};