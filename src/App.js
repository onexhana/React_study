import { useState } from 'react';
import './App.css';

function Header(props) {
  return (
    <header>
      <h1>
        <a href="/" onClick={(event) => {
          event.preventDefault();
          props.onChangeMode();
        }}>{props.title}</a>
      </h1>
    </header>
  );
}

function Nav(props) {
  const lis = props.topics.map(topic => (
    <li key={topic.id}>
      <a id={topic.id} href={'/read/' + topic.id} onClick={(event) => {
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>{topic.title}</a>
    </li>
  ));
  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}

function Article({ title, body }) {
  return (
    <article>
      <h2>{title}</h2>
      {body}
    </article>
  );
}

function Create({ onCreate }) {
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={(event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        onCreate(title, body);
      }}>
        <p><input type="text" name="title" placeholder="title" /></p>
        <p><textarea name="body" placeholder="body"></textarea></p>
        <p><input type="submit" value="Create" /></p>
      </form>
    </article>
  );
}

function Update({ title: initTitle, body: initBody, onUpdate }) {
  const [title, setTitle] = useState(initTitle);
  const [body, setBody] = useState(initBody);

  return (
    <article>
      <h2>Update</h2>
      <form onSubmit={(event) => {
        event.preventDefault();
        onUpdate(title, body);
      }}>
        <p><input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} /></p>
        <p><textarea name="body" value={body} onChange={(e) => setBody(e.target.value)} /></p>
        <p><input type="submit" value="Update" /></p>
      </form>
    </article>
  );
}

function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setID] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'javascript', body: 'javascript is ...' }
  ]);

  let content = null;
  let contextControl = null;

  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, Web" />;
  } else if (mode === 'READ') {
    const topic = topics.find(t => t.id === id);
    content = <Article title={topic.title} body={topic.body} />;
    contextControl = (
      <>
        <li><a href={'/update/' + id} onClick={(e) => {
          e.preventDefault();
          setMode('UPDATE');
        }}>Update</a></li>
        <li><input type="button" value="Delete" onClick={() => {
          const newTopics = [];
          for (let i = 0; i < topics.length; i++) {
            if (topics[i].id !== id) {
              newTopics.push(topics[i]);
            }
          }
          setTopics(newTopics);
          setMode('WELCOME');
        }} /></li>
      </>
    );
  } else if (mode === 'CREATE') {
    content = <Create onCreate={(title, body) => {
      const newTopic = { id: nextId, title, body };
      const newTopics = [...topics, newTopic];
      setTopics(newTopics);
      setMode('READ');
      setID(nextId);
      setNextId(nextId + 1);
    }} />;
  } else if (mode === 'UPDATE') {
    const topic = topics.find(t => t.id === id);
    content = <Update title={topic.title} body={topic.body} onUpdate={(title, body) => {
      const updatedTopic = { id, title, body };
      const newTopics = [...topics];
      for (let i = 0; i < newTopics.length; i++) {
        if (newTopics[i].id === id) {
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ');
    }} />;
  }

  return (
    <div>
      <Header title="WEB" onChangeMode={() => {
        setMode('WELCOME');
      }} />
      <Nav topics={topics} onChangeMode={(id) => {
        setMode('READ');
        setID(id);
      }} />
      {content}
      <ul>
        <li><a href="/create" onClick={(e) => {
          e.preventDefault();
          setMode('CREATE');
        }}>Create</a></li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
