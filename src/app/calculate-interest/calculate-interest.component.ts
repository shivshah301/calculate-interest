import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';

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
  count = 1;
  totalInterest:number = 0;
  totalAmount:number = 0;

  constructor(private snackBar: MatSnackBar, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      items: this.fb.array([
        this.createItems()
      ]) // Initialize an empty FormArray
    });
   // this.addItems();
  }

  createItems(): FormGroup {
    return this.fb.group({
      fPrincipal: [100, Validators.required],
      fRate: [10, [Validators.required, Validators.min(1)]],
      fDate: ['', [Validators.required, Validators.min(1)]],
      count: [this.count],
      ci: [0],
      compoundAmount: [0],
    })
  }
  addItems() {
    if (!this.items.valid) {
      return;
    }
  

    for(let k=0;k<this.count;k++) {
      if ((<FormArray>this.myForm.get('items')).controls[k].invalid) {
        return;
      }
    }
    const item = this.fb.group({
      fPrincipal: [100, Validators.required],
      fRate: [10, [Validators.required, Validators.min(1)]],
      fDate: ['', [Validators.required, Validators.min(1)]],
      count: [this.count],
      ci: [0],
      compoundAmount: [0],
    });
  
    // Add the new form group to the FormArray
    // this.items.push(item);
    this.count = this.count + 1;
    this.items.controls.unshift(item);
  }

  getValidity(index: number) {
    return (<FormArray>this.myForm.get('items')).controls[index].invalid;
  }
  
  // Helper method to get the 'items' FormArray
  get items() {
    return (<FormArray>this.myForm.get('items'));
  }  

 

  deleteItem(idx: number) {
    if (this.count < 2) {
      return;
    }
	//	this.items.removeAt(idx);
    const control = <FormArray>this.myForm.get('items');
    control.removeAt(idx);
    this.count = this.count - 1;

    this.snackBar.open('Deleted', 'GrOopseat', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
      panelClass: ['snackbarError']
    });
	}

  calculateEachInterest(item: any, index:number) {

    for(let k=0;k<this.count;k++) {
      if ((<FormArray>this.myForm.get('items')).controls[k].invalid) {
        this.snackBar.open('Please fill mandatory fields', 'Oops', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 5000,
          panelClass: ['snackbarError']
        });
        return;
      }
    }

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

  let taskListArrays = this.myForm.get('items') as FormArray;
        
taskListArrays.controls[index].patchValue({"compoundAmount":A});
taskListArrays.controls[index].patchValue({"ci": A - fPrincipal});

 //this.items[index].patchValue(actorsForm);
 console.log(this.items);

    this.snackBar.open('Completed interest calculation!!', 'Great', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000
    });

    this.calculateTotal(item);
  }

  getDiferenceInDays(thenDate: Date): number {
    // -1 to reduce current day to change interest till yesterday
    // thenDate.setDate(thenDate.getDate() - 1);
    const previousDay = new Date();
    previousDay.setDate(previousDay.getDate() - 1);

    return (
      Math.abs(thenDate.getTime() - previousDay.getTime()) /
      (1000 * 60 * 60 * 24)
    );
  }

  convertDaysToYear(days: number) {
    console.log('Year', days / 365);
    return days / 365;
  }

  calculateTotal(item: any) {

    this.totalInterest = this.totalInterest + item.controls.ci.value;
    this.totalAmount = this.totalAmount + item.controls.compoundAmount.value;
  }
}

