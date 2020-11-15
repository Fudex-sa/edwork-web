// import React, { Component,useState } from "react";
// import { Link } from "react-router-dom";
// import styles from "./css/CareerStyle.css";
// import PureModal from 'react-pure-modal';
// import 'react-pure-modal/dist/react-pure-modal.min.css';
// import "./css/startuphubkhobar.css";
// import Logo from "./img/logo.png";
// import facebookImg from "./img/facebook.png";
// import instagramIcon1 from "./img/instagram1.png";
// import instagramIcon2 from "./img/instagram2.png";
// import shape1 from "./img/shape1.png";
// import shape2 from "./img/shape2.png";
// import shape3 from "./img/shape3.png";
// import shape4 from "./img/shape4.png";
// import shape5 from "./img/shape5.png";
// import shape6 from "./img/shape6.png";
// import shape7 from "./img/shape7.png";
// import shape8 from "./img/shape8.png";
// import shape9 from "./img/shape9.png";
// import shape10 from "./img/shape10.png";
// import shape11 from "./img/shape11.png";
// import shape12 from "./img/shape12.png";
// import shape13 from "./img/shape13.png";
// import shape14 from "./img/shape14.png";
// import shape15 from "./img/shape15.png";
// import shape16 from "./img/shape16.png";

// const Career =()=> {
//   const [modal, setModal] = useState(false);

//     return (
//       <div>
//         <input
//           type="hidden"
//           id="anPageName"
//           name="page"
//           value="startuphubkhobar"
//         />

//         <div className="startuphubkhobar1 anima-screen">
//           <div className="rectangle-copy-C61RwL">
//             <iframe
//               className="airtable-embed"
//               // src="https://airtable.com/embed/shrrDn9nPIFospcZp?backgroundColor=purple&layout=card"
//               frameborder="0"
//               onmousewheel=""
//               width="100%"
//               height="100%"
//               style={{ background: "transparent", border: "1px solid #ccc" }}
//             ></iframe>
//                 <button
//                 onClick={() => setModal(true)}
//                   className="card ml-3 mr-3"
//                   style={{ position: "absolute", top: 10, width: "95%" }}
//                 >
//                   <div style={{ display: "flex", flexDirection: "row" }}>
//                     <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         padding: "10px 10px",
//                         justifyContent: "space-between",
//                       }}
//                     >
//                       <span>ممثل مبيعات</span>
//                       <span style={{ color: "#CCC", fontSize: "15px" }}>
//                         اسم الشركه
//                       </span>
//                       <span>Fudex للبرمجه</span>
//                     </div>
//                     <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         padding: "0px 20px",
//                         marginTop: "30px",
//                         marginLeft: "30px",
//                       }}
//                     >
//                       <span style={{ color: "#CCC", fontSize: "15px" }}>
//                         للتقديم
//                       </span>
//                       <button
//                         style={{
//                           border: "none",
//                           backgroundColor: "#20C933",
//                           borderRadius: "5px",
//                           color: "#FFF",
//                         }}
//                       >
//                         للتقديم
//                       </button>
//                     </div>
//                     <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         padding: "0px 20px",
//                         marginTop: "35px",
//                         marginLeft: "30px",
//                       }}
//                     >
//                       <span style={{ color: "#CCC", fontSize: "15px" }}>
//                         تاريخ الإعلان
//                       </span>
//                       <span style={{}}>4/11/2020</span>
//                     </div>
//                     <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         padding: "0px 20px",
//                         marginTop: "30px",
//                         marginLeft: "30px",
//                       }}
//                     >
//                       <span style={{ color: "#CCC", fontSize: "15px" }}>
//                         المدينه
//                       </span>
//                       <button style={{ border: "none", borderRadius: "5px" }}>
//                         الخبر
//                       </button>
//                     </div>
//                   </div>
//                 </button>
             
            
//              <PureModal

// className={styles.modalStyle}
// isOpen={modal}
// width="600px"
// closeButton='close'
// closeButtonPosition='top'
// onClose={() => {
//   setModal(false)
//   return true;
//   }}
// >      
// <div className="ml-3" style={{display :'flex',flexDirection:'column'}}>
// <a  className="item text-right" onClick={() => setModal(false)}
// style={{color:'#CCC'}}>
//           <i class="fa fa-times-circle fa-2x" aria-hidden="true"></i>
//         </a>
// <span style={{ fontSize: "18px",fontWeight:'bold',marginBottom:'20px',marginTop:'10px' }}>ممثل مبيعات</span>
// <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "space-between",
//                       }}
//                     >
//                       <span style={{ color: "#CCC", fontSize: "12px",marginBottom:'5px' }}>
//                        عنوان الوظيفه 
//                       </span>
//                       <span>ممثل مبيعات</span>
//                     </div>
//                     <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "space-between",
//                         marginTop:'20px'
//                       }}
//                     >
//                       <span style={{ color: "#CCC", fontSize: "12px",marginBottom:'5px' }}>
//                      اسم الشركه  
//                       </span>
//                       <span>Fudex للبرمجه</span>
//                     </div>
//                     <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "space-between",
//                         marginTop:'20px'
//                       }}
//                     >
//                       <span style={{ color: "#CCC", fontSize: "12px",marginBottom:'5px' }}>
//                       للتقديم  
//                       </span>
//                       <button
//                   style={{border:'1px solid #CCC',width:'16%',
//                   border: "none",
//                   backgroundColor: "#20C933",
//                   borderRadius: "5px",
//                   color: "#FFF",}}
//                       >
//                         للتقديم
//                       </button>
//                     </div>
//                     <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "space-between",
//                         marginTop:'20px'
//                       }}
//                     >
//                       <span style={{ color: "#CCC", fontSize: "12px",marginBottom:'5px' }}>
//                       تاريخ الإعلان  
//                       </span>
//                       <span>4/11/2020</span>
//                     </div>
//                     <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "space-between",
//                         marginTop:'20px'
//                       }}
//                     >
//                       <span style={{ color: "#CCC", fontSize: "12px",marginBottom:'5px' }}>
//                      المدينه  
//                       </span>
//                       <input type="text" placeholder="الخبر" disabled
//                       style={{border:'1px solid #CCC',backgroundColor:'#FFF',
//                       padding:'5px',
//                     borderRadius:'5px'}}
//                       />

//                     </div>
//                     <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "space-between",
//                         marginTop:'20px'
//                       }}
//                     >
//                       <span style={{ color: "#CCC", fontSize: "12px",marginBottom:'5px' }}>
//                      المنطقه  
//                       </span>
//                       <span>المنطقه الشرقيه</span>
//                     </div>
//                     <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "space-between",
//                         marginTop:'20px'
//                       }}
//                     >
//                       <span style={{ color: "#CCC", fontSize: "12px",marginBottom:'5px' }}>
//                        الحد الأدنى للخبره  
//                       </span>
//                       <span>سنوات 3</span>
//                     </div>
//                     <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "space-between",
//                         marginTop:'20px'
//                       }}
//                     >
//                       <span style={{ color: "#CCC", fontSize: "12px",marginBottom:'5px' }}>
//                       الحد الأدنى للتعليم  
//                       </span>
//                       <span
//                   style={{border:'1px solid #CCC',width:'16%',padding:'3px',
//                   border: "none",
//                   backgroundColor: "#CCC",
//                   borderRadius: "5px",
//                   color: "#FFF",}}
//                       >
//                         ثانويه عامه
//                       </span>
//                     </div>

//                     <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "space-between",
//                         marginTop:'20px'
//                       }}
//                     >
//                       <span style={{ color: "#CCC", fontSize: "12px",marginBottom:'5px' }}>
//                       الوصف الوظيفى  
//                       </span>
//                     </div>
// </div>


//             </PureModal>
//           </div>
//           <div className="anima-container-center-horizontal">
//             <img className="hub-logo-C61RwL" src={Logo} />
//           </div>
//           <div className="u0645u062c-0644-u0628-C61RwL font-class-1">
//             مجمع ريادة الأعمال بالخبرمجمع ريادة الأعمال بالخبرمجمع ريادة الأعمال
//             بالخبرمجمع ريادة الأعمال بالخبرمجمع ريادة الأعمال بالخبرمجمع ريادة
//             الأعمال بالخبرمجمع ريادة الأعمال بالخبر
//             <br />
//           </div>
//           <div className="anima-container-center-horizontal">
//             <div className="group-C61RwL">
//               <a
//                 href="https://www.instagram.com/startuphubkhobar/"
//                 target="_blank"
//               >
//                 <div className="instagram-NOXmfT">
//                   <img className="shape-aqZ4Sd" src={instagramIcon1} />
//                   <img className="oval-aqZ4Sd" src={instagramIcon2} />
//                 </div>
//               </a>
//               <a
//                 href="https://www.facebook.com/StartUpHubKhobar/"
//                 target="_blank"
//               >
//                 <div className="facebook-NOXmfT">
//                   <img className="path-e5GK5c" src={facebookImg} />
//                 </div>
//               </a>
//               <a
//                 href="https://www.linkedin.com/company/startup-hub-khobar/about/"
//                 target="_blank"
//               >
//                 <div className="linkedin-NOXmfT"></div>
//               </a>
//               <a href="https://twitter.com/Startuphubkhbr" target="_blank">
//                 {" "}
//                 <div className="twitter-NOXmfT"></div>
//               </a>
//               <div className="global-2-NOXmfT">
//                 <img className="path-ttmW0C" src={shape1} />
//                 <img className="path-LLxRjN" src={shape2} />
//                 <img className="path-VhcBLE" src={shape3} />
//                 <img className="path-brSqjp" src={shape4} />
//                 <img className="path-VQst24" src={shape5} />
//                 <img className="path-1og7zh" src={shape6} />
//                 <img className="path-AfCyfb" src={shape7} />
//                 <img className="path-026VEG" src={shape8} />
//                 <img className="path-apxJo5" src={shape9} />
//                 <img className="path-92pbm4" src={shape10} />
//                 <img className="path-k5KRVh" src={shape11} />
//                 <img className="path-VDFvcu" src={shape12} />
//                 <img className="path-SW9xrz" src={shape13} />
//                 <img className="path-0wixww" src={shape14} />
//                 <img className="path-7Bgfnb" src={shape15} />
//                 <img className="path-LvSRBQ" src={shape16} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

// export default Career;
