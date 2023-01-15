
export interface DynamicFormControl {
    type: string;
    position: string;
    id: string;
    text: string;
    value: string;
    validation: string;
    navigate: string;
}

export interface Page {
    pageid: string;
    controls: DynamicFormControl[];
}

export interface dynamicControlModel {
    pages: Page[];
}

export interface menubar {
    title: string;
    url: string;
    icon: string;
}



