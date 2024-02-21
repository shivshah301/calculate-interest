import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    RouterOutlet,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'calculate-interest';
  principal!: number;
  rate!: number;
  date!: Date;
  today = new Date();
  compoundInterest!: number;
  amount!: number;

  constructor() {}

  ngOnInit(): void {}

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
  }

  getDiferenceInDays(thenDate: Date): number {
    // -1 to reduce current day to change interest till yesterday
    // thenDate.setDate(thenDate.getDate() - 1);
    const previousDay = new Date();
    previousDay.setDate(previousDay.getDate() - 1);

    console.log(
      Math.round(
        Math.abs(thenDate.getTime() - previousDay.getTime()) /
          (1000 * 60 * 60 * 24)
      )
    );

    console.log(
      Math.abs(thenDate.getTime() - previousDay.getTime()) /
        (1000 * 60 * 60 * 24)
    );
    
    return (
      Math.abs(thenDate.getTime() - previousDay.getTime()) /
      (1000 * 60 * 60 * 24)
    );
  }

  convertDaysToYear(days: number) {
    console.log('Year', days / 365);
    return days / 365;
  }
}
