import React, { Component } from 'react';
import classes from './Recipes.css';


class Recipe extends Component {

  render() {

  let style = {};


  if (this.props.currentRecipe===this.props.indexValue) {
    style={backgroundColor: 'yellow'}
  } else {
    style={backgroundColor: 'brown'}
  }

  return (
    <div className={classes.Recipe} style={style}
         onClick={this.props.clicked}>
      <p>{this.props.singleRecipe.name}</p>
    </div>
  )
}
}

export default Recipe;
