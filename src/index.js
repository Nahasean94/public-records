import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'
import {GraphQL, Provider as GraphQLReact,} from 'graphql-react'
import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import {Provider} from 'react-redux'


const store = createStore(rootReducer, compose(applyMiddleware(thunk)))


const graphql = new GraphQL()

ReactDOM.render(
    <Provider store={store}>
        <GraphQLReact value={graphql}>
            <Routes/>
        </GraphQLReact>
    </Provider>
    , document.getElementById('root'))


