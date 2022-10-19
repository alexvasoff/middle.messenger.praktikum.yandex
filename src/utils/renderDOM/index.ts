import { BaseBlock } from '../baseBlock';

export function renderDOM(query: string, block: BaseBlock) {
  const root = document.querySelector(query);
  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();
  return root;
}
