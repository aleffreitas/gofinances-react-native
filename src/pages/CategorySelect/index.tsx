import React from "react";
import { FlatList } from "react-native";
import { Button } from "../../components/Form/Button";
import { categories } from "../../utils/categories";
import { Category, Container, Footer, Header, Icon, Name, Separator, Title } from "./styles";

type CategoryProps = {
  key: string;
  name: string;
};

type CategorySelectProps = {
  category: CategoryProps;
  setCategory: (category: CategoryProps) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({ category, setCategory, closeSelectCategory }: CategorySelectProps){
  
  function handleCategorySelect(category: CategoryProps){
    setCategory(category);
  }

  return(
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        style={{flex: 1, width: '100%'}}
        data={categories}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category
            isActive={category.key === item.key}
            onPress={() => handleCategorySelect(item)}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button
          title="Selecionar"
          onPress={closeSelectCategory}
        />
      </Footer>
    </Container>
  );
}