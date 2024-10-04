import React,{useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../core/GlobalContext';

const ItemInfo = (props) => {
    const navigate = useNavigate();
    const { days } = useContext(GlobalContext);
    const {articleData} = props;

    const onItemClick = () =>{
        navigate(`/article_info/${articleData.id}/${days}`);
    }
    
    return (        
        <div className="card mt-4 border-0" onClick={()=>onItemClick(articleData)} key={articleData.id}>
            <div className="card-body">
                <div className="row">
                    <div className="col-10 col-sm-10"><h5 className="card-title">{articleData.title}</h5></div>
                        <div className="col-10 col-sm-2 text-end">
                            {
                                articleData.type == "Article"?
                                    <button className="btn btn-outline-primary btn-sm">{articleData.type}</button>
                                :
                                    <button className="btn btn-outline-secondary btn-sm">{articleData.type}</button>

                            }
                            
                        </div>
                        <div className="col-10 col-sm-10">
                            <p className="card-text">{articleData.abstract}</p>
                        </div>
                </div>                
                <div className="row mt-3">
                    <div className="col-6 col-sm-6"><p className="text-start title text-secondary">Published Date : {articleData.published_date}</p></div>
                    <div className="col-6 col-sm-6"><p className="text-end title text-secondary">Updated : {articleData.updated}</p></div>
                </div>
            </div>
        </div>           
       
    );
}

export default ItemInfo;