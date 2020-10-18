import ReactQuill, { Quill }  from 'react-quill';
import  ImageResize  from 'quill-image-resize-module-react';


Quill.register('modules/imageResize', ImageResize);

let colorPellete = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color']

  var icons = ReactQuill.Quill.import("ui/icons");
    icons["undo"] = `<svg viewbox="0 0 18 18">
    <polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon>
    <path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path>
  </svg>`;
    icons["redo"] = `<svg viewbox="0 0 18 18">
    <polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon>
    <path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path>
  </svg>`;

  icons['atSign'] = `<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDkwLjIgNDkwLjIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ5MC4yIDQ5MC4yOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8cGF0aCBkPSJNNDIwLjk1LDYxLjhDMzc2LjI1LDIwLjYsMzIwLjY1LDAsMjU0LjI1LDBjLTY5LjgsMC0xMjkuMywyMy40LTE3OC40LDcwLjNzLTczLjcsMTA1LjItNzMuNywxNzUNCgkJYzAsNjYuOSwyMy40LDEyNC40LDcwLjEsMTcyLjZjNDYuOSw0OC4yLDEwOS45LDcyLjMsMTg5LjIsNzIuM2M0Ny44LDAsOTQuNy05LjgsMTQwLjctMjkuNWMxNS02LjQsMjIuMy0yMy42LDE2LjItMzguN2wwLDANCgkJYy02LjMtMTUuNi0yNC4xLTIyLjgtMzkuNi0xNi4yYy00MCwxNy4yLTc5LjIsMjUuOC0xMTcuNCwyNS44Yy02MC44LDAtMTA3LjktMTguNS0xNDEuMy01NS42Yy0zMy4zLTM3LTUwLTgwLjUtNTAtMTMwLjQNCgkJYzAtNTQuMiwxNy45LTk5LjQsNTMuNi0xMzUuN2MzNS42LTM2LjIsNzkuNS01NC40LDEzMS41LTU0LjRjNDcuOSwwLDg4LjQsMTQuOSwxMjEuNCw0NC43czQ5LjUsNjcuMyw0OS41LDExMi41DQoJCWMwLDMwLjktNy42LDU2LjctMjIuNyw3Ny4yYy0xNS4xLDIwLjYtMzAuOCwzMC44LTQ3LjEsMzAuOGMtOC44LDAtMTMuMi00LjctMTMuMi0xNC4yYzAtNy43LDAuNi0xNi43LDEuNy0yNy4xbDE4LjYtMTUyLjFoLTY0DQoJCWwtNC4xLDE0LjljLTE2LjMtMTMuMy0zNC4yLTIwLTUzLjYtMjBjLTMwLjgsMC01Ny4yLDEyLjMtNzkuMSwzNi44Yy0yMiwyNC41LTMyLjksNTYuMS0zMi45LDk0LjdjMCwzNy43LDkuNyw2OC4yLDI5LjIsOTEuMw0KCQljMTkuNSwyMy4yLDQyLjksMzQuNyw3MC4zLDM0LjdjMjQuNSwwLDQ1LjQtMTAuMyw2Mi44LTMwLjhjMTMuMSwxOS43LDMyLjQsMjkuNSw1Ny45LDI5LjVjMzcuNSwwLDY5LjktMTYuMyw5Ny4yLTQ5DQoJCWMyNy4zLTMyLjYsNDEtNzIsNDEtMTE4LjFDNDg4LjA1LDE1Mi45LDQ2NS43NSwxMDMsNDIwLjk1LDYxLjh6IE0yNzMuNTUsMjkxLjljLTExLjMsMTUuMi0yNC44LDIyLjktNDAuNSwyMi45DQoJCWMtMTAuNywwLTE5LjMtNS42LTI1LjgtMTYuOGMtNi42LTExLjItOS45LTI1LjEtOS45LTQxLjhjMC0yMC42LDQuNi0zNy4yLDEzLjgtNDkuOHMyMC42LTE5LDM0LjItMTljMTEuOCwwLDIyLjMsNC43LDMxLjUsMTQuMg0KCQlzMTMuOCwyMi4xLDEzLjgsMzcuOUMyOTAuNTUsMjU5LjIsMjg0Ljg1LDI3Ni42LDI3My41NSwyOTEuOXoiLz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K" />`

  const toolbar = [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }, {size: []}],
    [],

    ['bold', 'italic', 'underline', 'strike', 'blockquote', {'color': colorPellete}, 'code', {'background': colorPellete}],
    [{'list': 'ordered'}, {'list': 'bullet'},
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['undo' , 'redo' ],
    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
    ['atSign']
  ]

  export {toolbar}
