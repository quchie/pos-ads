if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '../../store'

export default function createRoutes (store) {
  return {
    path: 'clients',
    getComponents (location, cb) {
      require.ensure([
        './containers/ClientList',
        './reducer'
      ], (require) => {
        let ClientPage = require('./containers/ClientList').default
        let clientReducer = require('./reducer').default
        injectAsyncReducer(store, 'clients', clientReducer)
        cb(null, ClientPage)
      })
    }
  }
}
