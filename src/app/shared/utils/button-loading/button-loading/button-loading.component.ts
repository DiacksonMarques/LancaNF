import { Component, Input } from '@angular/core';

@Component({
  selector: 'util-button-loading',
  templateUrl: './button-loading.component.html',
  styleUrls: ['./button-loading.component.scss']
})
export class ButtonLoadingComponent {
  @Input() loading = false;
  @Input() disabled = false;
  @Input() type = 'button';
  @Input() color = '';
  @Input() description = 'Click me!';
  @Input() class = '';
  @Input() icon = '';
  @Input() iconNext = '';
}
