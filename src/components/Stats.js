import React from 'react';

export default function Stats({ items }) {
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
