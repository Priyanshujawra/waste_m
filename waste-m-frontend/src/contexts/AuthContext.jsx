import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUser(response.data))
        .catch(() => setUser(null));
    }
  }, []);

  // Function to update profile image
  const updateProfileImage = async (selectedFile) => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("profileImage", selectedFile);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/api/profile-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update user profile with new profile image
      setUser((prev) => ({
        ...prev,
        user: { ...prev.user, profileImage: response.data.user.profileImage },
      }));
    } catch (error) {
      console.error("Failed to update profile image:", error);
    }
  };
  const login = (userData) => {
    // useEffect(() => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    // }, []);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, updateProfileImage }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
