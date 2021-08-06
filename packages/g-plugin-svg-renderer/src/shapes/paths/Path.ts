import { PathStyleProps } from '@antv/g';
import { ElementRenderer } from '.';
import { injectable } from 'inversify';

@injectable()
export class PathRenderer implements ElementRenderer<PathStyleProps> {
  apply($el: SVGElement, attributes: PathStyleProps) {
    const { path, x = 0, y = 0 } = attributes;
    $el.setAttribute('d', this.formatPath(path, x, y));
  }

  private formatPath(value: any[], x: number, y: number) {
    const newValue = value
      .map((params) => {
        const command = params[0];

        switch (command) {
          case 'M':
            return `M ${params[1] - x},${params[2] - y}`;
          case 'L':
            return `L ${params[1] - x},${params[2] - y}`;
          case 'Q':
            return `Q ${params[1] - x} ${params[2] - y},${params[3] - x} ${params[4] - y}`;
          case 'C':
            return `C ${params[1] - x} ${params[2] - y},${params[3] - x} ${params[4] - y},${params[5] - x} ${params[6] - y}`;
          case 'A':
            return `A ${params[1]} ${params[2]} ${params[3]} ${params[4]} ${params[5]} ${params[6] - x} ${params[7] - y}`;
          case 'Z':
            return 'Z';
          default:
            break;
        }
      })
      .join(' ');
    if (~newValue.indexOf('NaN')) {
      return '';
    }
    return newValue;
  }
}