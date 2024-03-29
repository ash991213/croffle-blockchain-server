import { Expose, Type } from 'class-transformer';
import { IsEnum, IsObject, IsString, ValidateNested } from 'class-validator';

import { WithdrawList } from 'src/model/entity/withdraw-list.entity';
import { CURRENCY } from 'src/common/const/enum.const';

export class GetTotalWithdrawAmountForTokensReqDTO {
    @Expose({ name: 'croffle_address' })
    @IsString()
    croffle_address: string;

    @Expose({ name: 'currency' })
    @IsEnum(CURRENCY)
    currency: CURRENCY;
}

export class InsertRefundInformationReqDTO {
    @Expose({ name: 'withdrawList' })
    @ValidateNested()
    @Type(() => WithdrawList)
    @IsObject()
    withdrawList: WithdrawList;
}
