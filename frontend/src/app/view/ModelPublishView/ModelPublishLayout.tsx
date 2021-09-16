import React from 'react';
import GlobalNotification from '../../components/GlobalNotification/GlobalNotification';
import ModelPublishForm from './ModelPublishForm';
import ExternalPageContainer from '../ExternalPageView/ExternalPageContainer';
import CenterMaxWidthContent from '../../components/Layout/CenterMaxWidthContent';

const ModelPublishLayout: React.FC = () => {
  return (
    <>
      <GlobalNotification/>
      <ExternalPageContainer>
        <CenterMaxWidthContent>
          <ModelPublishForm/>
        </CenterMaxWidthContent>
      </ExternalPageContainer>
    </>
  );
};

export default ModelPublishLayout;