import React, {useEffect, useState} from 'react';
import {useAxiosPrivate} from "../../hooks/useAxiosPrivate";
import {OneBookHome} from "../Home/OneBook";
import {SpinnerComponent} from "../SpinnerComponent";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import { Link } from 'react-router-dom';

export const CategoryBooks = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [changed, setChanged] = useState<boolean>(false)
    const [perPage, setPerPage] = useState<number>(12);
    const [allBooks, setAllBooks] = useState<null| any[]>(null)
    const {user} = useSelector((root:RootState) => root.user);
    const [searchValue, setSearchValue] = useState<string>('');
    const [defaultAuthorsYearsGenres, setDefaultAuthorsYearsGenres] = useState<{genres:string[],years:string[],authors:string[]}>({
        genres:[],
        years:[],
        authors:[]
    });
    const [filterBooksBoolean, setFilterBooksBoolean] = useState(false)
    const axiosPrivate = useAxiosPrivate();
    const [books ,setBooks] = useState<any[]>([]);
    const [booksOnCurrentPage ,setBooksOnCurrentPage] = useState<any[]>([]);
    const [form, setForm] = useState({
        genres:'',
        year:'',
        author:'',
        search:'',

    });
    const [loading,setLoading] = useState(true);
    function debounce (cb:any, delay=500){
        let timeout:any;
        return (...args:any) => {
                clearTimeout(timeout)
                timeout = setTimeout(() => {
                        cb(...args)
                }, delay)
        }
}
    const onChange = async (value:string, field:string) => {
        setChanged(true)
        await setForm((prev) => ({
            ...prev,
            [field]:value
        }) );
        setFilterBooksBoolean(true)
    };
    const getBooksSearch = debounce(async (value:string) =>  {
        console.log(value);
        
         setSearchValue(value)


}, 300);
    useEffect(() => {
        form.search = searchValue;
       (async() => {
            const res  = await axiosPrivate.post('http://localhost:3001/filterBooks', JSON.stringify(form));
            setBooks(res.data);
            setBooksOnCurrentPage(res.data.slice(currentPage * perPage - perPage,currentPage * perPage));
        })();

    }, [form.genres,form.year,form.author, currentPage, searchValue]);
    useEffect(() => {
        (async () => {
            const res = await axiosPrivate.get('http://localhost:3001/books')
            setBooks(res.data);
            setAllBooks(res.data)
            const res2 = await axiosPrivate.get('http://localhost:3001/genres');
            const newGenres = res2.data.genres.filter((genre:string) => genre !== '' && genre !== null);
            const removeDuplicatesGenres = [...new Set(newGenres)] as string[]
            const newYears = res2.data.years.filter((year:string) => year !== '' && year !== null)
            const removeDuplicatesYears = [...new Set(newYears)] as string[]
            const newAuthors = res2.data.authors.filter((author:string) => author !== '' && author !== null)
            const removeDuplicatesAuthors = [...new Set(newAuthors)] as string[]
            setDefaultAuthorsYearsGenres((prevState) => ({
                ...prevState,
                genres:removeDuplicatesGenres,
                authors:removeDuplicatesAuthors,
                years:removeDuplicatesYears,
            }))
            setLoading(false)
        })()
    }, []);
    const selectPageHandler = (page:number) => {
        if(page  >= 1 &&  page<=Math.ceil(books.length / perPage) && page !== currentPage) setCurrentPage(page)
        window.scrollTo({top:0, behavior:'smooth'});
    }
    if(loading) return <SpinnerComponent/>
    return (<>
   <main className='bg-[#F5F5F5] min-h-screen'>
       <div className='pt-20'></div>
       <section className='flex flex-col justify-center   gap-3  mx-auto w-11/12 max-w-[1000px]'>
                 <h1 className='font-bold text-[2rem] text-center'>Search by book name</h1>
                    <div className='flex flex-col gap-3'>
                        <form className='flex  flex-col w-full gap-4 sm:flex sm:flex-row sm:w-3/4 sm:mx-auto' >
                            <select  className='w-full rounded-md border-[#eee] px-2 py-2' value={form.genres} onChange={(e) => onChange(e.target.value, 'genres')}>
                                <option value="" hidden disabled className='' defaultChecked={true}>
                                    Genres
                                </option>
                                {defaultAuthorsYearsGenres.genres?.map((genre,i) => <option value={genre} key={genre}>{genre}</option>)}
                            </select>
                            <select className='w-full rounded-md border-[#eee] px-2 py-2' value={form.year}  onChange={(e) => onChange(e.target.value,'year')}>
                                <option value="" hidden disabled className='' defaultChecked={true}>
                                    Year
                                </option>
                                {defaultAuthorsYearsGenres.years.map((year, i) => <option key={i} value={year}>{year}</option>)}
                            </select>
                            <select className='w-full rounded-md border-[#eee] px-2 py-2' value={form.author}  onChange={(e) => onChange(e.target.value, 'author')}>
                                <option value="" hidden disabled className='' defaultChecked={true}>
                                    Author
                                </option>
                                {defaultAuthorsYearsGenres.authors.map((author, i ) => <option key={i} value={author}>{author}</option>)}
                            </select>
                        </form>
                        <div className='flex justify-between sm:w-2/3 sm:mx-auto gap-2'>
                            <input  className='w-3/4 ring-1 rounded-md ring-[#eee] px-2' onChange={(e) => getBooksSearch(e.target.value)} placeholder='Search here...' ></input><button className='bg-black hover:text-[#bbb] font-bold text-white text-1xl px-4 py-2 rounded-xl '>Search</button>
                            <button className="hidden sm:block py-2 rounded-xl bg-[#cacaca] hover:bg-[#aaa] w-40" onClick={() => setForm({  genres:'',
                                year:'',
                                author:'',
                                search:'',})}>Clear Filters</button>
                        </div>
                    </div>
           <button className="sm:hidden bg-[#BABABA] py-2 rounded-xl hover:bg-[#bbb]"onClick={() => setForm({  genres:'',
               year:'',
               author:'',
               search:'',})}>Clear Filters</button>

       </section>
       <section className={`flex flex-col justify-center   gap-3  mx-auto    mt-4 pb-4   `} >
           {
               allBooks?.length === 0 && user.role ==='admin'  && <div className='w-full text-center font-bold text-2xl'>There are no books in our database <Link to={'/addBook'} className='text-blue-500 hover:text-blue-900'>Click To Add One</Link></div>

           }
           {
               allBooks?.length === 0 && user.role ==='user'  && <div className='w-full text-center font-bold text-2xl'>There are no books in our database</div>

           }
           <div className={`${changed || (books.length < 3) ? `flex flex-wrap gap-3  md:px-4 justify-center  max-w-[${347 * books.length}px]   rounded-lg  bg-white    mx-auto` :' flex flex-wrap  w-full justify-center   md:justify-items-center sm:grid sm:grid-cols-2  lg:grid-cols-3 rounded-lg lg:max-w-[1200px] bg-white    2xl:grid-cols-4 2xl:max-w-[1500px] mx-auto '}`}>
               { booksOnCurrentPage.map((book:any, i:number) => <OneBookHome  key={i}   book={book} refresh={() =>  null}/>)}
           </div>
           {books.length < 1 && filterBooksBoolean && <span className='font-bold text-[2rem] mx-auto mt-[1rem]'>Book not found</span>}
           { books.length >= 12 &&
               <div className='flex  gap-2 items-center  justify-center my-4 h-3'>
                   <div className=' px-2 py-0.5 cursor-pointer  hover:bg-[#D2EAE9]' onClick={() => selectPageHandler(currentPage - 1)}><i
                       className="fa-solid fa-angle-left text-[#667574] "></i></div>
                   {[...Array(Math.ceil(books.length/perPage))].map((_, i) => <div className={`cursor-pointer  px-2 py-0.5 ${currentPage === i + 1 ? 'bg-[#4899E7] hover:bg-[#4899e7] cursor-pointer': 'hover:bg-[#ddd]'}`}  key={i} onClick={() => {
                       setCurrentPage(i + 1);
                       window.scrollTo({top:0, behavior:'smooth'});
                   }}>{i+1}</div>)}
                   <div className=' px-2 py-0.5 cursor-pointer  hover:bg-[#D2EAE9]' onClick={() => selectPageHandler(currentPage + 1)}><i
                       className="fa-solid fa-angle-right text-[#667574] "></i></div>
               </div>
           }
       </section>
   </main>
        {/*flex flex-wrap justify-center md:justify-items-center sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:max-w-[1200px] 2xl:grid-cols-4 2xl:max-w-[1500px] mx-auto*/}

    </>)
}
