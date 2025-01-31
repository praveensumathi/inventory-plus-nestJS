import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Properties } from 'src/entities';
import { Repository } from 'typeorm';
import { PropertyDto } from './dto/property.dto';
import { CustomResponse, ResponseFactory } from 'src/common/dto/common.response';
import { CREATE_ID } from 'src/common/constants/constants';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { getLoggedInUserId } from 'src/common/utils';
import { Request } from "express";

@Injectable()
export class PropertyService {
    constructor(
        @InjectRepository(Properties)
        private readonly propertiesRepo: Repository<Properties>,
        @InjectMapper()
        private readonly mapper: Mapper,
    ) { }

    async save(propertyDto: PropertyDto, req: Request): Promise<CustomResponse> {
        try {
            console.log("propertyDto", propertyDto); 
            let propertyEntity = await this.propertiesRepo.findOne({
                where: { id: propertyDto.id },
            });

            if (!propertyEntity) {
                propertyEntity = new Properties();
                propertyEntity.createdBy = getLoggedInUserId(req);
            } else {
                propertyEntity.modifiedBy = getLoggedInUserId(req);
            }

            Object.assign(propertyEntity, propertyDto);

            propertyEntity = await this.propertiesRepo.save(propertyEntity);

            return ResponseFactory.success(propertyEntity);
        } catch (error) {
            console.error("Error saving property:", error);
            return ResponseFactory.error(error.message);
        }
    }




}