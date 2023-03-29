import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
export const useBookSearch = (query:string, pageNumber:number) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false);
    const [books, setBooks] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    useEffect(() => {
        setBooks([])
    }, [query]);

    useEffect(() => {
        setLoading(true);
        setError(false);
        let cancel: () => void;
        try{
            (async() => {
                const res = await axiosPrivate.get('searchOL', {
                    params:{q:query,page:pageNumber},
                    cancelToken: new axios.CancelToken(c => cancel = c)
                });
                setBooks(prev => {
                    return [...prev, ...res.data.docs]
                });
                setHasMore(res.data.docs.length > 0);
                setLoading(false)
            })();
        }catch(e){
            setError(true)
            if(axios.isCancel(e)) return
        }
        return () => cancel()
    }, [query, pageNumber]);
    return {loading,error, books, hasMore}
}