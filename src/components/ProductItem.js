import React from 'react';
import { Link } from 'react-router-dom';
import './main.css'
//import StringOperationsComponent from './StringOperationsComponent';

function ProductItem({ product_code, product_name, filename, tag }) { 
    let loading = false;
    const fileURL = `${process.env.PUBLIC_URL}/images/${filename}`;
    // eslint-disable-next-line
    let Tags = tag.toString().split(",");
    const tag_url =  Tags.map(function(Tag){
        return `${process.env.PUBLIC_URL}/tag_images/` + Tag + `.png`;
    })
    //let tag_url = [];
    //const tag_url = `${process.env.PUBLIC_URL}/tag_images/${tag_images}` + `.png`;
    if (loading) { 
        return ( <div>loading</div> ) 
    } 
    else { 
        let img = fileURL;
        let tag_img = tag_url;
        if (filename !== '-') { 
            img = `<img src=${fileURL} width="180px" height="180px"/><br />`;
        }
        else {
            img = '[상품 이미지 미등록]<br />';
        } 
        if(tag !== '-'){
                tag_img = tag_url.map(function(url){
                    return `<img src=` + url + ` width="25px" height="25px"/>`;
                })
        }
        else {
            img = '-<br />';
        } 
        return ( 
            <div style={{ margin: '5px' }}> 
            <Link to={`/detail/${product_code}`}>
                <div dangerouslySetInnerHTML={{ __html: img }}></div> 
                <span dangerouslySetInnerHTML={{ __html: tag_img }}></span>
                
                <br/> <div dangerouslySetInnerHTML={{ __html : product_name}}></div><br/> 
            </Link>
             <br/><br/> 
            </div> ) 
            } 
        } 
        
        export default ProductItem;