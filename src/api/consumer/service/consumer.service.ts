import { Inject, Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';

import { Web3Service } from 'src/api/web3/service/web3.service';

import { CustomLogger } from 'src/config/logger/custom.logger.config';

import { plainToInstance } from 'class-transformer';
import { TransferForRefundReqDTO } from 'src/api/web3/dto/web3.req.dto';

import * as AWS from 'aws-sdk';

@Injectable()
export class ConsumerService {
    constructor(
        @Inject('CROFFLE_BLOCKCHAIN_SERVER_LOG')
        private readonly logger: CustomLogger,
        private readonly web3Service: Web3Service,
    ) {}

    @SqsMessageHandler(process.env.AWS_SQS_NAME, true)
    async handleMessage(message: AWS.SQS.Message[]) {
        this.logger.logMethodEntry(this.constructor.name, this.handleMessage.name, message);

        try {
            for (let i = 0; i < message.length; i++) {
                const { from_address, amount } = JSON.parse(message[i].Body);

                const transferForRefundReqDTO = plainToInstance(TransferForRefundReqDTO, {
                    to_address: from_address,
                    amount,
                });

                await this.web3Service.transferForRefund(transferForRefundReqDTO);
            }
        } catch (error) {
            this.logger.logError(this.constructor.name, this.handleMessage.name, error);
        }
    }
}
