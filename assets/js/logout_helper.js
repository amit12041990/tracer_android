import AsyncStorage from "@react-native-async-storage/async-storage";
export const handleLogout = async () => {
    try {
      // Clear user's login status in AsyncStorage
      await AsyncStorage.removeItem("isLoggedIn");

      // Navigate to the login screen
      navigation.replace("Admin");
    } catch (error) {
      console.error("Error during logout:", error.message);
      
    }
  };