import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { ContactPaginated } from './entities/contact-paginated.entity';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto): Promise<Contact> {
    return this.contactsService.create(createContactDto);
  }

  @Get()
  findAll(
    @Query('name') name: string,
    @Query('lastName') lastName: string,
    @Query('phone') phone: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<ContactPaginated> {
    return this.contactsService.findAll(+limit, +page, name, lastName, phone);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Contact> {
    const contact = await this.contactsService.findOne(+id);
    if (!contact) {
      throw new NotFoundException();
    }
    return contact;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ): Promise<Contact> {
    const contact = await this.contactsService.findOne(+id);
    if (!contact) {
      throw new NotFoundException();
    }
    return this.contactsService.update(+id, updateContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<any> {
    return this.contactsService.remove(+id);
  }
}
