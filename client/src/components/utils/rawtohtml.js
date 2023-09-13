
import DOMPurify from 'dompurify';
import {  convertFromRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';


export const RawToHtml=(contents)=>{
    const Data=contents ? contents : '{"blocks":[{"key":"cgj44","text":"loading please wait ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":344,"style":"color-rgb(55,65,81)"},{"offset":0,"length":344,"style":"bgcolor-rgb(247,247,248)"},{"offset":0,"length":344,"style":"fontfamily-Söhne, ui-sans-serif, system-ui, -apple-system, \\"Segoe UI\\", Roboto, Ubuntu, Cantarell, \\"Noto Sans\\", sans-serif, \\"Helvetica Neue\\", Arial, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji"},{"offset":0,"length":345,"style":"fontsize-16"}],"entityRanges":[],"data":{}}],"entityMap":{}}';
  
    let content ="";
 content = convertFromRaw(JSON.parse(Data));
    let html = convertToHTML(content);

  const plaintext= {
        __html: DOMPurify.sanitize(html)
    }
    return(
        <div dangerouslySetInnerHTML={plaintext}>

        </div>
    )
}
