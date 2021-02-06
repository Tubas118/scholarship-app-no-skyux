import { Component } from '@angular/core';
import { Scholarship } from 'src/app/models/scholarship';
import { SelectValueComponent } from 'src/lib/components/selectbox/selectbox.component';

@Component({
  selector: 'select-scholarship',
  templateUrl: '../../../../lib/components/selectbox/selectbox.component.html'
})
export class SelectScholarshipComponent extends SelectValueComponent<Scholarship> {
  protected initDisplayList(): void {
    if (this.list !== undefined) {
      this.displayList = [];
      for (var entry of this.list) {
        let line = entry.scholarshipName;
        if (entry.sponsor !== undefined) {
          line += ' => ' + entry.sponsor;
        }
        this.displayList.push({
          id: entry.id,
          display: line
        });
      }
      this.displayList.sort((a, b) => (a.display.toUpperCase() > b.display.toUpperCase()) ? 1 : -1);
    }
  }
}
