import * as React from "react";
import firestore from "@react-native-firebase/firestore";

import { Container } from "./styles";
import { ButtonIcon } from "../ButtonIcon";
import { Input } from "../Input";
import { Alert } from "react-native";
import uuid from "react-native-uuid";

export function FormBox() {
  const [description, setDescription] = React.useState("");
  const [quantity, setQuantity] = React.useState(0);

  const id = uuid.v4();

  async function handleProductAdd() {
    firestore()
      .collection("products")
      .doc(String(id))
      .set({
        description,
        quantity,
        done: false,
        createdAt: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert("Produto adicionado com sucesso");
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  return (
    <Container>
      <Input
        placeholder="Nome do produto"
        size="medium"
        onChangeText={setDescription}
      />

      <Input
        placeholder="0"
        keyboardType="numeric"
        size="small"
        style={{ marginHorizontal: 8 }}
        onChangeText={(value) => setQuantity(Number(value))}
      />

      <ButtonIcon
        size="large"
        icon="add-shopping-cart"
        onPress={handleProductAdd}
      />
    </Container>
  );
}
