import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';

interface DescriptionEditorProps {
  markdown: string;
  onChange: (newMarkdown: string) => void;
}

const DescriptionEditorComponent: React.FC<DescriptionEditorProps> = (props) => {

  const onSourceChange = (newVal: string | undefined) => {
    props.onChange(newVal || '');
  };

  return (
    <div className="p-5">
      <div className="flex space-x-2 justify-between items-center">
        <h1 className="font-semibold text-2xl">Markdown Editor</h1>
      </div>
      <div className="mt-3">
        <MDEditor
          value={props.markdown}
          onChange={onSourceChange}
          toolbarHeight={50}
          preview={'edit'}

        />
      </div>
    </div>
  );
};

export default DescriptionEditorComponent;