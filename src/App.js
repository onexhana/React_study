import logo from './logo.svg';
import './App.css';

function Header(props) {
  console.log('props', props.title);
  return (
    <header>
      <h1>
        <a href="/" onClick={(event)=> {
          event.preventDefault();  // a 태그 기본 이동 막기
          props.onChangeMode();    // props로 전달된 콜백 호출
        }}>
          {props.title}
        </a>
      </h1>
    </header>
  );
}

function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a id={t.id} href={'/read/' + t.id} onClick={event=> {
          event.preventDefault();  // a 태그 기본 이동 막기
          props.onChangeMode(event.target.id);
        }}>{t.title}</a>
      </li>);
  }

  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  );
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function App() {
  const topics = [
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'javascript', body: 'javascript is ...' }
  ];

  return (
    <div>
      <Header title="WEB"
        onChangeMode={()=> {
          alert('Header');
        }}></Header>
      <Nav topics={topics} onChangeMode={(id)=> {
        alert(id);
      }}></Nav>
      <Article title="Welcome" body="Hello, WEB" />
    </div>
  );
}

export default App;
