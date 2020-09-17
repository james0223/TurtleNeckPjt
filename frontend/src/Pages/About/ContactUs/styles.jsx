import styled from "styled-components";

const Wrapper = styled.div`
  .form-header{
    padding: 1px;
    margin-bottom: 2rem;
    background-color: #82b1ff !important;
    color: #fff;
    text-align: center;
    border-radius: .125rem;
    box-shadow: 0 5px 11px 0 rgba(0,0,0,0.18), 0 4px 15px 0 rgba(0,0,0,0.15);
    font-weight: 400;
    font-size: 1.2rem;
  }
  .contact-btn-submit{
    background-color: #82b1ff !important;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: .125rem;
  }
  .contact-btn{
    font-size: 1rem;
    line-height: 1.5;
    font-family: "Roboto",sans-serif;
    font-weight: 300;
    box-sizing: border-box;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    position: relative;
    z-index: 1;
    padding: 0;
    margin: 10px;
    overflow: hidden;
    vertical-align: middle;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0 5px 11px 0 rgba(0,0,0,0.18),0 4px 15px 0 rgba(0,0,0,0.15);
    transition: all .2s ease-in-out;
    width: 47px;
    height: 47px;
    display: inline-block;
    background-color: #82b1ff !important;
    color: white;
    text-decoration: none;
  }
  .contact-fa{
    color: #9e9e9e;
    margin-right: 10px; 
  }
  .contact-form-control{
    padding: 10px 0;
  }
  .contact-title{
    font-weight: bold;
    font-size: 2rem;
    text-align: center;
  }
  .contact-form{
    
  }
  .contact-btn-div{
    text-align: center;
  }
  .contact-grid{
    padding: 1rem;
  }
`;

export default Wrapper;