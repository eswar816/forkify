import * as model from './model'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';

import '../sass/main.scss';

const controlRecipes = async function () {
  // 1) Loading recipe
  try {
    const id = window.location.hash.slice(1);

    if(!id) return
    recipeView.renderSpinner();

    //  0) Update results view to mark selected search result
    resultView.update(model.getSearchResultsPage());
    
    await model.loadRecipe(id);
    
    // 2) Rendering a recipe
    recipeView.render(model.state.recipe);
    bookmarkView.update(model.state.bookmarks);
  } catch (err) {
    // alert(err);
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResult = async function(){
  try {
    // resultView.renderSpinner();
    resultView.renderSpinner()
    // Get query
    const query = searchView.getQuery();
    if(!query) return;

    // Load search results
    await model.loadSearchResults(query);

    // Render results
    resultView.render(model.getSearchResultsPage());

    // pagination
    paginationView.render(model.state.search);
  } catch(err){
    console.log(err);
    resultView.renderError();
  }
};

const controlPagination = function(goToPage){
  // Render results
  resultView.render(model.getSearchResultsPage(goToPage));

  // pagination
  paginationView.render(model.state.search);
};

const controlServings = function(newServings) {
  // Update the recipe servings(in state)
  model.updateServings(newServings);

  // Update the review view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function(){
  // 1) Add or remove bookmark
  if(!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3)  Render bookmarks
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmark = function(){
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function(newRecipe){
  try {
    // Render spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarkView.render(model.state.bookmarks);

    // Change the ID in the url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // window.history.back();

    // Close form window
    setTimeout(function() {
      addRecipeView.toggleWindow();
    }, 2500);
  } catch(err) {
    console.log(err);
    addRecipeView.renderError(err.message);
  }
};

(function init() {
  bookmarkView.addHandlerRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
})();