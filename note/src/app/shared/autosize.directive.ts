import { ElementRef, HostListener, Directive } from '@angular/core';

@Directive({
  selector: 'ion-textarea[autosize]'
})

export class Autosize {
  @HostListener('input', ['$event.target'])
  onInput(textArea:HTMLTextAreaElement):void {
    this.adjust();
  }

  constructor(public element:ElementRef) {
  }

  adjust():void {
    const textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
    // console.log(textArea);
    if (textArea) {
      textArea.style.overflow = 'hidden';
      textArea.style.height = 'auto';
      textArea.style.height = textArea.scrollHeight + 'px';
      // console.log(textArea.scrollHeight);
    }
  }
}