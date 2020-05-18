import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDetails } from '../../../models/login-details';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input()
  public gridData: Observable<LoginDetails[]>;

  @Output()
  public selectedUser: EventEmitter<string> = new EventEmitter<string>();

  protected errorDetail: any;
  protected pageNum: number;

  constructor(public translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
}

  public ngOnInit() {
    this.pageNum = 0;
  }

  public editRecord(recordId: string) {
    console.log(recordId);
    this.selectedUser.emit(recordId);
  }
}
