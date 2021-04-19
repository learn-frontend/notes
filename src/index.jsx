import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './style.scss';

const NoteEditor = () => {

  const onSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div className="row">
      <form className="editor col-4 offset-4" onSubmit={onSubmit}>
        <textarea rows="5" placeholder="Введите текст заметки" />
        <div className="editor-actions">
          <ul className="editor-colors">
            <li className="color" style={{ background: '#FEF3A1' }}></li>
            <li className="color" style={{ background: '#B4FBA6' }}></li>
            <li className="color" style={{ background: '#A6D2FB' }}></li>
          </ul>
          <button type="submit" className="btn btn-primary">Добавить</button>
        </div>
      </form>
    </div>
  );
}

const NoteList = () => {
  const [list] = useState([
    { id: 1, color: '#FEF3A1', title: 'Заголовок', text: 'Текст заметки' },
    { id: 2, color: '#FEF3A1', title: 'Заголовок 2', text: 'Текст заметки qwe' },
    { id: 3, color: '#B4FBA6', title: 'Заголовок', text: 'Текст заметки qwe' },
    { id: 4, color: '#A6D2FB', title: 'Заголовок 3', text: 'Текст заметки dfg ' },
  ]);

  return (
    <div className="notes">
      <div className="row g-3">
        {list.map((note) => (
          <div key={note.id} className="col-3">
            <div className="notes-item" style={{ background: note.color }}>
              <h5 className="notes-title">{note.title}</h5>
              <div className="notes-text">{note.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const App = () => {
  return (
    <div className="app container">
      <NoteEditor />
      <NoteList />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));