import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './style.scss';

const NoteEditor = (props) => {
  const COLOR_1 = '#FEF3A1';
  const COLOR_2 = '#B4FBA6';
  const COLOR_3 = '#A6D2FB';

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [color, setColor] = useState(COLOR_1);
  const [error, setError] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();
    if (title || text) {
      props.onAdd({
        id: Date.now(),
        title,
        text,
        color,
      });
      setTitle('');
      setText('');
      setColor(COLOR_1);
    } else {
      setError('Загловок или текст заметки обязателен для заполнения!');
    }
  }

  const onChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    if (name === 'title') {
      setTitle(value);
    } else {
      setText(value);
    }
    setError(null);
  }

  const onClickColor = (event) => {
    const selectedColor = event.target.dataset.id;
    setColor(selectedColor);
  }

  return (
    <div className="row">
      <form className="editor col-4 offset-4" onSubmit={onSubmit}>
        <input type="text" placeholder="Введите заголовок" value={title} onChange={onChange} name="title" />
        <textarea rows="5" placeholder="Введите текст заметки" value={text} onChange={onChange} name="text" />
        {error && <p className="editor-error">{error}</p>}
        <div className="editor-actions">
          <ul className="editor-colors">
            <li className={`color ${color === COLOR_1 ? 'selected' : ''}`} style={{ background: COLOR_1 }} data-id={COLOR_1} onClick={onClickColor}></li>
            <li className={`color ${color === COLOR_2 ? 'selected' : ''}`} style={{ background: COLOR_2 }} data-id={COLOR_2} onClick={onClickColor}></li>
            <li className={`color ${color === COLOR_3 ? 'selected' : ''}`} style={{ background: COLOR_3 }} data-id={COLOR_3} onClick={onClickColor}></li>
          </ul>
          <button type="submit" className="btn btn-primary">Добавить</button>
        </div>
      </form>
    </div>
  );
}

const NoteList = (props) => (
  <div className="notes">
    <div className="row g-3">
      {props.list.map((note) => (
        <div key={note.id} className="col-3">
          <div className="notes-item" style={{ background: note.color }}>
            <h5 className="notes-title">{note.title}</h5>
            <div className="notes-text">{note.text}</div>
            <span className="notes-remove" onClick={props.onClick} data-id={note.id}>&times;</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const App = () => {
  const [list, setList] = useState([]);

  const onClick = (event) => {
    const id = Number(event.target.dataset.id);
    setList(list.filter((note) => note.id !== id));
  }

  const onAdd = (note) => {
    const currentList = [...list];
    currentList.unshift(note);
    setList(currentList);
  };

  return (
    <div className="app container">
      <NoteEditor onAdd={onAdd} />
      <NoteList list={list} onClick={onClick} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));