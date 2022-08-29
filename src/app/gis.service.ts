import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class GisService {

  private baseURL = "https://arcgis.metc.state.mn.us/server/rest/services/GISLibrary/VWParcelsPoints/FeatureServer/0/query?"

  private PIN_key = "COUNTY_PIN"

  constructor(private httpClient: HttpClient) {
  }

  public getPropertyForPIN(
    pin: string,
    callback: (string) => void,
    onErr?: (string) => void
  ) {
    const url = `${this.baseURL}where=${this.PIN_key}='${pin}'&outFields=*&returnGeometry=false&f=pjson`
    this.httpClient.get(url).subscribe(res => {
      console.log(res)
        callback(res);
      }, err => {
        if (onErr) onErr(err)
      }
    )
  }
}
