import React from 'react';

interface IArrow {
	direction: 'up' | 'down';
}

const Arrow = ({direction}: IArrow) => {
	const directionStyle = direction === "up" ? {transform: 'rotate(180deg)'} : {transform: 'rotate(0deg)'}

	return (
		<svg style={directionStyle} version="1.1" id="icon" viewBox="0 0 32 32">
			<polygon points="16,22 6,12 7.4,10.6 16,19.2 24.6,10.6 26,12 "/>
		</svg>
	);
};


export default Arrow;
