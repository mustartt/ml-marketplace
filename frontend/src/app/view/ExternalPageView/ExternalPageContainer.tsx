import React from 'react';
import SearchBox from '../../components/SearchBox/SearchBox';
import LogoComponent from '../../components/Header/LogoComponent';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

interface ExternalPageContainerProps {
  redirectLink?: string;
}

const ExternalPageContainer: React.FC<ExternalPageContainerProps & RouteComponentProps> =
  ({history, redirectLink, children}) => {

    const onGlobalSearch = (search: string) => {
      history.push(`/search?q=${search}`);
    };

    const handleGoBack = () => {
      history.push(redirectLink || '/');
    };

    return (
      <div className="relative flex flex-col w-screen h-screen bg-gray-100 overflow-hidden">
        <div className="flex-shrink-0 relative z-0">
          <header className="relative z-10 block sm:flex sm:space-x-4 bg-white p-3 shadow">
            <div className="flex mb-3 sm:mb-0 justify-center items-center">
              <LogoComponent/>
            </div>
            <div className="flex-grow max-w-3xl">
              <SearchBox search={onGlobalSearch}/>
            </div>
          </header>
        </div>
        <div className="flex-grow overflow-y-auto">
          <div className="bg-gray-50 px-3 py-2 flex items-center shadow">
            <button
              type="button"
              onClick={handleGoBack}
              className="flex items-center space-x-2 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200">
              <ArrowLeftIcon className="h-5 w-5"/>
              <span className="-mt-0.5 leading-none font-semibold text-lg leading-wide">Back</span>
            </button>
          </div>
          <div className="p-2">
            {children}
          </div>
          <div className="h-32"/>
        </div>
      </div>
    );
  };

export default withRouter(ExternalPageContainer);