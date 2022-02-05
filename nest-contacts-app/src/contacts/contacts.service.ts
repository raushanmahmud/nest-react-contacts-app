import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactsRepository: Repository<Contact>,
  ) {}

  create(createContactDto: CreateContactDto) {
    const newContact = this.contactsRepository.create(createContactDto);
    return this.contactsRepository.save(newContact);
  }

  async findAll(
    take?: number,
    page?: number,
    name?: string,
    lastName?: string,
    phone?: string,
  ) {
    let filterObj = {};
    if (name) {
      filterObj = { name: Like(`%${name}%`) };
    }
    if (lastName) {
      filterObj = { ...filterObj, lastName: Like(`%${lastName}%`) };
    }
    if (phone) {
      filterObj = { ...filterObj, phone: Like(`%${phone}%`) };
    }
    const limit = take || 5;
    const offset = page && page > 0 ? (page - 1) * limit : 0;

    const [result, total] = await this.contactsRepository.findAndCount({
      where: filterObj,
      order: { id: 'ASC' },
      take: limit,
      skip: offset,
    });

    return {
      contacts: result,
      count: total,
    };
  }

  findOne(id: number) {
    return this.contactsRepository.findOne(id);
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    const contact = await this.contactsRepository.findOne(id);
    contact.name = updateContactDto.name;
    contact.lastName = updateContactDto.lastName;
    contact.phone = updateContactDto.phone;
    contact.dateOfBirth = updateContactDto.dateOfBirth;
    return this.contactsRepository.save(contact);
  }

  async remove(id: number) {
    const contact = await this.contactsRepository.findOne(id);
    if (contact) {
      return this.contactsRepository.remove(contact);
    }
  }
}
