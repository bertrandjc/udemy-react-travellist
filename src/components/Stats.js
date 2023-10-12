export default function Stats({ items }) {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  if (items.length === 0)
    return (
      <footer className='stats'>
        <em>Seems the list still empty, kindly please add the list 🚀</em>
      </footer>
    );
  return (
    <footer className='stats'>
      <em>
        {percentage === 100
          ? `All list already completed, you are ready to go ✈️`
          : `🧳 ${numItems} item has been listed, and you already packed ${numPacked} (
        ${percentage}%)`}
      </em>
    </footer>
  );
}
