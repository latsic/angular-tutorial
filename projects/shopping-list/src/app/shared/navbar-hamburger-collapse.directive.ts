import { Directive, HostListener, Input, Renderer2 } from "@angular/core";

@Directive({
  selector: '[appNavbarHamburgerCollapse]'
})
export class NavbarHamburgerCollapseDirective {
  
  constructor(private renderer: Renderer2) {
  }
  
  @Input("appNavbarHamburgerCollapse")
  collapseTarget: any;

  isCollapsed: boolean = true;

  @HostListener("click")
  onClick(): void {
  
    this.isCollapsed = !this.isCollapsed;

    this.isCollapsed
      ? this.renderer.addClass(this.collapseTarget, "collapse")
      : this.renderer.removeClass(this.collapseTarget, "collapse");
  }

}