import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ContentFilter from './components/ContentFilter';
import ContentList from './components/ContentList';
import SearchBar from './components/SearchBar';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="bg-black text-white min-h-screen w-screen flex flex-col">
        <Navbar />
        <header className="text-center py-10">
          <h2 className="text-4xl font-bold">Share your ideas.</h2>
          <h2 className="text-4xl font-bold">Empower your design.</h2>
        </header>
        <div className="flex justify-center mb-6">
          <div className="flex space-x-4">
            {['All', 'Garment', 'Fabric', 'Trim', 'Avatar', 'Scene'].map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full ${category === 'All' ? 'bg-gray-700' : 'bg-transparent border'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="px-4">
          <SearchBar />
          <ContentFilter />
          <ContentList />
        </div>
      </div>
    </Provider>
  );
};

export default App;