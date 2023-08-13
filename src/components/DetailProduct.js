import React, { useRef, useEffect, useState } from 'react';
import './main.css';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';




const imageURL = `${process.env.PUBLIC_URL}/`;
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
  }, [url]);
  return [data, loading];
}

function DetailProduct() {
  const paths = window.location.href.split('/');
  const url = '/' + paths[paths.length - 2] + '/' + paths[paths.length - 1];
  const [data, loading] = useFetch(url);
  const navigate = useNavigate();
  const login_id = useRef();
  const product_name = useRef();
  const description = useRef();
  const img = useRef();
  const tag = useRef();
  

  if (loading) {
    return (
      <div>loading</div>
    )
  } else {
    let src='';
    let image_url = '';
    let Tags = data.tag.toString().split(",");
    const tags_url = Tags.map(function(Tag){
        return `${process.env.PUBLIC_URL}/tag_images/` + Tag + `.png`;
    });
    let tag_url = tags_url.map(function(url){
                    return `<img src=` + url + ` width="34px" height="34px"/>`;
                });
    console.log('filename:'+data.filename);
    if (data.filename !== '-') {
      src = imageURL + `images/${data.filename}`;
      image_url = `<img src=${src} width='300px' height='300px' />`;
    } else {
      image_url=``;
    }
    //let tag_url = '';
    console.log('tag_name:'+data.tag);
    if (data.tag !== '-') {
      // eslint-disable-next-line 
      //src = imageURL + `tag_images/${data.tag}`+`.png`;
      //tag_url = `<img src=${src} width='50px' height='50px' />`;
    } else {
      tag_url=``;
    }
    return (
      <>
        <table>
          <tbody>
            <tr>
              <td>유저</td>
              <td><input ref={login_id} defaultValue={data.user} disabled/></td>
            </tr>
            <tr>
              <td>옷 이름</td>
              <td><input ref={product_name} defaultValue={data.product_name} /></td>
            </tr>
            <tr>
              <td>성분 설명</td>
              <td><textarea rows='5' cols='60' ref={description} defaultValue={data.description} /></td>
            </tr>
            <tr>
              <td>옷 이미지</td>
              <td>
                <span dangerouslySetInnerHTML={{ __html: image_url }}></span>
                <br />
                <input type='file' ref={img} />
              </td>
              <tr>
              <td>태그</td>
              <td>
                <span dangerouslySetInnerHTML={{ __html: tag_url }}></span>
                <br />
                <input type='file' multiple={true} ref={tag} />
              </td>
              
            </tr>
            </tr>
            <tr>
              <td colSpan='2' align='center'>
              <button type='button' onClick={() => {
                  const form = new FormData();
                  form.append('product_code', data.product_code);
                  form.append('login_id', data.login_id);
                  form.append('product_name', product_name.current.value);
                  form.append('description', description.current.value);
                  form.append('img', img.current.files[0]);
                  form.append('tag', tag.current.files[0]);
                  fetch(`/update`, {
                    method: 'post',
                    encType: 'multipart/form-data',
                    body: form
                  }).then(() => {
                    navigate('/');
                  });
                }
                }>수정</button>
                &nbsp;                               
                <button type='button' onClick={() => {
                  if (window.confirm('삭제할까요?')) {
                    fetch(`/delete?product_code=${data.product_code}`)
                      .then(() => { navigate('/'); });
                  }
                }
                }>삭제</button>
                &nbsp;                
                <button onClick={() => navigate('/')``}>목록</button>
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
};

export default DetailProduct;