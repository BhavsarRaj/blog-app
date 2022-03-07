import { put, takeEvery } from "redux-saga/effects";
import { Register_Failed, Register_Success, Register } from "./actionTypes.js";

function* registerUser(action) {
  const url = "https://jsonplaceholder.typicode.com/posts";
  try {
    yield fetch(url, {
      method: "POST",
      body: JSON.stringify(action.user)
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Some error occured!");
      })
      .then((response) => response)
      .catch((error) => {
        throw error;
      });
    yield put({ type: Register_Success, user: action.user });
  } catch (error) {
    yield put({ type: Register_Failed, error: error });
  }
}

function* watchForRegisterUser() {
  yield takeEvery(Register, registerUser);
}

export default watchForRegisterUser;
