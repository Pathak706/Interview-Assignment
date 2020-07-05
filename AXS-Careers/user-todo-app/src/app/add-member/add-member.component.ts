import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MemberService } from '../memberService';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Member } from '../member';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
  providers: [MessageService],
})
export class AddMemberComponent implements OnInit {
  addForm: FormGroup;
  editMode: boolean = false;
  loading: boolean = false;
  member: Member;
  subscription: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.activatedRoute.queryParams
      .pipe(
        filter((params) => !!params.id),
        map((params) => params.id),
        switchMap((id) => this.memberService.getOne(id)),
        tap(({ data }) => {
          console.log(data[0]);
          this.editMode = true;
          this.member = data[0];
          this.email.disable();
          this.addForm.patchValue({
            first_name: this.member.first_name ? this.member.first_name : null,
            last_name: this.member.last_name ? this.member.last_name : null,
            mobile_no: this.member.mobile_no ? this.member.mobile_no : null,
            email_id: this.member.email_id ? this.member.email_id : null,
            address: this.member.address ? this.member.address : null,
            dob: this.member.dob ? new Date(this.member.dob) : null,
          });
        })
      )
      .subscribe();
  }

  get firstName() {
    return this.addForm.get('first_name') as FormControl;
  }
  get lastName() {
    return this.addForm.get('last_name') as FormControl;
  }
  get email() {
    return this.addForm.get('email_id') as FormControl;
  }
  get address() {
    return this.addForm.get('address') as FormControl;
  }
  get dob() {
    return this.addForm.get('dob') as FormControl;
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      first_name: [
        ,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z ]*$/),
        ],
      ],
      last_name: [
        '',
        [
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z ]*$/),
        ],
      ],
      email_id: [, [Validators.required, Validators.pattern(re)]],
      address: [, [Validators.required, Validators.maxLength(50)]],
      dob: [, [Validators.required]],
      mobile_no: [
        ,
        [
          Validators.maxLength(10),
          Validators.minLength(10),
          Validators.pattern(
            /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/gm
          ),
        ],
      ],
    });
  }
  nameValidation(): boolean {
    let lastnameValid =
      this.lastName.value && this.lastName.value === this.firstName.value
        ? false
        : true;
    if(!lastnameValid) {
      this.lastName.setErrors({'incorrect': true});
    } else {
      this.lastName.setErrors(null)
    }
    return lastnameValid
  }
  onSubmit() {
    this.loading = true;
    if ((!this.addForm.pristine || this.editMode)  && this.nameValidation() && this.addForm.valid) {
      if (!this.editMode) {
        this.subscription = this.memberService
          .add({ ...this.addForm.value })
          .subscribe(
            (d) => {
              this.addForm.reset();
              this.messageService.add({
                severity: 'success',
                summary: 'Member Added',
                detail: d.message,
                sticky: true
              });
              this.router.navigate(['']);
            },
            (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: err.message,
              });
            },
            () => {
              this.loading = false;
            }
          );
      } else {
        this.subscription = this.memberService
          .update(this.member.id, { ...this.addForm.value })
          .subscribe(
            (d) => {
              this.addForm.reset();
              this.messageService.add({
                severity: 'success',
                summary: 'Member Updated',
                detail: d.message,
                sticky: true
              });
              this.router.navigate(['']);
            },
            (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: err.message,
              });
            },
            () => {
              this.loading = false;
            }
          );
      }
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid Form',
        detail: 'Please check details filled is correct.',
      });
    }
  }

  reset() {
    this.addForm.reset();
  }
}
