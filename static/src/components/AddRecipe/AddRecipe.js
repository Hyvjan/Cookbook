import React, { Component } from 'react';
import classes from './AddRecipe.css';

class AddIngredient extends Component {

  state = {
    'ingredients': {},
    'ingredientToAdd': "",
    'amountToAdd': "",
    'currentRecipeName':""
  }

  currentIngredientHandler = (evt) => {
    this.setState({'ingredientToAdd': evt.target.value })
  }

  currentAmountHandler = (evt) => {
    this.setState({'amountToAdd': evt.target.value })
  }

  currentRecipeHandler = (evt) => {
    this.setState({'currentRecipeName': evt.target.value })
  }

  addIngredient = () => {
    const oldIngredients = {...this.state}
    const ingredient = this.state.ingredientToAdd
    const amount= this.state.amountToAdd
    const recipe = this.state.currentRecipeName
    const addJson = {}
    addJson[ingredient]=amount
    addJson['name']=recipe
    //{ingredient : amount, 'name': recipe}
    oldIngredients.ingredients[ingredient]=amount
    oldIngredients.ingredients['name']=recipe
    const newIngredients = oldIngredients.ingredients
    this.setState({'ingredients':newIngredients, 'ingredientToAdd': "",
    'amountToAdd': "",})
    console.log(this.state)
  }

  render () {

  return (
  <div className={classes.Container}>

    <input type="text" value={this.state.currentRecipe}
      onChange={(evt) => this.currentRecipeHandler(evt)}
      placeholder="Add recipe name"/>
    <input type="text" value={this.state.ingredientToAdd}
      onChange={(evt) => this.currentIngredientHandler(evt)}
      placeholder="Add ingredient name"/>
    <input type="text" value={this.state.amountToAdd}
      onChange={(evt) => this.currentAmountHandler(evt)}
      placeholder="Add ingredient amount"/>
    <button onClick={this.addIngredient}>Save ingredient</button>
    <button >Save recipe</button>
  </div>
)
}
};

export default AddIngredient;
