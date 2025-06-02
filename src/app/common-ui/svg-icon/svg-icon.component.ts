import {Component, Input} from '@angular/core';

@Component({
  selector: 'svg[icon]',
  imports: [],
  // template: '<svg:use [attr.href]="href"></svg:use>',
  template: `<svg>
    <use [attr.href]="href" [attr.xlink:href]="href"></use>
  </svg>`,
  styles: ['']
})
export class SvgIconComponent {
  @Input() icon = ''

  get href() {
    return `/assets/svg/${this.icon}.svg#${this.icon}`;
  }
}
