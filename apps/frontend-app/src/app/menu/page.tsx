/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-empty-interface */
'use client';

import { forwardRef, useCallback, useEffect, useState } from 'react';

import AddMenuForm from './add-menu-form';
import Header from '../components/header';
import { MenuItem } from '../models/menu.model';
import { MenuSelect } from '../components/select';
import Sidebar from '../components/sidebar';
import TreeContainer from '../components/tree-container';

export interface MenuPageProps {}
export interface MenuPageRef {}

const MenuPage = forwardRef<MenuPageRef, MenuPageProps>((props, ref) => {
  const [allMenus, setAllMenus] = useState<MenuItem[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<string>("");
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedNode, setSelectedNode] = useState<MenuItem | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  // Fetch all menus
  const fetchAllMenuTrees = useCallback(async () => {
    try {
      const response = await fetch("/api/menus");
      const menus: MenuItem[] = await response.json();
      setAllMenus(menus);
      setOptions(menus.map(menu => ({ label: menu.name, value: menu.name })));
    } catch (error) {
      console.error("Error fetching menus:", error);
    }
  }, []);

  useEffect(() => {
    fetchAllMenuTrees();
  }, [fetchAllMenuTrees]);

  const getSelectedNode = () => {
    return allMenus.find(({ name }) => name.toLowerCase() === selectedMenu.toLowerCase()) ?? allMenus[0];
  };

  useEffect(() => {
    const collectIds = (node: MenuItem | undefined, ids: Set<string>) => {
      if (!node) return;
      ids.add(node.id);
      node.children?.forEach(child => collectIds(child, ids));
    };
    const allNodes = new Set<string>();
    collectIds(getSelectedNode(), allNodes);
    setExpandedNodes(allNodes);
  }, [allMenus, selectedMenu]);

  const toggleNode = (id: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const expandAll = () => {
    const collectIds = (node: MenuItem | undefined, ids: Set<string>) => {
      if (!node) return;
      ids.add(node.id);
      node.children?.forEach(child => collectIds(child, ids));
    };
    const allNodes = new Set<string>();
    collectIds(getSelectedNode(), allNodes);
    setExpandedNodes(allNodes);
  };

  const collapseAll = () => setExpandedNodes(new Set());

  const handleChangeMenu = (value: string) => {
    setSelectedMenu(value);
    setSelectedNode(null);
  };

  const handleOnSubmissionSuccess = async (data: MenuItem) => {
    await fetchAllMenuTrees();
  };

  return (
    <div className="w-full h-full flex flex-row p-[24px]">
      <Sidebar />
      <div id="main-content" className='flex flex-col w-1/2'>
        <Header />
        <div id="tree-wrapper" className='flex flex-col px-[48px] h-full w-full overflow-hidden'>
          <div className='pt-[12px] pb-[28px]'>
            <MenuSelect 
              onChange={handleChangeMenu}
              options={options}
              value={selectedMenu}
              placeholder='Select menu to manage'
            />
          </div>
          <div className="mb-4 flex gap-2">
            <button onClick={expandAll} className="px-[32px] py-[12px] rounded-[48px] bg-[#1D2939] text-white">Expand All</button>
            <button onClick={collapseAll} className="px-[32px] py-[12px] border-2 rounded-[48px] border-[#D0D5DD] text-[#475467]">Collapse All</button>
          </div>
          <div id="tree-container" className='h-full relative overflow-y-auto pt-[28px]'>
            <TreeContainer 
              node={getSelectedNode()} 
              expandedNodes={expandedNodes} 
              onToggleNode={toggleNode}
              onCLickAddNode={(e, node) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedNode(node);
              }}
            />
          </div>
        </div>
      </div>
      <div className='flex-1 flex items-center justify-center'>
        <AddMenuForm 
          node={getSelectedNode()}
          parent={selectedNode}
          onErrors={(e) => console.log(e)}
          onLoading={(loading) => console.log(loading)}
          onSuccess={handleOnSubmissionSuccess}
        />
      </div>
    </div>
  );
});

MenuPage.displayName = 'MenuPage';
export default MenuPage;
