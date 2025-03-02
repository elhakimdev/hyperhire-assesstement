import { MenuItem } from "../models/menu.model";

export interface TreeProps extends React.ComponentProps<"ul"> {
  node: MenuItem | null, 
  expandedNodes: Set<string>, 
  onToggleNode: (id: string) => void,
  onCLickAddNode: (e: React.MouseEvent<HTMLDivElement>, node: MenuItem) => void
}

const Tree = ({ node, expandedNodes, onToggleNode, onCLickAddNode,  ...props }: TreeProps ) => {
  if (!node) return null;
  const isExpanded = expandedNodes.has(node.id);

  return (
    <ul {...props} className="pl-[10px] md:pl-[20px] relative">
      {/* Root Node */}
      <li className="relative">
        <div className="h-10 flex items-center group hover:cursor-pointer flex-row" onClick={() => onToggleNode(node.id)}>
          {/* Icon */}
          <div className="p-2">
            { node.children && node.children.length > 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`size-5 transition-transform ease-in-out duration-300 ${isExpanded ? "rotate-0" : "-rotate-90"}`}
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            ) }
          </div>
          <div>
            {node.name}
          </div>
          <div className='hidden group-hover:flex ml-3 hover:shadow-inner items-center justify-center rounded-full bg-[#253BFF] w-[26px] h-[26px] transition-all ease-in-out duration-300' onClick={(e) => onCLickAddNode(e, node)}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 2.91667V11.0833M2.91666 7H11.0833" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Children */}
        {isExpanded && Array.isArray(node.children) && node.children.length > 0 && (
          <ul className="pl-[10px] md:pl-[20px] relative">
            {node.children.map((child, index) => (
              <li key={child.id} className="relative">
                {/* Vertical line that stops at the last child */}
                <div
                  className={`absolute left-[8px] md:left-[0px] top-0 border-l-[1.5px] border-gray-500 ${index === (node.children?.length ?? 0) - 1 ? "h-[20px]" : "h-full"}`}
                />
                
                {/* Horizontal line that stops at the last child */}
                <div
                  className={`absolute left-[8px] md:left-[0px] -top-[20px] h-10 border-b-[1.5px] border-gray-500 w-[10px] md:w-[20px]`}
                />

                {/* Render child node */}
                <Tree 
                  node={child} 
                  expandedNodes={expandedNodes} 
                  onToggleNode={onToggleNode}
                  onCLickAddNode={onCLickAddNode}
                />
              </li>
            ))}
          </ul>
        )}
      </li>
    </ul>
  );
};

export default Tree;