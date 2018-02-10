import React, { Component } from 'react';
import classes from './Ingredients.css';

class Ingredients extends Component  {

  render () {

    let ingredient = null;

      if(this.props.currentRecipe > -1) {
       ingredient = Object.keys(this.props.ingredientList)
        .map(ingredient => {
          return (
            <p key={ingredient} onClick={this.props.clicked}>{ingredient}: {this.props.ingredientList[ingredient]}</p>
          )
        })
      } else {
        ingredient = <p>Click recipe on left to see ingreidents required for it!</p>
      }

    return (
      <div className={classes.Ingredients}>
        {ingredient}
      </div>
    )
  }
}

export default Ingredients;
