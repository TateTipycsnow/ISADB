import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tab4'
})
export class Tab4Pipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
