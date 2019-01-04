import { GET_USER } from 'actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case GET_USER:
      return { name: 'Ilia' };
    default:
      return state;
  }
}
