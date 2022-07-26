import { Component, OnDestroy, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styles: [
  ]
})
export class RecipeListComponent implements OnInit ,OnDestroy{
  recipeSubscription : Subscription;
  recipes: Recipe[];
  
  constructor(private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeSubscription = this.recipeService.recipesChanged.subscribe(
      (recipe: Recipe[])=>{
        this.recipes = recipe
      }
    );
    this.recipes= this.recipeService.getRecipes();
  }
  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }


}
