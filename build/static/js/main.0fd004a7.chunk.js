(this.webpackJsonpnotes=this.webpackJsonpnotes||[]).push([[0],{15:function(e,t,n){e.exports=n(40)},39:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(14),u=n.n(c),o=n(2),s=n.n(o),i=n(4),l=n(3),p=n.n(l);var m=function(){var e=Object(a.useState)([]),t=Object(i.a)(e,2),n=t[0],c=t[1],u=Object(a.useState)(),o=Object(i.a)(u,2),l=o[0],m=o[1],f=Object(a.useState)(),b=Object(i.a)(f,2),d=b[0],E=b[1],h=function(){var e,t;return s.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,s.a.awrap(p.a.get("/api/persons"));case 2:e=n.sent,t=e.data,c(t);case 5:case"end":return n.stop()}}))};Object(a.useEffect)((function(){h()}),[]);var v=function(e){p.a.delete("/api/persons/".concat(e.target.id)),h()};return r.a.createElement("div",{className:"App"},r.a.createElement("h1",null,"Phone Book"),r.a.createElement("ul",null,n.map((function(e){return r.a.createElement("li",null,e.name," ",e.number," ",r.a.createElement("button",{id:e.id,onClick:v},"delete"))}))),r.a.createElement("form",{onSubmit:function(){return s.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.awrap(p.a.post("/api/persons",{name:l,number:d}));case 2:h();case 3:case"end":return e.stop()}}))}},r.a.createElement("input",{onChange:function(e){return m(e.target.value)},type:"text",placeholder:"name"}),r.a.createElement("input",{onChange:function(e){return E(e.target.value)},type:"text",placeholder:"number"}),r.a.createElement("button",{type:"submit"},"Submit")))};n(39);u.a.render(r.a.createElement(m,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.0fd004a7.chunk.js.map