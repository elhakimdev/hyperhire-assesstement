/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-empty-interface */
'use client';

import { forwardRef, useEffect, useState } from 'react';

import Header from '../components/header';
import { MenuItem } from '../models/menu.model';
import { MenuSelect } from '../components/select';
import Sidebar from '../components/sidebar';
import Tree from '../components/tree';

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

  return (
    <div className="w-full h-full flex flex-row p-[24px]">
      <Sidebar />
      <div id="main-content" className='flex flex-col'>
        <Header />
        <div id="tree-wrapper" className='flex flex-col px-[48px]'>
          <div className='pt-[12px] pb-[28px]'>            
            <MenuSelect 
              onChange={handleChangeMenu}
              options={options}
              value={selectedMenu}
              placeholder='Select menu to manage'
            />
          </div>
          <div id="tree-container" className='h-full relative pt-[28px]'>
            <Tree node={(allMenus.find(({name}) => name.toLowerCase() === selectedMenu.toLowerCase()) as MenuItem)  ?? allMenus[0]}/>
          </div> 
        </div>
      </div>
    </div>
  );
});

MenuPage.displayName = 'MenuPage';
export default MenuPage;
