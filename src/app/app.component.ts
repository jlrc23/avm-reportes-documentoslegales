import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material';
import {SidebarService} from './services/sidebar.service';
import {SettingsColumnsService} from './services/settings-columns.service';
import {FilterFormService} from './services/filter-form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SettingsColumnsService]
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav) mainSideNav: MatSidenav;

  constructor(public sidebarService: SidebarService,
              public  settingsColumnsService: SettingsColumnsService
              ) { }

  ngOnInit(): void {
    this.sidebarService.setSidebar(this.mainSideNav);
  }

  public toggleSidebar(){
    this.sidebarService.toggle();
  }
  
}
