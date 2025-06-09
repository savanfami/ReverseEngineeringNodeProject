import { promises as fs } from 'fs';
import { join } from 'path';
import { User } from 'types/types';

export class OutputView {
  private outputFile: string = join(__dirname, '../../users.json');
  async saveUsers(users: User[]): Promise<void> {
    await fs.writeFile(this.outputFile, JSON.stringify(users, null, 2));
    console.log('saved users');
  }
}