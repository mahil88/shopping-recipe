import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styles: [
  ]
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItemId : number;
  editedItem: Ingredient;
  @ViewChild('f',{static:false}) slForm : NgForm;

  
  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
    this.subscription= this.slService.startedEditing.subscribe(
      (id: number) => {
        this.editMode=true;
        this.editedItemId=id;
        this.editedItem = this.slService.getIngredient(id);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  onAddItem(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemId,newIngredient);
    }else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode =false;
    form.reset();
  }
  onClear(){
    this.editMode =false;
    this.slForm.reset();
  }
  onDelete(){
    this.slService.deleteIngredient(this.editedItemId);
    this.onClear();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
