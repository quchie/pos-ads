import * as types from '../../constants'

const initialState = {
  lastFetched: null,
  isLoading: false,
  error: null,
  name: '',
  pricingRules: ''
}

export default function currentClient (state = initialState, action) {
  switch (action.type) {
    case types.LOAD_POST_REQUEST:
      return { ...state,
        isLoading: true,
        error: null}
    case types.LOAD_POST_SUCCESS:
      return { ...state,
        name: action.payload.name,
        pricingRules: action.payload.pricingRules,
        lastFetched: action.meta.lastFetched,
        isLoading: false}
    case types.LOAD_POST_FAILURE:
      return { ...state,
        error: action.payload }
    default:
      return state
  }
}

// Example of a co-located selector
export const selectCurrentClient = state => state.currentClient
