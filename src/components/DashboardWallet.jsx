import React from "react";

const DashboardWallet = () => {
  // Static demo data; replace with real data source when available
  const currentBalance = 8165;
  const transactions = [
    {
      id: 1,
      name: "Shubhangi sri",
      gender: "Female",
      phone: "8707050874",
      description: "Pharmacy service fee credited",
      amount: 1825,
      date: "25/08/2025, 10:54:10",
    },
    {
      id: 2,
      name: "Vishnu yadav",
      gender: "Male",
      phone: "9455050871",
      description: "Pharmacy service fee credited",
      amount: 1000,
      date: "23/08/2025, 11:26:12",
    },
    {
      id: 3,
      name: "Vikrant dubey",
      gender: "Female",
      phone: "9455050876",
      description: "Pharmacy service fee credited",
      amount: 375,
      date: "22/08/2025, 17:24:32",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-6  py-4">
      {/* Wallet Card */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-xl sm:text-2xl">
            💳
          </div>
          <div>
            <p className="text-gray-600 text-xs sm:text-sm">Wallet</p>
            <h2 className="text-base sm:text-lg font-bold text-gray-800">
              Current Balance
            </h2>
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-teal-700">
          ₹{currentBalance}
        </div>
      </div>

      {/* Transactions */}
      <div className="mb-3 text-base sm:text-lg font-bold text-gray-800">
        Transaction History
      </div>
      <div className="space-y-3 sm:space-y-4">
        {transactions.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-xl shadow p-3 sm:p-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <div className="text-gray-900 font-semibold text-sm sm:text-base">
                  {t.name}
                </div>
                <div className="text-xs sm:text-sm text-gray-500">
                  {t.gender} • {t.phone}
                </div>
                <div className="text-xs sm:text-sm text-gray-700 mt-1 sm:mt-2">
                  {t.description}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-400 mt-1">
                  {t.date}
                </div>
              </div>
              <div className="text-green-600 font-bold text-base sm:text-lg">
                ₹{t.amount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardWallet;
