import { Injectable } from '@angular/core'; //allows us to inject service into component
import {HttpClient} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {config as API} from '../config/searchrecipe';


@Injectable({
  providedIn: 'root' //what level we want the service to be available. Can be platform/root
})
export class RecipeServiceService {

  query: string = "fish";

  baseURL: string = API.baseURL

  constructor(private http: HttpClient) { }


  getRecipeByFormGroup(form: FormGroup) {
    console.log(`in getRecipeByQuery `);
    let query = form.value.queryControl;
    // return this.http.get(API.baseURL + query + '&apiKey='+ API.apiKey);
    let url = `/api/${query}`
    console.log("This is the url directing to :", url)
    return this.http.get(url);
  }
}
