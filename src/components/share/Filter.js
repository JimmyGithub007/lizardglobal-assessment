import { useEffect, useRef, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

const Filter = (props) => {
    const [ show, setShow ] = useState(false);
    const dropDownRef = useRef();

    const handleClickOutside = (event) => {
        if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
            setShow(false);
        }
    };

    useEffect(() => {
        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    return (<>
        <div className="flex filter-box items-center" onClick={() => setShow(!show) } ref={dropDownRef}>
            {   props.filterCategories.length > 0 ?
                <div className="flex flex-wrap">
                    {
                        props.filterCategories.map((category, key) => (
                            <div className="flex items-center tag-selection" key={key}>
                                {category} <AiFillCloseCircle className="close" onClick={e => {
                                    e.stopPropagation();
                                    props.filter(category);
                                }} />
                            </div>
                        ))
                    }   
                    <AiFillCloseCircle className="clear-all" onClick={e => { e.stopPropagation(); props.clear(); }} />           
                </div> : <span>Filter Categories</span> 
            }
            <div className={`dropdown-content ${show && 'show'}`}>
                {
                    props.categories.map((category, key) => (
                        <div className={`option ${props.filterCategories.includes(category) ? "active" : ""}`} key={key} onClick={() => props.filter(category) }>{category}</div>
                    ))
                }
            </div>
        </div>
    </>)
}

export default Filter;