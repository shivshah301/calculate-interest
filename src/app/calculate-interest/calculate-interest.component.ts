import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculate-interest',
  templateUrl: './calculate-interest.component.html',
  styleUrl: './calculate-interest.component.scss'
})
export class CalculateInterestComponent implements OnInit{
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  myForm!: FormGroup;

  title = 'calculate-interest';
  principal!: number;
  rate!: number;
  date!: Date;
  today = new Date();
  compoundInterest!: number;
  amount!: number;


  constructor(private snackBar: MatSnackBar, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      items: this.fb.array([
        
      ]) // Initialize an empty FormArray
    });
    this.addItems();
  }
  addItems() {
    const item = this.fb.group({
      fPrincipal: [100, Validators.required],
      fRate: [10, [Validators.required, Validators.min(1)]],
      fDate: ['', [Validators.required, Validators.min(1)]],
    });
  
    // Add the new form group to the FormArray
    this.items.push(item);
  }
  
  // Helper method to get the 'items' FormArray
  get items() {
    return (<FormArray>this.myForm.get('items')).controls;
  }

  calculateInterest() {
    if (this.date > this.today) {
      console.log('Date cannot be greater than today');
      return;
    }
    console.log(this.principal);
    console.log(this.rate);
    console.log(this.date);

    const days = this.getDiferenceInDays(this.date);
    const time = this.convertDaysToYear(days);
    let A = this.principal * Math.pow(1 + this.rate / 100, time);

    console.log('Amount : ', A);
    console.log('Interest : ', A - this.principal);

    this.snackBar.open('Completed interest calculation!!', 'Great', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000
    });
  }

  getDiferenceInDays(thenDate: Date): number {
    // -1 to reduce current day to change interest till yesterday
    // thenDate.setDate(thenDate.getDate() - 1);
    const previousDay = new Date();
    previousDay.setDate(previousDay.getDate() - 1);

    // console.log(
    //   Math.round(
    //     Math.abs(thenDate.getTime() - previousDay.getTime()) /
    //       (1000 * 60 * 60 * 24)
    //   )
    // );

    // console.log(
    //   Math.abs(thenDate.getTime() - previousDay.getTime()) /
    //     (1000 * 60 * 60 * 24)
    // );

    return (
      Math.abs(thenDate.getTime() - previousDay.getTime()) /
      (1000 * 60 * 60 * 24)
    );
  }

  convertDaysToYear(days: number) {
    console.log('Year', days / 365);
    return days / 365;
  }

  calculateEachInterest(item: any) {
    const fPrincipal = item.controls.fPrincipal.value;
    const fDate = item.controls.fDate.value;
    const fRate = item.controls.fRate.value;
    if (fDate > this.today) {
      console.log('Date cannot be greater than today');
      return;
    }
    console.log(fPrincipal);
    console.log(fRate);
    console.log(fDate);

    const days = this.getDiferenceInDays(fDate);
    const time = this.convertDaysToYear(days);
    let A = fPrincipal * Math.pow(1 + fRate / 100, time);

    console.log('Amount : ', A);
    console.log('Interest : ', A - fPrincipal);

    this.snackBar.open('Completed interest calculation!!', 'Great', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000
    });
  }
}

