import { FormControl, FormGroup } from '@angular/forms';

export function emailValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidEmail: true };
    }
}

export function comboboxNumberValidator(
    control: FormControl
): { [key: string]: any } {
    console.log('Validation:', control.value);
    if (control.value === 0) {
        return { invalidField: true };
    }
}

export function comboboxValidator(
    control: FormControl
): { [key: string]: any } {
    const PATTERN = /^[A-Za-z-]*$/;
    const PATTERN1 = /^[0-9 -]*$/;
    // if (control.value === '') {
    //     return { invalidField: true };
    // }
    if (!PATTERN.test(control.value) && !PATTERN1.test(control.value)) {
        return { invalidField: true };
    }
}

export function comboboxStringValidator(control: FormControl): { [key: string]: any } {
    // console.log(control.value);
    if (control.value === 'NA') {
        return { invalidField: true };
    }
}

export function numberValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^[0-9]*$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidNumber: true };
    }
}
export function codeValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^[a-zA-Z]*$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidCode: true };
    }
}
export function pacsNameValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^[a-zA-Z. ]*$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidPacsName: true };
    }
}
export function nameValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^[a-zA-Z.\d-_()'&-/ ]*$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidName: true };
    }
}

export function titleValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^(?![0-9_\@-]*$)^([0-9a-zA-Z _\@-]*)$/; // ^[a-zA-Z0-9_\-@ ]*$
    if (control.value && !pattern.test(control.value)) {
        return { invalidTitle: true };
    }
}

export function titleValidator2(control: FormControl): { [key: string]: any } {
    const pattern = /^([0-9a-zA-Z _\@-]*)$/; // ^[a-zA-Z0-9_\-@ ]*$
    if (control.value && !pattern.test(control.value)) {
        return { invalidTitle: true };
    }
}

export function userIdValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^[a-zA-Z0-9 ]{6,20}$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidUserId: true };
    }
}

export function addrValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^[a-zA-Z0-9-_()\n\t@,/.$%&:' ]*$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidAddr: true };
    }
}
export function licenseNoValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^[a-zA-Z0-9-_()\&:/ ]*$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidLicense: true };
    }
}
export function dateValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^((0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-[12]\d{3})$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidDate: true };
    }
}

export function linkValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^[a-zA-Z0-9-_()&./' ]*$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidLink: true };
    }
}

export function passwordValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!*])[A-Za-z\d$@$!*]{8,20}$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidPassword: true };
    }
}

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
        const password = group.controls[passwordKey];
        const passwordConfirmation = group.controls[passwordConfirmationKey];
        if ((passwordConfirmation.value !== '') && (password.value !== passwordConfirmation.value)) {
            return passwordConfirmation.setErrors({ mismatchedPasswords: true });
        }
    };
}
// added by Amrita
// Date : 3/08/2018
export function resourceNameValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^[a-zA-Z0-9-_&/ ]{2,50}$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidResourceName: true };
    }
}
export function descValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^[a-zA-Z0-9-_()\n@,/.$%&:' ]*$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidDesc: true };
    }
}

export function urlValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^[a-zA-Z0-9-_()@.&/' ]*$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidUrl: true };
    }
}
// added by Prachi
// Date : 3/08/2018
export function roleNameValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^[a-zA-Z0-9- _& ]{2,50}$/;
    // const pattern = /^[a-zA-Z0-9-_]{6,20}$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidRoleName: true };
    }

}
// added by Amrita on date: 27-08-2018  ^((\+)?(\d{2}[-]))?(\d{10}){1}?$
export function mobileNumberValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^[6-9]{1}[0-9]{9}$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidMobileNumber: true };
    }
}

export function panCardValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^[A-Za-z]{5}\d{4}[A-Za-z]{1}?$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidPanNumber: true };
    }
}

export function aadharCardValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^((\+)?(\d{2}[-]))?(\d{12}){1}?$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidAadharNumber: true };
    }
}

export function gstinNoValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9A-Z]{1})+$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidGstinNumber: true };
    }
}
export function httpUrlValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidUrl: true };
    }
}
export function nullValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^/;
    if (control.value && !pattern.test(control.value)) {
        return { invalid: true };
    }
}

export function numberComparator(firstNum: string, secondNum: string) {
    return (group: FormGroup) => {
        const num1 = group.controls[firstNum];
        const num2 = group.controls[secondNum];
        if (Number(num1.value) > Number(num2.value)) {
            return num1.setErrors({ isGreaterThan: true });
        } else {
            return null;
        }
    };
}
export function emailPasswordValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!*])[A-Za-z\d$@$!*]{0,20}$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidPassword: true };
    }
}
export function pinNumberValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^[1-9][0-9]{5}$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidPinNumber: true };
    }
}
export function regdNoValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^[a-zA-Z0-9-_()\&:/ ]+[\.]*[a-zA-Z0-9-_()\&:/\. ]*$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidLicense: true };
    }
}
/* export function dateFormatValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
    if (control.value && !pattern.test(control.value)) {
        return { invaliddate: true };
    }
} */
export function kccNumberValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^[0-9]{9}$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidKCCNumber: true };
    }
}
export function rupayKCCNumberValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^[0-9]{12}$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidRupayKCCNumber: true };
    }
}

export function ifscCodeValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^[a-zA-Z]{4}0[a-zA-Z0-9]{6}$/; // /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidIfsc: true };
    }
}

export function bankAccNoValidator(control: FormControl): { [key: string]: any } {
    const pattern = /^[0-9][0-9]{10,16}$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidAccountNumber: true };
    }
}

export function bankAccNoValidatorForDCCB(control: FormControl): { [key: string]: any } {
    const pattern = /^[0-9]{12}$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidAccountNumberDCCB: true };
    }
}

