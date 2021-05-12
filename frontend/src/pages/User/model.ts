import {getLoginGithub, postLoginGithub} from "@/pages/User/service";
import type {Effect, Reducer} from 'umi';


export type ModelType = {
  namespace: string;
  state: {};
  effects: {
    getLoginOauth: Effect,
    postLoginOauth: Effect
  };
  reducers: {};
}

const Model: ModelType = {
  namespace: "User",
  state: {},
  effects: {
    * getLoginOauth({payload}, {call, put}) {
      const response = yield call(getLoginGithub, payload.params)
      console.log(response)
    },
    * postLoginOauth({payload}, {call, put}) {
      const response = yield call(postLoginGithub, payload.data)
      console.log(response)
    }
  },
  reducers: {}
}

export default Model
