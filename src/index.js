import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "jquery/dist/jquery";
import "popper.js";
import "bootstrap/dist/js/bootstrap";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import Axios from "axios";
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC6_ELUZDC2Ro2fQJGdOqBmqa5zAZ3UqDU",
  authDomain: "vet-8-44417.firebaseapp.com",
  projectId: "vet-8-44417",
  storageBucket: "vet-8-44417.appspot.com",
  messagingSenderId: "145847577006",
  appId: "1:145847577006:web:4b87ae0670f2eceb52003f",
  measurementId: "G-0WCH1V08ME"
};

firebase.initializeApp(firebaseConfig)

const globalState = {
  doctor: 0,
  name: localStorage.getItem('fullname')
};

// Actions 
const fetchDataUser = () => {
  return (dispatch) => {
    dispatch(fetchDataUserRequest())
    Axios(`https://binar8-muhammad-zanuardi.nandaworks.com/profile/${localStorage.getItem('id')}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      } 
    })
    .then(res => {
      const user = res.data[0]
      dispatch(fetchDataUserSuccess)
    })
    .catch(err => {
      dispatch(fetchDataUserFailed(err.message))
    })
  }
}

// Reducer
const rootReducer = (state = globalState, action) => {
  if (action.type === "ADD_DOCTOR") {
    return {
      ...state,
      doctor: state.doctor + 1,
    };
  }

  if (action.type === "DELETE_DOCTOR") {
    return {
      ...state,
      doctor: state.doctor + 1,
    };
  }

  if (action.type === "UPDATE_NAME"){
    return {
      ...state,
      name: newname
    }
  }

  return state;
};

// Store
const globalStore = createStore(rootReducer)


// Index Awal
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={globalStore}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
