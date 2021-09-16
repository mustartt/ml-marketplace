import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import DescriptionEditorComponent from '../../components/DescriptionEditor/DescriptionEditorComponent';
import axios from 'axios';
import ApiRoute, { ModifyModelResponse } from '../../../services/ApiRoutesService';
import { RouteComponentProps, withRouter } from 'react-router';
import LoadingMessage from '../../components/Utils/LoadingMessage';
import { useDispatch } from 'react-redux';
import LayoutActions from '../../../actions/layout/LayoutActions';
import { ModelRequest } from '../../../types/RequestTypes';

const CATEGORY_OPTIONS = [
  'Image Classification',
  'Text Embedding',
  'Generation',
  'Language Processing',
  'Video Processing',
  'Other',
];

const FRAMEWORK_OPTIONS = [
  'TensorFlow', 'PyTorch', 'scikit-learn', 'Spark ML', 'Keras', 'Other',
];

const FORMAT_OPTIONS = [
  'tf.js', 'HDF5', '.tf2', '.pt', '.joblib', 'Other',
];

const validationSchema = yup.object({
  modelName: yup.string()
                .max(64, 'Model Name must be less than 64 characters')
                .min(8, 'Model Name must be longer than 8 characters')
                .matches(/^[aA-zZ0-9_-]+$/, 'Cannot contain non alpha beside - and _ and spaces')
                .required(),
  category: yup.string()
               .oneOf(CATEGORY_OPTIONS)
               .default(CATEGORY_OPTIONS[CATEGORY_OPTIONS.length - 1])
               .required(),
  framework: yup.string()
                .oneOf(FRAMEWORK_OPTIONS)
                .default(FRAMEWORK_OPTIONS[FRAMEWORK_OPTIONS.length - 1])
                .required(),
  format: yup.string()
             .oneOf(FORMAT_OPTIONS)
             .default(FORMAT_OPTIONS[FORMAT_OPTIONS.length - 1])
             .required(),
  excerpt: yup.string().optional(),
  description: yup.string().optional(),
  price: yup.string()
            .default('0')
            .required(),
});

type modelPublishFormType = yup.InferType<typeof validationSchema>;

interface SelectFieldControlProps {
  id: string;
  name: string;
  label: string;
  value: any;
  options: string[];
  onChange: any;
  onBlur: any;
}

const SelectFieldControl: React.FC<SelectFieldControlProps> = ({id, name, label, value, options, onChange, onBlur}) => {
  return (
    <>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        fullWidth
      >
        {
          options.map((opt, index) =>
            <MenuItem key={index} value={opt}>{opt}</MenuItem>)
        }
      </Select>
    </>
  );
};

const convertToPostBody = (values: any): ModelRequest => {
  return {
    name: values.modelName,
    category: values.category,
    framework: values.framework,
    format: values.format,
    excerpt: values.excerpt,
    description: values.description,
    tags: [],
    price: parseFloat(values.price),
  };
};

const ModelPublishForm: React.FC<RouteComponentProps> = ({history}) => {

  const dispatch = useDispatch();
  const formik = useFormik<modelPublishFormType>({
    initialValues: {
      modelName: '',
      category: CATEGORY_OPTIONS[CATEGORY_OPTIONS.length - 1],
      framework: FRAMEWORK_OPTIONS[FRAMEWORK_OPTIONS.length - 1],
      format: FORMAT_OPTIONS[FORMAT_OPTIONS.length - 1],
      excerpt: '',
      description: '# Hello World\n',
      price: '0',
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit: (values, formikHelpers) => {
      formikHelpers.setSubmitting(true);
      axios.post<ModifyModelResponse>(ApiRoute.publishModel, convertToPostBody(values))
           .then(res => {
             console.log(res);
             history.push(`/models/${res.data.model_id}`);
           })
           .catch(err => {
             dispatch(LayoutActions.autoCloseNotification('warning', err.toString()));
             formikHelpers.setSubmitting(false);
           });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mt-5 p-5 pb-10 md:p-10 md:pb-15 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h1 className="leading-none mb-5 text-2xl text-gray-900 font-semibold">Publish Your Model</h1>
        {
          formik.isSubmitting ? <LoadingMessage/> :
            <button
              type="submit"
              className="px-3 py-3 font-semibold leading-none uppercase text-gray-50 bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md">Publish
            </button>
        }
      </div>
      <div className="block md:flex md:space-x-5">
        <div className="md:w-72 space-y-3">
          <div className="mb-10">
            <TextField
              id="modelName"
              name="modelName"
              label="Model Name"
              fullWidth
              value={formik.values.modelName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.modelName && Boolean(formik.errors.modelName)}
              helperText={formik.touched.modelName && formik.errors.modelName}
            />
          </div>
          <SelectFieldControl
            id="category"
            name="category"
            label="Model Category"
            options={CATEGORY_OPTIONS}
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <SelectFieldControl
            id="framework"
            name="framework"
            label="Model Framework"
            options={FRAMEWORK_OPTIONS}
            value={formik.values.framework}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <SelectFieldControl
            id="format"
            name="format"
            label="Model Format"
            options={FORMAT_OPTIONS}
            value={formik.values.format}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <TextField
            type="number"
            label="Price"
            id="price"
            name="price"
            InputProps={{
              inputProps: {
                max: Number.MAX_VALUE,
                min: 0,
                step: 0.01,
              },
            }}
            value={formik.values.price}
            onChange={formik.handleChange('price')}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="flex-grow space-y-3">
          <TextField
            id="excerpt-textarea"
            name="excerpt"
            label="Excerpt / Summary"
            placeholder="Place your model short excerpt here!"
            multiline
            fullWidth
            value={formik.values.excerpt}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <h3 className="text-xl text-gray-700 font-semibold">Description</h3>
          <DescriptionEditorComponent
            markdown={formik.values.description || ''}
            onChange={formik.handleChange('description')}/>
        </div>
      </div>
    </form>
  );
};

export default withRouter(ModelPublishForm);