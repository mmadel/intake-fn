import { FormGroup } from "@angular/forms";

export class ValidationExploder {
    public static explode(form: FormGroup, formName: string) {
        var basicForm: FormGroup = form.get(formName) as FormGroup;
        Object.keys(basicForm.controls).forEach(field => {
            const control = basicForm.get(field);
            control?.markAsTouched({ onlySelf: true });
        });
    }
    private static scrollUp() {
        (function smoothscroll() {
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.scrollTo(0, 0);
            }
        })();
    }
}