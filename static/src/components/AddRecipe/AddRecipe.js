import React, { Component } from 'react';
import classes from './AddRecipe.css';
import axios from 'axios';
import {postRecipe} from '../../store/actions';
import {connect} from 'react-redux';

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
    oldIngredients.ingredients[ingredient]=amount
    oldIngredients.ingredients['name']=recipe
    const newIngredients = oldIngredients.ingredients
    this.setState({'ingredients':newIngredients, 'ingredientToAdd': "",
    'amountToAdd': "",})
    console.log(this.state)
  }

  postRecipe = () => {
    this.props.postRecipe(this.state.ingredients, this.props.token);
  }

  render () {

  return (
  <div className={classes.Container}>
    <h1>Add new recipe</h1>
    <input type="text" value={this.state.currentRecipe}
      onChange={(evt) => this.currentRecipeHandler(evt)}
      placeholder="Add recipe name"/><br />
    <input type="text" value={this.state.ingredientToAdd}
      onChange={(evt) => this.currentIngredientHandler(evt)}
      placeholder="Add ingredient name"/><br />
    <input type="text" value={this.state.amountToAdd}
      onChange={(evt) => this.currentAmountHandler(evt)}
      placeholder="Add ingredient amount"/><br />
    <button onClick={this.addIngredient}>Save ingredient</button><br />
    <button
      onClick={this.postRecipe}
      >Save recipe</button>
  </div>
)
}
};

const mapStateToProps = state => {
  return {
    token: state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
      postRecipe: (ingredients, token) => dispatch(postRecipe(ingredients, token)),
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(AddIngredient);
