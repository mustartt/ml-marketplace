import React from 'react';
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
    <div className="shadow-md">
      <MDEditor
        value={props.markdown}
        onChange={onSourceChange}
        toolbarHeight={50}
        preview={'edit'}
        height={450}
      />
    </div>
  );
};

export default DescriptionEditorComponent;