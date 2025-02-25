import { forwardRef, useState } from 'react';

import { Accordion } from '@base-ui-components/react/accordion';
import FolderIcon from '../icons/folder.icon';

interface SideMenuItem {
  id: string;
  title: string;
  children?: SideMenuItem[];
}

export interface SideMenuTreeItemProps extends Accordion.Item.Props {
  item: SideMenuItem;
  isRoot?: boolean;
  activeItem?: string | null;
  onItemClick?: (id: string) => void;
}

const SideMenuTreeItem = forwardRef<HTMLDivElement, SideMenuTreeItemProps>(
  ({ item, isRoot, activeItem, onItemClick, ...accordionItemProps }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const isActive = activeItem === item.id;
    const hasChildren = !!item.children?.length;

    return (
      <Accordion.Item
        ref={ref}
        {...accordionItemProps}
        className={(state) => {
          const isOpened = state.open;
          return `rounded-[16px] overflow-hidden transition-all duration-300 ${
            isOpened && isRoot ? 'bg-[#1F2A3A]' : ''
          }`;
        }}
        onOpenChange={(open) => {
          setIsOpen(open);
        }}
      >
        <div className={isOpen && isRoot ? 'bg-[#1F2A3A] rounded-[16px]' : ''}>
          <Accordion.Header>
            {hasChildren ? (
              // If item has children, use Accordion.Trigger
              <Accordion.Trigger
                className={`flex flex-row w-full p-[16px] rounded-lg transition-all duration-300 ${
                  isActive ? 'bg-[#9FF443] text-black' : isOpen ? 'text-white' : 'text-[#667085]'
                }`}
                onClick={() => onItemClick?.(item.id)}
              >
                <div className="mr-4">
                  <FolderIcon active={isActive} open={isOpen} />
                </div>
                <div>{item.title}</div>
              </Accordion.Trigger>
            ) : (
              // If no children, use a normal button instead
              <button
                className={`flex flex-row w-full p-[16px] rounded-lg transition-all duration-300 ${
                  isActive ? 'bg-[#9FF443] text-black' : 'text-[#667085]'
                }`}
                onClick={() => onItemClick?.(item.id)}
              >
                <div className="mr-4">
                  <FolderIcon active={isActive} open={isOpen} />
                </div>
                <div>{item.title}</div>
              </button>
            )}
          </Accordion.Header>

          {hasChildren && (
            <Accordion.Panel
              className="p-2 overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                height: isOpen ? 'auto' : '0px',
                transform: isOpen ? 'scaleY(1)' : 'scaleY(0)',
                transformOrigin: 'top',
                opacity: isOpen ? 1 : 0,
              }}
            >
              {item?.children?.map((child) => (
                <SideMenuTreeItem key={child.id} item={child} activeItem={activeItem} onItemClick={onItemClick} />
              ))}
            </Accordion.Panel>
          )}
        </div>
      </Accordion.Item>
    );
  }
);

SideMenuTreeItem.displayName = 'SideMenuTreeItem';

export interface SideMenuTreeProps extends Accordion.Root.Props {
  menuData: SideMenuItem[];
}

const SideMenuTree = forwardRef<HTMLDivElement, SideMenuTreeProps>(({ menuData, ...accordionRootProps }, ref) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  return (
    <Accordion.Root ref={ref} {...accordionRootProps} className={"font-semibold flex flex-col gap-y-2"}>
      {menuData.map((item) => (
        <SideMenuTreeItem key={item.id} item={item} isRoot activeItem={activeItem} onItemClick={setActiveItem}/>
      ))}
    </Accordion.Root>
  );
});

SideMenuTree.displayName = 'SideMenuTree';
export default SideMenuTree;
