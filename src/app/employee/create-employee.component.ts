import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  fullNameLength =0;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    /* this.employeeForm = new FormGroup({
      fullName: new FormControl(),
      email: new FormControl(),
      skills: new FormGroup({
        skillName: new FormControl(),
        experienceInYears: new FormControl(),
        proficiency: new FormControl()
      })
    }); */
    this.employeeForm = this.fb.group({
      fullName: ['',[Validators.required,Validators.minLength(2), Validators.maxLength(10)]],
      email: ['',Validators.email],
      skills: this.fb.group({
        skillName: [''],
        experienceInYears: [2],
        proficiency: ['beginner']
      })
    });
    //console.log('Employee Form full name error :',this.employeeForm.get('fullName').errors);
    //control valueChanges
    // this.employeeForm.get("fullName").valueChanges.subscribe((value:string) => {
    //   this.fullNameLength = value.length;
    // });
    //group value changes
    // this.employeeForm.valueChanges.subscribe(value => {
    //   console.log(JSON.stringify(value));
    // });
  }
  onSubmit(): void{
    console.log(this.employeeForm.value);
  }

  onLoadDataClick(): void{
    //in setValue method it is mandatory to set all fields but in patchValue we set subset fields
    //this.employeeForm.setValue({
      this.employeeForm.patchValue({
      fullName: 'Vikas Sharma',
      email: null,
      /* skills: {
        skillName: 'Python',
        experienceInYears: 2,
        proficiency: 'beginner'
      } */
    });
  }

}
