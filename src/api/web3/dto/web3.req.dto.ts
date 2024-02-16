import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';

import { DepositList } from 'src/model/entity/deposit-list.entity';

export class AdjustTotalSupplyReqDTO {
    @Expose({ name: 'amount' })
    @IsNumber()
    amount: number;

    @Expose({ name: 'increase' })
    @IsBoolean()
    increase: boolean;
}

export class TransferToUserReqDTO {
    @Expose({ name: 'deposit' })
    @ValidateNested()
    @Type(() => DepositList)
    @IsObject()
    deposit: DepositList;
}

export class TransferToTotalSupplyManagerReqDTO {
    @Expose({ name: 'amount' })
    @IsString()
    amount: string;
}

export class TransferForRefundReqDTO {
    @Expose({ name: 'to_address' })
    @IsString()
    to_address: string;

    @Expose({ name: 'amount' })
    @Type(() => String)
    @IsString()
    amount: string;
}
