import {useEffect, useState} from 'react';
import {IStorageService} from "types/service/IStorage";
import {StorageService} from "service/Storage";


const storageService: IStorageService = new StorageService();
export const useSearchHistory = (key: string, idKey: string) => {
    const [searchHistory, setSearchHistoryItems] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const item = await storageService.get(key);
            if (item) {
                const previousSearches = JSON.parse(item);
                previousSearches.slice(0, 14);
                setSearchHistoryItems(previousSearches);
            }
        })();
    }, [key]);

    const addItemToSearchHistory = (item: any) => {
        const filteredData = searchHistory?.filter(searchItem => {
            return searchItem[idKey] !== item[idKey];
        });
        setSearchHistoryItems([item, ...filteredData]);
        storageService.save('places', JSON.stringify([item, ...filteredData]));
    };

    return {searchHistory, addItemToSearchHistory};
};
