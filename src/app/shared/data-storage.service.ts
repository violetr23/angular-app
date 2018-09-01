import { Injectable } from "../../../node_modules/@angular/core";
import { Http, Response } from "../../../node_modules/@angular/http";
import { map } from 'rxjs/operators';

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService {
    constructor(private http: Http,
                private recipesService: RecipeService,
                private authService: AuthService){}

    storeRecipes() {
      const token = this.authService.getToken();
      return this.http.put('https://ng-recipe-book-84ec3.firebaseio.com/recipes.json?auth=' + token,
                      this.recipesService.getRecipes());
    }

    getRecipes() {
        const token = this.authService.getToken();
        this.http.get('https://ng-recipe-book-84ec3.firebaseio.com/recipes.json?auth=' + token)
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