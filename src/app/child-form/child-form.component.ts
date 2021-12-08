import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { RecipeServiceService as RecipeService} from '../recipe-service.service';

@Component({
  selector: 'app-child-form',
  templateUrl: './child-form.component.html',
  styleUrls: ['./child-form.component.css']
})
export class ChildFormComponent implements OnInit {
  recipeList: any[] = [
    {title: 'Fish Array',
    url: '',
    image: ''}
  ];
  isVisible: boolean = false;
  cached: boolean = false;


  ngOnInit() {
    this.getRecipeByName();
  }
  //Use FormBuilder service as a quick way to set up a form group
  //needs FormBuilder service injected
  recipeFormGroup = this.form.group({
    queryControl: ['', [Validators.required, Validators.minLength(1)]]
  })

  constructor(private recipeService: RecipeService, private form: FormBuilder) {}

  getRecipeByName() {
    //do all of your form checking here...

    //then call the service..(*separation of responsibility*)
    this.recipeService.getRecipeByFormGroup(this.recipeFormGroup).subscribe(
        (response: { [x: string]: any; }) => {
          console.log(response)
          if (response['dishData'].length == 0 ) {
            this.isVisible = false
          }else{
            this.isVisible = true;
          }
          this.recipeList = response['dishData'];
          this.cached = response['cached'];
      }
    );
  }
}
