import {
  IsAlphanumeric,
  IsDateString,
  IsDefined,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateContactDto {
  @IsDefined({ always: true })
  @IsString({ always: true })
  @MinLength(2, { always: true })
  @IsAlphanumeric()
  name: string;

  @IsDefined({ always: true })
  @IsString({ always: true })
  @MinLength(2, { always: true })
  @IsAlphanumeric()
  lastName: string;

  @IsDefined({ always: true })
  @IsString({ always: true })
  @IsPhoneNumber()
  phone: string;

  @IsDefined({ always: true })
  @IsString({ always: true })
  @IsDateString(null, { always: true })
  dateOfBirth: string;
}
