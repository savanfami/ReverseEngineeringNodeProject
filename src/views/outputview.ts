import { promises as fs } from 'fs';
import { join } from 'path';
import { User } from 'types/types';

export class OutputView {
  private outputFile: string = join(__dirname, '../../users.json');

  async saveUsers(users: User[]): Promise<void> {
    if (users.length !== 10) {
      throw new Error(`Expected 10 users, got ${users.length}`);
    }
    await fs.writeFile(this.outputFile, JSON.stringify(users, null, 2));
    console.log('Successfully saved users.json with', users.length, 'items');
  }
}