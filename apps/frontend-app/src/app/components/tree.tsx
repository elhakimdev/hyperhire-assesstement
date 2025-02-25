import { MenuItem } from "../models/menu.model";

const Tree = ({ node }: { node: MenuItem | null }) => {
  if (!node) return null;

  return (
    <ul className="pl-[20px] relative">
      {/* Root Node */}
      <li className="relative">
        <div className="h-10 flex items-center group hover:cursor-pointer flex-row">
          {/* Icon */}
          <div className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            {node.name}
          </div>
          <div className='hidden group-hover:flex ml-3 items-center justify-center rounded-full bg-[#253BFF] w-[26px] h-[26px] transition-all ease-in-out duration-300'>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 2.91667V11.0833M2.91666 7H11.0833" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Children */}
        {Array.isArray(node.children) && node.children.length > 0 && (
          <ul className="pl-[20px] relative">
            {node.children.map((child, index) => (
              <li key={child.id} className="relative">
                {/* Vertical line that stops at the last child */}
                <div
                  className={`absolute left-[0px] top-0 border-l-[1.5px] border-gray-500 ${index === (node.children?.length ?? 0) - 1 ? "h-[20px]" : "h-full"}`}
                ></div>
                
                {/* Horizontal line that stops at the last child */}
                <div
                  className={`absolute left-[0px] -top-[20px] h-10 border-b-[1.5px] border-gray-500 w-[20px]`}
                ></div>

                {/* Render child node */}
                <Tree node={child} />
              </li>
            ))}
          </ul>
        )}
      </li>
    </ul>
  );
};

export default Tree;