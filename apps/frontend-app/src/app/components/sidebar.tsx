import Link from "next/link"
import Logo from "./logo"
import SideMenuTree from "./sidebar-tree"
export interface SideMenuItem {
  id: string;
  title: string;
  children?: SideMenuItem[];
}

const Sidebar = () => {

  const menus: SideMenuItem[] = [
    {
      id: 'systems',
      title: 'Systems',
      children: [
        {
          id: 'system-code',
          title: 'System Code',
        },
        { id: 'properties', title: 'Properties' },
        { id: 'menus', title: 'Menus' },
        {
          id: 'api-list',
          title: 'Api List',
        }
      ]
    },
    {
      id: 'users-and-group',
      title: 'User & Group',
    },
    {
      id: 'competition',
      title: 'Competition',
    },
  ];
  
  return (
    <div
    id="sidebar"
    className="bg-[#101828] md:flex flex-col w-[240px] rounded-[24px] hidden"
  >
    <div
      id="sidebar-head"
      className="w-full h-[84px] flex flex-row justify-between px-[32px] py-[32px]"
    >
      <div id="sidebar-head-logo" className="">
        <Link href={'/'}>
          <Logo />
        </Link>
      </div>
      <div id="sidebar-head-indicator" className="">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 18V16H16V18H3ZM19.6 17L14.6 12L19.6 7L21 8.4L17.4 12L21 15.6L19.6 17ZM3 13V11H13V13H3ZM3 8V6H16V8H3Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
    <div
      id="sidebar-content"
      className="w-full flex flex-col px-4 gap-y-[10px]"
    >
      <SideMenuTree 
        menuData={menus} 
        openMultiple={true}
      />
    </div>
  </div>
  )
}

export default Sidebar