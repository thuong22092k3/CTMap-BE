export interface IUser {
  userName: string;
  email: string;
  password: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  showUserName?: boolean;
}
