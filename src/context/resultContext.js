import React, { createContext, useContext, useState } from 'react';

const resultContext = createContext();
const baseURL = 'https://google-search3.p.rapidapi.com/api/v1';

export const ResultContext = ({ children }) => {
	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	const getResults = async (type) => {
		setIsLoading(true);

		const response = await fetch (`${baseURL}${type}`, {
			method: 'GET',
			headers: {
				'X-User-Agent': 'desktop',
				'X-Proxy-Location': 'EU',
				'X-RapidAPI-Key': 'f5068f6821msh988bc8e077bbeb0p194a44jsn03af765f9956',
				'X-RapidAPI-Host': 'google-search3.p.rapidapi.com'
			}	
		});

		const data = await response.json();

		if(type.includes('/news')) {
			setResults(data.entries);
		} else if(type.includes('/images')) {
			setResults(data.image_results);
		} else {
			setResults(data.results);
		}

		setResults(data);
		setIsLoading(false);
	};

	return (
		<resultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
			{children}
		</resultContext.Provider>
	);
};

export const useResultContext = () => useContext(resultContext);