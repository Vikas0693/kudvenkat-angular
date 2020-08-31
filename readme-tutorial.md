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

Video 20: Preparing for adding dynamic input tags
    a)added formArray to skills in employeeForm
    b)added formArrayName attribute in component.html
    c)updated logValidationErrors method of CreateEmployee to handle validation in FormArray namely 'skills'

Video 21: Added add-skill button to add group to form
    a)*TypeCasted AbsractControl to FormArray in CreateEmployee component.ts
    b)*Accessing ForomArray function named 'controls' on AbstractControl in employee.component.html using ['controls']

Video 22: To focus correct input element on clicking a label we set dynamic id's of input
    a)*used attribute binding with for attribute in label in create-employee.html
    b)*used property binding with id property in input element in create-employee.html

Video 23: Handling Validation Exceptions for added skills
    a)*FormControl accessed via control property as well as get() method in createEmployee.component.html
    b)*Question Mark(?) is called as safe navigation operator and is used in html for safe navigation from null and undefined.
    c)removed logValidation on blur event because now validation has moved to html itself
    d)*removed a patch from logValidationErrors() because the validation are itself done in component.html

Video 24: Adding validation to FormArray. Disabling AddSkill button if any of formGroup is invalid. We know FormFroup is invalid if any of its fromControl is invalid
    a)User cannot add more skills untill all FormGroups in FormArray are valid
