import { assertTrue } from "../helper/assert/assert-true";
import { ElementControl } from "./element-control";

export class CheckboxControl extends ElementControl {
    /**
     * Actions
     */
    public async checkCheckbox(): Promise<void> {
        if (!(await this.isChecked())) {
            await this.click();
        }
    }

    public async uncheckCheckbox(): Promise<void> {
        if (await this.isChecked()) {
            await this.click();
        }
    }

    public async isChecked(): Promise<boolean> {
        return (await this.getAttribute('aria-checked')) === 'true';
    }

    public async assertSelected(selected: 'is' | 'is not'): Promise<void> {
        switch (selected) {
            case 'is':
                assertTrue(await this.isChecked(), 'Payment account option is not selected');
                break;
            case 'is not':
                assertTrue(!(await this.isChecked()), 'Payment account option is selected');
                break;
            default:
                throw new Error('Unkown parm')
        }
    }
}
