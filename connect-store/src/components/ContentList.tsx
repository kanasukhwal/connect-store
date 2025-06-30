import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchContents, setPage } from '../redux/contentSlice';
import SkeletonLoader from './SkeletonLoader';

const ContentList: React.FC = () => {
  const dispatch = useDispatch();
  const { contents, filters, searchTerm, page, hasMore, status } = useSelector((state: any) => state.content);

  useEffect(() => {
    dispatch(fetchContents({ page, filters, searchTerm }));
  }, [dispatch, page, filters, searchTerm]);

  // Optional: Check for duplicate IDs in console
  useEffect(() => {
    const seen = new Set();
    contents.forEach((item: any) => {
      if (seen.has(item.id)) {
        console.warn('Duplicate ID found:', item.id);
      }
      seen.add(item.id);
    });
  }, [contents]);

  const loadMore = () => {
    dispatch(setPage(page + 1));
  };

  const filteredContents = contents.filter((item: any) => {
    const userName = item?.userName || '';
    const title = item?.title || '';
    return (
      (filters.paid && item.price > 0) ||
      (filters.free && item.price === 0) ||
      (filters['view only'] && !item.price && item.price !== 0) ||
      (!filters.paid && !filters.free && !filters['view only']) &&
      (userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  if (status === 'loading' && page === 1) return <SkeletonLoader />;
  if (status === 'failed') return <div>Error loading contents.</div>;

  return (
    <div className="contents-list w-full" id="scrollableDiv">
      <InfiniteScroll
        dataLength={filteredContents.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<SkeletonLoader />}
        scrollableTarget="scrollableDiv"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full p-4">
          {filteredContents.length > 0 ? (
            filteredContents.map((item: any) => (
              <div
                key={`content-${item.id}-${item.userName}`}
                className="text-center bg-gray-800 p-2 rounded shadow"
              >
               <img
                  src={item.imagePath || 'https://via.placeholder.com/300x200?text=No+Image'}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />

                <p className="mt-2">{item.userName || 'Unknown User'}</p>
                <p>{item.title}</p>
                <p>
                  {item.price > 0 ? `$${item.price.toFixed(2)}` : item.price === 0 ? 'FREE' : 'View Only'}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center w-full">No items found.</p>
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ContentList;
