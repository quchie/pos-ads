if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '../../store'

export default function createRoutes (store) {
  return {
    path: 'clients/:slug',
    getComponents (location, cb) {
      require.ensure([
        './containers/ClientPage',
        './reducer'
      ], (require) => {
        let ClientPage = require('./containers/ClientPage').default
        let clientReducer = require('./reducer').default
        injectAsyncReducer(store, 'currentClient', clientReducer)
        cb(null, ClientPage)
      })
    }
  }
}
