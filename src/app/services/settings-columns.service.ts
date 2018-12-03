import {MatCheckboxChange, MatSlideToggleChange} from '@angular/material';
import {Injectable} from '@angular/core';
import {SettingDisplayColumnInterface} from '../interfaces/setting-display-column.interface';
import {SettingDisplayColumn} from '../class/setting-display-column';

@Injectable()
export class SettingsColumnsService {
  public static ALL_COLUMNS: Array<string> = ['id', 'year', 'economic_number', 'serial_number', 'plates', 'status',    'document_type', 'document_number',    'amount',    'created',   'issued',    'owner'];
  readonly loggerNamespaceClass = 'SettingsColumnsService';

  settingsDisplayedColumns: Map<string, SettingDisplayColumnInterface> = new Map<string, SettingDisplayColumnInterface>();
  displayedColumns: Array<string>;
  displayedFilterColumns: Array<string>;
  showFilter = true;
  get allColumns() {
    return SettingsColumnsService.ALL_COLUMNS;
  }

  constructor() {
    for(const column of this.allColumns ){
      console.log(`[SettingsColumnsService] column:`, column);
      this.settingsDisplayedColumns.set(column, new SettingDisplayColumn(column,column));
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
