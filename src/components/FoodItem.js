import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const FoodItem = ({ item, onDelete }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.calories}>{item.calories} Cal</Text>
      </View>
      <TouchableOpacity onPress={() => onDelete(item.id)}>
        <Text style={styles.delete}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#e8f5e9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  calories: {
    fontSize: 14,
    color: "#555",
  },
  delete: {
    color: "red",
    fontWeight: "bold",
  },
});

export default FoodItem;
