(this.webpackJsonptownsquare=this.webpackJsonptownsquare||[]).push([[0],{17:function(e,t,s){e.exports={slider:"ImageSlider_slider__1jn3h",img_container:"ImageSlider_img_container__3eu7U",image:"ImageSlider_image__dIU84",right_arrow:"ImageSlider_right_arrow__CMivW",left_arrow:"ImageSlider_left_arrow__23GNO",slide:"ImageSlider_slide__Rt82y",active:"ImageSlider_active__yTgON"}},27:function(e,t,s){e.exports={navBar:"Navbar_navBar__27Cf3",navBar__item:"Navbar_navBar__item__38gja"}},50:function(e,t,s){e.exports={error:"Error_error__T_9Pn"}},51:function(e,t,s){e.exports={post:"Post_post__3hqZB"}},54:function(e,t,s){e.exports={Modal:"Modal_Modal__2PoK9"}},55:function(e,t,s){e.exports={overlay:"Overlay_overlay__BjDkW"}},68:function(e,t,s){},69:function(e,t,s){},98:function(e,t,s){"use strict";s.r(t);var n=s(0),c=s(23),r=s(21),o=s.n(r),a=(s(68),s(4)),i=(s(69),Object(n.createContext)({})),l=s(22),j=s(3),u=s(16),d=s(12),b=s.n(d),m="https://idsp.link/api",O=s(50),p=s.n(O),h=s(1),f=function(e){return Object(h.jsx)("div",{children:Object(h.jsx)("h2",{className:p.a.error,children:e.message})})};var g=function(){var e=Object(n.useContext)(i),t=e.signUpStatus,s=e.setSignUpStatus,c=e.setUsername,r=e.setIsAuthenticated,o=e.setUserId,d=Object(n.useState)(""),O=Object(a.a)(d,2),p=O[0],g=O[1],x=Object(n.useState)({email:"",password:""}),v=Object(a.a)(x,2),_=v[0],w=v[1],k=function(e){var t=e.target.name,s=e.target.value;w(Object(j.a)(Object(j.a)({},_),{},Object(l.a)({},t,s)))};return Object(h.jsxs)("div",{children:[Object(h.jsx)("img",{id:"logo",src:"https://i.imgur.com/0ldmkwI.png",alt:"TownSquareLogo"}),Object(h.jsx)("h1",{className:"townSquareTitle",children:"TownSquare"}),Object(h.jsx)("h2",{children:"Login"}),Object(h.jsx)("h3",{children:"For default user, login with:"}),Object(h.jsx)("h4",{children:"email: bob@bob.com"}),Object(h.jsx)("h4",{children:"password: bob@bob.com"}),t&&Object(h.jsx)("h2",{children:"Sign up success"}),p&&Object(h.jsx)(f,{message:p}),Object(h.jsxs)("div",{children:[Object(h.jsx)("label",{htmlFor:"uname",children:Object(h.jsx)("b",{children:"email"})}),Object(h.jsx)("input",{type:"text",placeholder:"Enter email",name:"email",required:!0,value:_.email,onChange:k}),Object(h.jsx)("br",{}),Object(h.jsx)("label",{htmlFor:"psw",children:Object(h.jsx)("b",{children:"Password"})}),Object(h.jsx)("input",{type:"password",placeholder:"Enter Password",name:"password",required:!0,value:_.password,onChange:k}),Object(h.jsx)("br",{}),Object(h.jsx)("button",{onClick:function(e){(e.preventDefault(),_.email&&_.password)?function(e,t){b.a.post("".concat(m,"/user/login"),e,{headers:{"Content-Type":"application/json"}}).then((function(e){console.log("post login response receive"),console.log(e),t(null,e)})).catch((function(e){console.log("post login error"),console.log(e),t(e)}))}({email:_.email,password:_.password},(function(e,t){e?(console.log(e),g(e.message)):(g(""),r(!0),s(!1),console.log("login result message"),console.log(t),c(t.data.username),o(t.data.userId))})):g("You are missing some credentials")},children:"Login"})]}),Object(h.jsx)("div",{children:Object(h.jsxs)("div",{children:[Object(h.jsx)("p",{children:"Don't have an account?"}),Object(h.jsx)("br",{}),Object(h.jsx)("div",{className:"register",children:Object(h.jsx)("button",{children:Object(h.jsx)(u.b,{to:"/register",children:"Register"})})})]})})]})},x=function(e){var t=Object(n.useContext)(i).isAuthenticated;return Object(h.jsx)(h.Fragment,{children:t?e.children:Object(h.jsx)(g,{})})},v=s(5),_=s(10),w=s.n(_),k=s(20),S="https://comp2350-week6-sean-luo.herokuapp.com",C=function(e,t){b()({method:"POST",url:"".concat(S,"/ts/create_post"),data:e,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){console.log("postCreate response"),console.log(e),t(null,e.data)})).catch((function(e){console.log("postCreate error"),console.log(e),t(e)}))},I=function(){var e=Object(k.a)(w.a.mark((function e(t){var s;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,b.a.get("".concat(S,"/ts/posts"));case 3:s=e.sent,t(null,s.data),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),t(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),y=function(e,t){b.a.post("".concat(S,"/ts/like_post"),e).then((function(e){console.log("likePost response"),console.log(e),t(null,e.data)})).catch((function(e){console.log("likePost error"),console.log(e),t(e)}))},N=function(e,t){console.log("comment_objcomment_objcomment_objcomment_obj"),console.log(e),b.a.post("".concat(S,"/ts/add_comment"),{userId:e.userId,id:e.id,username:e.username,createdAt:e.createdAt,message:e.message,postId:e.postId}).then((function(e){console.log("add_comment response"),console.log(e),t(null,e.data)})).catch((function(e){console.log("add_comment error"),console.log(e),t(e)}))},U="FEED_FETCH",P="API_ERROR",E="COMMENT_ADD",L="POST_LIKE",F="POST_CREATE",T=s(52),A=s.n(T),M=s(53),D=s.n(M),R=function(e){var t=Object(n.useState)(!1),s=Object(a.a)(t,2),c=s[0],r=s[1];return Object(h.jsxs)("div",{children:[c&&Object(h.jsx)("ul",{children:(console.log("like like like"),console.log(e.like_arr),e.like_arr.map((function(e){return console.log(e),Object(h.jsx)("li",{children:e.username},e.id)})))}),Object(h.jsx)("h4",{onClick:function(){return r(!c)},children:e.like_arr.length})]})},B=function(e){return Object(h.jsx)(h.Fragment,{children:Object(h.jsxs)("div",{children:[Object(h.jsxs)("div",{className:"flex--space-between",children:[Object(h.jsx)("h3",{children:e.username}),Object(h.jsx)("h4",{children:e.createdAt})]}),Object(h.jsx)("h4",{style:{paddingLeft:"20px"},children:e.message})]})})},q=s(29),W=s.n(q),H=s(24),K=s(51),G=s.n(K),J=s(35),Y=s(17),z=s.n(Y),Z=function(e){var t=e.slides,s=Object(n.useState)(0),c=Object(a.a)(s,2),r=c[0],o=c[1];if(!t||!Array.isArray(t)||t.length<=0)return null;var i=t.length;return Object(h.jsxs)("section",{className:z.a.slider,children:[Object(h.jsx)(J.a,{className:z.a.left_arrow,onClick:function(){o(0===r?i-1:r-1)}}),Object(h.jsx)(J.b,{className:z.a.right_arrow,onClick:function(){o(r===i-1?0:r+1)}}),Object(h.jsx)("div",{className:z.a.img_container,children:t.map((function(e,t){return Object(h.jsx)("div",{className:t===r?"".concat(z.a.slide," ").concat(z.a.active):"".concat(z.a.slide),children:t===r&&Object(h.jsx)("img",{src:e,alt:"travel image",className:z.a.image})},t)}))})]})},Q=Object(c.b)(null,(function(e){return{onPostComment:function(t){return e(function(e){return function(){var t=Object(k.a)(w.a.mark((function t(s){return w.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:N(e,(function(e,t){s(e?{type:P,error:e.message}:{type:E,comment_obj:t})}));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(t))},onLikeComment:function(t){return e(function(e){return function(){var t=Object(k.a)(w.a.mark((function t(s){return w.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:y(e,(function(e,t){s(e?{type:P,error:e.message}:{type:L,post_like:t})}));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(t))}}}))((function(e){var t=Object(n.useContext)(i),s=t.username,c=t.userId,r=Object(n.useState)(""),o=Object(a.a)(r,2),l=o[0],u=o[1],d=Object(n.useState)(!1),b=Object(a.a)(d,2),m=b[0],O=b[1],p=function(t){var n={id:Object(H.v4)(),userId:c,username:s,postId:e.id,isLike:t};e.onLikeComment(n)};return Object(h.jsxs)("div",{className:G.a.post,children:[Object(h.jsxs)("div",{className:"flex--space-between",children:[Object(h.jsx)("h4",{children:e.userName}),Object(h.jsx)("h4",{children:e.createdAt})]}),Object(h.jsx)("h5",{style:{paddingLeft:"20px"},children:e.message}),Object(h.jsx)(Z,{slides:e.img_urls}),Object(h.jsxs)("div",{className:"flex--space-between",children:[Object(h.jsxs)("div",{className:"flex",children:[0!=W.a.filter(e.likes,(function(e){return e.userId==c})).length?Object(h.jsx)(A.a,{onClick:function(){p(!1)}}):Object(h.jsx)(D.a,{onClick:function(){p(!0)}}),Object(h.jsx)(R,{like_arr:e.likes})]}),Object(h.jsx)("div",{children:Object(h.jsx)("h4",{style:{textDecoration:"underline"},onClick:function(){return O(!m)},children:"See Comments"})})]}),m&&Object(h.jsxs)("div",{children:[Object(h.jsx)("div",{children:e.commentList.map((function(e){return Object(h.jsx)(B,Object(j.a)({},e),e.id)}))}),Object(h.jsxs)("form",{onSubmit:function(t){t.preventDefault();var n={userId:c,username:s,createdAt:new Date,message:l,id:Object(H.v4)(),postId:e.id};e.onPostComment(n)},children:[Object(h.jsx)("input",{type:"text",id:"comment",name:"comment",value:l,onChange:function(e){return u(e.target.value)}}),Object(h.jsx)("button",{type:"submit",children:"add Comment"})]})]})]},e.postId)})),V=s(54),X=s.n(V),$=s(55),ee=s.n($);var te=function(){var e=Object(n.useContext)(i),t=(e.showModal,e.setShowModal),s=e.setModalProps;return Object(h.jsx)("div",{className:ee.a.overlay,onClick:function(){s(null),t(!1)}})};var se=function(e){var t=Object(n.useContext)(i);return t.showModal,t.setShowModal,Object(n.useEffect)((function(){return document.body.classList.add("disable_scroll"),function(){document.body.classList.remove("disable_scroll")}}),[]),Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("div",{className:"".concat(X.a.Modal),children:e.children}),";",Object(h.jsx)(te,{})]})},ne=Object(c.b)((function(e){return{feed:e.feedState,error:(t=e.feedState,t.error)};var t}),(function(e){return{onFetchFeed:function(){return e(function(){var e=Object(k.a)(w.a.mark((function e(t){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:I((function(e,s){e?t({type:P,error:e.message}):(s.reverse(),t({type:U,posts:s}))}));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},onPostCreate:function(t){return e(function(e){return function(){var t=Object(k.a)(w.a.mark((function t(s){return w.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:C(e,(function(e,t){s(e?{type:P,error:e.message}:{type:F,post_obj_res:t})}));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(t))}}}))((function(e){var t=Object(n.useContext)(i),s=t.userId,c=t.username,r=t.showModal,o=t.setShowModal,l=t.modalProps,u=t.setModalProps,d="",b=Object(n.useState)(""),m=Object(a.a)(b,2),O=m[0],p=m[1],g=[],x=[];Object(n.useEffect)((function(){e.onFetchFeed()}),[]),Object(n.useEffect)((function(){window.URL.revokeObjectURL(d)}));var v=function(t){t.preventDefault();var n=new FormData;n.append("userId",s),n.append("message",O),n.append("img_name",Object(H.v4)()),n.append("id",Object(H.v4)());for(var c=0;c<l.file_arr.length;c++)n.append("filesToUpload[]",l.file_arr[c]);x=[],g=[],o(!1),u(null),e.onPostCreate(n)};return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("div",{children:[Object(h.jsx)("h1",{children:"Posts feed page"}),Object(h.jsx)("img",{src:"https://idsp2.s3-us-west-1.amazonaws.com//images/1619930874561_07_optional_middle_name_1.png",alt:""}),Object(h.jsxs)("h2",{children:["Welcome: ",c]}),Object(h.jsx)("button",{onClick:function(){return o(!0)},children:"Upload Post"}),Object(h.jsx)("div",{children:e.feed.error?Object(h.jsx)(f,{message:e.feed.error}):e.feed.posts.length>0?e.feed.posts.map((function(e){return console.log("sssssssssssssssssssssssss"),console.log(e),Object(h.jsx)(Q,Object(j.a)({},e),e.id)})):Object(h.jsx)("div",{children:Object(h.jsx)("h2",{children:"loading..."})})})]}),r&&Object(h.jsx)(se,{data:x,children:Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("form",{style:{marginBottom:"50px"},onSubmit:v,children:[Object(h.jsx)("textarea",{rows:4,cols:50,name:"message",value:O,onChange:function(e){return p(e.target.value)}}),Object(h.jsx)("div",{children:Object(h.jsx)("input",{type:"file",id:"myFile",name:"filename",accept:"image/png",multiple:!0,onChange:function(e){return function(e){console.log(e.target.files),g=Array.from(e.target.files),console.log("fffffffffffffffffffffff"),console.log(g),g.map((function(e){var t=[];t.push(e);var s=new Blob(t);d=window.URL.createObjectURL(s),x.push(d)})),u({src_arr:x,file_arr:g})}(e)}})}),Object(h.jsx)("input",{type:"submit"})]}),Object(h.jsx)("div",{children:l&&Object(h.jsx)(Z,{slides:l.src_arr})})]})})]})}));var ce=function(){var e=Object(n.useContext)(i).username;return Object(h.jsxs)("div",{children:[Object(h.jsx)("h1",{children:"Users page"}),Object(h.jsxs)("h2",{children:["Welcome: ",e," "]})]})},re=function(){return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(v.a,{exact:!0,path:"/",children:Object(h.jsx)(ne,{})}),Object(h.jsx)(v.a,{path:"/users",children:Object(h.jsx)(ce,{})})]})},oe=function(){var e=Object(v.f)(),t=Object(n.useState)({username:"",email:"",password:""}),s=Object(a.a)(t,2),c=s[0],r=s[1],o=Object(n.useContext)(i).setSignUpStatus,u=Object(n.useState)(""),d=Object(a.a)(u,2),O=d[0],p=d[1],g=function(e){var t=e.target.name,s=e.target.value;r(Object(j.a)(Object(j.a)({},c),{},Object(l.a)({},t,s)))};return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)("img",{id:"logo",src:"https://i.imgur.com/0ldmkwI.png",alt:"TownSquareLogo"}),Object(h.jsx)("h2",{className:"signUpTitle",children:"Sign Up"}),Object(h.jsxs)("article",{className:"form",children:[O&&Object(h.jsx)(f,{message:O}),Object(h.jsxs)("form",{children:[Object(h.jsxs)("div",{className:"form-control",children:[Object(h.jsx)("label",{htmlFor:"username",children:"username : "}),Object(h.jsx)("input",{type:"username",id:"username",name:"username",placeholder:"Create a username",value:c.username,onChange:g})]}),Object(h.jsxs)("div",{className:"form-control",children:[Object(h.jsx)("label",{htmlFor:"email",children:"Email : "}),Object(h.jsx)("input",{type:"email",id:"email",name:"email",placeholder:"Please enter your email",value:c.email,onChange:g})]}),Object(h.jsxs)("div",{className:"form-control",children:[Object(h.jsx)("label",{htmlFor:"password",children:"password : "}),Object(h.jsx)("input",{type:"password",id:"password",name:"password",placeholder:"Create a password",value:c.password,onChange:g})]}),Object(h.jsx)("button",{type:"submit",onClick:function(t){(t.preventDefault(),c.email&&c.password&&c.username)?function(e,t){b.a.post("".concat(m,"/user/signUp"),e).then((function(e){console.log("post register response"),console.log(e),t(null,e)})).catch((function(e){console.log("post register error"),console.log(e),t(e)}))}({username:c.username,email:c.email,password:c.password},(function(t,s){t?(console.log(t),p(t.message)):(p(""),o(!0),console.log("registration result message"),console.log(s.data.message),e.push("/"))})):p("You are missing some credentials")},children:"Register"})]})]})]})},ae=s(27),ie=s.n(ae);var le=function(){var e=Object(n.useState)(""),t=Object(a.a)(e,2),s=(t[0],t[1]),c=Object(n.useContext)(i),r=c.setUsername,o=c.setIsAuthenticated,l=c.setUserId;return Object(h.jsxs)("div",{className:"".concat(ie.a.navBar," flex--space-around"),children:[Object(h.jsx)("div",{className:ie.a.navBar__item,children:Object(h.jsx)(u.b,{to:"/",children:"Home"})}),Object(h.jsx)("div",{className:ie.a.navBar__item,children:Object(h.jsx)(u.b,{to:"/users",children:"Users"})}),Object(h.jsx)("div",{className:ie.a.navBar__item,children:Object(h.jsx)("button",{onClick:function(){var e;e=function(e,t){e?(console.log(e),s(e.message)):(s(""),console.log("LOGOUT result message"),console.log(t),r(""),l(""),o(!1))},b.a.get("".concat(m,"/user/logout")).then((function(t){console.log("post register response"),console.log(t),e(null,t)})).catch((function(t){console.log("post logout error"),console.log(t),e(t)}))},children:"Logout"})})]})},je=function(){var e=Object(n.useContext)(i);e.signUpStatus,e.setSignUpStatus,e.setUsername,e.setIsAuthenticated,e.setUserId;return Object(h.jsx)(u.a,{children:Object(h.jsxs)(v.c,{children:[Object(h.jsx)(v.a,{path:"/register",children:Object(h.jsx)(oe,{})}),Object(h.jsxs)(x,{children:[Object(h.jsx)(le,{}),Object(h.jsx)(re,{})]})]})})};var ue=function(){var e=Object(n.useState)(!1),t=Object(a.a)(e,2),s=t[0],c=t[1],r=Object(n.useState)(""),o=Object(a.a)(r,2),l=o[0],j=o[1],u=Object(n.useState)(""),d=Object(a.a)(u,2),b=d[0],m=d[1],O=Object(n.useState)(!1),p=Object(a.a)(O,2),f=p[0],g=p[1],x=Object(n.useState)(!1),v=Object(a.a)(x,2),_=v[0],w=v[1],k=Object(n.useState)(!1),S=Object(a.a)(k,2),C=S[0],I=S[1];return Object(h.jsx)(i.Provider,{value:{userId:l,setUserId:j,isAuthenticated:s,username:b,setUsername:m,setIsAuthenticated:c,signUpStatus:f,setSignUpStatus:g,showModal:_,setShowModal:w,modalProps:C,setModalProps:I},children:Object(h.jsx)(je,{})})},de=s(26),be=s(56),me=s(57),Oe=s(30),pe={posts:[],error:null};var he=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:pe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case F:console.log("case POST_CREATE"),console.log(t.post_obj_res);var s=Object(j.a)(Object(j.a)({},e),{},{posts:[t.post_obj_res].concat(Object(Oe.a)(e.posts))});return s;case U:console.log("case FEED_FETCH"),console.log(t.posts);var n=Object(j.a)(Object(j.a)({},e),{},{posts:t.posts});return n;case P:return console.log("case API_ERROR"),console.log(t.error),Object(j.a)(Object(j.a)({},e),{},{error:t.error});case L:console.log("case POST_LIKE");for(var c=[],r=0;r<e.posts.length;r++)if(e.posts[r].id==t.post_like.postId){c=t.post_like.isLike?[].concat(Object(Oe.a)(e.posts[r].likes),[{id:t.post_like.id,userId:t.post_like.userId,postId:t.post_like.postId,username:t.post_like.username}]):W.a.filter(e.posts[r].likes,(function(e){return e.userId!=t.post_like.userId}));break}var o=e.posts.map((function(e){return e.id==t.post_like.postId?Object(j.a)(Object(j.a)({},e),{},{likes:c}):Object(j.a)({},e)})),a=Object(j.a)(Object(j.a)({},e),{},{posts:o});return a;case E:console.log("case COMMENT_ADD");var i=e.posts.map((function(e){if(e.id==t.comment_obj.postId){var s=[].concat(Object(Oe.a)(e.commentList),[t.comment_obj]);return Object(j.a)(Object(j.a)({},e),{},{commentList:s})}return e}));return Object(j.a)(Object(j.a)({},e),{},{posts:i});default:return e}},fe=Object(de.b)({feedState:he}),ge=Object(me.createLogger)(),xe=Object(de.c)(fe,Object(de.a)(be.a,ge));o.a.render(Object(h.jsx)(c.a,{store:xe,children:Object(h.jsx)(ue,{})}),document.getElementById("root"))}},[[98,1,2]]]);
//# sourceMappingURL=main.fdc7047a.chunk.js.map