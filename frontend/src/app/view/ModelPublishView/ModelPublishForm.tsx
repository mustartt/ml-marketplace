import React, { useState } from 'react';
import StyledInputLabel from '../../components/Input/StyledInputLabel';
import StyledInputField from '../../components/Input/StyledInputField';
import ListBox from '../../components/Listbox/Listbox';
import StyledTextAreaInput from '../../components/Input/StyledTextAreaInput';
import DescriptionEditorComponent from '../../components/DescriptionEditor/DescriptionEditorComponent';
import StyledButton from '../../components/Input/StyledButton';
import { useDispatch } from 'react-redux';
import LayoutActions from '../../../actions/layout/LayoutActions';
import axios from 'axios';
import ApiRoute, { ModifyModelResponse } from '../../../services/ApiRoutesService';

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

interface FormValidationResult {
  isValid: boolean;
  message: string;
}

const publishFormValidation = (form: ModelPublishForm): FormValidationResult => {

  // model name validation
  if (!form.modelName.match(/^[a-zA-Z0-9-_]+$/g)) {
    return {
      isValid: false,
      message: 'Model name contains invalid characters',
    };
  }
  if (form.modelName.length > 64) {
    return {
      isValid: false,
      message: 'Name must be less than 64 characters',
    };
  }

  return {
    isValid: true,
    message: '',
  };
};

const getPublishTransferObject = (form: ModelPublishForm) => ({
  name: form.modelName,
  category: form.category.name,
  framework: form.framework.name,
  format: form.format.name,
  excerpt: form.excerpt,
  description: form.description,
  tags: [],
  price: 69.420,
});

const LoadingSpinner = () => (
  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none"
       viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
    <path className="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
  </svg>
);

const ModelPublishForm: React.FC = () => {
  const [form, setForm] = useState<ModelPublishForm>(defaultFormValue);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    const validateResult = publishFormValidation(form);
    if (!validateResult.isValid) {
      dispatch(LayoutActions.autoCloseNotification('info', validateResult.message));
    } else {
      setIsSubmitting(true);
      const formattedRequestBody = getPublishTransferObject(form);
      axios.post<ModifyModelResponse>(ApiRoute.publishModel, formattedRequestBody).then(res => {
        if (res.data.status != 200) {
          dispatch(LayoutActions.autoCloseNotification('warning', res.data.error || ''));
        } else {
          window.location.assign(ApiRoute.constructModelUrlWithId(res.data.model_id));
        }
      }).catch(err => {
        dispatch(LayoutActions.autoCloseNotification('warning', err.toString()));
      }).finally(() => {
        setIsSubmitting(false);
      });
    }
  };

  return (
    <main className="flex flex-col bg-gray-100 p-5 md:px-10 w-full max-w-screen-lg h-full">
      <h1 className="text-2xl font-semibold">Publish Model</h1>
      <div className="flex flex-col mt-5 overflow-y-auto">
        <div className="flex-shrink-0 flex flex-col sm:flex-row sm:space-x-4">
          <div className="w-full sm:w-1/2 flex-shrink-0 flex flex-col space-y-3">
            <div>
              <StyledInputLabel>Model Name</StyledInputLabel>
              <StyledInputField value={form.modelName} setValue={(newValue) => {
                setForm({...form, modelName: newValue});
              }} placeholder="model-name-128"/>
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

      <div className="flex mt-auto justify-end py-3">
        <StyledButton onClick={handleSubmit}>
          {
            !isSubmitting ? 'Publish' :
              <LoadingSpinner/>
          }
        </StyledButton>
      </div>
    </main>
  );
};

export default ModelPublishForm;