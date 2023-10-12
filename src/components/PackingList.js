import { useState } from 'react';
import Item from './Item';

export default function PackingList({
  items,
  onToggleItem,
  onDeleteItem,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState('input');

  let itemsSorted;

  if (sortBy === 'input') itemsSorted = items;
  if (sortBy === 'description')
    itemsSorted = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === 'packed')
    itemsSorted = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className='list'>
      <ul>
        {itemsSorted.map((item) => (
          <Item
            item={item}
            key={item.id}
            onToggleItem={onToggleItem}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </ul>
      <div className='actions'>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value='input'>Sort by input</option>
          <option value='description'>Sort by description</option>
          <option value='packed'>Sort by packed</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}
