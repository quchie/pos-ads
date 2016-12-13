import chai, { expect } from 'chai'
import * as types from '../common/constants'
import reducer from '../common/routes/Client/reducer'

// Remove this
import fakeDB from '../server/fakeClientsDB.js'

describe('Client Reducer', () => {
  const initialState = {
    lastFetched: null,
    isLoading: false,
    error: null,
    title: '',
    content: ''
  }

  it('should return default state if action is undefined', () => {
    const nextState = reducer(initialState, 'BLAH')
    expect(nextState).to.deep.equal(initialState)
  })

  it('should handle LOAD_POST_REQUEST', () => {
    const action = {
      type: types.LOAD_POST_REQUEST
    }

    const expectedNextState = {
      lastFetched: null,
      isLoading: true,
      error: null,
      title: '',
      content: ''
    }

    const nextState = reducer(initialState, action)
    expect(nextState).to.deep.equal(expectedNextState)
  })

  it('should handle LOAD_POST_SUCCESS', () => {
    const post = {
      name:'default',
      pricingRules: []
    }
    const currentTime = Date.now()
    const action = {
      type: types.LOAD_POST_SUCCESS,
      payload: post,
      meta: {
        lastFetched: currentTime
      }
    }

    const expectedNextState = {
      lastFetched: currentTime,
      isLoading: false,
      error: null,
      name:'default',
      pricingRules: []
    }

    const nextState = reducer(initialState, action)
    expect(nextState).to.deep.equal(expectedNextState)
  })

  it('should handle LOAD_POST_FAILURE', () => {
    const error = new Error('Invalid request')
    const action = {
      type: types.LOAD_POST_FAILURE,
      payload: error,
      error: true
    }

    const expectedNextState = {
      lastFetched: null,
      isLoading: false,
      error: error,
      name:'',
      pricingRules: []
    }

    const nextState = reducer(initialState, action)
    expect(nextState).to.deep.equal(expectedNextState)
  })
})
