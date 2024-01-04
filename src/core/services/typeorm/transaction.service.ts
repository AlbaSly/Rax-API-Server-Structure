import { ApiLog } from "@core/utils";
import { QueryRunner } from "typeorm";

/**
 * Service to handle all TypeORM transactions.
 */
export default class TransactionService {

  constructor(
    private queryRunner: QueryRunner,
    private readonly service: string,
    private readonly operation: string,
  ) {}

  /**
   * Establishes a DB connection to generate the transaction.
   */
  async connect() {
    await this.queryRunner.connect();
    ApiLog.info(`${this.service} (${this.operation})`, `Establishing connection with the transaction service`);
  }

  /**
   * Starts the transaction.
   */
  async start() {
    await this.queryRunner.startTransaction();
    ApiLog.verbose(`${this.service} (${this.operation})`, 'Connection established. Transaction started');
  }

  /**
   * Completes the transaction.
   */
  async complete() {
    await this.queryRunner.commitTransaction();
    await this.release();

    ApiLog.info(`${this.service} (${this.operation})`, 'Transaction completed. Data is saved/updated.');
  }

  /**
   * Cancels all processes of the transaction.
   */
  async cancel() {
    await this.queryRunner.rollbackTransaction();
    await this.release();

    ApiLog.warning(`${this.service} (${this.operation})`, 'Transaction cancelled. Data will not be saved/updated.');
  }

  /**
   * Releases and closes the DB connection.
   */
  private async release() {
    await this.queryRunner.release();
  }
}
