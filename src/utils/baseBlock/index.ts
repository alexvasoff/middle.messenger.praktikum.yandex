import { v4 as makeUUID } from 'uuid';
import { EventBus } from '../eventBus';

export type BaseProps = {
  eventsTo? : string;
  events? : Record<string, Function>;
  [key: string | number]: any;
}

// Нельзя создавать экземпляр данного класса
class BaseBlock {
  static EVENTS = {
    INIT: 'init',
    FLOW_CMD: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private _id = makeUUID();

  private _element;

  private _meta = {};

  public props: BaseProps = {};

  public children = {};

  public eventBus;

  constructor(tagName = 'div', propsAndChildren: BaseProps = {}) {
    const eventBus = new EventBus();
    const { children, props } = this._getChildren(propsAndChildren);

    this._meta = {
      tagName,
      props,
      children,
    };

    this.props = this._makePropsProxy({ ...props, __id: this._id });
    this.children = children;

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(BaseBlock.EVENTS.INIT);
  }

  _getChildren(propsAndChildren) {
    const children = {};
    const props: BaseProps = {};
    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof BaseBlock) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  compile(template, props) {
    const propsAndStubs = { ...props };
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });
    const fragment = this._createDocumentElement('template');
    fragment.innerHTML = template(propsAndStubs);
    Object.values(this.children).forEach(child => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      stub.replaceWith(child.getContent());
    });
    return fragment.content;
  }

  _registerEvents(eventBus) {
    eventBus.on(BaseBlock.EVENTS.INIT, this.init.bind(this));
    eventBus.on(BaseBlock.EVENTS.FLOW_CMD, this._componentDidMount.bind(this));
    eventBus.on(BaseBlock.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(BaseBlock.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this._createResources();
    this.eventBus().emit(BaseBlock.EVENTS.FLOW_RENDER);
  }

  setProps = nextProps => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  _createDocumentElement(tagName) {
    const element = document.createElement(tagName);
    element.setAttribute('data-id', this._id);
    return element;
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(BaseBlock.EVENTS.FLOW_CMD);
  }

  _componentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidMount();
    });
    this.eventBus().emit(BaseBlock.EVENTS.FLOW_RENDER);
  }

  componentDidMount(oldProps) { }

  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return false;
    }
    this.eventBus().emit(BaseBlock.EVENTS.FLOW_RENDER);
  }

  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  _addEvents() {
    const { events = {} } = this.props;

    const directElementName = this.props.eventsTo;
    const directElement = directElementName
      ? this._element.querySelector(directElementName)
      : this._element;

    Object.keys(events).forEach(eventName => {
      directElement.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach(eventName => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  _render() {
    const block = this.render();
    this._removeEvents();
    if (typeof block !== 'string') {
      this._element.innerHTML = '';
      this._element.appendChild(block);
    } else {
      this._element.innerHTML = block;
    }
    this._addEvents();
  }

  render() {
    // Переопределяется пользователем. => Разметку
  }

  _makePropsProxy(props) {
    const self = this;
    return new Proxy(props, {
      get(target: {}, p: string | symbol): any {
        const value = target[p];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: {}, p: string | symbol, value: any): boolean {
        const oldProps = JSON.parse(JSON.stringify(target || {}));
        target[p] = value;
        self.eventBus().emit(BaseBlock.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  get element() {
    return this._element;
  }

  getContent() {
    return this.element;
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}

export { BaseBlock };
