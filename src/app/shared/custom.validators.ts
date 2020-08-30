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
    }
    /**@description
     * validation that second field is equal to first one which are within same formGroup i.e formGroupName attribute in component.html
     */
    static matchEmail(firstControlName:string, secondControlName: string){
        /** 
        * @param
        * FormGroup within which we have to check for validation in two formControl named as 'firstControlName' and 'secondControlName'
        * */
        return (group: AbstractControl): {[key:string]: any} | null => {
        //get nested email and confirmEmail
        const email = group.get(firstControlName);
        const confirmEmail = group.get(secondControlName);
        //pristine means user hasn't typed anything inside input box
        if(email.value == confirmEmail.value || confirmEmail.pristine)
            return null;
        else
            return {'emailMismatch':true};
        };
    }
}