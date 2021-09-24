import { useEffect } from 'react';

const useOutsideClick = (ref: any, ignoreId: string, callback: () => void, state: boolean) => {
	const handleClick = (e: any) => {
		if (e.target.id !== ignoreId && ref.current && !ref.current.contains(e.target) && state) {
			callback();
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		};
	});
};

export default useOutsideClick;
