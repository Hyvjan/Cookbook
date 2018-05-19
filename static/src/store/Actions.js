import axios from 'axios';

export const ADD_RECIPE = "ADD_RECIPE";
export const REMOVE_RECIPE = "REMOVE_RECIPE";
export const CURRENT_RECIPE = "CURRENT_RECIPE";
export const GET_RECIPES = 'GET_RECIPES';
export const ADD_RECIPES = "ADD_RECIPES";
export const SIGN_IN = "SIGN_IN";
export const GET_TOKEN = "GET_TOKEN";
export const POST_RECIPE= 'POST_RECIPE';
export const AUTO_SIGNIN= 'AUTO_SIGNIN';

export const saveRecipe = (entry, token) => {
    return {
        type: POST_RECIPE,
        recipe: entry,
        token: token
    }
}

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
                const validytime = new Date(new Date().getTime() + response.data.validyTime * 1000);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expirationTime', validytime);
                dispatch(signIn(response.data.token))
            })
            .catch(error => {
                console.log(error)
            });
    }
}

export const checkTokenValidy = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        console.log("luki tokenin storagesta: " + token);
        if (token) {
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            if (expirationTime > new Date()) {
                console.log("validoi paivamaaran: " + expirationTime);
                dispatch(signIn(token));
            }
        }
    }
}

export const getRecipes = (token) => {
    return dispatch => {
        axios.get('http://127.0.0.1:5000/recipes?token=' + token)
            .then(response => {
                console.log("getRecipes response is: " + response.data.recipes);
                dispatch(addRecipes(response.data.recipes));
            })
            .catch(error => {
              console.log(error)
            });
    }
}

export const postRecipe = (ingredients, token) => {
    const data = {
      ...ingredients
    };
    return dispatch => {
    axios.post('http://127.0.0.1:5000/new_recipe?token=' + token, data)
            .then(response => {
                console.log("response flaskilta: " + response);
                dispatch(saveRecipe(data));
            })
            .catch(error => {
              console.log(error.response)
            });
    }
}