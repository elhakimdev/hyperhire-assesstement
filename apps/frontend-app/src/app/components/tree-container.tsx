'use client'

import * as React from "react";

import Tree, { TreeProps } from "./tree";

const TreeContainer = ({ node: rootNode, expandedNodes, onToggleNode, onCLickAddNode }: TreeProps ) => {
  return (
    <div className="ml-[-24px] md:ml-0">
      <Tree node={rootNode} expandedNodes={expandedNodes} onToggleNode={onToggleNode} onCLickAddNode={onCLickAddNode}/>
    </div>
  );
};

export default TreeContainer;