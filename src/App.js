import React, { useState } from 'react';

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

  function handleClearAllItems() {
    setItems((items) => []);
  }

  return (
    <div className="app">
      <Logo />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToogleItem={handleToogleItem}
        onClearAllItems={handleClearAllItems}
      />
      <Form onAddItem={handleAddItem} />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🧳</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;
    const newElement = { description, quantity, packed: false, id: Date.now() };
    onAddItem(newElement);

    setDescription('');
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip? </h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Items..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add to the list</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToogleItem, onClearAllItems }) {
  const [sortBy, setSortBy] = useState('input');
  let sortedItems = items;

  if (sortBy === 'input') sortedItems = items;

  if (sortBy === 'description')
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === 'packed')
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed - Number(b.packed)));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToogleItem={onToogleItem}
          />
        ))}
      </ul>

      <div className="actions" onChange={(e) => sortBy}>
        <select>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description order</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={() => onClearAllItems()}>Clear list</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToogleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToogleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌&times;</button>
    </li>
  );
}

function Stats({ items }) {
  const numPackedItems = items.filter((item) => item.packed).length;
  const percentage =
    items.length > 0 ? Math.round((numPackedItems / items.length) * 100) : 0;

  return (
    <footer className="stats">
      <em>
        {items.length === 0 &&
          'Start adding some items to your packing list! 🚀'}

        {items.length > 0 && (
          <>
            {percentage === 100
              ? 'You got everything! Ready to go 🛫'
              : `🧳You have ${items.length} items on your list, and you already packed ${numPackedItems} (${percentage}%)`}
          </>
        )}
      </em>
    </footer>
  );
}
