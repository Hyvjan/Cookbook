import React, { Component } from 'react';
import AddRecipe from '../../components/AddRecipe/AddRecipe';
import classes from './Layout.css';
import Recipes from '../../components/Recipes/Recipes';
import Ingredients from '../../components/Ingredients/Ingredients';
import Logout from '../../components/Logout/Logout';
import { Route, Link, withRouter } from 'react-router-dom';

import {connect} from 'react-redux';
import * as actionTypes from '../../store/Actions';
import { getRecipes, signOut} from '../../store/Actions';
import SignIn from '../../components/SignIn/SignIn';

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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.signedIn !== this.props.signedIn) {
      console.log("getRecipes laukesi layoutissa")
      this.props.getRecipes(this.props.token);
    }
  }

  componentDidMount() {
      
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
    let content = null;

    if (this.props.signedIn) {
      linksList =
      <ul style={{textAlign:'center', display:'flex'}}>
        <Link to="/">
          <p style={{marginRight:'5px'}}>Recipes</p>
        </Link>
        <Link to="/addRecipe">
          <p style={{marginRight:'5px'}}>Add new Recipe</p>
        </Link>
        <Link to="/logout">
          <p style={{marginRight:'5px'}}>Sign Out</p>
        </Link>
      </ul>

      content =
      <div className={classes.FlexContainer}>
      <ul>
      {recipeItem}
      </ul>
      <Ingredients
        currentRecipe={this.props.currentRecipe}
        ingredientList={this.props.recipes[this.props.currentRecipe]}
        className={classes.Box} />
      <Route path="/addRecipe" component={ AddRecipe } />
      <Route path="/logout" component={ Logout } />
    </div>
    } else {
      linksList=
      <ul style={{textAlign:'center', display:'flex'}}>
        <Link to="/signIn">
          <p style={{marginRight:'5px'}}>Sign In</p>
        </Link>
      </ul>

      content = 
          <div className={classes.Entrytext}>
            <p>Welcome to Cookbook! Please sign In if you have user account
              or request one by sending email to santaclaus@korvatunturi.fi</p>
             <Route path="/SignIn" component={ SignIn } />
          </div>
      
    }   


    return (
      <div>
      {/*<p style={{textAlign: 'center'}}>Row for links</p>*/}
      {linksList}
      <br/>
      {content}
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
      recipes: state.recipes,
      currentRecipe: state.currentRecipe,
      signedIn: state.signedIn,
      token: state.token
    }
}

const mapDispatchToProps = dispatch => {
  return {
      setCurrentRecipe: (currentRecipe) => dispatch({type:actionTypes.CURRENT_RECIPE, currentRecipe: currentRecipe}),
      getRecipes: (token) => dispatch(getRecipes(token)),
      signOut: () => dispatch(signOut()),

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
