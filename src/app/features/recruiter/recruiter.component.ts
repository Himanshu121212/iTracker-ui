import { Component, OnInit } from '@angular/core';
import { ColDef,  GridApi, GridReadyEvent} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { RecruiterService } from './recruiter.service';
import { Recruiter } from './recruiter';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.scss']
})

export class RecruiterComponent implements OnInit{
  
  private gridApi!: GridApi;
  columnDefs: ColDef[] = [
    { field: 'name', filter: true},
    { field: 'skill', filter: true},
    { field: 'date', type:'dateColumn'}, 
    { field: 'time', sortable: true, filter: true}
  ];

  //rowData : any[] = []
  rowData: Recruiter[] = [];

  /*constructor(private http: HttpClient)
  {
    this.rowData = this.http.get<any[]>('../../assets/data/slots.json');
  }
  */
  constructor(private _recruiterService: RecruiterService){}

  /*ngOnInit(){
    this._recruiterService.getSlots()
      .subscribe(data => this.rowData = data)
  }
  */
  ngOnInit(){
    /*this._recruiterService.getSlots()
      .subscribe((data) => {this.rowData = data;console.log(this.rowData[1])})

    this._recruiterService.getInfo()
      .subscribe((data) => {this.rowData.map((value) =>{ value.name = data.name });console.log(this.rowData[0])})
  
    /*this._recruiterService.getSkills()
      .subscribe((data) => {this.rowData = data;})
    
    */
       /*this._recruiterService.getSlots()
      .subscribe((data) => {
        for(let i=0;i<data.length;i++){
          this.rowData[i] = {name:"",skill:"",date:new Date(),time:""};
          
          this.rowData[i]['date']=data[i]['date'];
          this.rowData[i]['time']=data[i]['time'];
          console.log(this.rowData[i]);
        }
      })

     this._recruiterService.getInfo()
      .subscribe((data) => {
        this.rowData.map((value) => {
          value['name'] = data['name'];
        })
        console.log(this.rowData[0]);
      })
      
      this._recruiterService.getSkills()
      .subscribe((data) => {
        for(let i=0;i<this.rowData.length;i++){
         // this.rowData[i] = {name:"",skill:"",date:new Date(),time:""};
          
          this.rowData[i]['skill']=data[i]['skill'];
          this.rowData[i]['skill']=data[i]['skill'];
        }
        //console.log(this.rowData[0]);
      })
      */
     let res1=this._recruiterService.getSlots();
     let res2=this._recruiterService.getInfo();
     let res3=this._recruiterService.getSkills();

     forkJoin([res1,res2,res3]).subscribe(([data1,data2,data3]) => {
      const slotInfo: Recruiter[] = [];
      for(let i=0;i<data1.length;i++){
        slotInfo[i] = {name:"",skill:"",date:new Date(),time:""};
        
        slotInfo[i].date=data1[i].date;
        slotInfo[i].time=data1[i].time;
        console.log(slotInfo[i]);
      }

      slotInfo.map((value) => {
        value.name = data2.name;
      })

      for(let i=0;i<slotInfo.length;i++){
        // slotInfo[i] = {name:"",skill:"",date:new Date(),time:""};
         slotInfo[i].skill=data3[i].skill;
         console.log(slotInfo[i]);
      }
      this.rowData = slotInfo; 
      console.log(this.rowData);
    });
  }

  public popupParent: HTMLElement = document.body;
    
  public columnTypes: {
    [key: string]: ColDef;
  } = {
    nonEditableColumn: { editable: false },
    dateColumn: {
      // specify we want to use the date filter
      filter: 'agDateColumnFilter',
      // add extra parameters for the date filter
      filterParams: {
        // provide comparator function
        comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
          // In the example application, dates are stored as dd/mm/yyyy
          // We create a Date object for comparison against the filter date
          const dateParts = cellValue.split('/');
          const day = Number(dateParts[0]);
          const month = Number(dateParts[1]) - 1;
          const year = Number(dateParts[2]);
          const cellDate = new Date(year, month, day);
          // Now that both parameters are Date objects, we can compare
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          } else if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          } else {
            return 0;
          }
        },
      },
    },
  };

  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
// set background colour on even rows again, this looks bad, should be using CSS classes
}
