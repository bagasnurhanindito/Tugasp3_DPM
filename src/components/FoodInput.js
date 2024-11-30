import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const FoodInput = ({ onAddFood }) => {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");

  const handleAddFood = () => {
    if (name && calories) {
      onAddFood({ name, calories: parseInt(calories) });
      setName("");
      setCalories("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, styles.foodNameInput]}
        placeholder="Food Name"
        placeholderTextColor="#fff"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, styles.caloriesInput]}
        placeholder="Calories"
        placeholderTextColor="#fff"
        keyboardType="numeric"
        value={calories}
        onChangeText={setCalories}
      />
      <View style={styles.buttonContainer}>
        <Button title="Add Food" onPress={handleAddFood} color="#4CAF50" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f4f7",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: "#fff", // Warna teks putih untuk kontras
  },
  foodNameInput: {
    backgroundColor: "#4CAF50", // Warna hijau untuk Food Name
  },
  caloriesInput: {
    backgroundColor: "#FFEB3B", // Warna kuning untuk Calories
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default FoodInput;
