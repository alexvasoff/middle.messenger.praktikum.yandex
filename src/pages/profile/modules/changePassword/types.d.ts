import { Avatar } from '../../../../components/avatar';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';

export interface Props {
  avatar: Avatar;
  oldPassword: Input;
  newPassword: Input;
  newPasswordGuard: Input;
  savaChanges: Button;
  back: Button;
}
