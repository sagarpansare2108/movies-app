import { VALIDATION_ERRORS } from "./validation.errors";
import { VALIDATION_RULES } from "./validation.rules";

export const EMPLOYEE_FORM_VALIDATION_RULES: Array<{ field: any, rules: Array<{ rule: (value: any) => any, message: string }> }> = [
    { field: 'firstName', rules: [{ rule: (value: any) => !value, message: VALIDATION_ERRORS.required }] },
    { field: 'lastName', rules: [{ rule: (value: any) => !value, message: VALIDATION_ERRORS.required }] },
    {
        field: 'email', rules: [
            { rule: (value: any) => !value, message: VALIDATION_ERRORS.required },
            { rule: (value: any) => value && !VALIDATION_RULES.email.test(value), message: VALIDATION_ERRORS.email }
        ]
    },
    {
        field: 'phone', rules: [
            { rule: (value: any) => !value, message: VALIDATION_ERRORS.required },
            { rule: (value: any) => value && !value.match(VALIDATION_RULES.phone), message: VALIDATION_ERRORS.phone }
        ]
    },
    { field: 'city', rules: [{ rule: (value: any) => !value, message: VALIDATION_ERRORS.required }] },
    { field: 'address', rules: [{ rule: (value: any) => !value, message: VALIDATION_ERRORS.required }] }
];