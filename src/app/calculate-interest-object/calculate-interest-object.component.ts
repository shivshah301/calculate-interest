import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-calculate-interest-object',
  templateUrl: './calculate-interest-object.component.html',
  styleUrl: './calculate-interest-object.component.scss'
})
export class CalculateInterestObjectComponent implements OnInit{
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  today = new Date();
  count = 1;
  totalInterest:number = 0;
  totalAmount:number = 0;
  formData: any[] = [];

  constructor(private snackBar: MatSnackBar, private cd: ChangeDetectorRef ) {}

  ngOnInit(): void {
    this.formData.push({
      principal : 100,
      rate: 10,
      date: Date,
      compoundInterest: 0,
      compoundAmount: 0,
      id: 1
     });
  }

  getDiferenceInDays(thenDate: Date): number {
    // -1 to reduce current day to change interest till yesterday
    // thenDate.setDate(thenDate.getDate() - 1);
    const previousDay = new Date();
    previousDay.setDate(previousDay.getDate() - 1);

    return (
      Math.abs(thenDate.getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
    );
  }

  convertDaysToYear(days: number) {
    console.log('Year', days / 365);
    return days / 365;
  }

  calculate(index: number) {
    console.log(this.formData[index]);
    const choosenDate = this.formData[index].date;
    const principal = this.formData[index].principal;
    const rate = this.formData[index].rate;


    if (choosenDate > this.today) {
      console.log('Date cannot be greater than today');
      return;
    }
  

    const days = this.getDiferenceInDays(choosenDate);
    const time = this.convertDaysToYear(days);
    let compoundAmount = principal * Math.pow(1 + rate / 100, time);

    this.formData[index].compoundInterest = compoundAmount - principal;
    this.formData[index].compoundAmount = compoundAmount;
    this.calculateTotalHead();
  }

  addItem() {

const previousCompoundInterest =  this.formData[this.formData.length - 1].compoundInterest;
const previousCompoundAmount =  this.formData[this.formData.length - 1].compoundAmount;

if(previousCompoundInterest > 0 && previousCompoundAmount > 0) {
  this.formData.push({
    principal : 100,
    rate: 10,
    date: Date,
    compoundInterest: 0,
    compoundAmount: 0,
    id: this.formData.length + 1
   });
} else {
  this.snackBar.open('Complete previous form', 'Warning', {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
    duration: 5000
  });
}
this.formData.reverse();
   
  }

  removeItem(item: any, index: number) {
    if (this.formData.length<2) {
      return;
    }
    //this.formData.filter(el => el!=item);
    this.formData.splice(index, 1);

    this.calculateTotalHead();
  }

  calculateTotalHead() {
    this.totalInterest = 0;
    this.totalAmount = 0;
    this.formData.forEach((element: any) => {
      this.totalInterest = this.totalInterest + element.compoundInterest;
      this.totalAmount = this.totalAmount + element.compoundAmount;
    });
    this.cd.markForCheck();
  }
}
