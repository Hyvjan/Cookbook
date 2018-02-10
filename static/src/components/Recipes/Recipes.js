import React from 'react';
import classes from './Recipes.css';

const recipe = (props) => {

  let style = {};

  if (props.currentRecipe===props.indexValue) {
    style={backgroundColor: 'yellow'}
  } else {
    style={backgroundColor: 'brown'}
  }

  return (
    <div className={classes.Recipe} style={style}
         onClick={props.clicked}>
      <p>{props.singleRecipe.name}</p>
    </div>
  )
}

export default recipe;
