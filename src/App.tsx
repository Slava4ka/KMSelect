import React from 'react';
import styles from './multiSelectStyle.module.scss'
import KMSelect from "./KMSelect";
import data from './data';

const App = () => {

	return (
		<div className={styles.App}>
			<KMSelect
				placeholder={'Filter'}
				data={data}
				callback={(selectedFilters: any) => console.log(selectedFilters)}
			/>
		</div>
	);
}

export default App;
