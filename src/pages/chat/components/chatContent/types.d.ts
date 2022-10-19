import { BaseProps } from '../../../../utils/baseBlock';
import { Button } from '../../../../components/button';
import { Input } from '../../../../components/input';

export interface Props extends BaseProps {
  messageRow: Input;
  sendButton: Button;
}
