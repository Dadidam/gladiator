import { GET_USER } from 'actions/types';

export function getUser() {
  return {
    type: GET_USER,
    payload: null
  };
}
