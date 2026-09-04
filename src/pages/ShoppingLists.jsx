import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Trash2,
  Pencil,
  Check,
  X,
  ShoppingBasket,
  ChevronRight,
} from "lucide-react";
import { products, formatINR, getStartingFrom } from "../data/mockData";
import { useToast } from "../hooks/useToast";

const STORAGE_KEY = "kumusii_lists";

function loadLists() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [
    {
      id: "list-1",
      name: "Monthly Grocery",
      items: [
        { productId: "atta-5kg", qty: 1 },
        { productId: "oil-1l", qty: 2 },
        { productId: "rice-5kg", qty: 1 },
        { productId: "dal-1kg", qty: 2 },
        { productId: "salt-1kg", qty: 1 },
      ],
    },
    {
      id: "list-2",
      name: "Festival Shopping",
      items: [
        { productId: "maggi-12", qty: 2 },
        { productId: "milk-1l", qty: 4 },
        { productId: "bread", qty: 2 },
      ],
    },
  ];
}

export default function ShoppingLists() {
  const [lists, setLists] = useState(loadLists);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [addingTo, setAddingTo] = useState(null);
  const [newListName, setNewListName] = useState("");
  const [showNew, setShowNew] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
  }, [lists]);

  const createList = () => {
    if (!newListName.trim()) return;
    const id = `list-${Date.now()}`;
    setLists((prev) => [...prev, { id, name: newListName.trim(), items: [] }]);
    setNewListName("");
    setShowNew(false);
    showToast("List created");
  };

  const renameList = (id) => {
    if (!editName.trim()) return;
    setLists((prev) =>
      prev.map((l) => (l.id === id ? { ...l, name: editName.trim() } : l))
    );
    setEditingId(null);
    showToast("List renamed");
  };

  const deleteList = (id) => {
    setLists((prev) => prev.filter((l) => l.id !== id));
    showToast("List deleted");
  };

  const addProduct = (listId, productId) => {
    setLists((prev) =>
      prev.map((l) => {
        if (l.id !== listId) return l;
        const existing = l.items.find((i) => i.productId === productId);
        if (existing) {
          return {
            ...l,
            items: l.items.map((i) =>
              i.productId === productId ? { ...i, qty: i.qty + 1 } : i
            ),
          };
        }
        return { ...l, items: [...l.items, { productId, qty: 1 }] };
      })
    );
    setAddingTo(null);
    showToast("Product added");
  };

  const updateQty = (listId, productId, delta) => {
    setLists((prev) =>
      prev.map((l) => {
        if (l.id !== listId) return l;
        return {
          ...l,
          items: l.items
            .map((i) =>
              i.productId === productId
                ? { ...i, qty: Math.max(0, i.qty + delta) }
                : i
            )
            .filter((i) => i.qty > 0),
        };
      })
    );
  };

  const removeItem = (listId, productId) => {
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId
          ? { ...l, items: l.items.filter((i) => i.productId !== productId) }
          : l
      )
    );
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl text-slate-900">Shopping Lists</h1>
        <button
          onClick={() => setShowNew(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700"
        >
          <Plus size={16} /> New list
        </button>
      </div>

      {showNew && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex gap-2">
          <input
            autoFocus
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createList()}
            placeholder="List name (e.g. Weekly essentials)"
            className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40"
          />
          <button
            onClick={createList}
            className="px-3 py-2 rounded-lg bg-teal-600 text-white"
          >
            <Check size={18} />
          </button>
          <button
            onClick={() => {
              setShowNew(false);
              setNewListName("");
            }}
            className="px-3 py-2 rounded-lg border border-slate-200 text-slate-500"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {lists.length === 0 && (
        <div className="text-center py-12 text-slate-500 text-sm">
          No lists yet. Create one to get started.
        </div>
      )}

      <div className="space-y-4">
        {lists.map((list) => (
          <div
            key={list.id}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between gap-2">
              {editingId === list.id ? (
                <div className="flex-1 flex gap-2">
                  <input
                    autoFocus
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && renameList(list.id)}
                    className="flex-1 px-2 py-1 rounded border border-slate-200 text-sm"
                  />
                  <button onClick={() => renameList(list.id)} className="text-teal-600">
                    <Check size={18} />
                  </button>
                  <button onClick={() => setEditingId(null)} className="text-slate-400">
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <h2 className="font-semibold text-slate-900">{list.name}</h2>
                    <p className="text-xs text-slate-500">
                      {list.items.length} item{list.items.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditingId(list.id);
                        setEditName(list.name);
                      }}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => deleteList(list.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Items */}
            <div className="divide-y divide-slate-50">
              {list.items.map((item) => {
                const p = products.find((x) => x.id === item.productId);
                if (!p) return null;
                return (
                  <div
                    key={item.productId}
                    className="px-4 py-2.5 flex items-center gap-3"
                  >
                    <span className="text-xl">{p.imageEmoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{p.name}</div>
                      <div className="text-xs text-slate-500">
                        from {formatINR(getStartingFrom(p.id))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateQty(list.id, item.productId, -1)}
                        className="w-7 h-7 rounded-md bg-slate-100 text-slate-600 text-sm font-medium hover:bg-slate-200"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-medium">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(list.id, item.productId, 1)}
                        className="w-7 h-7 rounded-md bg-slate-100 text-slate-600 text-sm font-medium hover:bg-slate-200"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(list.id, item.productId)}
                        className="ml-1 p-1 text-slate-300 hover:text-red-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
              {list.items.length === 0 && (
                <div className="px-4 py-6 text-center text-xs text-slate-400">
                  No items yet
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex flex-wrap gap-2">
              <button
                onClick={() =>
                  setAddingTo(addingTo === list.id ? null : list.id)
                }
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <Plus size={14} /> Add product
              </button>
              {list.items.length > 0 && (
                <button
                  onClick={() => navigate(`/smart-basket/${list.id}`)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700"
                >
                  <ShoppingBasket size={14} /> Run Smart Basket
                  <ChevronRight size={14} />
                </button>
              )}
            </div>

            {/* Add product picker */}
            {addingTo === list.id && (
              <div className="border-t border-slate-100 max-h-48 overflow-y-auto">
                {products
                  .filter(
                    (p) => !list.items.some((i) => i.productId === p.id)
                  )
                  .map((p) => (
                    <button
                      key={p.id}
                      onClick={() => addProduct(list.id, p.id)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-teal-50 border-b border-slate-50 last:border-0"
                    >
                      <span className="text-lg">{p.imageEmoji}</span>
                      <div className="flex-1 text-sm font-medium">{p.name}</div>
                      <span className="text-xs text-slate-500">{p.packSize}</span>
                    </button>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
