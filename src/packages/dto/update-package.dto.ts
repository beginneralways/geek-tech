import { PartialType } from '@nestjs/swagger';
import { PackageDto } from './create-package.dto';

export class UpdatePackageDto extends PartialType(PackageDto) {}
