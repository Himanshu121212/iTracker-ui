import { FormArray } from '@angular/forms';
import { Component } from "@angular/core";
import { DatePipe } from "@angular/common";
import {
  NgbCalendar,
  NgbDateParserFormatter,
  NgbDatepickerConfig,
  NgbDate,
} from "@ng-bootstrap/ng-bootstrap";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AddslotsService } from "./addslots.service";
import { stringify } from "querystring";
import { convertCompilerOptionsFromJson } from "typescript";

@Component({
  selector: "app-addslots",
  templateUrl: "./addslots.component.html",
  styleUrls: ["./addslots.component.scss"],
})
export class AddslotsComponent {
  repeatMode = "never";
  slotDate: NgbDate;
  fromDate: NgbDate;

  Slots = [
    "10:30:00",
    "11:00:00",
    "11:30:00",
    "12:00:00",
    "12:30:00",
    "13:00:00",
    "13:30:00",
    "14:00:00",
    "14:30:00",
    "15:00:00",
    "15:30:00",
    "16:00:00",
    "16:30:00",
    "17:00:00",
    "17:30:00",
    "18:00:00",
    "18:30:00",
    "19:00:00",
    "19:30:00",
  ];
  DaysOfWeek = {
    Monday: "M",
    Tuesday: "T",
    Wednesday: "W",
    Thursday: "T",
    Friday: "F",
    Saturday: "S",
    Sunday: "S",
  };
  selectDay: string | null;
  formData!: FormGroup;
  user: any = {};

  constructor(
    private config: NgbDatepickerConfig,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private fb: FormBuilder,
    private addslots: AddslotsService,
    public datepipe: DatePipe
  ) {
    this.disableMonths(config);

    this.slotDate = calendar.getToday();
    console.log(this.slotDate);
    this.selectDay = this.getDayfromDate();
    this.createAddslotForm();
  }
  createAddslotForm() {
    this.formData = this.fb.group({
      date: [this.slotDate],
      time: [null, [Validators.required]],
    });
  }

  get time() {
    return this.formData.get("time");
  }

  get date() {
    return this.formData.get("date");
  }

  //only enable dates from today to last day of next month
  disableMonths(config: NgbDatepickerConfig) {
    let startDate = new Date(),
      endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 2, 0);
    console.log(startDate, endDate);
    config.minDate = {
      year: startDate.getFullYear(),
      month: startDate.getMonth() + 1,
      day: startDate.getDate(),
    };
    config.maxDate = {
      year: startDate.getFullYear(),
      month: endDate.getMonth() + 1,
      day: endDate.getDate(),
    };
    config.outsideDays = "hidden";
  }

  onSlotDateChange(e: any) {
    this.slotDate = e;
    this.selectDay = this.getDayfromDate();
  }

  onRepeatModeChange(e: any) {
    this.repeatMode = e.target.value;
  }

  //format date in format yyyy-mm-dd
  formatDateToString(date: any) {
    return date.year + "-" + date.month + "-" + date.day;
  }

  //get name of weekday from slotdate
  getDayfromDate() {
    let days = Object.keys(this.DaysOfWeek);
    let date = new Date(
      this.slotDate.year,
      this.slotDate.month - 1,
      this.slotDate.day
    );
    let weeknumber = (date.getDay() + 6) % 7;
    return days[weeknumber];
  }

  //sortNull for keeping original order of keyvalue in ngFor for DaysOfWeek
  sortNull() {
    return 0;
  }

  getDaysRecurrence(start, end, dayName) {
    var slots = [];
    var days = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };
    var day = days[dayName.toLowerCase().substr(0, 3)];
    var current = new Date(start);
    current.setDate(current.getDate() + ((day - current.getDay() + 7) % 7));
    while (current <= end) {
      slots.push({
        date: this.getDateString(new Date(+current)),
        time: this.formData.get("time").value,
      });
      current.setDate(current.getDate() + 7);
    }
    console.log("slots : ", slots);
    return slots;
  }

  getAllDays(start, end) {
    var result1 = [];
    var current = new Date(start);
    current.setDate(current.getDate());

    while (current < end) {
      result1.push({
        date: this.getDateString(new Date(+current)),
        time: this.formData.get("time").value,
      });
      current.setDate(current.getDate() + 1);
    }
    return result1;
  }

  getDateString(date) {
    return this.datepipe.transform(date, "yyyy-MM-dd");
  }

  

  onClickSubmit(data: any) {
    let res = [];
    let res1 = [];
    this.formData.setValue(data);
    this.formData.setControl(
      "date",
      new FormControl(this.formatDateToString(this.slotDate))
    );

    console.log("FORM DATA", this.formData.getRawValue());

    this.user = Object.assign(this.user, this.formData.value);
    this.user = { i_id: "35", slot: this.user };

    if (this.repeatMode == "weekly") {
      let date = new Date(
        this.slotDate.year,
        this.slotDate.month - 1,
        this.slotDate.day
      );
      const dayN = (dateString) =>
        new Intl.DateTimeFormat("en-Us", { weekday: "long" }).format(
          new Date(date)
        );

      this.fromDate = this.calendar.getToday();

      res = this.getDaysRecurrence(
        new Date(),
        new Date(date.getFullYear(), date.getMonth() + 1),
        dayN(date)
      );

      this.user = { i_id: "35", slot: res };
    } else if (this.repeatMode == "daily") {
      let date = new Date(
        this.slotDate.year,
        this.slotDate.month - 1,
        this.slotDate.day
      );
      res1 = this.getAllDays(
        new Date(
          this.slotDate.year,
          this.slotDate.month - 1,
          this.slotDate.day
        ),
        new Date(date.getFullYear(), date.getMonth() + 1)
      );

      this.user = { i_id: "35", slot: res1 };
    } else {
      this.user = {
        i_id: 35,
        slot: [
          {
            date : new Date(
              this.slotDate.year,
              this.slotDate.month - 1,
              this.slotDate.day + 1
            ),
            time: this.formData.get("time").value,
          }
        ]
      }
    }

    console.log("USER DATA : ", this.user);

    try {
      this.addslots.saveUser(this.user).subscribe((data) => {
        this.user = data;
      });
    } catch (err) {
      console.log('error in saving User : ', err)
    }
    
  }
}

