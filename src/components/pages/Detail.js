import axios from "axios";
import moment from "moment";
import Loader from "../share/Loader";
import { useEffect, useState } from "react";
import { AiOutlineTag } from "react-icons/ai";
import { IoArrowBackCircle } from "react-icons/io5";
import { useParams } from "react-router-dom";

const Detail = () => {
    let { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const fetchAPI = async () => {
                const resp = await axios.get(`/api/posts/${id}`);
                setPost(resp.data);
            }
            fetchAPI();
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [id])

    return (<div className="main">
        {
            loading ? <Loader /> :
                <div className="detail">
                    <h2><b>Detail</b></h2>
                    <a className="flex items-center" href="/"><IoArrowBackCircle /> Back to Listing</a>
                    <article className="flex flex-col">
                        <span><b>{post.title}</b></span>
                        <figure className="flex flex-col items-center">
                            <img alt="avatar" className="avatar" src={post.author.avatar} />
                            <b>{post.author.name}</b>
                            <time>Posted on {moment(post.publishDate).format("MMMM Do YYYY, h:mm:ss A")}</time>
                            <figcaption className="flex flex-wrap">
                                {
                                    post.categories.map((category, key) => (
                                        <div className="flex items-center tag" key={key}>
                                            <AiOutlineTag />
                                            <span>{category.name}</span>
                                        </div>
                                    ))
                                }
                            </figcaption>
                        </figure>
                        <summary>{post.summary}</summary>
                    </article>
                </div>
        }
    </div>)
}

export default Detail;