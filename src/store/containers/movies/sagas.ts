import { call, put } from 'redux-saga/effects'
import { loadSuccess, loadFailure } from './actions'
import { ApiEndpoints } from '@/store/containers/ApiEndpoints'
import axios, { AxiosRequestConfig } from 'axios'

export function* load() {
  let token = localStorage.token
  if (!token) token = localStorage.token = Math.random().toString(36).substr(-8)

  const headerParams = {
    Accept: 'application/json',
    Authorization: token,
  }

  try {
    const httpRequest: AxiosRequestConfig = {
      url: `${ApiEndpoints.getTopRatedMovies()}`,
      method: 'get',
      headers: headerParams,
    }
    const response = yield call(axios.request, httpRequest)
    yield put(loadSuccess(response.data))
  } catch (err) {
    yield put(loadFailure())
  }
}
