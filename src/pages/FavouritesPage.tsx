import React from 'react';
import { useAppSelector } from '../hooks/redux';

function FavouritesPage() {
  const { favourites } = useAppSelector((state) => state.github);

  if (favourites.length === 0)
    return <p className='text-center'>No items...</p>;

  return (
    <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
      <ul className='list-none'>
        {favourites.map((item) => (
          <li>
            <a href={item} target='_blank'>
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavouritesPage;
