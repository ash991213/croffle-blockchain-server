import { Inject, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { WithdrawListRepository } from 'src/api/withdraw/repository/withdraw.repository';
import { GetTotalWithdrawAmountForTokensReqDTO, InsertRefundInformationReqDTO } from 'src/api/withdraw/dto/withdraw.req.dto';
import { CustomLogger } from 'src/config/logger/custom.logger.config';

@Injectable()
export class WithdrawService {
    constructor(
        @Inject('CROFFLE_BLOCKCHAIN_SERVER_LOG')
        private readonly logger: CustomLogger,
        @InjectRepository(WithdrawListRepository)
        private readonly withdrawListRepo: WithdrawListRepository,
    ) {}

    /**
     * Retrieves the total withdrawal amount of tokens for a specified address and currency.
     *
     * @param {GetTotalWithdrawAmountForTokensReqDTO} getTotalWithdrawAmountForTokensReqDTO - The details required to fetch the total withdrawal amount.
     * @param {string} GetTotalWithdrawAmountForTokensReqDTO.croffle_address - The address of the Croffle account to retrieve the total withdrawal amount for.
     * @param {CURRENCY} GetTotalWithdrawAmountForTokensReqDTO.currency - The type of currency to retrieve the total withdrawal amount for.
     */
    public async getTotalWithdrawAmountForTokens(getTotalWithdrawAmountForTokensReqDTO: GetTotalWithdrawAmountForTokensReqDTO) {
        this.logger.logMethodEntry(this.constructor.name, this.getTotalWithdrawAmountForTokens.name, getTotalWithdrawAmountForTokensReqDTO);
        try {
            return await this.withdrawListRepo.getTotalWithdrawTokenAmountByCurrencyAndAddress(getTotalWithdrawAmountForTokensReqDTO);
        } catch (error) {
            this.logger.logError(this.constructor.name, this.getTotalWithdrawAmountForTokens.name, error);
            throw error;
        }
    }

    /**
     * Inserts refund information into the withdrawal list.
     *
     * @param {InsertRefundInformationReqDTO} insertRefundInformationReqDTO - The details required to insert the refund information.
     * @param {WithdrawList} InsertRefundInformationReqDTO.withdrawList - The list of withdrawal details to be inserted into the repository.
     */
    public async insertRefundInformation(insertRefundInformationReqDTO: InsertRefundInformationReqDTO): Promise<void> {
        this.logger.logMethodEntry(this.constructor.name, this.insertRefundInformation.name, insertRefundInformationReqDTO);
        try {
            await this.withdrawListRepo.insertWithdrawList(insertRefundInformationReqDTO);
        } catch (error) {
            this.logger.logError(this.constructor.name, this.insertRefundInformation.name, error);
            throw error;
        }
    }
}
