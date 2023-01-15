import { createContext, useEffect, useState } from 'react';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase';

export const CategoriesContext = createContext({
	categoriesMap: {}
})

export function CategoriesProvider({ children }) {
	const [categoriesMap, setCategoriesMap] = useState({});
	const value = { categoriesMap };

	useEffect(() => {
		const getCategoriesMap = async () => {
			const categories = await getCategoriesAndDocuments();
			setCategoriesMap(categories);
        };

		getCategoriesMap();
	}, []);

	return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}
