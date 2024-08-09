import React, { useState } from 'react';
import Logo from './Logo';
import Form from './Form';
import PackingList from './PackingList';
import Stats from './Stats';

// const initialItems = [
//   { id: 1, description: 'Passports', quantity: 2, packed: false },
//   { id: 2, description: 'Socks', quantity: 12, packed: true },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToogleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      'Are you sure you want to clear the list?'
    );

    if (!confirmed) return;

    setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToogleItem={handleToogleItem}
        onClearList={handleClearList}
      />
      <Form onAddItem={handleAddItem} />
      <Stats items={items} />
    </div>
  );
}
