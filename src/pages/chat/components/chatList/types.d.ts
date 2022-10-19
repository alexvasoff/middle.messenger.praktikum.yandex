import { BaseProps } from '../../../../utils/baseBlock';
import { Input } from '../../../../components/input';
import { Dialogs } from '../dialogs';
import { Button } from '../../../../components/button';

export interface Props extends BaseProps {
  settings: Button
  createChat: Button
  search: Input
  dialogs: Dialogs
}
