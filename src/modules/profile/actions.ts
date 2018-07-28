import types from './types';
import { data_about_user } from 'api/api';
import { Dispatch } from 'redux';

export type TProfileUser = typeof profileUser;
export function profileUser() {
  return  (dispatch: Dispatch<any>) => {
    dispatch({
      type: types.PROFILE_DATA,
      payload: data_about_user(localStorage.getItem('token'))
    });
  };
}
