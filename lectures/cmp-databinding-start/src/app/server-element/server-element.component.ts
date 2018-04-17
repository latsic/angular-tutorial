import { 
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  ViewChild,
  ElementRef,
  ContentChild
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class ServerElementComponent
  implements OnInit, OnChanges, DoCheck,
    AfterContentChecked, AfterContentInit, AfterViewInit, AfterViewChecked,
    OnDestroy {

  @ViewChild("heading")
  header: ElementRef;
  
  @ContentChild("contentParagraph") paragraph: ElementRef;


  @Input("srvElement")
  element: {
    type: string,
    name: string,
    content: string
  };

  @Input("srvElementName")
  name: string;


  constructor() {
    console.log("constructor called");
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges called");
    console.log(changes);
  }
  ngOnInit() {
    console.log("ngOnInit called");
    console.log("textContent" + this.header.nativeElement.textContent);
  }

  ngDoCheck() {
    console.log("ngOnCheck called");
  }

  ngAfterContentInit() {
    console.log("ngAfterContentInit called");
    console.log("textContent" + this.header.nativeElement.textContent);
    console.log("p content: " + this.paragraph.nativeElement.textContent);
  }

  ngAfterContentChecked() {
    console.log("ngAfterContentChecked called");
  }

  ngAfterViewInit() {
    console.log("AfterViewInit called");
    console.log("textContent" + this.header.nativeElement.textContent);
  }

  ngAfterViewChecked() {
    console.log("ngAfterViewChecked called");
  }

  ngOnDestroy() {
    console.log("ngOnDestroy called");
  }
}
