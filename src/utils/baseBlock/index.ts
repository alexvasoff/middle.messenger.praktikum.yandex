import { EventBus } from '../eventBus';
import { v4 as makeUUID } from 'uuid';

// Нельзя создавать экземпляр данного класса
class BaseBlock {
  static EVENTS = {
    INIT: 'init',
    FLOW_CMD: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };
  private _id = makeUUID();
  private _element = null;

  private _meta = null;

  private props = null;

  private eventBus = null;

  constructor(tagName = 'div', props = {}) {
    const eventBus = new EventBus();

    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy({ ...props, __id: this._id });

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(BaseBlock.EVENTS.INIT);
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
    this._eventBus().emit(BaseBlock.EVENTS.FLOW_CMD);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount(oldProps) {
    this.eventBus().emit(BaseBlock.EVENTS.FLOW_RENDER);
  }

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

    Object.keys(events).forEach(eventName => {
      this._element.addEventListener(eventName, events[eventName]);
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
    this._element.innerHTML = block;
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
    if (true) {
      this.setProps({
        className: 'hide',
      });
    }
    this.getContent().style.display = 'none';
  }
}

export { BaseBlock };
