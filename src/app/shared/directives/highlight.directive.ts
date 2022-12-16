import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from "@angular/core";

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective implements AfterViewInit {

  @Input() color = 'gray';

  constructor(private el: ElementRef,
    private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this.highlight(this.color);
  }
  public highlight(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }

  @HostListener('mouseenter') public onMouseEnter() {
    this.highlight('black');
  }

  @HostListener('mouseleave') public onMouseLeave() {
    this.highlight(this.color);
  }

  @HostListener('click') public onClick() {
    this.color = 'pink';
  }
}
