import * as actionTypes from './Actions';

const initialState = {
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
        default:
            return state;
    }
};

export default reducer;