
let res = []
tree(node, 0)
function tree(node, n = 0) {

	let val = node.val,
		left = node.left,
		right = node.right;

	if (val) {
		if (!res[n]) res[n] = []
		res[n].push(val)
	}

	if (left) tree(left, n+1)
	if (right) tree(right, n+1)
}
return res
印明
https://leetcode.cn/problems/binary-tree-level-order-traversal/