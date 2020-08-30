import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { CustomValidators } from '../shared/custom.validators';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
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
    },
    'skillName': {
      'required': 'Skill name is required.'
    },
    'experienceInYears': {
      'required': 'Experience is required.'
    },
    'proficiency': {
      'required': 'Proficiency is required.'
    }
  };
  formErrors = {
    'fullName': '',
    'email': '',
    'confirmEmail': '',
    'emailGroup': '',
    'phone':'',
    'skillName': '',
    'experienceInYears': '',
    'proficiency': ''
  };

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
      contactPreference: ['email'],//since default value is email and its a radio then no need for validation
      emailGroup: this.fb.group({
        email: ['',[Validators.required,  CustomValidators.emailDomain('dell.com')]],
        confirmEmail: ['',Validators.required],
      }, {validator: CustomValidators.matchEmail('email','confirmEmail')}),
      phone: [''],//no validation is added, so its added dynamically when user choose phone number as option in contactPreference
      skills: this.fb.group({
        skillName: ['',Validators.required],
        experienceInYears: ['',Validators.required],
        proficiency: ['',Validators.required]
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
    this.employeeForm.valueChanges.subscribe((newData) => {
      //console.log('Value changs Observable on employeeForm got hit');
      this.logValidationErrors(this.employeeForm);
    });

    //subscribe to contactPreference so that when user chooses phone validation is added to phone input element
    this.employeeForm.get('contactPreference').valueChanges.subscribe((newData: string)=>{
      this.onContactPreferenceChange(newData);
    });
    
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
      if(abstractControl && abstractControl.invalid && (abstractControl.touched || abstractControl.dirty)){
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
    console.log(this.employeeForm.value);
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
}
