import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: [
  ]
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients: Ingredient[] ;
  ingreSubscription : Subscription;
  constructor(private slSercive: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slSercive.getIngredients();
   this.ingreSubscription =  this.slSercive.ingredientChanges.subscribe(
      (ingredient: Ingredient[]) => {
        this.ingredients = ingredient
      }
    );
  }

  ngOnDestroy(): void {
    this.ingreSubscription.unsubscribe();
  }

  onEditItem(id: number){
    this.slSercive.startedEditing.next(id);
  }

}
