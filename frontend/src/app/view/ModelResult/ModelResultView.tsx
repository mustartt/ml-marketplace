import React, { useEffect, useRef } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import ModelPageView from './ModelPageView';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers/rootReducer';
import SearchBox from '../../components/SearchBox/SearchBox';
import FilterButton from '../../components/Filter/FilterButton';
import SidebarToggle from '../../components/Sidebar/SidebarToggle';
import useWindowDimensions from '../../../services/WindowDimensionUtils';
import ModelActions from '../../../actions/model/ModelActions';
import FilterSlideOver from '../../components/Filter/FilterSlideOver';
import MultiSelectFilter from '../../components/Filter/MultiSelectFilter';
import { FilterType } from '../../../store/reducers/ModelReducer/modelReducer';

const FILTER_OPTIONS_CATEGORY = [
  'Image Generator', 'Video Classification', 'Text Embedding', 'Image Classification', 'Generation',
];

const FILTER_OPTIONS_FRAMEWORK = [
  'TensorFlow', 'PyTorch', 'scikit-learn', 'Spark ML', 'Keras', 'Other',
];

const FILTER_OPTIONS_FORMAT = [
  'tf.js', 'HDF5', 'tf2', 'pt', 'joblib', 'Other',
];

const ModelResultView = () => {

  const {width} = useWindowDimensions();
  const isDesktopBreakPoint = () => width > 768;

  const modelState = useSelector((state: RootState) => state.modelState);
  const dispatch = useDispatch();

  const searchRef = useRef({
    search: '',
  });

  useEffect(() => {
    dispatch(ModelActions.load(searchRef.current.search));
  }, []);

  const onSearch = (search: string) => {
    dispatch(ModelActions.load(search));
    searchRef.current.search = search;
  };

  const createMultiSelectFilter = (options: string[], name: string) => {
    return (
      <MultiSelectFilter
        filters={options}
        active={modelState.filters.find((filter: FilterType) => filter.name === name).filters}
        onChange={(newFilters) => {
          dispatch(ModelActions.updateFilters({
            name,
            filters: newFilters,
          }));
        }}/>
    );
  };

  const handleFilterSubmit = () => {
    dispatch(ModelActions.load(searchRef.current.search));
  };

  return (
    <>
      <FilterSlideOver
        title={'Model Filters'}
        subheading={'Specify the models you are looking for choosing the filters'}
        submitFilter={handleFilterSubmit}
      >
        <pre className="m-1 text-xs rounded-lg p-3 bg-gray-100 text-black">
          {JSON.stringify(modelState.filters, null, 2)}
        </pre>

        <div className="p-3">
          {createMultiSelectFilter(FILTER_OPTIONS_CATEGORY, 'category')}
          {createMultiSelectFilter(FILTER_OPTIONS_FRAMEWORK, 'framework')}
          {createMultiSelectFilter(FILTER_OPTIONS_FORMAT, 'format')}
        </div>

      </FilterSlideOver>

      <div className="bg-gray-100 h-full">
        <header className="flex items-center justify-between space-x-2 bg-white p-3 shadow-md">
          {
            !isDesktopBreakPoint() &&
            <SidebarToggle/>
          }

          <SearchBox search={onSearch}/>

          <FilterButton/>

        </header>

        <section className="flex justify-between items-center p-2">
          <h2 className="font-semibold text-lg text-gray-900"
              onClick={() => {
                console.log('a');
              }}
          >
            Showing Results: x/y
          </h2>
          <Pagination curr={modelState.curr}
                      totalPage={modelState.totalPage}
                      onChange={(newPage) => console.log(newPage)}
          />
        </section>

        {/* model page view */}
        <ModelPageView/>

      </div>
    </>
  );
};

export default ModelResultView;