import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { CustomValidators } from '../shared/custom.validators';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from './employee.service';
import { IEmployee } from './IEmployee';
import { ISkill } from './ISkill';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  employee: IEmployee;
  pageTitle: string;
  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters.',
      'maxlength': 'Full Name must be less than 10 characters.'
    },
    'email': {
      'required': 'Email is required.',
      'emailDomain': 'Domain does not match the required domain \'dell.com\''
    },
    'confirmEmail': {
      'required': 'Confirm Email is required.'
    },
    'emailGroup': {
      'emailMismatch': 'Email & Confirm Email do not match.'
    },
    'phone': {
      'required': 'Phone number is required.'
    }
  };
  formErrors = {
    'fullName': '',
    'email': '',
    'confirmEmail': '',
    'emailGroup': '',
    'phone':''
  };

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private employeeService: EmployeeService,
            private router: Router) { }

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
      contactPreference: ['email'],//since default value is email and its a radio then no need for validation
      emailGroup: this.fb.group({
        email: ['',[Validators.required,  CustomValidators.emailDomain('dell.com')]],
        confirmEmail: ['',Validators.required],
      }, {validator: CustomValidators.matchEmail('email','confirmEmail')}),
      phone: [''],//no validation is added, so its added dynamically when user choose phone number as option in contactPreference
      skills: this.fb.array([
        this.addSkillFormGroup()
      ])
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
    this.employeeForm.valueChanges.subscribe((newData) => {
      //console.log('Value changs Observable on employeeForm got hit');
      this.logValidationErrors(this.employeeForm);
    });

    //subscribe to contactPreference so that when user chooses phone validation is added to phone input element
    this.employeeForm.get('contactPreference').valueChanges.subscribe((newData: string)=>{
      this.onContactPreferenceChange(newData);
    });

    this.route.paramMap.subscribe(params => {
      //+ converts string to number
      const empId = +params.get('id');
      //if empId is not null then we know that user has come from list employee page
      if(empId){
        this.getEmployee(empId);
        this.pageTitle = "Edit Employee"
      }//in else part new employee is being created by user
      else{
        this.pageTitle = "Create Employee"
        this.employee = {
          id: null,
          fullName: null,
          contactPreference: null,
          email: null,
          phone: null,
          skills: []
        }
      }
    });
    
  }

  getEmployee(id:number){
    this.employeeService.getEmployee(id).subscribe(
      (employee: IEmployee)=> {
        this.editEmployee(employee);
        this.employee = employee;
      },
      (error: any) => console.log(error)
    );
  }

  editEmployee(employee: IEmployee) {
    this.employeeForm.patchValue({
      fullName: employee.fullName,
      contactPreference: employee.contactPreference,
      emailGroup: {
        email: employee.email,
        confirmEmail: employee.email
      },
      phone: employee.phone
    });
    this.employeeForm.setControl('skills', this.setExistingSkills(employee.skills));
  }

  setExistingSkills(skillSets: ISkill[]): FormArray{
    /* const formArray = <FormArray>this.employeeForm.get('skills');
    formArray.removeAt(0); */
    //we can either get existing FormArray and remove existing FormGroup at 0 which is created in ngOnInit(). Benefit is we won't need to add validations in this case
    //else we can create completely new FormArray as below and add validations too
    const formArray = this.fb.array([]);
    skillSets.forEach(element => {
      const grp = this.fb.group({
        skillName: [element.skillName, Validators.required],
        experienceInYears: [element.experienceInYears, Validators.required],
        proficiency: [element.proficiency, Validators.required]
      });
      grp.markAllAsTouched();grp.markAsDirty();
      formArray.push(grp);
    }); 
    return formArray;
  }

  addSkillButtonClick(): void{
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
  }

  removeSkillButtonClick(indexOfSkillFormGroup : number): void{
    const skillsFormArray = (<FormArray>this.employeeForm.get('skills'));
    skillsFormArray.removeAt(indexOfSkillFormGroup);
    skillsFormArray.markAsDirty();skillsFormArray.markAsTouched();
  }

  addSkillFormGroup(): FormGroup{
    return this.fb.group({
      skillName: ['',Validators.required],
      experienceInYears: ['',Validators.required],
      proficiency: ['',Validators.required]
    })
  }

  onContactPreferenceChange(optionChoosed: string){
    const phone_FormControl = this.employeeForm.get('phone');
    if(optionChoosed === 'phone'){
      console.log('set phone validators');
      phone_FormControl.setValidators([Validators.required]);
      phone_FormControl.markAsTouched();
    }
    else{
      console.log('clear phone validators');
      phone_FormControl.clearValidators();
    }
    //updateValueAndValidity() immediately updates the value which in turn calls valueChanges() observable which we have subscribed in ngOnInit()
    phone_FormControl.updateValueAndValidity();
  }

  //if we dont pass any FormGroup object then is assigns default value as this.employeeForm
  logValidationErrors(group :FormGroup = this.employeeForm): void{
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      //if user clicks more than 1 time then on 2nd time below will clear the previous setted error
      this.formErrors[key] = '';
      //touched means  field is  clicked
      //if touched and is not valid then enter below case
      if(abstractControl && abstractControl.invalid && (abstractControl.touched || abstractControl.dirty || abstractControl.value != '')){
        const messages = this.validationMessages[key];
        //in below errorKey is kind of error like 'required','minLength','maxLength' etc..
        for(const errorKey in abstractControl.errors){
          if(errorKey){
            this.formErrors[key] += messages[errorKey] + ' ';
            console.log('Error json ',this.formErrors);
          }
        }
      }
      if(abstractControl instanceof FormGroup){
        this.logValidationErrors(abstractControl);
      }
    });
    
  }

  onSubmit(): void{
    this.mapFormValuesToEmployeeModel();
    //below if condition check if employee already has id to some number then we are updating existing Employee else we have to create one
    if(this.employee.id){
      this.employeeService.updateEmployee(this.employee).subscribe(
        () => {this.router.navigate(['/employees'],{skipLocationChange: true});},
        (err:any) => console.log(err)
      );
    }
    else{
      this.employeeService.addEmployee(this.employee).subscribe(
        () => {this.router.navigate(['/employees']);},
        (err:any) => console.log(err)
      );
    }
  }

  onLoadDataClick(): void{
    const formArray = new FormArray([
      new FormControl('John', Validators.required),
      new FormGroup({
        country: new FormControl('',Validators.required)
      }),
      new FormArray([
        new FormControl('Me')
      ])
    ]);

    
    console.log(`Form Array length = ${formArray.length}`);

    for(const control of formArray.controls){
      if(control instanceof FormControl){
        console.log('Control is FormControl');
      }
      else if(control instanceof FormGroup){
        console.log('Control is FormGroup');
      }
      else{
        console.log('Control is FormArray');
      }
    }

    //another way to create formArray 
    const formArray1 = this.fb.array([
      new FormControl('John', Validators.required),
      new FormControl('IT', Validators.required),
      new FormControl('', Validators.required),
    ]);
    console.log(formArray1.value);
    //valid will be false if any of elements of formArray1 fails validation
    console.log(formArray1.valid);
    const formGroup = this.fb.group([
      new FormControl('John', Validators.required),
      new FormControl('IT', Validators.required),
      new FormControl('', Validators.required),
    ]);
    console.log('Serialized FormArray ',formArray1);
    console.log('Serialized FormGroup ',formGroup);
  }
  /**
   * @description
   * transfer data from employeeForm to IEmployee object to be sent to backened
   */
  mapFormValuesToEmployeeModel(){
    
    //this.employee.fullName = this.employeeForm.get('fullName').value;
    //both instruction do the same thing
    this.employee.fullName = this.employeeForm.value.fullName;
    this.employee.contactPreference = this.employeeForm.get('contactPreference').value;
    this.employee.email = this.employeeForm.get('emailGroup').get('email').value;
    this.employee.phone = this.employeeForm.get('phone').value;
    this.employee.skills = this.employeeForm.get('skills').value;
  }
}

