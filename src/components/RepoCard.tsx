import React, { useState } from 'react';
import { useActions } from '../hooks/actions';
import { useAppSelector } from '../hooks/redux';
import { IOwner, IRepo } from '../models/models';

function RepoCard({ repo }: { repo: IRepo<IOwner> }) {
  const { addFavourite, removeFavourite } = useActions();
  const { favourites } = useAppSelector((state) => state.github);

  const [isFav, setIsFav] = useState(favourites.includes(repo.html_url));

  const addToFav = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addFavourite(repo.html_url);
    setIsFav(true);
  };

  const removeFromFav = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeFavourite(repo.html_url);
    setIsFav(false);
  };

  return (
    <div className='border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all'>
      <a href={repo.html_url} target='_blank'>
        <h2 className='text-lg font-bold'>{repo.full_name}</h2>
        <p className='text-sm font-thin'>{repo?.description}</p>
        {!isFav && (
          <button
            className='py-2 px-4 bg-yellow-400 rounded hover:shadow-md transition-all'
            onClick={addToFav}
          >
            Add
          </button>
        )}
        {isFav && (
          <button
            className='py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all'
            onClick={removeFromFav}
          >
            Remove
          </button>
        )}
      </a>
    </div>
  );
}

export default RepoCard;
