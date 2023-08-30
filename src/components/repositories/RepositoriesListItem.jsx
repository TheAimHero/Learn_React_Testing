import { MarkGithubIcon } from '@primer/octicons-react';
import { Link } from 'react-router-dom';

import FileIcon from '../tree/FileIcon';
import RepositoriesSummary from './RepositoriesSummary';

function RepositoriesListItem({ repository }) {
  const { full_name, language, description, owner, name } = repository;

  return (
    <div className='py-3 mx-10 border-b flex justify-between'>
      <div className='flex mx-4'>
        <FileIcon name={language} className='shrink w-6 pt-1' />
        <div>
          <Link to={`/repositories/${full_name}`} className='text-xl'>
            {owner.login}/<span className='font-bold'>{name}</span>
          </Link>
          <p className='text-gray-500 italic py-1'>{description}</p>
          <RepositoriesSummary repository={repository} />
        </div>
      </div>
      <div className='mr-48 my-auto'>
        <a
          href={repository.html_url}
          aria-label='github repository'
          target='_blank'
          rel='noreferrer'
        >
          {/* <p>text</p> */}
          <MarkGithubIcon size={25} />
        </a>
      </div>
    </div>
  );
}

export default RepositoriesListItem;
