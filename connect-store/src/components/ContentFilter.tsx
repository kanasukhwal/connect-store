import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, resetFilters } from '../redux/contentSlice';

const ContentFilter: React.FC = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: any) => state.content);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    dispatch(setFilters({ ...filters, [name]: checked }));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="mb-4">
      <div className="flex items-center mb-2">
        <span className="mr-2">Contents Filter</span>
        <div className="flex space-x-4">
          {['Paid', 'Free', 'View Only'].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="checkbox"
                name={option.toLowerCase()}
                checked={filters[option.toLowerCase()] || false}
                onChange={handleFilterChange}
                className="mr-1"
              />
              {option}
            </label>
          ))}
        </div>
        <button onClick={handleReset} className="ml-4 text-green-500">RESET</button>
      </div>
    </div>
  );
};

export default ContentFilter;