import React, { useEffect, useState } from 'react';
import RepoCard from '../components/RepoCard';
import { useDebounce } from '../hooks/debounce';
import { IOwner, IRepo } from '../models/models';
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from '../store/github/github.api';

function HomePage() {
  const [search, setSeatch] = useState<string>('');
  const [dropdown, setDropdown] = useState<boolean>(false);
  const debounced = useDebounce(search, 500);
  const { data, isLoading, isError } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  const [
    fetchRepos,
    { data: repoData, isLoading: repoIsLoading, isError: repoIsError },
  ] = useLazyGetUserReposQuery();

  useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length! > 0);
  }, [debounced, data]);

  const clickHandler = (username: string) => {
    fetchRepos(username);
    setDropdown(false);
  };

  return (
    <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
      {isError && (
        <p className='text-center text-red-600'>Something went wrong...</p>
      )}
      <div className='relative w-[560px]'>
        <input
          type='text'
          className='border py-2 px-4 w-full h-[42px] mb-2'
          placeholder='Search for github username...'
          value={search}
          onChange={(e) => setSeatch(e.target.value)}
        />
        {dropdown && (
          <ul
            className='
                        list-none
                        absolute
                        top-[42px] 
                        left-0 
                        right-0 
                        max-h-[200px] 
                        overflow-y-scroll 
                        shadow-md
                        bg-white
                      '
          >
            {isLoading && <p className='text-center'>Loading...</p>}
            {data?.map((user) => (
              <li
                key={user.id}
                className='
                            py-2 
                            px-4 
                            hover:bg-gray-500 
                            hover:text-white 
                            transition-colors 
                            cursor-pointer
                          '
                onClick={() => clickHandler(user.login)}
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}
        <div className='container'>
          {repoIsLoading && <p>loading...</p>}
          {repoData?.map((repo: IRepo<IOwner>) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
