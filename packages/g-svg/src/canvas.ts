import { AbstractCanvas } from '@antv/g-base';
import { ChangeType } from '@antv/g-base/lib/types';
import { ISVGElement } from './interfaces';
import { drawChildren, applyClipChildren, drawPathChildren, refreshElement } from './util/draw';
import { setClip } from './util/svg';
import Shape from './shape';
import Group from './group';
import Defs from './defs';

class Canvas extends AbstractCanvas {
  constructor(cfg) {
    super(cfg);
  }

  /**
   * 一些方法调用会引起画布变化
   * @param {string} changeType 改变的类型
   */
  onCanvasChange(changeType: ChangeType) {
    refreshElement(this, changeType);
  }

  getShapeBase() {
    return Shape;
  }

  getGroupBase() {
    return Group;
  }

  // 复写基类的方法生成标签
  createDom() {
    const element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const context = new Defs(element);
    element.setAttribute('width', `${this.get('width')}`);
    element.setAttribute('height', `${this.get('height')}`);
    // 缓存 context 对象
    this.set('context', context);
    return element;
  }

  // 复写基类的 draw 方法
  draw() {
    const context = this.get('context');
    this.applyClip(context);
    this.drawPath(context);
  }

  applyClip(context: Defs) {
    const children = this.getChildren() as ISVGElement[];
    setClip(this, context);
    if (children.length) {
      applyClipChildren(context, children);
    }
  }

  drawPath(context: Defs) {
    const children = this.getChildren() as ISVGElement[];
    if (children.length) {
      drawPathChildren(context, children);
    }
  }
}

export default Canvas;
