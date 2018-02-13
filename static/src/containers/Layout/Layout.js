import React, { Component } from 'react';
import AddRecipe from '../../components/AddRecipe/AddRecipe';
import classes from './Layout.css';
import Recipes from '../../components/Recipes/Recipes';
import Ingredients from '../../components/Ingredients/Ingredients';

class Layout extends Component {

  state = {
    'recipes': [
      {'name': 'Omelet',
       'egg': 2,
       'Ham': 100},
      {'name':'Cheese makaroni',
       'makaroni': 100,
       'cheese':50}
    ],
    'currentRecipe': -1
  }

  showIngredientsHandler = (index) => {
    this.setState({currentRecipe: index})
  }

  render () {

    const recipeItem = this.state.recipes.map((recipe, index) => {
        return (
          <Recipes key={index} className={classes.Box}
            indexValue={index}
            clicked={() => this.showIngredientsHandler(index)}
            singleRecipe={recipe} currentRecipe={this.state.currentRecipe}/>
        )
    })

    return (
      <div className={classes.FlexContainer}>
        <ul>
        {recipeItem}
        </ul>
        <Ingredients
          currentRecipe={this.state.currentRecipe}
          ingredientList={this.state.recipes[this.state.currentRecipe]} className={classes.Box} />
        <AddRecipe className={classes.Box}/>


      </div>
    )
  }
}

export default Layout;
