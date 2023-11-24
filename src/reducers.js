import {
  FAV_ADD,
  FAV_REMOVE,
  FETCH_SUCCESS,
  FETCH_LOADING,
  FETCH_ERROR,
  GET_FAVS_FROM_LS,
} from "./actions";


const initial = {
  favs: [],
  current: null,
  error: null,
  loading: false,
};

function writeFavsToLocalStorage(favs) {
  localStorage.setItem("project", JSON.stringify(favs));
}

function readFavsFromLocalStorage() {
  if (!JSON.parse(localStorage.getItem("project"))) return [];
  return JSON.parse(localStorage.getItem("project"));
}

export function myReducer(state = initial, action) {
  switch (action.type) {
    case FAV_ADD:
      return {...state, favs:[...state.favs, action.payload] };

    case FAV_REMOVE:
      const newFavs = state.favs.filter((item) => item.id !== action.payload);
      return {
        ...state,
        favs: [...newFavs],
      };

    case FETCH_SUCCESS:
      return {...state, loading:true, error:"", current:action.payload};

    case FETCH_LOADING:
      return {
        ...state,
        loading: true,
      };

    case FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_FAVS_FROM_LS:
      return { ...state, favs: readFavsFromLocalStorage() };

    default:
      return state;
  }
}
