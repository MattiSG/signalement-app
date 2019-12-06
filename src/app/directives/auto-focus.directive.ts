import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {

    public constructor(private el: ElementRef) {
    }

    public ngAfterViewInit() {
      setTimeout(() => {
        this.el.nativeElement.focus();
      });
    }

}
