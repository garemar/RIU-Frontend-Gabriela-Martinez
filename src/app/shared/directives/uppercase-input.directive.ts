import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appUppercaseInput]',
  standalone: true
})
export class UppercaseInputDirective {
  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    const start = input.selectionStart;
    const end = input.selectionEnd;

    const upper = input.value.toUpperCase();

    if (input.value !== upper) {
      input.value = upper;

      if (start !== null && end !== null) {
        input.setSelectionRange(start, end);
      }
    }
  }
}
