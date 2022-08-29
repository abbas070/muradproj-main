import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {GisService} from "../gis.service";

interface Property {
  ownerName: string;
  address: string;
  countyName: string;
  propertyValue: number;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class MainComponent implements OnInit {

  pin: string;
  properties: Property[];

  constructor(private gisService: GisService) {
  }

  ngOnInit(): void {
    this.properties = [{
      ownerName: "",
      address: "",
      countyName: "",
      propertyValue: 0
    }]
  }

  submit() {
    if (this.pin) this.gisService.getPropertyForPIN(this.pin, res => {
      this.properties = [];
      res?.features?.forEach(feature => {
        const {
          OWNER_NAME,
          CO_NAME,
          SALE_VALUE,
          ST_NAME,
          ST_POS_TYP,
          ST_POS_DIR,
          ZIP,
          CTU_NAME,
          STATE_CODE
        } = feature?.attributes;
        console.log(feature)
        const fullAddress = this.generateAddress(ST_NAME, ST_POS_TYP, ST_POS_DIR, CTU_NAME, STATE_CODE, ZIP);
        this.properties.push({
          ownerName: OWNER_NAME,
          address: fullAddress,
          countyName: CO_NAME,
          propertyValue: SALE_VALUE
        })
      })
    }, err => {
      console.log(err);
    })
  }

  generateAddress(
    ST_NAME: string,
    ST_POS_TYP: string,
    ST_POS_DIR: string,
    CTU_NAME: string,
    STATE_CODE: string,
    ZIP: string
  ) {
    return `${ST_NAME} ${ST_POS_TYP} ${ST_POS_DIR}, ${CTU_NAME}, ${STATE_CODE} ${ZIP}`;
  }
}
