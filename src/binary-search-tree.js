const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
module.exports = class BinarySearchTree {

  constructor() {
    this.firstNode = null;
  }
  root() {
    return this.firstNode;
  }

  add(data) {
    this.firstNode = addNode(this.firstNode, data);
    function addNode (node,data) {
      // Если нода не существует, то добавить новый нод с числом data
      if (!node) {
        return new Node(data)
      }
      // Если значения нода равно значению data, то просто вывести значение данного нода
      if (node.data === data) {
        return node.data
      }
      //Если значение data меньше значения текущего нода, то отправить значение data в лево и повторить функцию addNode
      //Если значение data больше значения текущего нода, то отправить значение data в право и повторить функцию addNode
      if (data < node.data) {
        node.left = addNode (node.left,data)
      } else {
        node.right = addNode (node.right,data)
      }
      return node
    }
  }

  has(data) {
    return searchNode (this.firstNode, data)

    function searchNode (node, data) {
      // Если нода не существует, то вернуть false
      if (!node) {
        return false
      }
      // Если значение нода равно значению date, то вернуть true
      if (node.data === data) {
        return true
      }
      // Если значение data меньше значения нода, то определить data в левую ветку и заново провести поиск
      // Если значение data больше значения нода, то определить data в правую ветку и заново провести поиск
      return data < node.data ?
      searchNode(node.left, data) :
      searchNode(node.right, data);
    }
  }

  find(data) {
    return findNode(this.firstNode, data);
    function findNode(node, data) {
      // Если нода не существует, то вернуть null (как сказанно в задаче/ условие)
      if (!node) {
        return null;
      }
      // Если значение нода равно значению date, то вернуть значение нода
      if (node.data == data) {
        return node;
      }
      // Если значение data меньше значения нода, то определить data в левую ветку и заново провести поиск
      // Если значение data больше значения нода, то определить data в правую ветку и заново провести поиск
      return data < node.data ?
      findNode(node.left, data) :
      findNode(node.right, data);
    }
  }

  remove(data) {
    
    this.firstNode = removeNode(this.firstNode, data)
    
    function removeNode (node, data) {
      if(!node) {
        return null
      }

      if (data < node.data) {
        node.left = removeNode (node.left, data)
        return node
      } else if (node.data < data) {
        node.right = removeNode (node.right, data)
        return node
      } else {

        if (!node.left && !node.right) {
          return null
        }
        if (!node.left) {
          node = node.right
          return node
        }
        if (!node.right) {
          node = node.left
          return node
        }

        let maxFromLeft = node.left
        while (maxFromLeft.right) {
          maxFromLeft = maxFromLeft.right
        }
        node.data = maxFromLeft.data

        node.left = removeNode (node.left, maxFromLeft.data)
        return node

      }
    }
  }

  min() {

    if (!this.firstNode) {
      return 
    }
    // Просто постоянно переходим на левые ветки пока они не закончатся
    let node = this.firstNode
    while (node.left) {
      node = node.left;
    }
    // Когда ветки закончились, то выводим текущее значение
    return node.data
  }

  max() {
    if (!this.firstNode) {
      return 
    }
    // Просто постоянно переходим на правые ветки пока они не закончатся
    let node = this.firstNode
    while (node.right) {
      node = node.right;
    }
    // Когда ветки закончились, то выводим текущее значение
    return node.data
  }

}