import {MatCheckboxChange, MatSlideToggleChange} from '@angular/material';
import {Injectable} from '@angular/core';
import {SettingDisplayColumnInterface} from '../interfaces/setting-display-column.interface';
import {SettingDisplayColumn} from '../class/setting-display-column';

@Injectable()
export class SettingsColumnsService { //'id',
  public static ALL_COLUMNS: Array<string> = [ 'economic_number', 'year', 'serial_number', 'plates', 'status',  'document_type', 'document_number',  'amount', 'created', 'issued',    'owner'];
  readonly loggerNamespaceClass = 'SettingsColumnsService';

  settingsDisplayedColumns: Map<string, SettingDisplayColumnInterface> = new Map<string, SettingDisplayColumnInterface>();
  displayedColumns: Array<string>;
  displayedFilterColumns: Array<string>;
  showFilter = false;

  get allColumns() {
    return SettingsColumnsService.ALL_COLUMNS;
  }

  constructor() {
    for(const column of this.allColumns ){
      console.log(`[SettingsColumnsService] column:`, column);
      const colSettings =  new SettingDisplayColumn(column,column);
      if(colSettings.title == 'serial_number')
        colSettings.visible = false;
      this.settingsDisplayedColumns.set(column,colSettings);
    }
    this.displayedColumns = SettingsColumnsService.ALL_COLUMNS.filter((displayColumn) => this.settingsDisplayedColumns.get(displayColumn).visible);
    this.displayedFilterColumns = this.displayedColumns.map((displayColumn) => `${displayColumn}Filter`);
  }


  toggleColumn($event:MatCheckboxChange, selectedColumn) {
    console.log(`[${this.loggerNamespaceClass}/toggleColumn] Column: ${selectedColumn} event:`, $event);
    this.settingsDisplayedColumns.get(selectedColumn).visible = $event.checked;
    this.displayedColumns = SettingsColumnsService.ALL_COLUMNS.filter((displayColumn) => this.settingsDisplayedColumns.get(displayColumn).visible);
    this.loadFilter();
  }

  loadFilter() {
    if (this.showFilter) {
      this.displayedFilterColumns = this.displayedColumns.map((displayColumn) => `${displayColumn}Filter`);
    }
  }

  openFilters($event:MatSlideToggleChange) {
    this.showFilter =  $event.checked;
    this.loadFilter();
  }
}
