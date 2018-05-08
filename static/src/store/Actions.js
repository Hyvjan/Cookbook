import axios from 'axios';

export const ADD_RECIPE = "ADD_RECIPE";
export const REMOVE_RECIPE = "REMOVE_RECIPE";
export const CURRENT_RECIPE = "CURRENT_RECIPE";
export const GET_RECIPES = 'GET_RECIPES';
export const ADD_RECIPES = "ADD_RECIPES";
export const SIGN_IN = "SIGN_IN";
export const GET_TOKEN = "GET_TOKEN";

export const addRecipes = (response) => {
    return {
        type: GET_RECIPES,
        payload: response
    }
}

export const signIn = (token) => {
    return {
        type: SIGN_IN,
        token: token
    }
}

export const getToken = (username, password) => {
    const payload= {
        'username': username,
        'password': password
    };
    return dispatch => {
        axios.post('http://127.0.0.1:5000/signIn', payload)
            .then(response => {
                console.log("signIn response: " + response.data.token)
                dispatch(signIn(response.data.token))
            })
            .catch(error => {
                console.log(error)
            });
    }
}

export const getRecipes = () => {
    return dispatch => {
        axios.get('http://127.0.0.1:5000/recipes')
            .then(response => {
                console.log("response is: " + response.data.recipes);
                dispatch(addRecipes(response.data.recipes));
            })
            .catch(error => {
              console.log(error)
            });
    }
}

