import { Component, OnInit } from "@angular/core";
import { SlotsService } from "src/app/slots.service";
import { slot_dates } from "src/app/slot_dates";

@Component({
  selector: "app-view-slot",
  templateUrl: "./view-slot.component.html",
  styleUrls: ["./view-slot.component.scss"],
})
export class ViewSlotComponent implements OnInit {
  month_names = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  header = [] as any;
  slot_times = [] as any;

  datesfromjson = [] as any;
  slot_date: string = `03/05/2022`;
  // const s=document.querySelector("#hey")?.innerHTML;
  slot_date0 = [document.querySelector("#hey")?.innerHTML];
  // this.slot_date0.push(this.slot_date);

  datessss = [] as any;
  datessss2 = [] as any;
  test = [] as any;
  date_arr = [] as any;
  constructor(private _slotservice: SlotsService) {}

  n = this.datesfromjson.length;

  slot_date1: string = "";
  testDate: Date | undefined;
  ngOnInit(): void {
    this.fn();
  }

  fn() {
    this._slotservice.getSlots().subscribe((data2) => {
      for (let i = 0; i < slot_dates.length; i++) {
        this.datessss = data2[i];
        this.slot_times.push(this.datessss.time);
      }
      //console.log(data2);
    });

    this._slotservice.getSlots().subscribe((data2) => {
      for (let i = 0; i < slot_dates.length; i++) {
        this.datessss2 = data2[i];
        let newDate0 = new Date(this.datessss2.date);

        this.datesfromjson.push(newDate0.getDate());
        this.test.push(this.datessss2.date.toString());
        this.header.push(
          new Date(data2[i].date).getMonth(),
          new Date(data2[i].date).getFullYear()
        );
        this.test.push(new Date(data2[i].date));
        localStorage.setItem("0",this.test[1]);
        //return this.header;
      }

      let testDate = new Date(data2[0].date).getMonth();

      this.slot_date1 = data2[2].date.toString();
    });
  }
  myItem = localStorage.getItem("0") as any;
  fd() {}
  date = new Date(this.myItem);

  current_month = this.date.getMonth();
  // current_month1 = document.getElementById("hey")?.innerText;
  current_year = this.date.getFullYear();
  current_date = this.date.getDate();

  len = this.slot_times.length;
  c: any;
  ds = this.test[0] as string;

  onclick() {}

  counter(i: number) {
    //this.fn();
    let ans = [];

    let ll = this.slot_times.length;

    let arr_dates = [];

    const check_date = new Date(
      `${this.current_month + 1}/${i}/${this.current_year}`
    );
    let lastDay = new Date(
      check_date.getFullYear(),
      check_date.getMonth() + 1,
      0
    ).getDate();

    let first_day = check_date.getDay();

    for (let x = first_day; x >= 0; x--) {
      let to_shift = lastDay - x;
      arr_dates.push({ to_shift });
    }
    if (arr_dates.length >= 7) {
      arr_dates = [];
    }

    for (let t = 1; t <= lastDay; t++) {
      arr_dates.push({ t });
    }

    return arr_dates;
  }
}
