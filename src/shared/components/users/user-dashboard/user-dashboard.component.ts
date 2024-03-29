import {
  Component, OnInit
} from '@angular/core';
import { of, Observable } from 'rxjs';
import { LoginDetails } from '../../../models/login-details';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  public userData: Observable<LoginDetails[]>;
  public errorDetail: any;

  public selectedUser: LoginDetails;
  public showEditForm: boolean = false;

  constructor(public translate: TranslateService,
    private userService: UserService) {
  }

  public ngOnInit(): void {
    console.log(`UserDashboardComponent - ngOnInit`);
    this.userService.getAll()
      .subscribe((records: LoginDetails[]) => {
        this.userData = of(records);
      },
      err => {
        console.error('Error ' + err);
        this.errorDetail = err;
      });
  }

  public onNewUser() {
    this.onSelectedUser(undefined);
  }

  public onSelectedUser(selectedUserId: string) {
    if (selectedUserId === undefined) {
      console.log('new user');
      this.selectedUser = undefined;
      this.showEditForm = true;
    } else {
      this.userService.find(selectedUserId).subscribe(user => {
        this.selectedUser = user;
        this.showEditForm = true;
      });
    }
  }
}
