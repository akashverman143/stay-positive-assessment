import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import {reducer} from '../domain/reducer';
import  watchSaga  from '../domain/saga';

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchSaga);
