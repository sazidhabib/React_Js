import { useState, useEffect } from "react";

function DataTable() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = "https://api.razzakfashion.com";
  const PAGINATE_URL = `${API_URL}?paginate=10`;

  const fetchData = (query = "") => {
    setLoading(true);
    let url = query ? `${PAGINATE_URL}&search=${query}` : PAGINATE_URL;

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    fetchData(event.target.value);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Data Table with Search</h1>

      <div className="flex items-center justify-start mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="p-2 border border-gray-300 rounded-lg focus:outline-none"
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching data: {error.message}</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Email Verified_at</th>
              <th className="py-2 px-4 border">Email Create_at</th>
              <th className="py-2 px-4 border">Email Update_at</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id}>
                  <td className="py-2 px-4 border">{item.id}</td>
                  <td className="py-2 px-4 border">{item.name}</td>
                  <td className="py-2 px-4 border">{item.email}</td>
                  <td className="py-2 px-4 border">{item.email_verified_at}</td>
                  <td className="py-2 px-4 border">{item.created_at}</td>
                  <td className="py-2 px-4 border">{item.updated_at}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DataTable;
