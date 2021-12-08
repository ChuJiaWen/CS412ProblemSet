import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {newArray} from "@angular/compiler/src/util";

@Component({
  selector: 'app-child-response',
  templateUrl: './child-response.component.html',
  styleUrls: ['./child-response.component.css']
})
export class ChildResponseComponent implements OnInit {
  @Input() recipeList: any[] =[]// decorate the property with @Input()
  @Input() isVisible: boolean | undefined;
  @Input() cached: boolean | undefined;


  constructor() { }

  ngOnInit(): void {
  }

}
