import { FormGroup } from "@angular/forms";

export function clearErrors(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
        const abstractControl = group.get(key);
        if (abstractControl instanceof FormGroup) {
            clearErrors(abstractControl);
        } else {
            abstractControl?.setErrors(null);
        }
    });
}