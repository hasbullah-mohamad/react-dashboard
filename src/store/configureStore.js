import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk'

import rootReducer from '../_reducers'


export const history = createBrowserHistory()

const composeEnhancer = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


export default function configureStore() {
  return createStore(
    connectRouter(history)(rootReducer),
    composeEnhancer(
      applyMiddleware(
        routerMiddleware(history),
        thunk,
      ),
    ),
  )
}
