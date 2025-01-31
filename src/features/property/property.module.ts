import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Properties } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Properties])],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
