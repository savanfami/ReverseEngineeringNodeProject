import { OutputView } from '../views/outputview';
import { User } from 'types/types';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';

export class Controller {
  private authModel: AuthController;
  private userModel: UserController;
  private outputView: OutputView;

  constructor() {
    this.authModel = new AuthController();
    this.userModel = new UserController();
    this.outputView = new OutputView();
  }

  async execute(): Promise<void> {
    try {
      const token = await this.authModel.getAuthToken();
      const users = await this.userModel.getUsers(token);
      const authUser = await this.userModel.getAuthenticatedUser(token);
      const output: User[] = [...users, authUser];
      await this.outputView.saveUsers(output);
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  }
}