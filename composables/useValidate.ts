import type { DefaultFieldType } from "@/types/form-data";

export default () => {
  const validate = {
    emailRegex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // Email Validator
    phoneNumberRegex: /^\+\d{12}$/, // /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\s\W\D\S]{8,}$/, // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
    rules: {
      required: (value: any) => (!!value || 'Required.'),
      requiredList: (value: any) => (value.length > 0 || 'Required.'),
      email: (value: any) => (validate.emailRegex.test(value) || 'Email is invalid.'),
      phoneNumber: (value: any) => (validate.phoneNumberRegex.test(value) || 'Phone number is invalid.'),
      password: (value: any) => (validate.passwordRegex.test(value) || 'Password is invalid.')
    },
    numbersOnly: ($event: any, withPoint: any) => {
      // console.log($event.keyCode, withPoint); //keyCodes value
      const keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && !((keyCode == 190 || keyCode == 46) && withPoint)) { $event.preventDefault(); }
    },
    lettersOnly: ($event: any) => {
      // console.log($event.keyCode); //keyCodes value
      const keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 97 || keyCode > 122) && (keyCode < 65 || keyCode > 90) && keyCode != 32 && keyCode != 45) { $event.preventDefault(); }
    },
    handleErrors: (data: { [key: string]: any }, errors: { [key: string]: any }) => {
      for (const slug in errors) {
        const field: DefaultFieldType<any> = Object.values(data).find((field: DefaultFieldType<any>) => (field.slug === slug));
        if (field) { field.error = errors[slug]; }
      }
    },
    clearErrors: (data: { [key: string]: any }) => {
      Object.values(data).forEach((field: DefaultFieldType<any>) => {
        if (field.hasOwnProperty('error')) { field.error = null; }
      });
    }
  };
  return validate;
};