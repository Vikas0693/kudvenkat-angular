In below points * means important

video 15: Creating custom validators
    a)look at required validator function of Validators class.We want our validator to look like that.
    b)Add a function 'required' for email in create-employee component
    c)return null if no validation error else return json object with key as error and value as true
    d)add custom validation to form control of email
    e)add custom meesage to custom validator in validationMessages property
    f)*also add those check for which you dont want validation in custom validator. For eg we don't want to check for required validation in email form control as it is handled by default angular validator 'required'