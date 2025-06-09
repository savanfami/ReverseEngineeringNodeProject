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
      const token =await this.authModel.login();
      const users= await this.userModel.getUsers(token as string);
      // console.log(users,'userss')
      // console.log(users,'users')
      // const authUser = await this.authModel.getAuthenticatedUser(token);
  
      const output: User[] = [...users];
      await this.outputView.saveUsers(output);
    } catch (error: any) {
      console.error('error ', error);
    }
  }
}