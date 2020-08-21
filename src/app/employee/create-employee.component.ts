import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
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
      fullName: ['Default Value'],
      email: [''],
      skills: this.fb.group({
        skillName: [''],
        experienceInYears: [2],
        proficiency: ['beginner']
      })
    });
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
