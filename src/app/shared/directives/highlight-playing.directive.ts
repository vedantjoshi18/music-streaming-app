import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({ selector: '[appHighlightPlaying]' })
export class HighlightPlayingDirective implements OnChanges {
  @Input() appHighlightPlaying = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    if (this.appHighlightPlaying) {
      this.renderer.addClass(this.el.nativeElement, 'ring-1');
      this.renderer.addClass(this.el.nativeElement, 'ring-primary/50');
      this.renderer.addClass(this.el.nativeElement, 'bg-primary/5');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'ring-1');
      this.renderer.removeClass(this.el.nativeElement, 'ring-primary/50');
      this.renderer.removeClass(this.el.nativeElement, 'bg-primary/5');
    }
  }
}
