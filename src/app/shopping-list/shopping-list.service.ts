import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "../../../node_modules/rxjs";

export class ShoppingListService {
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
     ];
     
     getIngredients() {
         return this.ingredients;
     }

     getIngredient(index: number) {
         return this.ingredients[index];
     }

     addIngredient(ingredient: Ingredient) {
         this.ingredients.push(ingredient);
     }

     addIngredients(ingredients: Ingredient[]) {
         this.ingredients.push(...ingredients);
     }

}