import React, {
	useCallback, useRef, useState, MouseEvent,
} from 'react';
import { FixedSizeList as List } from 'react-window';
import Arrow from './icons/Arrow';
import Close from './icons/Close';
import useOutsideClick from './useOutsideClick';
import {
	ICheckboxEntity, IKMSelect, IRow, ISelectEntity, ISelectItem,
} from './interface';

import styles from './kmSelect.module.scss';

const ignoreId = 'DyTDnSn-wRf1miik-kgkYYQr2-lh7Pur5-3H8oFG';

const SelectItem = ({
	name, isChecked, onClickAction, onChangeAction, highlight, style,
}: ISelectItem) => (
	<div
		id={ignoreId}
		className={highlight ? `${styles.listItem} ${styles.selected}` : styles.listItem}
		onClick={onClickAction}
		style={style}
		aria-hidden
	>
		<div id={ignoreId} className={styles.optionBox}>
			<div id={ignoreId} className={styles.option}>
				<input
					id={ignoreId}
					name={name}
					type="checkbox"
					checked={isChecked}
					onChange={onChangeAction}
				/>
				<label id={ignoreId} htmlFor="option">
					<span id={ignoreId}>{name}</span>
				</label>
			</div>
		</div>
	</div>
);

const KMSelect = ({
	placeholder, data, callback, checkboxCountStyles,
}: IKMSelect) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const [defaultData] = useState<ICheckboxEntity[]>(data.map((item: ISelectEntity, index: number) => ({
		...item, selected: false, selectedInThisSession: false, id: index,
	})));

	const [checkboxData, setCheckboxData] = useState<ICheckboxEntity[]>([...defaultData]);

	const [checkboxCount, setCheckboxCount] = useState<number>(0);

	const [filterTemplate, setFilterTemplate] = useState<string>('');

	const ref = useRef(null);

	const setSelectedHandler = useCallback((checkedStatus: boolean, index: number) => {
		setCheckboxCount(checkedStatus ? checkboxCount + 1 : checkboxCount - 1);
		setCheckboxData(
			[
				...checkboxData.slice(0, index),
				{...checkboxData[index], selectedInThisSession: checkedStatus},
				...checkboxData.slice(index + 1),
			],
		);
	}, [checkboxCount, checkboxData]);

	const listFilter = useCallback((list: ICheckboxEntity[]): ICheckboxEntity[] => {
		if (filterTemplate.length > 0) {
			return list.filter((item) => item.name.toLowerCase().includes(filterTemplate.toLowerCase()));
		}

		return list;
	}, [filterTemplate]);

	const updateCheckboxData = useCallback(() => {
		setCheckboxData([...checkboxData.map((item) => ({...item, selected: item.selectedInThisSession}))]);
	}, [checkboxData]);

	const onDropHandler = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		e.preventDefault();
		setCheckboxData([...defaultData]);
		setCheckboxCount(0);
		callback([]);
	};

	useOutsideClick(
		ref,
		ignoreId,
		() => {
			callback(checkboxData.filter((item) => item.selectedInThisSession));
			setIsOpen(false);
			updateCheckboxData();
		},
		isOpen,
	);

	const actualCheckboxData = ([
		...listFilter(checkboxData).filter((item:ICheckboxEntity) => item.selected),
		...listFilter(checkboxData).filter((item:ICheckboxEntity) => !item.selected),
	]);

	const Row = useCallback(({ index, style}: IRow) => (
		<SelectItem
			style={style}
			key={actualCheckboxData[index].value}
			name={actualCheckboxData[index].name}
			isChecked={actualCheckboxData[index].selectedInThisSession}
			highlight={actualCheckboxData[index].selected}
			onChangeAction={(e) => setSelectedHandler(e.target.checked, actualCheckboxData[index].id)}
			onClickAction={() => setSelectedHandler(
				!actualCheckboxData[index].selectedInThisSession, actualCheckboxData[index].id,
			)}
		/>
	), [actualCheckboxData, setSelectedHandler]);

	return (
		<div className={styles.multiSelect}>
			<div
				className={styles.box}
				role="combobox"
				aria-expanded={isOpen}
				aria-haspopup="listbox"
				aria-controls="multiselect"
				ref={ref}
			>
				<div className={styles.field}>
					{checkboxCount > 0
					&& (
						<div
							id={ignoreId}
							style={checkboxCountStyles}
							onClick={(e) => onDropHandler(e)}
							role="button"
							className={styles.selectedCount}
							tabIndex={0}
							aria-label="Clear Selection"
							title="Clear Selection"
							aria-hidden
						>
							{checkboxCount}
							<Close id={ignoreId} />
						</div>
					)}
					<input
						type="text"
						className={checkboxCount > 0 ? `${styles.textInput} ${styles.moveInput}` : styles.textInput}
						autoComplete="off"
						placeholder={placeholder}
						onClick={() => setIsOpen(true)}
						value={filterTemplate}
						onChange={(e) => setFilterTemplate(e.target.value)}
					/>
					<div className={styles.buttonGroup}>
						{
							filterTemplate.length > 0 && (
								<button
									id={ignoreId}
									type="button"
									className={styles.customButton}
									onClick={() => setFilterTemplate('')}
								>
									<Close id={ignoreId} />
								</button>
							)
						}
						<button className={styles.customButton} type="button" onClick={() => setIsOpen(!isOpen)}>
							<Arrow direction={isOpen ? 'up' : 'down'} />
						</button>
					</div>
				</div>
				{
					isOpen && (
						<List
							className={styles.list}
							height={200}
							itemCount={actualCheckboxData.length}
							itemSize={35}
							width={300}
						>
							{Row}
						</List>
					)
				}
			</div>
		</div>
	);
};

export default KMSelect;
