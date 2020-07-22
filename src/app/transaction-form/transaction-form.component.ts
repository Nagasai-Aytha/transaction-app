import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionService } from '../transaction.service';
import { CONSTANTS } from '../../assets/constants';


@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css'],
  exportAs: 'ngForm'
})
export class TransactionFormComponent {
  displayedColumns: string[] = ['transactionDate', 'merchantLogo', 'merchant', 'amount'];
  dataSource: any = [];
  sortedData: any = [];
  currentDate = new Date().getTime();
  transaction = {
    from: '',
    merchant: '',
    merchantLogo: '',
    transactionType: 'Online Transfer',
    amount: null,
    transactionDate: ''
  };
  submitted = false;
  balance: number = 0;
  placeholder: string = '';
  errorMessage:string = '';

  constructor(public transactionService: TransactionService) {}

  ngOnInit() {
    this.transactionService.getTransactions().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.data);
      this.sortedData = this.dataSource.data.slice();
    })
    this.balance = CONSTANTS.AMOUNT;
    this.transaction.from = CONSTANTS.FROM + ' - $' + this.balance;

    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.merchant.toLowerCase().includes(filter) || data.transactionType.toString() === filter;
    };
  }


  validateBalance(){
    this.submitted = true;
    let bal = this.balance - this.transaction.amount;
    console.log(bal);
    if(bal < -500){
       this.errorMessage = CONSTANTS.MESSAGE;
       this.submitted = false;
    } else{
      this.errorMessage = '';
    }
  }
  onSubmit(form, formData) {
    console.log('submitted formdata', form, formData);
    formData.transactionDate = this.currentDate;
    this.balance = this.balance - formData.amount;
    this.dataSource.data.unshift({ ...formData });
    this.dataSource = new MatTableDataSource<any>(this.dataSource.data);
    form.reset({from : CONSTANTS.FROM + ' - $' + this.balance});
    this.submitted = false;
  }

  doFilter = (value: any) => {
    console.log(value.trim().toLocaleLowerCase())
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  sortData(sort) {
    const data = this.dataSource.data.slice();
    this.dataSource.data = data.sort((a, b) => {
      const isAsc = true;
      switch (sort) {
        case 'date': return this.compare(a.transactionDate, b.transactionDate, isAsc);
        case 'beneficiary': return this.compare(a.merchant, b.merchant, isAsc);
        case 'amount': return this.compare(parseFloat(a.amount), parseFloat(b.amount), isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    console.log(typeof a, b, a < b);
    return (a < b ? -1 : 1);
  }
}
