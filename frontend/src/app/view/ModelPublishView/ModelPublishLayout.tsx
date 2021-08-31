import React from 'react';
import GlobalNotification from '../../components/GlobalNotification/GlobalNotification';
import ModelPublishForm from './ModelPublishForm';

const ModelPublishLayout: React.FC = () => {
  return (
    <>
      <GlobalNotification/>
      <div className="relative flex justify-center w-screen h-screen bg-gray-100 overflow-hidden">
        <ModelPublishForm/>
      </div>
    </>
  );
};

export default ModelPublishLayout;