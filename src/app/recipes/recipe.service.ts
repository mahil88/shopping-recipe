import {  Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
  recipesChanged = new Subject<Recipe[]>();

  //  private recipes: Recipe[] = [
  //       new Recipe('test1','test1 desc','https://th.bing.com/th/id/R.8cb78d4601ac6b574ce19b7c96abbd12?rik=baHLI8ewx2jgBg&pid=ImgRaw&r=0',[new Ingredient('Meat',1),new Ingredient('Rice',2)]),
  //       new Recipe('test1','test1 desc','https://th.bing.com/th/id/R.8cb78d4601ac6b574ce19b7c96abbd12?rik=baHLI8ewx2jgBg&pid=ImgRaw&r=0',[new Ingredient('Meat',2),new Ingredient('Rice',5)]),
  //       new Recipe('test1','test1 desc','https://th.bing.com/th/id/R.8cb78d4601ac6b574ce19b7c96abbd12?rik=baHLI8ewx2jgBg&pid=ImgRaw&r=0',[new Ingredient('Meat',3),new Ingredient('Rice',1)])
        
  //   ];
    private recipes: Recipe[] =[];

    constructor(private slService: ShoppingListService){}

    setRecipes(recipes: Recipe[]){
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }
    getRecipe(id: number){
        return this.recipes[id];
    }

    addIngredientToShoppingList(ingredient: Ingredient[]){
      this.slService.addIngredients(ingredient);
    }

    addRecipe(recipe: Recipe){
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(id:number,recipe: Recipe){
      this.recipes[id] =recipe;
      this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(id:number){
      this.recipes.splice(id,1);
      this.recipesChanged.next(this.recipes.slice());
    }
}