import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cenzurosValidator(
  control: AbstractControl
): ValidationErrors | null {
  const cenzuruotiZodziai = ['observable', 'lombok', 'mainframe', 'SEB'];
  const zodis = control.value;
  const cenzuruotas = cenzuruotiZodziai.find((cenzuruotiZodis) =>
    zodis.includes(cenzuruotiZodis)
  );
  return cenzuruotas ? { cenzuruotas: { value: cenzuruotas } } : null;
}
