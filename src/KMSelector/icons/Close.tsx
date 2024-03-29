import React from 'react';

interface IClose {
	id?: string;
}

const Close = ({id}: IClose) => (
	<svg
		id={id}
		focusable="false"
		preserveAspectRatio="xMidYMid meet"
		xmlns="http://www.w3.org/2000/svg"
		fill="currentColor"
		width="16"
		height="16"
		viewBox="0 0 32 32"
		aria-hidden="true"
	>
		<path
			id={id}
			d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4z"
		/>
	</svg>
);

export default Close;
