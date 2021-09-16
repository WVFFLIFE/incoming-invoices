import * as actionTypes from 'actionTypes';
import { batch } from 'react-redux';
import HttpClient from 'services';
import get from 'lodash/get';
import keyBy from 'lodash/keyBy';

const fetchCooperativesRequest = () => ({
  type: actionTypes.FETCH_ACCOUNTS_REQUEST
})

const fetchCooperativesSuccess = (data) => ({
  type: actionTypes.FETCH_ACCOUNTS_SUCCESS,
  payload: data
})

export const setCooperatives = (data) => ({
  type: actionTypes.SELECT_COOPERATIVE,
  payload: data
});

export const updateSelectedCooperative = (cooperatives) => {
  return (dispatch, getState) => {
    const { selectedCooperatives } = getState().settings;

    const modifiedCooperatives = selectedCooperatives.map(selectedCoop => {
      const newCoop = cooperatives.find(coop => coop.Id === selectedCoop.Id);

      return newCoop || selectedCoop;
    });

    dispatch(setCooperatives(modifiedCooperatives));
  }
}

export const fetchCooperatives = () => {
  return (dispatch, getState) => {
    const { substitute } = getState().balances;

    dispatch(fetchCooperativesRequest());

    HttpClient
      .getCooperatives(substitute.value?.Id)
      .then(data => {
        const { Cooperatives, IsSuccess, Error } = data;
        if (IsSuccess) {
          batch(() => {
            dispatch(
              fetchCooperativesSuccess(
                keyBy(Cooperatives, 'Id')
              )
            );
            dispatch(updateSelectedCooperative(Cooperatives));
          })
          
        } else {
          dispatch({ 
            type: actionTypes.BALANCES_REQUEST_FAILED,
            payload: Error 
          })
        }
      })
      .catch(err => {
        dispatch({ 
          type: actionTypes.BALANCES_REQUEST_FAILED,
          payload: `System error: ${err}` 
        })
      })
  }
}

export const setSortParams = (sortKey, sortType = 'string') => {
  return (dispatch, getState) => {
    const { sortParams } = getState().balances;
    const order = get(sortParams, 'order');

    dispatch({
      type: actionTypes.SET_ACCOUNTS_SORT_PARAMS,
      payload: {
        key: sortKey,
        order: order === 'desc' ? 'asc' : 'desc',
        type: sortType
      }
    })
  }
}

export const setFilter = filter => ({
  type: actionTypes.SET_BALANCES_FILTER,
  payload: filter
})

export const setSearchTerm = searchTerm => ({
  type: actionTypes.SET_ACCOUNTS_SEARCH_TERM,
  payload: searchTerm
})

export const selectSubstitute = (value) => {
  return dispatch => {
    dispatch({
      type: actionTypes.SELECT_SUBSITUTE,
      payload: value
    });

    dispatch(fetchCooperatives())
  }
}

export const changeCurrentPage = page => ({
  type: actionTypes.SET_CURRENT_BALANCES_PAGE,
  payload: page - 1
})

export const changeRowsPerPage = rowsPerPage => ({
  type: actionTypes.SET_AMOUNT_OF_BALANCES_PER_PAGE,
  payload: rowsPerPage
})

function getSubstitutorId(substitutors, selectedId) {
  return substitutors.some(s => s.Id === selectedId)
    ? selectedId
    : null;
}

export const refreshBalancesData = () => {
  return async (dispatch, getState) => {
    const { substitute: {value: SelectedSubstitutor} } = getState().balances;

    dispatch(fetchCooperativesRequest());

    try {
      const substitutorsData = await HttpClient.getSubstitutors(SelectedSubstitutor?.Id);
      const SubstitutorId = getSubstitutorId(substitutorsData.Substitutors, SelectedSubstitutor?.Id);
      const cooperativesData = await HttpClient.getCooperatives(SubstitutorId);

      if (
        substitutorsData.IsSuccess &&
        cooperativesData.IsSuccess 
      ) {
        batch(() => {
          dispatch({
            type: actionTypes.REFRESH_ACCOUNTS
          })
          if (SelectedSubstitutor && !SubstitutorId) {
            dispatch({
              type: actionTypes.SELECT_SUBSITUTE,
              payload: null
            });
          }
          dispatch(fetchCooperativesSuccess(
            keyBy(cooperativesData.Cooperatives, 'Id'))
          );
          dispatch({
            type: actionTypes.FETCH_SUBSTITUTE_SUCCESS,
            payload: substitutorsData.Substitutors
          })
        })
      } else {
        dispatch({ 
          type: actionTypes.BALANCES_REQUEST_FAILED,
          payload: substitutorsData.Error || cooperativesData.Error
        })
      }
    } catch (err) {
      dispatch({ 
        type: actionTypes.BALANCES_REQUEST_FAILED,
        payload: `System error: ${err}` 
      })
    }
  }
}

export const initError = () => ({
  type: actionTypes.INIT_BALANCES_ERROR
})