import React from 'react';
import KMSelect from './KMSelector/KMSelect';
import data from './data';

const App = () => (
	<div style={{
		height: '32px',
		width: '300px',
	}}
	>
		<KMSelect
			placeholder="Filter"
			data={data}
			callback={(selectedFilters: any) => {
				/* eslint-disable-next-line no-console */
				console.log(selectedFilters);
			}}
		/>
	</div>
);

export default App;
