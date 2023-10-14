import { takeLatest, put, call } from "redux-saga/effects";
import { fetchCelebtityDetails } from '../adapters/quizAdapter';

function* celebrityData() {
  try {  
    // yield put({ type: "LOAD", value: 1 });
    yield put({type: 'LOAD_CELEBRITY_DATA_SPINNER', value: true});
    const dataList = yield call(fetchCelebtityDetails);
    yield put({ type: 'LOAD_CELEBRITY_DATA_SUCESS', data: dataList});
    yield put({type: 'LOAD_CELEBRITY_DATA_SPINNER', value: false});
  }catch (e) {
    console.log(e);
  }
}

export default function* watchSaga() {
  yield takeLatest("LOAD_CELEBRITY_DATA", celebrityData);
}