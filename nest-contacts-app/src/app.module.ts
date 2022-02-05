import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ContactsModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
