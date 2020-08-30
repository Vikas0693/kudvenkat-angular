In below points * means important
Little tweaks made by me are represented using $

video 15: Creating custom validators
    a)look at required validator function of Validators class.We want our validator to look like that.
    b)Add a function 'required' for email in create-employee component
    c)return null if no validation error else return json object with key as error and value as true
    d)add custom validation to form control of email
    e)add custom meesage to custom validator in validationMessages property
    f)*also add those check for which you dont want validation in custom validator. For eg we don't want to check for required validation in email form control as it is handled by default angular validator 'required'

Video 16: Instead of setting static domain in validation function we pass dynamic domain to validation function     
    using concept called closures
    a)what is closure? Its a func. that returns another function.
    b)so inside a emailDomain function we are accepting valid domains and use it to check in inner anonymous function

Video 17: Added CustomValidator.ts class for reusable accross whole angular app
    a)*add static keyword for reusability

Video 18: Adding cross-validation i.e Validation on one input based on value of another input
    a)$created new custom validator 'matchEmail' on formGroup named emailGroup
    b)modified logValidationErros to add validation checks to formErrors on FormGroup
    c)Added validation on emailGroup in employeeForm
    d)validationMessages and formErrors propert updated with emailGroup key

Video 19: Understanding FormArray
    a)FormArray can have nested formControl and formGroup and formArray
    b)*If any of the elements of formArray has validation error like required,minLength etc.. then whole formArray will have the validation error
    c)*Usefull methods of FormArray - push(formCntrol/formGroup/formArray object),insert(index),removeAt(index),setControl(index):replaces the control at index,at(index):returns control currently at index.
    d)*Diff b/w formArray and formGroup - formArray serializes elments as array and formGroup serializes elements as objects. Try loading data on createEmployee page and look for elements in FormArray and FormGroup