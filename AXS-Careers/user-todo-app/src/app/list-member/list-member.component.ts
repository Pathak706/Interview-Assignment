import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MemberService } from '../memberService';
import { Member, Response } from '../member';
import { Table } from 'primeng/table';
import { Router, NavigationEnd } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-member',
  templateUrl: './list-member.component.html',
  styleUrls: ['./list-member.component.scss'],
})
export class ListMemberComponent implements OnInit {
  displayModal: boolean;
  members: Member[];
  loading: boolean = true;
  memberId: number;
  @ViewChild('dt') table: Table;

  constructor(
    private memberService: MemberService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.memberService.getAll().subscribe((data) => {
      this.members = data.data;
      // todo: update the logic
      this.members.forEach((member) => {
        member.dob = this.formatDate(new Date(member.dob));
        member.full_name = member.first_name + ' ' + member.last_name;
      });
      this.loading = false;
    });
  }

  onDateSelect(value) {
    this.table.filter(this.formatDate(value), 'dob', 'equals');
  }

  formatDate(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }
    return day + '-' + month + '-' + date.getFullYear();
  }

  addNewUser() {
    this.router.navigate(['member']);
  }

  editMember(id: number) {
    this.router.navigate(['member'], { queryParams: { id: id } });
  }

  deleteMember() {
    this.memberService.delete(this.memberId).subscribe(
      (d) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Member Deleted',
          detail: d.message,
        });
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.message,
        });
      },
      () => {
        this.displayModal = false;
        this.ngOnInit();
      }
    );
  }

  showModalDialog(id: number) {
    this.memberId = id;
    this.displayModal = true;
  }
}
