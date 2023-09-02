export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
};

export interface Gift {
  gift_id: number;
  gifter_id: number;
  receiver: string;
  receiver_name: string;
  occasion: string;
  date: string;
  interest: string;
  budget: string;
  gift: string;
}