import { Dispatch } from 'redux';
import { FilterType, ModelAction } from '../../store/reducers/ModelReducer/modelReducer';
import axios from 'axios';
import ApiRoute from '../../services/ApiRoutesService';
import { RootState } from '../../store/reducers/rootReducer';
import { ModelResponseType, PageResponseType } from '../../types/ResponseTypes';

const getFilterQueryStrings = (filter: FilterType) => {
  if (!filter.filters || filter.filters.length == 0) return undefined;
  return filter.filters.join(',');
};

const formatRangeParam = (filter: FilterType) => {
  if (filter.filters) {
    return `${filter.filters[0]},${filter.filters[1]}`;
  }
};

const getFiltersQueryParam = (filters: FilterType[]) => {
  const queryObject: { [key: string]: string | undefined } = {};
  filters.forEach((filter) => {
    switch (filter.type) {
      case 'multi':
        queryObject[filter.name] = getFilterQueryStrings(filter);
        break;
      case 'range':
        queryObject[filter.name] = formatRangeParam(filter);
    }
  });
  return queryObject;
};

const ModelActions = {
  updateFilters: (filter: FilterType) =>
    (dispatch: Dispatch<ModelAction>, getState: () => RootState) => {
      const {modelState: {filters}} = getState();
      const newFilterSet = [filter, ...filters.filter((e: FilterType) => e.name !== filter.name)];
      dispatch({
        type: 'CHANGE_MODEL_FILTERS',
        payload: newFilterSet,
      });
    },

  load: (search: string) => (
    dispatch: Dispatch<ModelAction>, getState: () => RootState) => {

    const {modelState: {filters, curr, pageSize}} = getState();

    const queryParam = {
      params: {
        search: search,
        page: curr,
        size: pageSize,
        ...getFiltersQueryParam(filters),
      },
    };

    dispatch({
      type: 'LOAD_MODEL_START',
      payload: {
        curr: curr,
        pageSize: pageSize,
      },
    });

    axios.get<PageResponseType<ModelResponseType>>(ApiRoute.getModelsPaged, queryParam).then(res => {
      dispatch({
        type: 'LOAD_MODEL_SUCCESS',
        payload: {
          models: res.data.content,
          totalPages: res.data.total_pages,
          totalSize: res.data.total_size,
        },
      });
    }).catch(err => {
      dispatch({
        type: 'LOAD_MODEL_FAIL',
        payload: err,
      });
    });
  },
};

export default ModelActions;