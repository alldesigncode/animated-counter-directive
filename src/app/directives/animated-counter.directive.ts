import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const DEFAULT_ANIMATION_SPEED = 8;

/*

USAGE:

<div
  [appAnimatedCounter]="yourDynamicNumber"
  [delay]="delayInMiliseconds">
  any static text that will be appended next to number
</div>

*/

@Directive({
  selector: '[appAnimatedCounter]',
})
export class AnimatedCounterDirective implements OnInit, OnDestroy {
  @Input('appAnimatedCounter') value: number;
  @Input() delay = 0;
  @Input() speed = DEFAULT_ANIMATION_SPEED;

  staticText: string;

  private destroyed$ = new Subject<void>();
  private startingValue = 0;
  private startingValueDecimal = 0;

  constructor(private el: ElementRef<HTMLElement>, private render: Renderer2) {}

  ngOnInit() {
    if (!!this.el.nativeElement.textContent) {
      this.staticText = this.el.nativeElement.textContent;
    }

    if (this.delay > 0) {
      this.render.setProperty(this.el.nativeElement, 'textContent', this.startingValue);
    }

    timer(this.delay || 0)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((_) => this.animate());
  }

  private get hasDecimal(): boolean {
    const decimalPortion = this.getDecimalValuePortion(1);

    if (decimalPortion !== undefined) {
      return true;
    }
    return false;
  }

  private getDecimalValuePortion(indexPosition): number {
    const decimalPortion = this.value.toString().split('.')[indexPosition];
    return parseFloat(decimalPortion);
  }

  private animate(): void {
    if (this.value && this.safeValidate(this.value)) {
      const start = () => {
        if (this.startingValue < this.value) {
          this.startingValue++;
          this.render.setProperty(this.el.nativeElement, 'textContent', `${this.startingValue}${this.staticText ? this.staticText : ''}`);
          setTimeout(start, this.speed);
        } else if (this.hasDecimal) {
          // continue animating if number is decimal
          if (this.startingValueDecimal < this.getDecimalValuePortion(1)) {
            this.startingValueDecimal++;
            this.render.setProperty(this.el.nativeElement, 'textContent', `${this.getDecimalValuePortion(0)}.${this.startingValueDecimal}${this.staticText ? this.staticText : ''}`);
            setTimeout(start, this.speed);
          }
        }
      };

      start();
    }
  }

  private safeValidate(value): boolean {
    return typeof value === 'number';
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
