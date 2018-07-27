import types from './types';

export interface ProfileState {
  email: string | null
  id: number | null
}

export const initialState: ProfileState = {
  email: null,
  id: null
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case types.PROFILE_DATA_FULFILLED:
      const { payload } = action;
      return {
        ...state,
        ...{
          email: payload.data.result.email,
          id: payload.data.result.id
        }


      };

    default:
      return state;
  }
};
