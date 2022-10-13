export type Props = {
  name: string;
  text: string;
  type?: 'default' | 'text' | 'danger-text';
  events?: Record<string, unknown>;
};
