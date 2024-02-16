import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class SendMessageReqDTO {
    @Expose({ name: 'from_address' })
    @IsString()
    from_address: string;

    @Expose({ name: 'from_address' })
    @IsString()
    to_address: string;

    @Expose({ name: 'from_address' })
    @IsString()
    txid: string;

    @Expose({ name: 'from_address' })
    @IsString()
    amount: string;
}
