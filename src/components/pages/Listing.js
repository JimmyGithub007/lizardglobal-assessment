import axios from "axios";
import moment from "moment";
import Filter from "../share/Filter";
import Loader from "../share/Loader";
import { useEffect, useMemo, useState } from "react";
import { AiOutlineTag } from "react-icons/ai"
import { BiTime } from "react-icons/bi"
import { FaReply } from "react-icons/fa"

const Listing = () => {
    const totalPerPage = 5;
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filterCategories, setFilterCategories] = useState([]);
    const [pageNum, setPageNum] = useState(0);
    const [loading, setLoading] = useState(true);

    const handleFilter = useMemo(() => {
        setPageNum(0);
        return posts.filter((p, k) => {
            if(filterCategories.length > 0) {
                let count = 0;
                p.categories.forEach(c => {
                    if(filterCategories.includes(c.name)) { count++; }
                })
                if(count > 0) return true;
                return false;
            }
            return true;
        });
    }, [posts, filterCategories])

    const pages = useMemo(() => {
        handleFilter.map((p, k) => {
            p.fromPage = Math.ceil((k+1) / 5);
            return p;
        })

        const totalPages = Math.ceil(handleFilter.length / 5);
        let memoPages = [];
        for(let p = 1; p < totalPages+1; p++) {
            memoPages.push(p);
        }
        return memoPages;
    }, [handleFilter])

    useEffect(() => {
        try {
            const fetchAPI = async () => {
                const resp = await axios.get(`/api/posts`);
                setPosts(resp.data.posts);

                let stateCategories = [];
                resp.data.posts.forEach(post => {
                    post.categories.forEach(category => {
                      if (!stateCategories.includes(category.name)) {
                        stateCategories.push(category.name);
                      }
                    });
                });
                setCategories(stateCategories);
            }
            fetchAPI();
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
              setLoading(false);
            }, 1000);
        }
    }, [])

    return (<div className="main">
        {
            loading ? <Loader /> :
            <div className="listing">
                <h2><b>Lizard Global Assessment</b></h2>
                <Filter categories={categories} filterCategories={filterCategories} clear={() => setFilterCategories([]) } filter={(value) => {
                    if(filterCategories.find(f => f === value)) {
                        setFilterCategories(filterCategories.filter(f => f !== value));
                    } else {
                        setFilterCategories([ ...filterCategories, value ]);
                    }
                }} />
                <div className="flex flex-col">
                    {
                        handleFilter.map((post, key) => (
                            <div className={`card ${post.fromPage === pageNum+1 ? "show" : ""}`} key={key} style={{ transitionDelay: `${(key-pageNum*totalPerPage)*50}ms` }}>
                                <div className="flex">
                                    <img alt="avatar" className="avatar" src={post.author.avatar} />
                                    <div className="content flex flex-col">
                                        <a href={`/detail/${post.id}`}><b>#{key+1} {post.title}</b></a>
                                        <div className="flex flex-wrap">
                                            {
                                                post.categories.map((category, key) => (
                                                    <div className="flex items-center tag" key={key}>
                                                        <AiOutlineTag />
                                                        <span>{category.name}</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <span><FaReply /> <b>{post.author.name}</b> posted { moment(post.publishDate).fromNow() } <BiTime /></span>
                                    </div>                            
                                </div>
                            </div>
                        ))
                    }
                </div> 
                <div className="flex flex-wrap pages">
                    {
                        pages.map((value, key) => (
                            <button className={`${pageNum === key ? "active" : ""}`} key={key} onClick={() => setPageNum(key)}>{value}</button>
                        ))
                    }
                </div>
            </div>
        }
    </div>)
}

export default Listing;