import {ChangeEvent, CSSProperties} from 'react';

export interface ISelectEntity {
	name: string;
	value: string;
}

export interface IRow {
	index: number;
	style: CSSProperties;
}

export interface ICheckboxEntity extends ISelectEntity {
	id: number;
	selected: boolean;
	selectedInThisSession: boolean;
}

export interface IKMSelect {
	placeholder: string;
	data: ISelectEntity[];
	callback: (selectedFilters: ICheckboxEntity[]) => void;
	checkboxCountStyles?: CSSProperties;
}

export interface ISelectItem {
	name: string;
	isChecked: boolean;
	onClickAction: () => void;
	onChangeAction: (e: ChangeEvent<HTMLInputElement>) => void
	highlight: boolean;
	style: CSSProperties;
}
