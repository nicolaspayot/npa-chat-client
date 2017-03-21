/* tslint:disable:directive-selector */
import { Directive, AfterViewChecked } from '@angular/core';

declare const componentHandler: any;

@Directive({ selector: '[mdl]' })
export class MDLDirective implements AfterViewChecked {
  ngAfterViewChecked() {
    componentHandler.upgradeDom();
  }
}
