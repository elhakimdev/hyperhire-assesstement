/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-empty-interface */
'use client';

import { forwardRef, useEffect, useState } from 'react';

import Header from '../components/header';
import { MenuItem } from '../models/menu.model';
import { MenuSelect } from '../components/select';
import Sidebar from '../components/sidebar';
import Tree from '../components/tree';
import TreeContainer from '../components/tree-container';

export interface MenuPageProps {}

export interface MenuPageRef {}
const MenuPage = forwardRef<MenuPageRef, MenuPageProps>(({ ...props }, ref) => {
  const [allMenus, setAllMenus] = useState<MenuItem[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<string>("");
  const [options, setOptions] = useState<{ label: string, value: string }[]>([])
  const fetchAllMenuTrees = async () => {
    try {
      const fetchAllMenuTrees = await fetch("/api/menus");
      const menus: MenuItem[] = await fetchAllMenuTrees.json();
      setAllMenus(menus);
      menus.forEach((menu) => setOptions((value) => ([...value, { 
        label: menu.name,
        value: menu.name
      }])))
    } catch (error) {
      console.error(error);
    }
  }

  const handleChangeMenu = (value: string) => {
    setSelectedMenu(value);
  }

  useEffect(() => {
    fetchAllMenuTrees();
  }, []);


  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  useEffect(() => {
    const collectIds = (node: MenuItem, ids: Set<string>) => {
      ids.add(node?.id);
      node?.children?.forEach((child) => collectIds(child, ids));
    };
    const allNodes = new Set<string>();
    collectIds((allMenus.find(({name}) => name.toLowerCase() === selectedMenu.toLowerCase()) as MenuItem)  ?? allMenus[0], allNodes);
    setExpandedNodes(allNodes);
  }, [allMenus, selectedMenu]);

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    const collectIds = (node: MenuItem, ids: Set<string>) => {
      ids.add(node.id);
      node?.children?.forEach((child) => collectIds(child, ids));
    };
    const allNodes = new Set<string>();
    collectIds((allMenus.find(({name}) => name.toLowerCase() === selectedMenu.toLowerCase()) as MenuItem)  ?? allMenus[0], allNodes);
    setExpandedNodes(allNodes);
  };

  const collapseAll = () => setExpandedNodes(new Set());

  return (
    <div className="w-full h-full flex flex-row p-[24px]">
      <Sidebar />
      <div id="main-content" className='flex flex-col'>
        <Header />
        <div id="tree-wrapper" className='flex flex-col px-[48px] h-full w-full overflow-hidden'>
          <div className='pt-[12px] pb-[28px] w-[1/2]'>            
            <MenuSelect 
              onChange={handleChangeMenu}
              options={options}
              value={selectedMenu}
              placeholder='Select menu to manage'
            />
          </div>
          <div className="mb-4 flex gap-2 w-[1/2]">
            <button onClick={expandAll} className="px-[32px] py-[12px] rounded-[48px] bg-[#1D2939] text-white">Expand All</button>
            <button onClick={collapseAll} className="px-[32px] py-[12px] border-2 rounded-[48px] border-[#D0D5DD] text-[#475467]">Collapse All</button>
          </div>
          <div id="tree-container" className='h-full relative overflow-y-auto pt-[28px] w-[1/2]'>
            <TreeContainer 
              node={(allMenus.find(({name}) => name.toLowerCase() === selectedMenu.toLowerCase()) as MenuItem)  ?? allMenus[0]} 
              expandedNodes={expandedNodes} 
              onToggleNode={toggleNode}
              onCLickAddNode={(e, node) => {
                e.preventDefault();
                e.stopPropagation();
                // console.log(e, node)
                console.log({
                  id: node.id
                })
              }}
              />
          </div> 
        </div>
      </div>
    </div>
  );
});

MenuPage.displayName = 'MenuPage';
export default MenuPage;
