import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SpinnerService } from '../../spinner.service';

@Component({
  selector: 'app-compound-interest',
  templateUrl: './compound-interest.component.html',
  styleUrl: './compound-interest.component.scss',
})
export class CompoundInterestComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  today = new Date();
  count = 1;
  totalInterest: number = 0;
  totalAmount: number = 0;
  formData: any[] = [];
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  isSpinnerActive = true;
  showUncalculatedTransError = false;
  constructor(
    private snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
    private spinner: SpinnerService
  ) {}

  ngOnInit(): void {
    const localStorageData = JSON.parse(localStorage.getItem('formData'));
    if (localStorageData == null) {
      this.formData.push({
        principal: 100,
        rate: 10,
        date: new Date(),
        fromDate: new Date(),
        toDate: new Date(),
        compoundInterest: 0,
        compoundAmount: 0,
        noOfDays: 0,
        id: 1,
        calc: false,
        activeRecord: false,
        simpleInterest: 0,
        simpleAmount: 0,
        timeInYears: 0
      });
    } else {
      this.formData = JSON.parse(localStorage.getItem('formData'));
      this.formData.forEach((x: any) => {
        x.fromDate = new Date(x.fromDate);
        x.toDate = new Date(x.toDate);
        x.date = new Date(x.date);
        x.simpleInterest = (x.principal*x.timeInYears*x.rate)/100;
        x.simpleAmount = x.simpleInterest + x.principal;
        x.compoundInterest = this.calculateCompoundInterestYearly(x.principal, x.rate, x.timeInYears);
        x.compoundAmount = this.calculateCompoundAmountYearly(x.principal, x.rate, x.timeInYears);
      });
      this.calculateTotalHead();
    }
  }

  getDiferenceInDays(fromDate: Date, toDate: Date): number {
    const no =
      Math.abs(toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24);
    return Math.trunc(no);
  }

  convertDaysToYear(days: number) {
    return days / 365;
  }

  calculate(index: number) {
    
    const choosenDate = this.formData[index].date;
    const principal = this.formData[index].principal;
    const rate = this.formData[index].rate;
    const fromDate = this.formData[index].fromDate;
    const toDate = this.formData[index].toDate;

    if (fromDate > toDate) {
      this.snackBar.open('Invalid from and to date range', 'Error', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 5000,
      });
    }
    const days = this.getDiferenceInDays(fromDate, toDate);
    const timeInYears = this.convertDaysToYear(days);
    let compoundAmount = principal * Math.pow(1 + rate / 100, timeInYears);
    this.formData[index].noOfDays = this.getFormatedStringFromDays(days);
    this.formData[index].compoundInterest = compoundAmount - principal;
    this.formData[index].compoundAmount = compoundAmount;
    let simpleInterest = (principal* timeInYears*rate) / 100;
    this.formData[index].simpleAmount = simpleInterest + principal;
    this.formData[index].simpleInterest = simpleInterest;
    this.formData[index].calc = true;
    this.calculateTotalHead();
    this.showUncalculatedTransError = false;
  }

  addItem() {
    this.showUncalculatedTransError = false;
    if (this.formData[0].compoundAmount > 0) {
      this.formData.unshift({
        principal: 100,
        rate: 10,
        date: new Date(),
        fromDate: new Date(),
        toDate: new Date(),
        compoundInterest: 0,
        compoundAmount: 0,
        noOfDays: 0,
        id: this.formData.length + 1,
        calc: false,
        activeRecord: false,
        simpleInterest: 0,
        simpleAmount: 0,
        timeInYears: 0
      });
     // this.formData.reverse();

    } else {
      this.showUncalculatedTransError = true;
      this.snackBar.open(`Transaction no ${this.formData[0].id} is still pending`, 'Error', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 5000,
      });
    }
  }

  removeItem(item: any, index: number) {
    if (this.formData.length < 2) {
      this.snackBar.open('Atleast one Transaction card is required', 'Error', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 5000,
      });
      return;
    }
    this.formData.splice(index, 1);
    this.formData.forEach((x:any, index: number) => {
      x.id =  this.formData.length - index;
    });
    this.calculateTotalHead();

  }

  calculateTotalHead() {
    this.totalInterest = 0;
    this.totalAmount = 0;
    this.formData.forEach((element: any) => {
      this.totalInterest = this.totalInterest + element.compoundInterest;
      this.totalAmount = this.totalAmount + element.compoundAmount;
    });
  }

  resetAll() {
     this.showUncalculatedTransError = false;
    this.formData = [];
    this.formData.push({
      principal: 100,
        rate: 10,
        date: new Date(),
        fromDate: new Date(),
        toDate: new Date(),
        compoundInterest: 0,
        compoundAmount: 0,
        noOfDays: 0,
        id: 1,
        calc: false,
        activeRecord: false,
        simpleInterest: 0,
        simpleAmount: 0,
        timeInYears: 0
    });
    this.totalInterest = 0;
    this.totalAmount = 0;
    localStorage.clear();
  }

  resetPrincipalCard(index: number) {
    this.formData[index].principal = 100;
    this.formData[index].rate = 10;
    this.formData[index].date = new Date();
    this.formData[index].fromDate = new Date();
    this.formData[index].toDate = new Date();
    this.formData[index].compoundInterest = 0;
    this.formData[index].compoundAmount = 0;
    this.formData[index].noOfDays = 0;
    this.formData[index].calc = false;
    this.formData[index].activeRecord = false;
    this.formData[index].simpleInterest = 0;
    this.formData[index].simpleAmount = 0;
    this.formData[index].timeInYears = 0;
  
    this.calculateTotalHead();
  }

  saveAll() {
    localStorage.setItem('formData', JSON.stringify(this.formData));
    this.snackBar.open('Data is saved', 'Success', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }

  getFormatedStringFromDays(days: number) {
    days = +days;
    if (Number.isInteger(+days)) {
      let years = Math.floor(days / 365);
      let year_text = years === 1 ? ' year ' : ' years ';
      days %= 365;
      let months = Math.floor(days / 30);
      let mon_text = months <= 1 ? ' month ' : ' months ';
      let day = days % 30;
      let day_text = day <= 1 ? ' day' : ' days';
      return years + year_text + months + mon_text + day + day_text;
    } else {
      return 'not a number';
    }
  }

  calculateCompoundAmountYearly(principal: number, rate: number, timeInYears: number) {
    let compoundAmount = principal * Math.pow(1 + rate / 100, timeInYears);
    return compoundAmount;
  }

  calculateCompoundInterestYearly(principal: number, rate: number, timeInYears: number) {
    let compoundAmount = principal * Math.pow(1 + rate / 100, timeInYears);
    return compoundAmount - principal;
  }
}
