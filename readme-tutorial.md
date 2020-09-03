In below points * means important
Little tweaks made by me are represented using $

video 15: Creating custom validators
    a)look at required validator function of Validators class.We want our validator to look like that.
    b)Add a function 'required' for email in create-employee component
    c)return null if no validation error else return json object with key as error and value as true
    d)add custom validation to form control of email
    e)add custom meesage to custom validator in validationMessages property
    f)*also add those check for which you dont want validation in custom validator. For eg we don't want to check for required validation in email form control as it is handled by default angular validator 'required'

Video 16: Instead of setting static domain in validation function we pass dynamic domain to validation function  using concept called closures
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
    f)*we use square brackets in [formGroup] but not in formControlName of formArrayName bcoz formGroup expects object of formGroup whereas formControlName expects string which will be serched in [formGroup]

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

Video 25: *Added remove skill button only if no. of skills formGroup are greater than 1 using the length property of FormArray in component.html

Video 26: Added table in ListComponent
    a)*Using json-server to implement fake rest api calls
    b)install json-server and run using 'json-server --watch db.json' where db.json contains our dummy data
    c)Getting data from server to display list of employees

Video 27: Working on Edit employee Link in createEmployeeComponent
    a)Fixed validation on email and confirmEmail 
    b)Updating data from backened to current Form

Vide 28: Updating FormArray data of form which came from server
    a)*Accessing element of FormArray in component.html via 'formArrayname.0' where 0 is index
    b)$there are two way to add data to formarray 1)create new formarray and add validations and data 2)get existing formarray and remove element at 0th index if 0th index is added at the time of creation of formArray

Video 29: Updating backened with changes made in existing Employee
    a)*skipLocationChange: true when navigating which keeps the url unchanged
    b)request type put is made for updating existing data

Video 30: Creating new Employee and adding it to backened
    a)*Showing page title as 'Edit/Create Employee' based on from where user land on that page
    b)Making post request to backened

Video 31:Modules in Angular
    a)Feature Module:
    b)Root Module:
    c)Core Module: To create singleton services accross whole app and is imported in Root Module only.
    d)Shared Module: Common Components,Pipes,Directives etc are in Shared Modules.
    e)Routing Module:
    f)Home & pageNotFound component created with ng g c home --flat. Where flat does not create folder
    g)Added Error Handling when list of employee is not showned

Video 32: Refactoring our code
    a)Organized imports in app.module.ts
    b)Creating Employee module using 'ng g m employee/employee --flat -m app' where flat tells to not create any folder and -m tells to import our employee module in app module
    c)Removed ReactiveFormsModule from app.module as no component of module in app.module uses that
    d)added ReactiveFormsModule to EmployeeModule as we have employee related component in that which used formGroupName and formGroup in component.html
    e)To export EmployeeComponent or ReactiveFormsModule to be reused by other modules use export:[] in employee.module

Video 33: Creating routing module for feature level module
    a)Create employee-routing.module.ts manually
    b)*when creating routing module for feature we use forChild instead of forRoot.Why? because it forRoot returns a new Router service and we know services should be singleton so forChild returns the same instance of Router again.
    c)*Whenever we need like LoginComponent inside listComponent and we have to use its selector in ListComponent.html then we will do routing in employee-routing.module.ts
    d)we are not importing emoloyee-routing.module in employee.module.ts because neither create nor list component has child components to be routed to.
    e)*Order of imporing modules is important in app.module.ts from perspective of routing.module.ts in it.

Video 34: Creating shared modules
    a)Shared modules may re-export other common angular modules(Common,Forms Modules)
    b)Should not have providers
    c)Should not import or re-export modules that have providers
    d)Can be imported in all modules where we need shared modules
    e)ng g m shared/shared --flat -m employee/employee command is used to create shared module
    f)*Moved Common/ReactiveFormsModule from employee.module to shared.module
    g)*if we have to export commonModule from sharedModule then it is not necessary to import commonModule in sharedModule

Video 35: Grouping Routes & Creating a component less route
    a)*all lazyloaded modules should have same route prefix hence we are creating parent route in employee-routing.module
    b)*'employees' route in employee-routing.module is component less route as it has no component attached to it.

Video 36: Asynchronous routing loads route on demad. Helps in loading of webpages
    a)2 requirements for lazy loading - 1)all routes in a module to lazy load should have same prefix as done in Video 35. 2)The module should not be referenced in any other module else it will be eagerly loaded
    b)1)point is met in video 35 . 2)point is met by removing employeeModule from imports of app.module
    c)add route in app-routing.module and remove parent route from employee-routing.module
    d)dynamic import of EmployeeModule is done in app-routing.module
    e)forChild is used in employee-routing.module as it throws errors that forRoot should be used only once.
    f)Verify in source tab of network panel in developer tools of chrome