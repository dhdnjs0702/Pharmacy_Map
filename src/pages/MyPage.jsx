import React, { useState } from 'react';

const MyPage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const [activeMenu, setActiveMenu] = useState('마이페이지');

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleMenu = (menu) => {
    setActiveMenu(menu); 
    setDropdownOpen(false); 
  };

  return (
    <div>
      <header className="bg-green-500 p-4">
        <div className="flex justify-end">
            <button 
              className="bg-white p-2 rounded w-40" 
              onClick={toggleDropdown}
            >
              {activeMenu} 
            </button>
            {dropdownOpen && ( 
              <div className="absolute bg-white shadow-md mt-1 rounded">
                <button 
                  className="block p-2 hover:bg-gray-200 w-40" 
                  onClick={() => handleMenu('마이페이지')}
                >
                  마이페이지
                </button>
                <button 
                  className="block p-2 hover:bg-gray-200 w-40" 
                  onClick={() => handleMenu('리뷰')} 
                >
                  리뷰
                </button>
                <button 
                  className="block p-2 hover:bg-gray-200 w-40" 
                  onClick={() => handleMenu('북마크')} 
                >
                  북마크
                </button>
              </div>
            )}
        </div>
      </header>
      <div>
        {activeMenu === '마이페이지' && (
          <div>
            마이페이지
          </div>
        )}
        {activeMenu === '리뷰' && (
          <div>
            리뷰
          </div>
        )}
        {activeMenu === '북마크' && (
          <div>
            북마크
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;