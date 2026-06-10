import items from "@/resources/items.json" with { type: "json" };

const getItemInfo = (id) => {
  return items.find((row) => row.id === id);
}

export {items, getItemInfo}
