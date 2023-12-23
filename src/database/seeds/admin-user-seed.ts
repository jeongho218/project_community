import { Users } from './../../users/users.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class MakeAdminUserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const makeAdminUser = dataSource.getRepository(Users);
    await makeAdminUser.insert([
      {
        email: 'admin',
        nickname: 'admin',
        password: 'admin',
        isAdmin: true,
      },
    ]);
  }
}
