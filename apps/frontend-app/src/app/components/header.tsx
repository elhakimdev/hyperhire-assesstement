const Header = () => {
  return (
    <div className='flex flex-col items-start w-full'>
      <div id='breadcrumb' className='md:hidden h-[24px] py-[24px] md:h-[84px] md:py-[16px] px-[24px] md:px-[48px] flex flex-row items-center text-[#667085] gap-x-2'>
        <div id='breadcrumb-icon' className='text-[#667085]'>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 7H12.5M4 12H14.5M4 17H12.5" stroke="black" strokeLinecap="round" stroke-linejoin="round"/>
        <path d="M16.5 8.5L20 12L16.5 15.5" stroke="black" strokeLinecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
      </div>
      <div id='breadcrumb' className='h-[24px] py-[24px] md:h-[84px] md:py-[16px] px-[24px] md:px-[48px]  flex flex-row items-center text-[#667085] gap-x-2'>
        <div id='breadcrumb-icon' className='text-[#667085]'>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z" fill="#D0D5DD"/>
          </svg>
        </div>
        <div>
          /
        </div>
        <div className='text-black'>
          Menus
        </div>
      </div>
      <div id='header' className='hidden md:flex h-[84px] py-[16px] px-[48px] flex-row items-center text-[#667085] gap-x-2'>
        <div id='menu-icon' className='text-[#667085]'>
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="26" cy="26" r="26" fill="#253BFF"/>
            <rect x="17.6562" y="17.6699" width="6.69214" height="6.69336" rx="1" fill="white"/>
            <rect x="17.6562" y="27.6523" width="6.69214" height="6.69336" rx="1" fill="white"/>
            <rect x="27.6539" y="27.6523" width="6.69214" height="6.69336" rx="1" fill="white"/>
            <circle cx="30.9871" cy="21.041" r="3.69067" fill="white"/>
          </svg>
        </div>
        <h4 className='font-bold text-[32px] text-[#101828] ml-4'>
          Menus
        </h4>
      </div>
    </div>
  )
}

export default Header