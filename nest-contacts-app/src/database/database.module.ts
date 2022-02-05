import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from '../contacts/entities/contact.entity';

// postgres on the cloud for development purposes, in real world production
// would have to use Env variables and migration for postgres
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'castor.db.elephantsql.com',
      port: 5432,
      username: 'fuxrrweb',
      password: 'uB4GPvV28fbK_D0zxAZDMt05ojHWInj2',
      database: 'fuxrrweb',
      entities: [Contact],
      // synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
