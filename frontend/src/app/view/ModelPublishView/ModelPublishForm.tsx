import React, { useState } from 'react';
import StyledInputLabel from '../../components/Input/StyledInputLabel';
import StyledInputField from '../../components/Input/StyledInputField';
import ListBox from '../../components/Listbox/Listbox';
import StyledTextAreaInput from '../../components/Input/StyledTextAreaInput';
import DescriptionEditorComponent from '../../components/DescriptionEditor/DescriptionEditorComponent';
import StyledButton from '../../components/Input/StyledButton';

const CATEGORY_OPTIONS = [
  {name: 'Image Classification'},
  {name: 'Text Embedding'},
  {name: 'Generation'},
  {name: 'Language Processing'},
  {name: 'Video Processing'},
  {name: 'Other'},
];

const FRAMEWORK_OPTIONS = [
  {name: 'TensorFlow'},
  {name: 'PyTorch'},
  {name: 'scikit-learn'},
  {name: 'Spark ML'},
  {name: 'Keras'},
  {name: 'Other'},
];

const FORMAT_OPTIONS = [
  {name: 'tf.js'},
  {name: 'HDF5'},
  {name: '.tf2'},
  {name: '.pt'},
  {name: '.joblib'},
  {name: 'Other'},
];

type OptionType = {
  name: string;
}

interface ModelPublishForm {
  modelName: string;

  category: OptionType;
  framework: OptionType;
  format: OptionType;

  excerpt: string;
  description: string;
}

const defaultFormValue = {
  modelName: 'model-name-128',
  category: CATEGORY_OPTIONS[0],
  framework: FRAMEWORK_OPTIONS[0],
  format: FORMAT_OPTIONS[0],
  excerpt: '',
  description: '',
};

const ModelPublishForm: React.FC = () => {
  const [val, setValue] = useState('');
  const [form, setForm] = useState<ModelPublishForm>(defaultFormValue);

  return (
    <main className="flex flex-col bg-gray-100 p-5 max-w-screen-lg h-full">
      <h1 className="text-2xl font-semibold">Publish Model</h1>
      <div className="flex flex-col mt-5 overflow-y-auto">
        <div className="flex-shrink-0 flex flex-col sm:flex-row sm:space-x-4">
          <div className="w-full sm:w-1/2 flex-shrink-0 flex flex-col space-y-3">
            <div>
              <StyledInputLabel>Model Name</StyledInputLabel>
              <StyledInputField value={val} setValue={setValue} placeholder="model-name-128"/>
            </div>
            <div>
              <StyledInputLabel>Category</StyledInputLabel>
              <ListBox
                options={CATEGORY_OPTIONS}
                selected={form.category}
                setSelected={(newValue) =>
                  setForm({...form, category: newValue})
                }
              />
            </div>
            <div>
              <StyledInputLabel>Framework</StyledInputLabel>
              <ListBox
                options={FRAMEWORK_OPTIONS}
                selected={form.framework}
                setSelected={(newValue) =>
                  setForm({...form, framework: newValue})
                }
              />
            </div>
            <div>
              <StyledInputLabel>Format</StyledInputLabel>
              <ListBox
                options={FORMAT_OPTIONS}
                selected={form.format}
                setSelected={(newValue) =>
                  setForm({...form, format: newValue})
                }
              />
            </div>
          </div>

          <div className="w-full mt-3 sm:mt-0">
            <StyledInputLabel>Excerpt</StyledInputLabel>
            <StyledTextAreaInput
              value={form.excerpt}
              setValue={(newValue) => {
                setForm({...form, excerpt: newValue});
              }}/>
          </div>
        </div>
        <div className="mt-5">
          <StyledInputLabel>Description</StyledInputLabel>
          <DescriptionEditorComponent
            markdown={form.description}
            onChange={(newValue) => {
              setForm({...form, description: newValue});
            }}/>
        </div>
      </div>

      <div className="flex mt-auto justify-end py-5">
        <StyledButton onClick={() => {
        }}>
          Publish
        </StyledButton>
      </div>
    </main>
  );
};

export default ModelPublishForm;