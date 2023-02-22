import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

 


  constructor(private settingSvr:SettingsService) { }

  ngOnInit(): void {
    this.settingSvr.checkCurrentTheme()
  }

  changeTheme(theme:string){
    this.settingSvr.changeTheme(theme)
   
  }


}
