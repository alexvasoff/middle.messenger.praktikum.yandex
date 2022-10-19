import { BaseProps } from '../../../../utils/baseBlock';

export interface Dialog extends BaseProps{
  id: number;
  title: string;
  avatar: unknown;
  created_by: number;
  unread_count: number;
  last_message: string | null;
}

export interface Dialogs extends BaseProps{
  dialogs: Dialog[];
}
