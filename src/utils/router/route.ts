import { renderDOM } from '../renderDOM';
import { BaseBlock } from '../baseBlock';

export interface BlockConstructor<P = unknown>{
  new(props?: P): BaseBlock;
}

export class Route {
  private block: BaseBlock | null = null;

  constructor(
    private pathname: string,
    private readonly blockClass: BlockConstructor,
    private readonly props: Record<string, unknown>,
  ) {}

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this.block) {
      this.block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this.pathname;
  }

  render() {
    if (!this.block) {
      this.block = new this.blockClass();
      const rootQuery = this.props.rootQuery as string;
      renderDOM(rootQuery, this.block);
      return;
    }

    this.block.show();
  }
}
