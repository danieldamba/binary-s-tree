import { Tree } from './binaryST.js';


function arrayPrime() {
  let arr = [];
  let length = Math.floor(Math.random() * 20) + 1;
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
}

let randomArray = arrayPrime();
console.log('Random array:', randomArray);

const tree = new Tree(randomArray);

// console.log('In-order traversal:');
// tree.inOrderForEach((data) => {
//   console.log(data);
// });

// console.log('Pre-order traversal:');
// tree.preOrderForEach((data) => {
//   console.log(data);
// });

// console.log('Post-order traversal:');
// tree.postOrderForEach((data) => {
//   console.log(data);
// });

// console.log('Breadth-first traversal:');
// tree.levelOrderForEach((data) => {
//   console.log(data);
// });

// console.log('Height of the tree:', tree.height(tree.root));
// console.log('Depth of the tree:', tree.depth(tree.root));
// console.log('Is the tree balanced?', tree.isBalanced());
// console.log('Rebalancing the tree...');
// tree.rebalance();

// console.log('In-order traversal after rebalancing:');
// tree.inOrderForEach((data) => {
//   console.log(data);
// });

// console.log('Pre-order traversal after rebalancing:');
// tree.preOrderForEach((data) => {
//   console.log(data);
// });

// console.log('Post-order traversal after rebalancing:');
// tree.postOrderForEach((data) => {
//   console.log(data);
// });

// console.log('Breadth-first traversal after rebalancing:');
// tree.levelOrderForEach((data) => {
//   console.log(data);
// });

// console.log('Height of the tree after rebalancing:', tree.height(tree.root));
// console.log('Depth of the tree after rebalancing:', tree.depth(tree.root));
// console.log('Is the tree balanced after rebalancing?', tree.isBalanced());

// Pretty print the tree structure
console.log('Tree structure:');
tree.prettyPrint(tree.root);