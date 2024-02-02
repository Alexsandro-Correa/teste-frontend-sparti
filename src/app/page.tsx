"use client";

import React from "react";
import { useEffect, useState } from "react";

interface produtos {
  id: number;
  item: string;
  unidade_medida: string;
  quantidade: number;
  preco: number;
  produto_perecivel: boolean;
  data_validade: Date;
  data_fabricacao: Date;
}

const items: produtos[] = [
  {
    id: 0,
    item: "Arroz",
    unidade_medida: "kg",
    quantidade: 5,
    preco: 5,
    produto_perecivel: true,
    data_validade: new Date(2003 - 10 - 10),
    data_fabricacao: new Date(10 / 12 / 2030),
  },
];

//////////////////////////////////////////////////////

export default function Home() {
  const [item, setItems] = useState(() => {
    if (typeof window !== "undefined") {
      const storedItems = localStorage.getItem("Produtos");
      return storedItems ? JSON.parse(storedItems) : items;
    } else {
      return items;
    }
  });

  const [isFormVisible, setFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<produtos | null>(null);
  const [isTableVisible, setTableVisible] = useState(true);
  const [hydrated, setHydrated] = React.useState(false);
  const [updating, setUpdating] = useState(false);
  const [idCounter, setIdCounter] = useState(1);
  const [unidadeMedida, setUnidadeMedida] = useState("");

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("Produtos", JSON.stringify(item));
  }, [item]);

  function handleEditClick(item: any) {
    setFormVisible(true);
    setTableVisible(false);
    setEditingItem(item);
    setNewItem(item);
    setUpdating(true);
  }

  function handleCreateClick(item: any) {
    setFormVisible(item);
    setEditingItem(null);
    setTableVisible(false);
    setUpdating(false);
    setNewItem({
      id: 0,
      item: "",
      unidade_medida: "",
      quantidade: 0,
      preco: 0,
      produto_perecivel: false,
      data_validade: new Date("2023-1-1"),
      data_fabricacao: new Date("2023-1-1"),
    });
  }

  function handleCancel() {
    setFormVisible(false);
    setTableVisible(true);
  }

  const addItem = (newItem: produtos) => {
    setItems([...item, { ...newItem, id: idCounter }]);
    setIdCounter(idCounter + 1);
  };

  const removeItem = (itemToRemove: produtos) => {
    if (Array.isArray(item)) {
      setItems(item.filter((i: produtos) => i !== itemToRemove));
    } else {
      console.error("Erro: item não é um array");
    }
  };

  const updateItem = (oldItem: produtos, newItem: produtos) => {
    const updatedList = item.map((i: produtos) =>
      i === oldItem ? newItem : i
    );
    setItems(updatedList);
  };

  const [newItem, setNewItem] = useState({
    id: 0,
    item: "",
    unidade_medida: "",
    quantidade: 0,
    preco: 0,
    produto_perecivel: false,
    data_validade: new Date("2023-1-1"),
    data_fabricacao: new Date("2023-1-1"),
  });

  const handleInputChange = (e: any) => {
    let value;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    } else if (
      e.target.name === "data_validade" ||
      e.target.name === "data_fabricacao"
    ) {
      value = new Date(e.target.value);
    } else {
      value = e.target.value;
    }

    if (e.target.value === "preco") {
      value = parseFloat(value).toFixed(2);
    }

    if (unidadeMedida === "lt" || unidadeMedida === "kg") {
      if (typeof value === "string") {
        const decimal = value.split(".")[1];

        if (decimal && decimal.length > 3) {
          value = parseFloat(value).toFixed(3);
        }
      }
    } else if (unidadeMedida === "un") {
      value = parseInt(value);
    }

    setNewItem({ ...newItem, [e.target.name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (updating) {
      if (editingItem !== null) {
        updateItem(editingItem, newItem);
      } else {
        console.error("Erro: Nenhum item selecionado para atualização");
      }
    } else {
      addItem(newItem);
      setNewItem({
        id: idCounter,
        item: "",
        unidade_medida: "",
        quantidade: 0,
        preco: 0,
        produto_perecivel: false,
        data_validade: new Date(2023 - 10 - 10),
        data_fabricacao: new Date(2023 - 5 - 10),
      });
      setIdCounter(idCounter + 1);
    }
    setFormVisible(false);
    setTableVisible(true);
  };

  return (
    <div className="flex-container justify-center items-center bg-gray-500 w-full h-full relative overflow-auto shadow-md sm:rounded-lg flex flex-col items-center">
      {hydrated && (
        <>
          <header>
            <title>Cadastro de Items</title>
          </header>

          <div>
            <h4 className="mb-10 mt-10 text-lg text-grey-500 bg-cyan-500 p-4 border border-blue-500 rounded-full">
              Tabela de Cadastro
            </h4>
          </div>
          {isFormVisible && (
            <form onSubmit={handleSubmit}>
              <div className="mb-5 me-5 ms-5 text-md dark:text-white ">
                <h1>Produto</h1>
                <input
                  className="text-black bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  maxLength={50}
                  onKeyDown={(event) => {
                    if (!/[a-zA-Z]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  name="item"
                  value={newItem.item}
                  onChange={handleInputChange}
                  required
                />
                <p>Unidade de Medida</p>
                <select
                  className="text-black bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="unidade_medida"
                  value={newItem.unidade_medida}
                  onChange={(e) => {
                    handleInputChange(e);
                    setUnidadeMedida(e.target.value);
                  }}
                  required
                >
                  <option value="option">Selecione a Unidade de Medida</option>
                  <option value="lt">Litros</option>
                  <option value="kg">Quilogramas</option>
                  <option value="un">Unidade</option>
                </select>

                {unidadeMedida === "lt" && (
                  <div className="flex items-center">
                    <input
                      className="text-black bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="number"
                      step="0.001"
                      max="999.999"
                      name="quantidade"
                      value={newItem.quantidade}
                      onChange={handleInputChange}
                      placeholder="Litros"
                    />
                    <label className="ml-2 text-sm text-white-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
                      lt
                    </label>
                  </div>
                )}

                {unidadeMedida === "kg" && (
                  <div className="flex items-center">
                    <input
                      className="text-black bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="number"
                      step="0.001"
                      max="999.999"
                      name="quantidade"
                      value={newItem.quantidade}
                      onChange={handleInputChange}
                      placeholder="Quilogramas"
                    />
                    <label className="ml-2 text-sm text-white-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
                      kg
                    </label>
                  </div>
                )}

                {unidadeMedida === "un" && (
                  <div className="flex items-center">
                    <input
                      className="text-black bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="number"
                      step="0.001"
                      max="999.999"
                      name="quantidade"
                      value={newItem.quantidade}
                      onChange={handleInputChange}
                      placeholder="Unidade"
                    />
                    <label className="ml-2 text-sm text-white-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
                      un
                    </label>
                  </div>
                )}

                <p>Preço</p>
                <div className="flex items-center">
                  <label className="-translate-y-0 text-md text-gray-500 bg-white pointer-events-none transform transition-transform duration-200 ease-in-out rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2">
                    R$
                  </label>
                  <input
                    className="-translate-x-2 text-black bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="number"
                    name="preco"
                    value={newItem.preco}
                    onChange={handleInputChange}
                    placeholder={editingItem?.preco.toString()}
                    required
                  />
                </div>

                <p>Produto Perecível</p>
                <input
                  className="text-black scale-150 "
                  type="checkbox"
                  name="produto_perecivel"
                  checked={newItem.produto_perecivel}
                  onChange={handleInputChange}
                />
                <p>Data de Fabricação</p>
                <input
                  className="text-black bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="date"
                  name="data_fabricacao"
                  value={
                    newItem.data_fabricacao instanceof Date
                      ? newItem.data_fabricacao.toISOString().slice(0, 10)
                      : ""
                  }
                  onChange={handleInputChange}
                  required
                />
                <p>Data de Validade</p>
                <input
                  className="text-black bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="date"
                  name="data_validade"
                  value={
                    newItem.data_validade instanceof Date
                      ? newItem.data_validade.toISOString().slice(0, 10)
                      : ""
                  }
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button
                className="w-full text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 shadow-lg shadow-yellow-500/50 dark:shadow-lg dark:shadow-yellow-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={handleCancel}
              >
                Cancelar
              </button>
              <button
                className="w-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                type="submit"
              >
                {updating ? `Editar Item` : `Adicionar Item`}
              </button>
            </form>
          )}
          {isTableVisible && (
            <div className="overflow-x-auto">
              <table className="mx-auto min-w-full text-center">
                <thead className="text-xs border border-white-300 text-white-500 uppercase bg-gray-400 dark:bg-gray-700">
                  <tr className="border border-gray-300">
                    <td className="px-16 py-3 border border-gray-300">Itens</td>
                    <td className="px-16 py-3 border border-gray-300">Preço</td>
                    <td className="px-16 py-3 border border-gray-300">
                      Produto Perecível
                    </td>
                    <td className="px-16 py-3 border border-gray-300">
                      Quantidade
                    </td>
                    <td className="px-16 py-3 border border-gray-300">
                      Data de Fabricação
                    </td>
                    <td className="px-16 py-3 border border-gray-300">
                      Data de Validade
                    </td>
                    <td></td>
                  </tr>
                </thead>

                <tbody className="text-lg dark:bg-cyan-700 dark:text-white-400">
                  {item !== undefined &&
                    Array.isArray(item) &&
                    item.length > 0 &&
                    item.map((i, index) => (
                      <tr
                        className="px-16 py-3 border border-gray-300"
                        key={index}
                      >
                        <td className=" hover:bg-cyan-400 border border-gray-300">
                          {i ? i.item : ""}
                        </td>
                        <td className=" hover:bg-cyan-400 border border-gray-300">
                          {i ? `R$ ${Number(i.preco).toFixed(2)}` : ""}
                        </td>
                        <td className="hover:bg-cyan-400 border border-gray-300">
                          {i ? (i.produto_perecivel ? "Sim" : "Não") : ""}
                        </td>
                        <td className="hover:bg-cyan-400 border border-gray-300">
                          {i ? `${i.quantidade} ${i.unidade_medida}` : ""}
                        </td>
                        <td className="hover:bg-cyan-400 border border-gray-300">
                          {new Date(i.data_fabricacao).toLocaleDateString(
                            "pt-BR"
                          )}
                        </td>
                        <td className=" hover:bg-cyan-400 border border-gray-300">
                          {new Date(i.data_validade).toLocaleDateString(
                            "pt-BR"
                          )}
                        </td>
                        <td>
                          {i && (
                            <>
                              <button
                                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                onClick={() => removeItem(i)}
                              >
                                Deletar
                              </button>
                              <button
                                className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                onClick={() => handleEditClick(i)}
                              >
                                Editar
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
          {isTableVisible && (
            <button
              className="w-1/4 mt-10 justify-center  text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={() => handleCreateClick([items])}
            >
              Cadastrar novo produto!
            </button>
          )}
        </>
      )}
    </div>
  );
}
