import * as actionTypes from './Actions';

/*const initialState = {
    'recipes': [
        {'name': 'Omelet',
        'egg': 2,
        'Ham': 100},
       {'name':'Cheese makaroni',
        'makaroni': 100,
        'cheese':50},
       {'name':'Cheese makaroni',
        'makaroni': 100,
        'cheese':50},
    ],
    'currentRecipe': -1
};*/
const initialState = {
    'recipes': [],
    'currentRecipe': -1,
    'signedIn': false,
    'token': null
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_RECIPE:
            const new_recipe = {};
            new_recipe[action.ingredientToAdd] = action.amountToAdd;
            return {
                ...state,
                recipes: state.recipes.concat(new_recipe)
            };
        case actionTypes.REMOVE_RECIPE:
            return {
                ...state,
            };
        case actionTypes.CURRENT_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes],
                currentRecipe: action.currentRecipe
            }
        case actionTypes.GET_RECIPES:
            console.log("reducerissa payload on: " + action.payload);
            return {
                ...state,
                recipes: [...action.payload.recipes],
                currentRecipe: action.payload.currentRecipe
            }
        case actionTypes.SIGN_IN:
            console.log("reducerissa token on: " + action.token)
            return {
                ...state,
                signedIn: true,
                token: action.token
            }
        case actionTypes.POST_RECIPE:
            return {
                ...state,
                recipes: state.recipes.concat(action.recipe),
                token: action.token
            }
        case actionTypes.SIGN_OUT:
            console.log("reducerissa sign_out tavoitettu");
            localStorage.removeItem('token');
            localStorage.removeItem('expirationTime')
            return {
                ...state,
                recipes: [],
                currentRecipe: -1,
                signedIn: false,
                token: null,
            }

        default:
            return state;
    }
};

export default reducer;