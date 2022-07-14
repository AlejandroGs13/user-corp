import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appSpecialCharacters]'
})
export class SpecialCharactersDirective {

  regexStr = '^[a-zA-Z0-9áéíóúñÁÉÍÓÚÑ ]*$';
  @Input() isAlphaNumeric: boolean;

  constructor(private elRef: ElementRef) { }


  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this.elRef.nativeElement.value;
    this.elRef.nativeElement.value = initalValue.replace(/[^a-zA-ZáéíóúñññÁÉÍÓÚÑ ]*/g, '');
    if ( initalValue !== this.elRef.nativeElement.value) {
      event.stopPropagation();
    }
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  validateFields(event) {
    setTimeout(() => {

      this.elRef.nativeElement.value = this.elRef.nativeElement.value.replace(/[^A-Za-z ]/g, '').replace(/\s/g, '');
      event.preventDefault();

    }, 100)
  }
 
 
}
