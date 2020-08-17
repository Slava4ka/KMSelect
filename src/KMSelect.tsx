import React, {useCallback, useRef, useState} from 'react';
import styles from "./multiSelectStyle.module.scss";
import Arrow from "./icons/Arrow";
import useOutsideClick from "./useOutsideClick";
import Close from "./icons/Close";
import {ICheckboxEntity, IKMSelect, ISelectEntity, ISelectItem} from "./interface";

const ignoreId = 'DyTDnSn-wRf1miik-kgkYYQr2-lh7Pur5-3H8oFG'

const SelectItem = ({name, isChecked, onClickAction, onChangeAction, highlight}:ISelectItem) => (
		<div
			className={highlight ? `${styles.listItem} ${styles.selected}` : styles.listItem}
			onClick={onClickAction}
		>
			<div className={styles.optionBox}>
				<div className={styles.option}>
					<input
						name={name}
						type="checkbox"
						checked={isChecked}
						onChange={onChangeAction}
					/>
					<label htmlFor="option">
						<span>{name}</span>
					</label>
				</div>
			</div>
		</div>)

const KMSelect = ({placeholder, data, callback}:IKMSelect) => {

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const [defaultData] = useState<ICheckboxEntity[]>(data.map((item: ISelectEntity, index: number) => ({
		...item, selected: false, selectedInThisSession: false, id: index,
	})));

	const [checkboxData, setCheckboxData] = useState<ICheckboxEntity[]>([...defaultData]);

	const [checkboxCount, setCheckboxCount] = useState<number>(0);

	const [filterTemplate, setFilterTemplate] = useState<string>('');

	const ref = useRef(null);

	const setSelectedHandler = (checkedStatus: boolean, index: number) => {
		checkedStatus ? setCheckboxCount(checkboxCount + 1) : setCheckboxCount(checkboxCount - 1)
		setCheckboxData(
			[
				...checkboxData.slice(0, index),
				{...checkboxData[index], selectedInThisSession: checkedStatus},
				...checkboxData.slice(index + 1),
			]
		)
	};

	const listFilter = useCallback((data: ICheckboxEntity[]): ICheckboxEntity[] => {
		if (filterTemplate.length > 0) {
			return data.filter(item => item.name.toLowerCase().includes(filterTemplate.toLowerCase()))
		} else {
			return data;
		}
	}, [filterTemplate])

	const updateCheckboxData = () => {
		setCheckboxData([...checkboxData.map(item => ({...item, selected: item.selectedInThisSession}))]);
	};

	const onCloseHandler = (e: any) => {
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
			callback(checkboxData.filter(item => item.selectedInThisSession));
			setIsOpen(false);
			updateCheckboxData();
		},
		isOpen
	);

	return <div className={styles.multiSelect}>
		<div
			className={styles.box}
			role='combobox'
			aria-expanded={isOpen}
			aria-haspopup='listbox'
			aria-controls='multiselect'
			ref={ref}
		>
			<div className={styles.field}>
				{checkboxCount > 0 &&
					<div
						id={ignoreId}
                        onClick={(e) => onCloseHandler(e)}
                        role="button"
						className={styles.selectedCount}
						tabIndex={0}
						aria-label="Clear Selection"
						title="Clear Selection"
					>
						{checkboxCount}
						<Close id={ignoreId} />
					</div>
				}
				<input
					type="text"
					className={checkboxCount > 0 ? `${styles.textInput} ${styles.moveInput}` : styles.textInput}
					autoComplete='off'
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
							    className={styles.customButton}
							    onClick={() => setFilterTemplate('')}>
							    <Close id={ignoreId}/>
						    </button>
					    )
				    }
				    <button className={styles.customButton} onClick={() => setIsOpen(!isOpen)}>
					    <Arrow direction={isOpen ? "up" : "down"} />
				    </button>
			    </div>
			</div>
			{
				isOpen && (
					<div className={styles.list}>
						{
							[
								...listFilter(checkboxData).filter((item:ICheckboxEntity) => item.selected),
								...listFilter(checkboxData).filter((item:ICheckboxEntity) => !item.selected)
							].map((item:ICheckboxEntity) => (
								<SelectItem
									key={item.value}
									name={item.name}
									isChecked={item.selectedInThisSession}
									highlight={item.selected}
									onChangeAction={(e) => setSelectedHandler(e.target.checked, item.id)}
									onClickAction={() => setSelectedHandler(!item.selectedInThisSession, item.id)}
								/>
							))
						}
					</div>
				)
			}
		</div>
	</div>

};

export default KMSelect;
