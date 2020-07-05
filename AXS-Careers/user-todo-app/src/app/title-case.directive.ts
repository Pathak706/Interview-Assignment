import { Directive, OnInit, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTitleCase]',
})
export class TitleCaseDirective implements OnInit {
  constructor(private eRef: ElementRef) {}

  ngOnInit() {
    this.eRef.nativeElement.value = 'Name';
  }

  @HostListener('keyup') onkeyup() {
    if(this.eRef.nativeElement.value) {
      const arr: string[] = this.eRef.nativeElement.value.split('');
      arr[0] = arr[0].toUpperCase();
      this.eRef.nativeElement.value = arr.join('');
    }
  }
}
