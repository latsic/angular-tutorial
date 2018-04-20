
import { Directive, ElementRef, HostListener, Renderer2, Input, HostBinding } from '@angular/core'

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  //@Input("")
  //appClassName: string = "";

  @HostBinding("class.open")
  isOpen: boolean = false;
  

  //constructor(
  //  private elementRef: ElementRef,
  //  private renderer: Renderer2) {
  //}

  @HostListener("click")
  onclick(): void{
    console.log("dropdown");
    this.isOpen = !this.isOpen;

  //  this.isOpen
  //    ? this.renderer.addClass(this.elementRef.nativeElement, this.appClassName)
  //    : this.renderer.removeClass(this.elementRef.nativeElement, this.appClassName);
  }
}