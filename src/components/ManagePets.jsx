import React, { useState, useEffect } from "react";
import SidebarNav from "./SidebarNav";
import { Plus, PawPrint, Edit, Trash2, X } from "lucide-react";

const ManagePets = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const [pets, setPets] = useState([
    { id: 1, name: "Max", type: "Dog", age: 3, breed: "Labrador" },
    { id: 2, name: "Whiskers", type: "Cat", age: 2, breed: "Persian" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    age: "",
    breed: "",
  });

  const openModal = (pet = null) => {
    if (pet) {
      setEditingPet(pet);
      setFormData({
        name: pet.name,
        type: pet.type,
        age: pet.age.toString(),
        breed: pet.breed,
      });
    } else {
      setEditingPet(null);
      setFormData({ name: "", type: "", age: "", breed: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSave = () => {
    if (!formData.name.trim() || !formData.type.trim()) {
      alert("Please fill in the required fields: Name and Type.");
      return;
    }

    if (editingPet) {
      setPets(
        pets.map((pet) =>
          pet.id === editingPet.id
            ? { ...pet, ...formData, age: parseInt(formData.age) || 0 }
            : pet
        )
      );
    } else {
      const newPet = {
        id: pets.length ? Math.max(...pets.map((p) => p.id)) + 1 : 1,
        ...formData,
        age: parseInt(formData.age) || 0,
      };
      setPets([...pets, newPet]);
    }

    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      setPets(pets.filter((pet) => pet.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-sans">
      <div className="max-w-7xl mx-auto p-6 pt-42">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <SidebarNav activeTab="pets" />

          {/* Main Content */}
          <main className="flex-1 p-8 bg-white rounded-3xl shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                <PawPrint size={30} className="text-[#006ca7]" />
                Manage Pets
              </h1>
              <button
                onClick={() => openModal()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#006ca7] text-white rounded-full shadow-lg hover:bg-[#005a8c] transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#004a70]"
                aria-label="Add Pet"
              >
                <Plus size={20} />
                Add Pet
              </button>
            </div>

            {/* Pets List */}
            {pets.length === 0 ? (
              <p className="text-gray-400 text-center py-12 text-lg font-medium">
                No pets added yet.
              </p>
            ) : (
              <div className="space-y-6">
                {pets.map((pet) => (
                  <article
                    key={pet.id}
                    className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    {/* Left: Icon + Info */}
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center rounded-full shadow-inner">
                        <PawPrint size={30} className="text-[#006ca7]" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                          {pet.name}
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                          Age: <span className="font-medium">{pet.age}</span> | Type:{" "}
                          <span className="font-medium">{pet.type}</span>
                        </p>
                        <p className="text-sm text-gray-600 mt-0.5">
                          Breed: <span className="font-medium">{pet.breed}</span>
                        </p>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex gap-5">
                      <button
                        onClick={() => openModal(pet)}
                        className="flex items-center gap-2 text-[#006ca7] font-semibold hover:text-[#004a70] transition-colors"
                        aria-label={`Edit ${pet.name}`}
                      >
                        <Edit size={18} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(pet.id)}
                        className="flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors"
                        aria-label={`Remove ${pet.name}`}
                      >
                        <Trash2 size={18} />
                        Remove
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>

          {/* Modal */}
          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 px-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              onClick={closeModal}
            >
              <div
                className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 relative animate-fadeIn scale-95 hover:scale-100 transition-transform"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 focus:outline-none"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>

                <h2
                  id="modal-title"
                  className="text-2xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3"
                >
                  {editingPet ? "Edit Pet" : "Add Pet"}
                </h2>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                  }}
                  className="space-y-6"
                >
                  <input
                    type="text"
                    placeholder="Pet Name *"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-4 focus:ring-[#006ca7] outline-none transition"
                    autoFocus
                    required
                  />
                  <input
                    type="text"
                    placeholder="Pet Type (e.g., Dog, Cat) *"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-4 focus:ring-[#006ca7] outline-none transition"
                    required
                  />
                  <input
                    type="number"
                    min={0}
                    placeholder="Age"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                    className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-4 focus:ring-[#006ca7] outline-none transition"
                  />
                  <input
                    type="text"
                    placeholder="Breed"
                    value={formData.breed}
                    onChange={(e) =>
                      setFormData({ ...formData, breed: e.target.value })
                    }
                    className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-4 focus:ring-[#006ca7] outline-none transition"
                  />

                  <div className="flex justify-end gap-4 mt-8">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#006ca7] text-white rounded-xl hover:bg-[#005a8c] shadow-lg transition font-semibold"
                    >
                      {editingPet ? "Update" : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagePets;
