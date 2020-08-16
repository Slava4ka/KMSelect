import {ChangeEvent} from "react";

export interface ISelectEntity {
	name: string;
	value: string;
}

export interface IKMSelect {
	placeholder: string;
	data: ISelectEntity[];
	callback: (selectedFilters: any) => void;
}

export interface ICheckboxEntity extends ISelectEntity {
	id: number;
	selected: boolean;
	selectedInThisSession: boolean;
}

export interface ISelectItem {
	name: string;
	isChecked: boolean;
	onClickAction: () => void;
	onChangeAction: (e: ChangeEvent<HTMLInputElement>) => void
	highlight: boolean;
}
