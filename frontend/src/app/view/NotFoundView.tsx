import React from 'react';
import ExternalPageContainer from './ExternalPageView/ExternalPageContainer';
import CenterMaxWidthContent from '../components/Layout/CenterMaxWidthContent';
import { RouteComponentProps, withRouter } from 'react-router';

const NotFoundView: React.FC<RouteComponentProps> = ({location}) => {
  return (
    <ExternalPageContainer>
      <CenterMaxWidthContent>
        <div className="mt-5 bg-white p-10 rounded-lg shadow-xl">
          <h1 className="font-semibold tracking-wide text-xl text-gray-900 mb-3">404: Resource Not Found</h1>
          <pre className="bg-gray-900 text-white p-2 rounded-md max-w-xl">
            {
              JSON.stringify(location, null, 2)
            }
          </pre>
        </div>
      </CenterMaxWidthContent>
    </ExternalPageContainer>
  );
};

export default withRouter(NotFoundView);