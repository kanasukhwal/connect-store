import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../redux/contentSlice';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state: any) => state.content);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <div className="mb-6 w-full">
      <div className="flex items-center w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          className="p-3 rounded-full bg-gray-800 text-white w-full placeholder-gray-400"
          placeholder="Find the items you're looking for"
        />
      </div>
    </div>
  );
};

export default SearchBar;