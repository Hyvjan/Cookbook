import React from 'react';
import classes from './AddRecipe.css';

const addIngredient = (props) => {
  return (
  <div className={classes.Container}>
    <input type="text" id="ingredient" />
    <button>Save ingredient</button>
  </div>
)
};

export default addIngredient;
