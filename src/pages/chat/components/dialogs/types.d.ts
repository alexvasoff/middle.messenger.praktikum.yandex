export interface Dialog {
  id: number;
  title: string;
  avatar: unknown;
  created_by: number;
  unread_count: number;
  last_message: string | null;
}
