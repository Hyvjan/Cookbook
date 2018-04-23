import React, { Component } from 'react';
import AddRecipe from '../../components/AddRecipe/AddRecipe';
import classes from './Layout.css';
import Recipes from '../../components/Recipes/Recipes';
import Ingredients from '../../components/Ingredients/Ingredients';
import { Route, Link, withRouter } from 'react-router-dom';

import {connect} from 'react-redux';
import * as actionTypes from '../../store/Actions';
import { getRecipes} from '../../store/Actions';

class Layout extends Component {
  /*
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
*/

  componentDidMount() {
      this.props.getRecipes();
      console.log("componentDidMount executed");
  }

  showIngredientsHandler = (index) => {
    this.props.setCurrentRecipe(index);
  }

  render () {

    const recipeItem = this.props.recipes.map((recipe, index) => {
        return (
          <Recipes key={index} className={classes.Box}
            indexValue={index}
            clicked={() => this.showIngredientsHandler(index)}
            singleRecipe={recipe}
            currentRecipe={this.props.currentRecipe}/>
        )
    })

    let linksList = null;

    if (this.props.signedIn) {
      linksList =
      <ul style={{textAlign:'center', display:'flex'}}>
        <Link to="/">
          <p style={{marginRight:'5px'}}>Recipes</p>
        </Link>
        <Link to="/addRecipe">
          <p>Add new Recipe</p>
        </Link>
      </ul>
    } else {
      linksList=
      <ul style={{textAlign:'center', display:'flex'}}>
        <Link to="/signIn">
          <p style={{marginRight:'5px'}}>Sign In</p>
        </Link>
      </ul>
    }   


    return (
      <div>
      {/*<p style={{textAlign: 'center'}}>Row for links</p>*/}
      {linksList}
      <br/>
      <div className={classes.FlexContainer}>
          <ul>
          {recipeItem}
          </ul>
        <Ingredients
          currentRecipe={this.props.currentRecipe}
          ingredientList={this.props.recipes[this.props.currentRecipe]}
          className={classes.Box} />
        <Route path="/addRecipe" component={ AddRecipe } />
    
      </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
      recipes: state.recipes,
      currentRecipe: state.currentRecipe,
      signedIn: state.signedIn
    }
}

const mapDispatchToProps = dispatch => {
  return {
      setCurrentRecipe: (currentRecipe) => dispatch({type:actionTypes.CURRENT_RECIPE, currentRecipe: currentRecipe}),
      getRecipes: () => dispatch(getRecipes())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
