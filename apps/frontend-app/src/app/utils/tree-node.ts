/* eslint-disable @typescript-eslint/no-non-null-assertion */
export class TreeNode<T> {
  value: T;
  children: TreeNode<T>[];

  constructor(value: T, children: T[] = []) {
    this.value = value;
    this.children = children.map((child) => new TreeNode(child));
  }

  /** Depth-First Search (DFS) to find a node */
  find(predicate: (value: T) => boolean): TreeNode<T> | null {
    if (predicate(this.value)) return this;
    for (const child of this.children) {
      const found = child.find(predicate);
      if (found) return found;
    }
    return null;
  }

  /** Breadth-First Search (BFS) */
  findBFS(predicate: (value: T) => boolean): TreeNode<T> | null {
    const queue: TreeNode<T>[] = [this];
    while (queue.length > 0) {
      const node = queue.shift()!;
      if (predicate(node.value)) return node;
      queue.push(...node.children);
    }
    return null;
  }

  /** Inserts a child node */
  insertChild(parentValue: T, childValue: T, callback?: (child: TreeNode<T>) => void): boolean {
    const parentNode = this.find((value) => value === parentValue);
    if (parentNode) {
      const newChild = new TreeNode(childValue);
      parentNode.children.push(newChild);
      callback?.(newChild); // Execute the callback if provided
      return true;
    }
    return false;
  }

  /** Removes a child node by value */
  removeChild(valueToRemove: T, callback?: (removedNode: TreeNode<T>) => void): boolean {
    const index = this.children.findIndex((child) => child.value === valueToRemove);
    if (index !== -1) {
      const [removedNode] = this.children.splice(index, 1);
      callback?.(removedNode); // Execute the callback if provided
      return true;
    }
    return false;
  }

  /** Traverses the tree in Preorder */
  traversePreorder(callback: (value: T) => void): void {
    callback(this.value);
    this.children.forEach((child) => child.traversePreorder(callback));
  }

  /** Traverses the tree in Postorder */
  traversePostorder(callback: (value: T) => void): void {
    this.children.forEach((child) => child.traversePostorder(callback));
    callback(this.value);
  }

  /** Traverses the tree in Level Order (BFS) */
  traverseLevelOrder(callback: (value: T) => void): void {
    const queue: TreeNode<T>[] = [this];
    while (queue.length > 0) {
      const node = queue.shift()!;
      callback(node.value);
      queue.push(...node.children);
    }
  }

  /** Calculates the depth (height) of the tree */
  getDepth(): number {
    if (this.children.length === 0) return 1;
    return 1 + Math.max(...this.children.map((child) => child.getDepth()));
  }

  /** Counts the total number of nodes */
  countNodes(): number {
    return (
      1 + this.children.reduce((sum, child) => sum + child.countNodes(), 0)
    );
  }

  /** Converts tree to a plain object */
  toJSON(): object {
    return {
      value: this.value,
      children: this.children.map((child) => child.toJSON()),
    };
  }
}
