import { Injectable } from "../../../node_modules/@angular/core";
import { Http, Response } from "../../../node_modules/@angular/http";
import { map } from 'rxjs/operators';

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable()
export class DataStorageService {
    constructor(private http: Http,
                private recipesService: RecipeService){}

    storeRecipes() {
      return this.http.put('https://ng-recipe-book-84ec3.firebaseio.com/recipes.json',
                      this.recipesService.getRecipes());
    }

    getRecipes() {
        this.http.get('https://ng-recipe-book-84ec3.firebaseio.com/recipes.json')
         .pipe(map(
             (response: Response) => {
                const recipes: Recipe[] = response.json();
                for (let recipe of recipes) {
                    if (!recipe['ingredients']) {
                        console.log(recipe);
                        recipe['ingredients'] = [];
                    }
                }
                return recipes;
             }
         ))
         .subscribe(
             (recipes: Recipe[]) => {
                 this.recipesService.setRecipes(recipes);
             }
         );
    }
}