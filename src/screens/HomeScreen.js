import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import FoodInput from "../components/FoodInput";
import FoodItem from "../components/FoodItem";
import { saveData, loadData } from "../utils/storage";

const HomeScreen = ({ navigation }) => {
  const [foods, setFoods] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const savedFoods = await loadData("foods");
      if (savedFoods) {
        setFoods(savedFoods);
        setTotalCalories(
          savedFoods.reduce((sum, food) => sum + food.calories, 0)
        );
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    saveData("foods", foods);
  }, [foods]);

  const addFood = (food) => {
    const newFood = { ...food, id: Date.now().toString() };
    setFoods((prev) => [...prev, newFood]);
    setTotalCalories((prev) => prev + food.calories);
  };

  const deleteFood = (id) => {
    const foodToDelete = foods.find((food) => food.id === id);
    if (foodToDelete) {
      setFoods((prev) => prev.filter((food) => food.id !== id));
      setTotalCalories((prev) => prev - foodToDelete.calories);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/bagas.jpg")}
      style={styles.background}
    >
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            source={require("../../assets/nur.jpg")} // Tambahkan gambar profil di folder assets
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.profileText}>Data Pengguna</Text>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.container}>
        <Text style={styles.title}>My Calories</Text>
        <View style={styles.card}>
          <Text style={styles.summary}>
            Total Calories: {totalCalories} kcal
          </Text>
        </View>
        <FoodInput onAddFood={addFood} />
        <FlatList
          data={foods}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FoodItem item={item} onDelete={deleteFood} />
          )}
        />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    position: "absolute",
    top: 40, 
    right: 20, 
    alignItems: "center", 
    zIndex: 10, 
  },
  profileImage: {
    width: 50, 
    height: 50,
    borderRadius: 25, 
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileText: {
    marginTop: 1, 
    fontSize: 12, 
    fontWeight: "bold",
    color: "black", 
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  summary: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
