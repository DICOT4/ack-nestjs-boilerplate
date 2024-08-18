import { Injectable } from '@nestjs/common';
import { Model, PopulateOptions } from 'mongoose';
import { DatabaseRepositoryBase } from 'src/common/database/bases/database.repository';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import { CountryEntity } from 'src/modules/country/repository/entities/country.entity';
import { RoleEntity } from 'src/modules/role/repository/entities/role.entity';
import {
    UserDoc,
    UserEntity,
} from 'src/modules/user/repository/entities/user.entity';

@Injectable()
export class UserRepository extends DatabaseRepositoryBase<
    UserEntity,
    UserDoc
> {
    readonly _joinActive: PopulateOptions[] = [
        {
            path: 'role',
            localField: 'role',
            foreignField: '_id',
            model: RoleEntity.name,
            justOne: true,
            match: {
                isActive: true,
            },
        },
        {
            path: 'country',
            localField: 'country',
            foreignField: '_id',
            model: CountryEntity.name,
            justOne: true,
        },
        {
            path: 'mobileNumber.country',
            localField: 'mobileNumber.country',
            foreignField: '_id',
            model: CountryEntity.name,
            justOne: true,
        },
    ];

    constructor(
        @DatabaseModel(UserEntity.name)
        private readonly userModel: Model<UserEntity>
    ) {
        super(userModel, [
            {
                path: 'role',
                localField: 'role',
                foreignField: '_id',
                model: RoleEntity.name,
                justOne: true,
            },
            {
                path: 'country',
                localField: 'country',
                foreignField: '_id',
                model: CountryEntity.name,
                justOne: true,
            },
            {
                path: 'mobileNumber.country',
                localField: 'mobileNumber.country',
                foreignField: '_id',
                model: CountryEntity.name,
                justOne: true,
            },
        ]);
    }
}
