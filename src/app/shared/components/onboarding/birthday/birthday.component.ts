import { Component, Output, Input, EventEmitter, OnInit } from "@angular/core";

@Component({
    selector: "app-birthday",
    templateUrl: "./birthday.component.html",
    styleUrls: ["./birthday.component.css"],
})
export class BirthdayComponent implements OnInit {
    public btnState = true;
    @Output() showCodePhoneEvent = new EventEmitter();
    @Output() backEvent = new EventEmitter();
    @Input() user: any;

    public arr_day = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
    ];

    public arr_month = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];

    public arr_year = [
        "2023",
        "2022",
        "2021",
        "2020",
        "2019",
        "2018",
        "2017",
        "2016",
        "2015",
        "2013",
        "2012",
        "2011",
        "2010",
        "2009",
        "2008",
        "2007",
        "2006",
        "2005",
        "2004",
        "2003",
        "2002",
        "2001",
        "2000",
        "1999",
        "1998",
        "1997",
        "1996",
        "1995",
        "1994",
        "1993",
        "1992",
        "1991",
        "1990",
        "1989",
    ];

    ngOnInit() {
    }

    public continueViewNumberPhone(day: any, month: any, year: any) {
        this.showCodePhoneEvent.emit({
            day: day,
            month: month,
            year: year,
        });
    }

    public continueViewCodePhone(day: any, month: any, year: any) {
        this.showCodePhoneEvent.emit({
            day: day,
            month: month,
            year: year,
        });
    }

    public sigIn() {}

    public back() {
        this.backEvent.emit("birthdayToAccount");
    }

    public onSelected(value: string): void {
        var selectedYear: number = +value;
        var currentYear = new Date().getFullYear();
        var age = currentYear - selectedYear;
        // COMPROBAR SI EL USUARIO ES MAYOR DE EDAD
        if (age > 18) {
            this.btnState = false;
        } else {
            // - ES MENOR DE EDAD.
            this.btnState = true;
        }
    }
}
