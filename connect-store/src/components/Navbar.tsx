import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-black p-4 flex justify-between items-center border-b border-gray-800">
      <div className="flex space-x-6">
        <span className="text-cyan-400 font-bold text-xl">CONNECT</span>
        {['Store', 'Gallery', 'Contest', 'Community', 'Everywear', 'Apps'].map((item) => (
          <a key={item} href="#" className="text-white hover:text-gray-300">
            {item}
          </a>
        ))}
      </div>
      <div className="flex space-x-4 items-center">
        <a href="#" className="text-white hover:text-gray-300">SIGN IN</a>
        <button className="bg-white text-black px-4 py-2 rounded">SIGN UP</button>
        <div className="w-px h-6 bg-gray-600 mx-2"></div>
        <button className="text-white">⋮</button>
      </div>
    </nav>
  );
};

export default Navbar;