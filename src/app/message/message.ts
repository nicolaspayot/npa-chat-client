interface Sender {
  nickname: string;
  avatar: string;
}

export interface Message {
  content: string;
  timestamp: string;
  sender: Sender;
}
