import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  Input,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[appHiddenText]',
  standalone: true,
})
export class HiddenTextDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input() maxLengthValue: number | undefined;
  private fullTextValue: string | undefined;
  private currentText: string | undefined;
  private maxLength: number | undefined;
  private showMoreBtn: HTMLElement | undefined;
  private showLessBtn: HTMLElement | undefined;
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.showMoreBtn = this.createElement('show-more', 'Show more');
    this.showLessBtn = this.createElement('show-less', 'Show less');
  }
  ngAfterViewInit(): void {
    this.maxLength = this.maxLengthValue ?? 250;
    this.fullTextValue = this.el.nativeElement.textContent;
    this.currentText = this.textEllipses(
      this.el.nativeElement.textContent,
      this.maxLength
    );
    this.el.nativeElement.innerHTML = this.currentText;
    this.onClick();
  }
  ngOnDestroy(): void {
    this.el.nativeElement.offsetParent.removeEventListener();
  }
  // Поки ще не розібрався з HostListener, зробив погано ((
  private onClick(): void {
    this.el.nativeElement.offsetParent.addEventListener(
      'click',
      (e: { target: HTMLElement | undefined }) => {
        if (e.target === this.showMoreBtn) {
          this.el.nativeElement.innerHTML = this.fullTextValue;
          this.renderer.setStyle(this.showMoreBtn, 'display', 'none');
          this.renderer.setStyle(this.showLessBtn, 'display', 'block');
        } else if (e.target === this.showLessBtn) {
          this.el.nativeElement.innerHTML = this.currentText!;
          this.renderer.setStyle(this.showLessBtn, 'display', 'none');
          this.renderer.setStyle(this.showMoreBtn, 'display', 'block');
        }
      }
    );
  }

  private createElement(className: string, buttonName: string): HTMLElement {
    const element = this.renderer.createElement('a');
    this.renderer.addClass(element, `${className}`);
    element.innerHTML = buttonName;
    this.renderer.setStyle(element, 'display', 'none');
    this.renderer.appendChild(this.el.nativeElement.offsetParent, element);
    return element;
  }

  private textEllipses(contentStr: string, charsNumber: number) {
    if (contentStr.length > charsNumber) {
      const spaceOrPunctuation: RegExp = /[\s.,;:!?'"]/;
      const position: number = contentStr
        .slice(charsNumber)
        .search(spaceOrPunctuation);
      charsNumber = charsNumber + position;
      this.renderer.setStyle(this.showMoreBtn, 'display', 'block');
      return contentStr.substring(0, charsNumber) + '...';
    } else {
      this.renderer.setStyle(this.showMoreBtn!, 'display', 'none');
      return contentStr;
    }
  }
}
