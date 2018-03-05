import React, { Component } from 'react';
import AddRecipe from '../../components/AddRecipe/AddRecipe';
import classes from './Layout.css';
import Recipes from '../../components/Recipes/Recipes';
import Ingredients from '../../components/Ingredients/Ingredients';
import { Route } from 'react-router-dom';

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

  addRecipeHandler = (newRecipe) => {
    const oldRecipes = [...this.state.recipes]
    const newRecipes = oldRecipes.push(newRecipe)
    this.setState({'recipes': newRecipes, 'currentRecipe': this.state.recipes.length-1})
  }

  render () {

    const recipeItem = this.state.recipes.map((recipe, index) => {
        return (
          <Recipes key={index} className={classes.Box}
            indexValue={index}
            clicked={() => this.showIngredientsHandler(index)}
            singleRecipe={recipe}
            callback={(newRecipe) => this.addRecipeHandler(newRecipe)}
            currentRecipe={this.state.currentRecipe}/>
        )
    })

    return (
      <div>
      {/*<p style={{textAlign: 'center'}}>Row for links</p>*/}
      <ul style={{textAlign:'center', display:'flex'}}>
        <p style={{marginRight:'5px'}}>link 1</p>
        <p>link 2</p>
      </ul>
      <br/>
      <div className={classes.FlexContainer}>
        <ul>
        {recipeItem}
        </ul>
        <Ingredients
          currentRecipe={this.state.currentRecipe}
          ingredientList={this.state.recipes[this.state.currentRecipe]} className={classes.Box} />
        <AddRecipe  className={classes.Box}/>


      </div>
      </div>
    )
  }
}

export default Layout;
