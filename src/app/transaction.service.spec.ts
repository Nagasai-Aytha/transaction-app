import { TestBed } from '@angular/core/testing';

import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get Transactions', () => {
    const transactions: any = service.getTransactions().subscribe((res) => {
      expect(res.data.length).toEqual(10);
    });
  });;
});
