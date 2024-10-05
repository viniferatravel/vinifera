import React, { useState, useEffect } from 'react';

const HotelTable = ({onHotelsChange, selectedPack, action}) => {
    const [rows, setRows] = useState(action === "edit" ? selectedPack.hotels : [

    ]);

    const [newRow, setNewRow] = useState({ place: '', hotel: '', nights: '' });

    const addRow = () => {
        if (newRow.place && newRow.hotel && newRow.nights) {
            setRows([...rows, newRow]);
            setNewRow({ place: '', hotel: '', nights: '' });
        }
    };

    const removeRow = (index) => {
        setRows(rows.filter((_, i) => i !== index));
    };

    const handleChangeNewRow = (e) => {
        setNewRow({ ...newRow, [e.target.name]: e.target.value });
    };

    const handleChangeRow = (index, e) => {
        const updatedRows = [...rows];
        updatedRows[index][e.target.name] = e.target.value;
        setRows(updatedRows);
    };

    useEffect(() => {
        onHotelsChange(rows)
    }, [rows])
    

    return (
        <div className="p-4">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Place</th>
                        <th className="border px-4 py-2">Hotel</th>
                        <th className="border px-4 py-2">Nights</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">
                                <input
                                    type="text"
                                    name="place"
                                    value={row.place}
                                    onChange={(e) => handleChangeRow(index, e)}
                                    className="w-full border rounded px-2 py-1"
                                    placeholder="Place"
                                />
                            </td>
                            <td className="border px-4 py-2">
                                <input
                                    type="text"
                                    name="hotel"
                                    value={row.hotel}
                                    onChange={(e) => handleChangeRow(index, e)}
                                    className="w-full border rounded px-2 py-1"
                                    placeholder="Hotel"
                                />
                            </td>
                            <td className="border px-4 py-2">
                                <input
                                    type="number"
                                    name="nights"
                                    value={row.nights}
                                    onChange={(e) => handleChangeRow(index, e)}
                                    className="w-full border rounded px-2 py-1"
                                    placeholder="Nights"
                                />
                            </td>
                            <td className="border px-4 py-2">
                                <button
                                    type='button'
                                    onClick={() => removeRow(index)}
                                    className="bg-red-500 text-white px-4 py-1 rounded"
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}

                    {/* Row for adding new entries */}
                    <tr>
                        <td className="border px-4 py-2">
                            <input
                                type="text"
                                name="place"
                                value={newRow.place}
                                onChange={handleChangeNewRow}
                                className="w-full border rounded px-2 py-1"
                                placeholder="Place"
                            />
                        </td>
                        <td className="border px-4 py-2">
                            <input
                                type="text"
                                name="hotel"
                                value={newRow.hotel}
                                onChange={handleChangeNewRow}
                                className="w-full border rounded px-2 py-1"
                                placeholder="Hotel"
                            />
                        </td>
                        <td className="border px-4 py-2">
                            <input
                                type="number"
                                name="nights"
                                value={newRow.nights}
                                onChange={handleChangeNewRow}
                                className="w-full border rounded px-2 py-1"
                                placeholder="Nights"
                            />
                        </td>
                        <td className="border px-4 py-2">
                            <button
                                type='button'
                                onClick={addRow}
                                className="bg-blue-500 text-white px-4 py-1 rounded w-[100%]"
                            >
                                Add
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* Add Row Button Outside the Table */}
            <div className="mt-4">
                <button
                    type='button'
                    onClick={addRow}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Add New Row
                </button>
            </div>

            {/* <div className="mt-4">
                <h3 className="font-bold">Generated Data (Dynamically Updated):</h3>
                <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(rows, null, 2)}</pre>
            </div> */}

            {/* <p className="mt-4 text-gray-600 text-sm">
                Note: Under unavoidable circumstances, Hotels are subject to change. In such conditions, a substitute hotel of a similar category is provided.
            </p> */}
        </div>
    );
};

export default HotelTable;
