import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

interface Property {
  ownerName: string;
  address: string;
  countyName: string;
  propertyValue: number;
}

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ListItemComponent implements OnInit {

  @Input() fetchedData: Property;

  constructor() { }

  ngOnInit(): void {
  }

}
