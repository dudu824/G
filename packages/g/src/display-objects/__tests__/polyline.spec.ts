import { expect } from 'chai';
import { Polyline } from '../..';
import { vec3 } from 'gl-matrix';

describe('Polyline', () => {
  it('should calc global bounds correctly', () => {
    const points: [number, number][] = [
      [50, 50],
      [100, 50],
      [100, 100],
      [150, 100],
      [150, 150],
      [200, 150],
      [200, 200],
      [250, 200],
      [250, 250],
      [300, 250],
      [300, 300],
      [350, 300],
      [350, 350],
      [400, 350],
      [400, 400],
      [450, 400],
    ];

    const polyline = new Polyline({
      style: {
        points,
        lineWidth: 10,
      },
    });

    // get local position, left top corner
    expect(polyline.getLocalPosition()).eqls(vec3.fromValues(50, 50, 0));

    // get length
    expect(polyline.getTotalLength()).eqls(750);

    // get bounds
    let bounds = polyline.getBounds();
    if (bounds) {
      expect(bounds.center).eqls(vec3.fromValues(250, 225, 0));
      expect(bounds.halfExtents).eqls(vec3.fromValues(210, 185, 0));
    }

    // change lineWidth
    polyline.style.lineWidth = 20;
    bounds = polyline.getBounds();
    if (bounds) {
      expect(bounds.center).eqls(vec3.fromValues(250, 225, 0));
      expect(bounds.halfExtents).eqls(vec3.fromValues(220, 195, 0));
    }

    // change first point
    let newPoints = [...points];
    newPoints[0] = [0, 0];
    polyline.style.points = newPoints;
    expect(polyline.getLocalPosition()).eqls(vec3.fromValues(0, 0, 0));
    bounds = polyline.getBounds();
    if (bounds) {
      expect(bounds.center).eqls(vec3.fromValues(225, 200, 0));
      expect(bounds.halfExtents).eqls(vec3.fromValues(245, 220, 0));
    }

    polyline.translate(100, 0);

    // restore
    newPoints = [...points];
    newPoints[0] = [50, 50];
    polyline.style.points = newPoints;
    expect(polyline.getLocalPosition()).eqls(vec3.fromValues(150, 50, 0));
    bounds = polyline.getBounds();
    if (bounds) {
      expect(bounds.center).eqls(vec3.fromValues(350, 225, 0));
      expect(bounds.halfExtents).eqls(vec3.fromValues(220, 195, 0));
    }
    expect(polyline.getTotalLength()).eqls(750);
  });

  it('should getPoint at ratio correctly', () => {
    const polyline = new Polyline({
      style: {
        points: [
          [50, 50],
          [100, 50],
          [100, 100],
        ],
        lineWidth: 10,
      },
    });

    let point = polyline.getPoint(0);
    expect(point.x).eqls(50);
    expect(point.y).eqls(50);

    point = polyline.getPoint(1);
    expect(point.x).eqls(100);
    expect(point.y).eqls(100);

    // outside, return p[0]
    point = polyline.getPoint(10);
    expect(point.x).eqls(50);
    expect(point.y).eqls(50);
  });

  it('should calc tangent correctly', () => {
    const polyline = new Polyline({
      style: {
        points: [
          [50, 50],
          [100, 50],
          [100, 100],
        ],
        lineWidth: 10,
      },
    });

    expect(polyline.getStartTangent()).eqls([
      [100, 50],
      [50, 50],
    ]);

    expect(polyline.getEndTangent()).eqls([
      [100, 50],
      [100, 100],
    ]);
  });
});