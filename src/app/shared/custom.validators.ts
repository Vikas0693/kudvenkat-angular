import { AbstractControl } from '@angular/forms';

//all validators should be static for single instance creation across angular app
export class CustomValidators {

/**
 * @description
 * to allow possible domains for validation checks
 * 
 * @param
 * domain which needs to pass validation check
 * 
 */
    static emailDomain(domainPassed: string ){
        /**
         *  @param 
         * FormControl obj for which to check domain value in email
        */
        return (control: AbstractControl): {[key: string] : any} | null => {
        //to validate email with pragimtech.com domain
        const email: string = control.value;
        const domain = email.substr(email.lastIndexOf('@')+1);
        if(email==='' || domain.toLowerCase() === domainPassed.toLowerCase()){
            return null;
        }
        else{
            return {'emailDomain': true};
        }
        };
    };
}